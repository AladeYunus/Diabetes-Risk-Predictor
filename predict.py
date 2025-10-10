#!/usr/bin/env python3
# predict.py — score new data with saved models

import argparse, json
from pathlib import Path
import numpy as np
from scipy.io import loadmat

from workload_pipeline import load_wl_mat, normalize_eeg, prepare_lr_features, to_cnn_input


def load_inputs(path: str) -> np.ndarray:
    p = Path(path)
    if p.suffix.lower() == '.mat':
        X, y = load_wl_mat(str(p))
        return X
    elif p.suffix.lower() == '.npy':
        return np.load(p)
    else:
        raise SystemExit('Unsupported input file. Use .mat or .npy')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--inputs', required=True, help='Path to .mat or .npy containing EEG')
    ap.add_argument('--model_type', choices=['logreg','cnn'], required=True)
    ap.add_argument('--model_path', required=True, help='Path to model file (.pkl for LR, .keras for CNN)')
    ap.add_argument('--norm', default='zscore', choices=['none','zscore','minmax'])
    ap.add_argument('--threshold', type=float, default=0.5)
    args = ap.parse_args()

    X = load_inputs(args.inputs)
    X = normalize_eeg(X, args.norm)

    if args.model_type == 'logreg':
        import joblib
        pipe = joblib.load(args.model_path)
        probs = pipe.predict_proba(prepare_lr_features(X))[:,1]
    else:
        import tensorflow as tf
        model = tf.keras.models.load_model(args.model_path)
        probs = model.predict(to_cnn_input(X), verbose=0).reshape(-1)

    preds = (probs >= args.threshold).astype(int)
    out = {"probs": probs.tolist(), "preds": preds.tolist(), "threshold": args.threshold}
    print(json.dumps(out, indent=2))

if __name__ == '__main__':
    main()
