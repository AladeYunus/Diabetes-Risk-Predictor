"""Train logistic regression on Pima Indians Diabetes dataset.
Export coefficients + scaler params as JSON for client-side prediction."""

import json
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score

FEATURE_NAMES = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
]

def main():
    data = np.loadtxt("data/pima.csv", delimiter=",")
    print(f"Samples: {data.shape[0]}, Features: {data.shape[1] - 1}")

    X = data[:, :8]
    y = data[:, 8]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = LogisticRegression(max_iter=1000, C=1.0, random_state=42)
    model.fit(X_scaled, y)

    scores = cross_val_score(model, X_scaled, y, cv=5, scoring="accuracy")
    print(f"CV Accuracy: {scores.mean():.4f} (+/- {scores.std():.4f})")

    model_export = {
        "feature_names": FEATURE_NAMES,
        "scaler": {
            "mean": scaler.mean_.tolist(),
            "scale": scaler.scale_.tolist()
        },
        "coefficients": model.coef_[0].tolist(),
        "intercept": model.intercept_[0],
        "accuracy": round(scores.mean(), 4)
    }

    with open("docs/model.json", "w") as f:
        json.dump(model_export, f, indent=2)

    print(f"\nExported to docs/model.json")
    print(f"Coefficients: {model.coef_[0].round(4).tolist()}")
    print(f"Intercept: {round(model.intercept_[0], 4)}")

    # Sanity check
    for i in range(5):
        prob = model.predict_proba(X_scaled[i:i+1])[0][1]
        print(f"  Sample {i}: actual={int(y[i])}, prob={prob:.3f}")

if __name__ == "__main__":
    main()
