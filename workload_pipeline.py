#!/usr/bin/env python3
"""
EEG Mental Workload Classification — Reproducible Pipeline
----------------------------------------------------------

Models: Logistic Regression (scikit-learn) and CNN (TensorFlow/Keras)
Dataset: WLDataCW.mat with keys {"data", "label"}

Usage examples:

# Train and evaluate both models
python workload_pipeline.py --data_path /path/to/WLDataCW.mat --model both --epochs 30

# Just Logistic Regression with 5-fold CV on train and a fixed test split
python workload_pipeline.py --data_path ./WLDataCW.mat --model logreg --test_size 0.2 --seed 42

# Just CNN with z-score normalization and saved artifacts to ./outputs
python workload_pipeline.py --data_path ./WLDataCW.mat --model cnn --norm zscore --epochs 50 --output_dir ./outputs

Notes:
- No Google Drive or notebooks required.
- Reproducible: seeds fixed; version info logged.
- Visualizations and metrics are saved to the output directory.

Requirements (tested):
  python>=3.9
  numpy, scipy, pandas, scikit-learn, matplotlib
  tensorflow>=2.12 (or compatible GPU build)

"""

import argparse
import json
import os
import random
from dataclasses import dataclass
from pathlib import Path
import yaml
from typing import Dict, Tuple

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.io import loadmat
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_recall_fscore_support,
    roc_auc_score,
    confusion_matrix,
    RocCurveDisplay,
    classification_report,
)
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.utils.class_weight import compute_class_weight

# Make TF optional so that --model logreg works without TensorFlow
try:
    import tensorflow as tf
    from tensorflow.keras import layers, models, callbacks
except Exception:
    tf = None


# ------------------------------
# Utility & Reproducibility
# ------------------------------

def set_seed(seed: int = 42):
    random.seed(seed)
    np.random.seed(seed)
    try:
        import tensorflow as tf  # local import
        tf.random.set_seed(seed)
    except Exception:
        pass


def ensure_dir(p: Path):
    p.mkdir(parents=True, exist_ok=True)


@dataclass
class SplitData:
    X_train: np.ndarray
    X_val: np.ndarray
    X_test: np.ndarray
    y_train: np.ndarray
    y_val: np.ndarray
    y_test: np.ndarray


# ------------------------------
# Data Loading & Preprocessing
# ------------------------------

def load_wl_mat(mat_path: str) -> Tuple[np.ndarray, np.ndarray]:
    """Load WLDataCW.mat and return (X, y).

    Expected shapes:
      - data: (62, 512, 360) or (360, 62, 512) or (512, 62, 360)
      - label: (1, 360) or (360, 1) or (360,)
    Returns:
      X: (N, 62, 512) ndarray
      y: (N,) ndarray with binary labels {0,1}
    """
    mat = loadmat(mat_path)
    if "data" not in mat or "label" not in mat:
        raise KeyError(".mat must include 'data' and 'label' variables")

    data = mat["data"]
    label = mat["label"].squeeze()

    # Normalize label shape
    if label.ndim > 1:
        label = label.reshape(-1)

    # Bring to (N, 62, 512)
    if data.shape == (62, 512, label.shape[0]):
        X = np.transpose(data, (2, 0, 1))  # (N,62,512)
    elif data.shape == (512, 62, label.shape[0]):
        X = np.transpose(data, (2, 1, 0))  # (N,62,512)
    elif data.shape == (label.shape[0], 62, 512):
        X = data
    else:
        raise ValueError(f"Unexpected data shape: {data.shape}")

    y = label.astype(int)
    if set(np.unique(y)) - {0, 1}:
        raise ValueError("Labels must be binary {0,1}")

    return X, y


