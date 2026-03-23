"""Training script — train and save all models.

Usage:
    python -m src.train
"""

import logging
import sys

from src.preprocessing import (
    load_diabetes_data,
    load_glucose_data,
    prepare_diabetes_data,
    prepare_glucose_data,
)
from src.models import train_diabetes_models, train_glucose_models

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)


def main():
    logger.info("=== Training Blood Glucose Prediction Model ===")
    glucose_train, glucose_test = load_glucose_data()
    X_train_g, X_test_g, y_train_g, y_test_g, _ = prepare_glucose_data(glucose_train, glucose_test)
    best_glucose, glucose_results = train_glucose_models(X_train_g, X_test_g, y_train_g, y_test_g)

    print("\n--- Glucose Model Results ---")
    for r in glucose_results:
        m = r["metrics"]
        print(f"  {r['name']}: R²={m['r2']:.4f}, RMSE={m['rmse']:.2f}, CV R²={m['cv_r2_mean']:.4f}±{m['cv_r2_std']:.4f}")

    logger.info("\n=== Training Diabetes Prediction Model ===")
    diabetes_train, diabetes_test = load_diabetes_data()
    X_train_d, X_test_d, y_train_d, y_test_d, _ = prepare_diabetes_data(diabetes_train, diabetes_test)
    best_diabetes, diabetes_results = train_diabetes_models(X_train_d, X_test_d, y_train_d, y_test_d)

    print("\n--- Diabetes Model Results ---")
    for r in diabetes_results:
        m = r["metrics"]
        print(f"  {r['name']}: Acc={m['accuracy']:.4f}, F1={m['f1']:.4f}, CV F1={m['cv_f1_mean']:.4f}±{m['cv_f1_std']:.4f}")

    logger.info("\nAll models trained and saved successfully.")


if __name__ == "__main__":
    main()
