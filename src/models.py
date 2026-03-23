"""Model training, evaluation, and persistence.

Trains multiple models for each task, selects the best, and saves artifacts.
"""

import logging
from typing import Any, Dict, List, Tuple

import joblib
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    mean_squared_error,
    precision_score,
    r2_score,
    recall_score,
)
from sklearn.model_selection import cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor

from src.config import (
    DIABETES_MODEL_PATH,
    GLUCOSE_MODEL_PATH,
    MODELS_DIR,
    RANDOM_STATE,
)

logger = logging.getLogger(__name__)


def evaluate_regressor(
    model: Any, X_test: np.ndarray, y_test: np.ndarray
) -> Dict[str, float]:
    """Evaluate a regression model and return metrics."""
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    return {
        "mse": mse,
        "rmse": np.sqrt(mse),
        "r2": r2_score(y_test, y_pred),
    }


def evaluate_classifier(
    model: Any, X_test: np.ndarray, y_test: np.ndarray
) -> Dict[str, float]:
    """Evaluate a classification model and return metrics."""
    y_pred = model.predict(X_test)
    return {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred, zero_division=0),
        "recall": recall_score(y_test, y_pred, zero_division=0),
        "f1": f1_score(y_test, y_pred, zero_division=0),
    }


def train_glucose_models(
    X_train: np.ndarray,
    X_test: np.ndarray,
    y_train: np.ndarray,
    y_test: np.ndarray,
) -> Tuple[Any, List[Dict[str, Any]]]:
    """Train multiple regression models and return the best one.

    Models tested:
    - Linear Regression
    - Random Forest Regressor
    - Gradient Boosting Regressor (best performer in notebooks)
    """
    candidates = [
        ("Linear Regression", LinearRegression()),
        ("Random Forest", RandomForestRegressor(n_estimators=100, random_state=RANDOM_STATE)),
        ("Gradient Boosting", GradientBoostingRegressor(
            n_estimators=200, learning_rate=0.1, max_depth=5, random_state=RANDOM_STATE
        )),
    ]

    results = []
    best_model = None
    best_r2 = -np.inf

    for name, model in candidates:
        model.fit(X_train, y_train)

        # Cross-validation on training set
        cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring="r2")

        # Holdout evaluation
        metrics = evaluate_regressor(model, X_test, y_test)
        metrics["cv_r2_mean"] = cv_scores.mean()
        metrics["cv_r2_std"] = cv_scores.std()

        result = {"name": name, "model": model, "metrics": metrics}
        results.append(result)

        logger.info(
            "%s — R²=%.4f, RMSE=%.2f, CV R²=%.4f±%.4f",
            name, metrics["r2"], metrics["rmse"], metrics["cv_r2_mean"], metrics["cv_r2_std"],
        )

        if metrics["r2"] > best_r2:
            best_r2 = metrics["r2"]
            best_model = model

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(best_model, GLUCOSE_MODEL_PATH)
    logger.info("Best glucose model saved to %s (R²=%.4f)", GLUCOSE_MODEL_PATH, best_r2)

    return best_model, results


def train_diabetes_models(
    X_train: np.ndarray,
    X_test: np.ndarray,
    y_train: np.ndarray,
    y_test: np.ndarray,
) -> Tuple[Any, List[Dict[str, Any]]]:
    """Train multiple classification models and return the best one.

    Models tested:
    - Decision Tree
    - Logistic Regression
    - K-Nearest Neighbours
    - Gradient Boosting Classifier
    """
    candidates = [
        ("Decision Tree", DecisionTreeClassifier(random_state=RANDOM_STATE)),
        ("Logistic Regression", LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)),
        ("KNN", KNeighborsClassifier(n_neighbors=10)),
        ("Gradient Boosting", GradientBoostingClassifier(
            n_estimators=200, learning_rate=0.1, max_depth=5, random_state=RANDOM_STATE
        )),
    ]

    results = []
    best_model = None
    best_f1 = -np.inf

    for name, model in candidates:
        model.fit(X_train, y_train)

        # Cross-validation on training set
        cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring="f1")

        # Holdout evaluation
        metrics = evaluate_classifier(model, X_test, y_test)
        metrics["cv_f1_mean"] = cv_scores.mean()
        metrics["cv_f1_std"] = cv_scores.std()

        result = {"name": name, "model": model, "metrics": metrics}
        results.append(result)

        logger.info(
            "%s — Acc=%.4f, F1=%.4f, CV F1=%.4f±%.4f",
            name, metrics["accuracy"], metrics["f1"], metrics["cv_f1_mean"], metrics["cv_f1_std"],
        )

        if metrics["f1"] > best_f1:
            best_f1 = metrics["f1"]
            best_model = model

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(best_model, DIABETES_MODEL_PATH)
    logger.info("Best diabetes model saved to %s (F1=%.4f)", DIABETES_MODEL_PATH, best_f1)

    return best_model, results