def normalize_eeg(X: np.ndarray, method: str = "none") -> np.ndarray:
    """Normalize EEG samples.

    Args:
      X: (N, 62, 512)
      method: 'none' | 'zscore' | 'minmax'

    Returns:
      X_norm: same shape as X
    """
    if method == "none":
        return X.astype(np.float32)

    X = X.astype(np.float32)
    if method == "zscore":
        # Per-sample z-score (per channel across time)
        mean = X.mean(axis=2, keepdims=True)
        std = X.std(axis=2, keepdims=True) + 1e-8
        return (X - mean) / std
    elif method == "minmax":
        # Per-sample minmax
        x_min = X.min(axis=2, keepdims=True)
        x_max = X.max(axis=2, keepdims=True)
        return (X - x_min) / (x_max - x_min + 1e-8)
    else:
        raise ValueError("Unknown normalization method")


def make_splits(
    X: np.ndarray,
    y: np.ndarray,
    test_size: float,
    val_size: float,
    seed: int,
) -> SplitData:
    # First split off test
    X_trainval, X_test, y_trainval, y_test = train_test_split(
        X, y, test_size=test_size, random_state=seed, stratify=y
    )
    # Then split train/val
    X_train, X_val, y_train, y_val = train_test_split(
        X_trainval, y_trainval, test_size=val_size, random_state=seed, stratify=y_trainval
    )
    return SplitData(X_train, X_val, X_test, y_train, y_val, y_test)


# ------------------------------
# Logistic Regression Pipeline
# ------------------------------

def prepare_lr_features(X: np.ndarray) -> np.ndarray:
    """Flatten EEG (N, 62, 512) -> (N, 62*512)."""
    N = X.shape[0]
    return X.reshape(N, -1)


def train_evaluate_logreg(split: SplitData, output_dir: Path, seed: int) -> Dict:
    X_train_f = prepare_lr_features(split.X_train)
    X_val_f = prepare_lr_features(split.X_val)
    X_test_f = prepare_lr_features(split.X_test)

    # Standard scaler + Logistic Regression pipeline
    pipe = Pipeline(
        steps=[
            ("scaler", StandardScaler(with_mean=True, with_std=True)),
            (
                "logreg",
                LogisticRegression(
                    penalty="l2",
                    C=1.0,
                    solver="lbfgs",
                    max_iter=2000,
                    class_weight="balanced",
                    random_state=seed,
                ),
            ),
        ]
    )

    pipe.fit(X_train_f, split.y_train)

    # Evaluate on val and test
    metrics = {}
    for name, Xf, y in (
        ("val", X_val_f, split.y_val),
        ("test", X_test_f, split.y_test),
    ):
        prob = pipe.predict_proba(Xf)[:, 1]
        pred = (prob >= 0.5).astype(int)
        acc = accuracy_score(y, pred)
        prec, rec, f1, _ = precision_recall_fscore_support(y, pred, average="binary", zero_division=0)
        try:
            auc = roc_auc_score(y, prob)
        except ValueError:
            auc = float("nan")
        cm = confusion_matrix(y, pred)
        metrics[name] = {
            "accuracy": float(acc),
            "precision": float(prec),
            "recall": float(rec),
            "f1": float(f1),
            "roc_auc": float(auc),
            "confusion_matrix": cm.tolist(),
        }

        # Plots
        fig, ax = plt.subplots()
        RocCurveDisplay.from_predictions(y, prob, ax=ax)
        ax.set_title(f"LogReg ROC — {name}")
        fig.tight_layout()
        fig.savefig(output_dir / f"logreg_roc_{name}.png", dpi=150)
        plt.close(fig)

    # Save classification report for test
    report = classification_report(split.y_test, (pipe.predict_proba(X_test_f)[:, 1] >= 0.5).astype(int))
    (output_dir / "logreg_classification_report.txt").write_text(report)

    # Persist model
    try:
        import joblib
        joblib.dump(pipe, output_dir / "logreg_model.pkl")
    except Exception as e:
        print(f"[WARN] Could not save LR model pickle: {e}")

    return metrics


# ------------------------------
# CNN Pipeline
# ------------------------------

def to_cnn_input(X: np.ndarray) -> np.ndarray:
    """(N, 62, 512) -> (N, 512, 62, 1) for 2D conv (time x channels)."""
    X = np.transpose(X, (0, 2, 1))  # (N,512,62)
    return X[..., np.newaxis].astype(np.float32)


