#!/usr/bin/env python3
# tune.py (Optuna-based hyperparameter tuning)

import argparse, json
from pathlib import Path
import numpy as np
import optuna
from workload_pipeline import (
    load_wl_mat, normalize_eeg, make_splits,
    prepare_lr_features, to_cnn_input, build_cnn, set_seed
)
from sklearn.metrics import f1_score
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


def tune_logreg(X, y, seed):
    def objective(trial):
        C = trial.suggest_float('C', 1e-3, 10.0, log=True)
        penalty = trial.suggest_categorical('penalty', ['l2'])
        split = make_splits(X, y, test_size=0.2, val_size=0.2, seed=seed)
        Xtr = prepare_lr_features(split.X_train)
        Xva = prepare_lr_features(split.X_val)
        pipe = Pipeline([
            ('scaler', StandardScaler()),
            ('clf', LogisticRegression(C=C, penalty=penalty, solver='lbfgs', max_iter=2000, class_weight='balanced', random_state=seed))
        ])
        pipe.fit(Xtr, split.y_train)
        prob = pipe.predict_proba(Xva)[:,1]
        pred = (prob>=0.5).astype(int)
        return f1_score(split.y_val, pred)

    return objective


def tune_cnn(X, y, seed, epochs):
    import tensorflow as tf
    def objective(trial):
        split = make_splits(X, y, test_size=0.2, val_size=0.2, seed=seed)
        Xtr, Xva = to_cnn_input(split.X_train), to_cnn_input(split.X_val)
        ytr, yva = split.y_train, split.y_val
        # Hyperparams
        base_filters = trial.suggest_categorical('base_filters', [16,32,48])
        dropout = trial.suggest_float('dropout', 0.2, 0.6)
        lr = trial.suggest_float('lr', 1e-4, 1e-2, log=True)
        batch = trial.suggest_categorical('batch', [16,32,64])
        # Build model with variable filters & dropout
        from tensorflow.keras import layers, models, optimizers
        inputs = layers.Input(shape=Xtr.shape[1:])
        x = layers.Conv2D(base_filters, 3, padding='same', activation='relu')(inputs)
        x = layers.MaxPooling2D(2)(x)
        x = layers.Conv2D(base_filters*2, 3, padding='same', activation='relu')(x)
        x = layers.MaxPooling2D(2)(x)
        x = layers.Flatten()(x)
        x = layers.Dense(128, activation='relu')(x)
        x = layers.Dropout(dropout)(x)
        outputs = layers.Dense(1, activation='sigmoid')(x)
        model = models.Model(inputs, outputs)
        model.compile(optimizer=optimizers.Adam(lr), loss='binary_crossentropy', metrics=['accuracy'])

        cb = [tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)]
        model.fit(Xtr, ytr, validation_data=(Xva, yva), epochs=epochs, batch_size=batch, verbose=0, callbacks=cb)
        pred = (model.predict(Xva, verbose=0).reshape(-1) >= 0.5).astype(int)
        return f1_score(yva, pred)
    return objective


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--data_path', required=True)
    ap.add_argument('--model', choices=['logreg','cnn'], required=True)
    ap.add_argument('--trials', type=int, default=20)
    ap.add_argument('--epochs', type=int, default=20)
    ap.add_argument('--seed', type=int, default=42)
    ap.add_argument('--output_dir', default='./outputs')
    ap.add_argument('--norm', default='zscore', choices=['none','zscore','minmax'])
    args = ap.parse_args()

    set_seed(args.seed)
    X, y = load_wl_mat(args.data_path)
    X = normalize_eeg(X, args.norm)

    study = optuna.create_study(direction='maximize')
    if args.model == 'logreg':
        study.optimize(tune_logreg(X, y, args.seed), n_trials=args.trials)
    else:
        study.optimize(tune_cnn(X, y, args.seed, args.epochs), n_trials=args.trials)

    outdir = Path(args.output_dir)
    outdir.mkdir(parents=True, exist_ok=True)
    (outdir / f'best_{args.model}_params.json').write_text(json.dumps(study.best_params, indent=2))
    print('Best params:', study.best_params)

if __name__ == '__main__':
    main()
