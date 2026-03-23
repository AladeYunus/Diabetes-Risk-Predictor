"""Train an enhanced model on the Pima dataset with feature engineering.
Exports as JSON for client-side evaluation."""

import json
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.metrics import classification_report

FEATURE_NAMES = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
]

ZERO_IS_MISSING = [1, 2, 3, 4, 5]  # Glucose, BP, SkinThickness, Insulin, BMI

# Engineered feature definitions: (name, formula_description)
# These get computed both in Python training and in JavaScript prediction
ENGINEERED = [
    "Glucose_BMI",           # Glucose * BMI / 100
    "Age_Pregnancies",       # Age * Pregnancies
    "Insulin_Glucose_Ratio", # Insulin / (Glucose + 1)
    "BMI_Age",               # BMI * Age / 100
    "Glucose_DPF",           # Glucose * DPF
    "High_Glucose",          # 1 if Glucose > 140, else 0
    "Obese",                 # 1 if BMI >= 30, else 0
    "High_BP",               # 1 if BloodPressure > 90, else 0
]


def load_and_preprocess(path="data/pima.csv"):
    data = np.loadtxt(path, delimiter=",")
    X = data[:, :8].copy()
    y = data[:, 8]

    # Impute zeros with median
    for col in ZERO_IS_MISSING:
        mask = X[:, col] == 0
        median_val = np.median(X[~mask, col])
        X[mask, col] = median_val

    return X, y


def engineer_features(X):
    """Add derived features. Must mirror the JS implementation exactly."""
    preg, gluc, bp, skin, ins, bmi, dpf, age = [X[:, i] for i in range(8)]

    new_features = np.column_stack([
        gluc * bmi / 100,             # Glucose_BMI
        age * preg,                    # Age_Pregnancies
        ins / (gluc + 1),             # Insulin_Glucose_Ratio
        bmi * age / 100,              # BMI_Age
        gluc * dpf,                   # Glucose_DPF
        (gluc > 140).astype(float),   # High_Glucose
        (bmi >= 30).astype(float),    # Obese
        (bp > 90).astype(float),      # High_BP
    ])

    return np.hstack([X, new_features])


def tree_to_dict(tree):
    t = tree.tree_

    def recurse(node_id):
        if t.children_left[node_id] == -1:
            return {"v": round(float(t.value[node_id][0][0]), 6)}
        return {
            "f": int(t.feature[node_id]),
            "t": round(float(t.threshold[node_id]), 6),
            "l": recurse(int(t.children_left[node_id])),
            "r": recurse(int(t.children_right[node_id]))
        }

    return recurse(0)


def main():
    X_raw, y = load_and_preprocess()
    X = engineer_features(X_raw)
    all_feature_names = FEATURE_NAMES + ENGINEERED

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    print(f"Samples: {X.shape[0]}, Features: {X.shape[1]} (8 original + {len(ENGINEERED)} engineered)")
    print(f"Class distribution: {int(sum(y == 0))} neg, {int(sum(y == 1))} pos\n")

    # Test with and without feature engineering
    base_model = GradientBoostingClassifier(
        n_estimators=50, max_depth=2, learning_rate=0.1,
        subsample=0.8, min_samples_leaf=15, random_state=42
    )
    base_scores = cross_val_score(base_model, X_raw, y, cv=cv, scoring="accuracy")
    print(f"Baseline (8 features):     {base_scores.mean():.4f} (+/- {base_scores.std():.4f})")

    # Configs with engineered features
    configs = {
        "GBT-50-d3-lr0.1": GradientBoostingClassifier(
            n_estimators=50, max_depth=3, learning_rate=0.1,
            subsample=0.8, min_samples_leaf=10, random_state=42
        ),
        "GBT-80-d3-lr0.08": GradientBoostingClassifier(
            n_estimators=80, max_depth=3, learning_rate=0.08,
            subsample=0.8, min_samples_leaf=12, random_state=42
        ),
        "GBT-100-d3-lr0.05": GradientBoostingClassifier(
            n_estimators=100, max_depth=3, learning_rate=0.05,
            subsample=0.8, min_samples_leaf=15, random_state=42
        ),
        "GBT-60-d4-lr0.08": GradientBoostingClassifier(
            n_estimators=60, max_depth=4, learning_rate=0.08,
            subsample=0.8, min_samples_leaf=15, random_state=42
        ),
        "GBT-80-d3-lr0.1": GradientBoostingClassifier(
            n_estimators=80, max_depth=3, learning_rate=0.1,
            subsample=0.8, min_samples_leaf=10, random_state=42
        ),
    }

    print(f"\nWith {X.shape[1]} features (engineered):")
    print("-" * 55)
    results = {}
    for name, model in configs.items():
        scores = cross_val_score(model, X, y, cv=cv, scoring="accuracy")
        results[name] = (scores.mean(), scores.std(), model)
        print(f"  {name:30s}  {scores.mean():.4f} (+/- {scores.std():.4f})")

    best_name = max(results, key=lambda k: results[k][0])
    best_mean, best_std, best_model = results[best_name]
    print(f"\nBest: {best_name} — {best_mean:.4f}")
    print(f"Improvement over baseline: +{(best_mean - base_scores.mean()) * 100:.1f}%")

    # Train on full data
    best_model.fit(X, y)
    y_pred = best_model.predict(X)
    print(f"\nTraining accuracy: {(y_pred == y).mean():.4f}")
    print(classification_report(y, y_pred, target_names=["No Diabetes", "Diabetes"]))

    # Feature importance
    print("Feature importance:")
    importances = list(zip(all_feature_names, best_model.feature_importances_))
    for name_f, imp in sorted(importances, key=lambda x: -x[1])[:12]:
        bar = "#" * int(imp * 50)
        print(f"  {name_f:30s} {imp:.4f} {bar}")

    # Export
    trees = [tree_to_dict(est[0]) for est in best_model.estimators_]
    init_val = float(np.log(best_model.init_.class_prior_[1] / best_model.init_.class_prior_[0]))

    # Medians for imputation
    raw_data = np.loadtxt("data/pima.csv", delimiter=",")
    raw_X = raw_data[:, :8]
    medians = {}
    for col in ZERO_IS_MISSING:
        non_zero = raw_X[raw_X[:, col] != 0, col]
        medians[str(col)] = round(float(np.median(non_zero)), 1)

    model_export = {
        "type": "gradient_boosting",
        "n_estimators": len(trees),
        "learning_rate": best_model.learning_rate,
        "init_value": round(init_val, 6),
        "feature_names": all_feature_names,
        "original_features": 8,
        "engineered_features": ENGINEERED,
        "medians": medians,
        "zero_is_missing": ZERO_IS_MISSING,
        "trees": trees,
        "accuracy": round(best_mean, 4)
    }

    out_path = "docs/model.json"
    with open(out_path, "w") as f:
        json.dump(model_export, f)

    file_size = len(json.dumps(model_export)) / 1024
    print(f"\nExported to {out_path} ({file_size:.1f} KB)")

    # Sanity check
    print("\nSanity check:")
    correct = 0
    for i in range(20):
        prob = best_model.predict_proba(X[i:i + 1])[0][1]
        match = (prob >= 0.5) == (y[i] == 1)
        correct += match
        tag = "OK" if match else "MISS"
        actual = "POS" if y[i] else "NEG"
        print(f"  [{tag}] prob={prob:.3f} actual={actual}")
    print(f"  {correct}/20 correct")


if __name__ == "__main__":
    main()