def build_cnn(input_shape: Tuple[int, int, int]) -> "models.Model":
    if tf is None:
        raise RuntimeError("TensorFlow is not available. Install tensorflow to use --model cnn")

    inputs = layers.Input(shape=input_shape)

    x = layers.Conv2D(32, 3, padding="same")(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    x = layers.MaxPooling2D(2)(x)

    x = layers.Conv2D(64, 3, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    x = layers.MaxPooling2D(2)(x)

    x = layers.Conv2D(128, 3, padding="same")(x)
    x = layers.BatchNormalization()(x)
    x = layers.Activation("relu")(x)
    x = layers.MaxPooling2D(2)(x)

    x = layers.Flatten()(x)
    x = layers.Dense(256, activation="relu")(x)
    x = layers.Dropout(0.5)(x)
    x = layers.Dense(128, activation="relu")(x)
    outputs = layers.Dense(1, activation="sigmoid")(x)

    model = models.Model(inputs, outputs)
    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
    return model


def train_evaluate_cnn(split: SplitData, output_dir: Path, seed: int, epochs: int, batch_size: int) -> Dict:
    # Prepare inputs
    X_train_i = to_cnn_input(split.X_train)
    X_val_i = to_cnn_input(split.X_val)
    X_test_i = to_cnn_input(split.X_test)

    # Class weights for imbalance (if any)
    classes = np.array([0, 1])
    class_weights = compute_class_weight(
        class_weight="balanced", classes=classes, y=split.y_train
    )
    cw = {int(c): float(w) for c, w in zip(classes, class_weights)}

    model = build_cnn(input_shape=X_train_i.shape[1:])

    # Callbacks
    cb = [
        callbacks.EarlyStopping(monitor="val_loss", patience=10, restore_best_weights=True),
        callbacks.ModelCheckpoint(filepath=str(output_dir / "cnn_best.keras"), monitor="val_loss", save_best_only=True),
        callbacks.ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=5, verbose=1),
    ]

    history = model.fit(
        X_train_i,
        split.y_train,
        validation_data=(X_val_i, split.y_val),
        epochs=epochs,
        batch_size=batch_size,
        class_weight=cw,
        verbose=2,
        callbacks=cb,
    )

    # Learning curves
    hist_df = pd.DataFrame(history.history)
    hist_df.to_csv(output_dir / "cnn_history.csv", index=False)
    fig1, ax1 = plt.subplots()
    ax1.plot(hist_df["loss"], label="train")
    ax1.plot(hist_df["val_loss"], label="val")
    ax1.set_title("CNN Loss")
    ax1.set_xlabel("Epoch")
    ax1.set_ylabel("Binary Crossentropy")
    ax1.legend()
    fig1.tight_layout()
    fig1.savefig(output_dir / "cnn_loss.png", dpi=150)
    plt.close(fig1)

    fig2, ax2 = plt.subplots()
    ax2.plot(hist_df["accuracy"], label="train")
    ax2.plot(hist_df["val_accuracy"], label="val")
    ax2.set_title("CNN Accuracy")
    ax2.set_xlabel("Epoch")
    ax2.set_ylabel("Accuracy")
    ax2.legend()
    fig2.tight_layout()
    fig2.savefig(output_dir / "cnn_accuracy.png", dpi=150)
    plt.close(fig2)

    # Evaluate on val and test
    metrics = {}
    for name, Xi, y in (("val", X_val_i, split.y_val), ("test", X_test_i, split.y_test)):
        prob = model.predict(Xi, verbose=0).reshape(-1)
        pred = (prob >= 0.5).astype(int)
        acc = accuracy_score(y, pred)
        prec, rec, f1, _ = precision_recall_fscore_support(y, pred, average="binary", zero_division=0)
        try:
            auc = roc_auc_score(y, prob)
        except ValueError:
            auc = float("nan")
        cm = confusion_matrix(y, pred)
        metrics[name] = {
            "accuracy": float(acc),
            "precision": float(prec),
            "recall": float(rec),
            "f1": float(f1),
            "roc_auc": float(auc),
            "confusion_matrix": cm.tolist(),
        }

        fig, ax = plt.subplots()
        RocCurveDisplay.from_predictions(y, prob, ax=ax)
        ax.set_title(f"CNN ROC — {name}")
        fig.tight_layout()
        fig.savefig(output_dir / f"cnn_roc_{name}.png", dpi=150)
        plt.close(fig)

    # Persist final model
    try:
        model.save(output_dir / "cnn_final.keras")
    except Exception as e:
        print(f"[WARN] Could not save CNN model: {e}")

    # Save classification report for test
    report = classification_report(split.y_test, (model.predict(X_test_i, verbose=0).reshape(-1) >= 0.5).astype(int))
    (output_dir / "cnn_classification_report.txt").write_text(report)

    return metrics


# ------------------------------
# Orchestration & CLI
# ------------------------------

def main():
    parser = argparse.ArgumentParser(description="EEG Workload Classification Pipeline")
    # Add --config first so we can do a two-pass parse where config sets defaults and CLI overrides
    parser.add_argument("--config", type=str, default=None, help="Path to YAML config file (CLI flags override)")
    parser.add_argument("--data_path", type=str, required=False, help="Path to WLDataCW.mat")
    parser.add_argument("--model", type=str, choices=["logreg", "cnn", "both"], default="both")
    parser.add_argument("--norm", type=str, choices=["none", "zscore", "minmax"], default="zscore",
                        help="Normalization for EEG before modeling")
    parser.add_argument("--test_size", type=float, default=0.2)
    parser.add_argument("--val_size", type=float, default=0.2)
    parser.add_argument("--epochs", type=int, default=30)
    parser.add_argument("--batch_size", type=int, default=32)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--output_dir", type=str, default="./outputs")

    # First pass: get config path if provided
    args_first, _ = parser.parse_known_args()
    if args_first.config is not None:
        with open(args_first.config, "r") as f:
            cfg = yaml.safe_load(f) or {}
        # Set defaults from config so that explicit CLI flags still override
        parser.set_defaults(**cfg)

    args = parser.parse_args()

    if args.data_path is None:
        parser.error("--data_path is required (or provide it in --config)")

    set_seed(args.seed)
    outdir = Path(args.output_dir)
    ensure_dir(outdir)

    # Log versions for reproducibility
    vers = {
        "numpy": np.__version__,
        "pandas": pd.__version__,
        "scikit_learn": __import__("sklearn").__version__,
        "scipy": __import__("scipy").__version__,
    }
    if tf is not None:
        vers["tensorflow"] = tf.__version__
    (outdir / "versions.json").write_text(json.dumps(vers, indent=2))

    # Load & preprocess
    X, y = load_wl_mat(args.data_path)
    X = normalize_eeg(X, method=args.norm)
    split = make_splits(X, y, test_size=args.test_size, val_size=args.val_size, seed=args.seed)

    all_metrics: Dict[str, Dict] = {}

    if args.model in ("logreg", "both"):
        print("\n=== Training Logistic Regression ===")
        lr_dir = outdir / "logreg"
        ensure_dir(lr_dir)
        lr_metrics = train_evaluate_logreg(split, lr_dir, seed=args.seed)
        all_metrics["logreg"] = lr_metrics

    if args.model in ("cnn", "both"):
        if tf is None:
            raise RuntimeError("TensorFlow is required for the CNN model.")
        print("\n=== Training CNN ===")
        cnn_dir = outdir / "cnn"
        ensure_dir(cnn_dir)
        cnn_metrics = train_evaluate_cnn(split, cnn_dir, seed=args.seed, epochs=args.epochs, batch_size=args.batch_size)
        all_metrics["cnn"] = cnn_metrics

    # Save combined metrics
    (outdir / "metrics.json").write_text(json.dumps(all_metrics, indent=2))
    print("\nDone. Metrics saved to", outdir / "metrics.json")


if __name__ == "__main__":
    main()
