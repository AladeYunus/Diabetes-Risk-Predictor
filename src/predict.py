"""Prediction interface — load saved models and run inference."""

import logging
from typing import Dict, Union

import joblib
import numpy as np
import pandas as pd

from src.config import (
    DIABETES_MODEL_PATH,
    DIABETES_PREPROCESSOR_PATH,
    GLUCOSE_CATEGORICAL_COLS,
    GLUCOSE_MODEL_PATH,
    GLUCOSE_PREPROCESSOR_PATH,
)

logger = logging.getLogger(__name__)

_glucose_model = None
_glucose_preprocessor = None
_diabetes_model = None
_diabetes_preprocessor = None


def _load_glucose_artifacts():
    global _glucose_model, _glucose_preprocessor
    if _glucose_model is None:
        _glucose_model = joblib.load(GLUCOSE_MODEL_PATH)
        _glucose_preprocessor = joblib.load(GLUCOSE_PREPROCESSOR_PATH)
        logger.info("Glucose model and preprocessor loaded")


def _load_diabetes_artifacts():
    global _diabetes_model, _diabetes_preprocessor
    if _diabetes_model is None:
        _diabetes_model = joblib.load(DIABETES_MODEL_PATH)
        _diabetes_preprocessor = joblib.load(DIABETES_PREPROCESSOR_PATH)
        logger.info("Diabetes model and preprocessor loaded")


def predict_glucose(features: Dict[str, Union[float, str]]) -> Dict[str, float]:
    """Predict blood glucose level from 34 features.

    Args:
        features: Dict with keys F1-F34. F4 and F9 are categorical strings,
                  all others are numeric.

    Returns:
        Dict with 'predicted_glucose' value.
    """
    _load_glucose_artifacts()

    df = pd.DataFrame([features])

    expected_cols = [f"F{i}" for i in range(1, 35)]
    missing = set(expected_cols) - set(df.columns)
    if missing:
        raise ValueError(f"Missing features: {sorted(missing)}")

    df = df[expected_cols]

    transformed = _glucose_preprocessor.transform(df)
    prediction = _glucose_model.predict(transformed)[0]

    return {"predicted_glucose": round(float(prediction), 2)}


def predict_diabetes(features: Dict[str, Union[float, None]]) -> Dict[str, Union[bool, float]]:
    """Predict diabetes risk from 20 features.

    Args:
        features: Dict with keys F1-F20. All numeric. F20 can be None (will be imputed).

    Returns:
        Dict with 'diabetes_risk' (bool) and 'confidence' (float).
    """
    _load_diabetes_artifacts()

    df = pd.DataFrame([features])

    expected_cols = [f"F{i}" for i in range(1, 21)]
    missing = set(expected_cols) - set(df.columns)
    if missing:
        raise ValueError(f"Missing features: {sorted(missing)}")

    df = df[expected_cols]

    # Convert None to NaN for imputation
    df = df.astype(float)

    transformed = _diabetes_preprocessor.transform(df)
    prediction = _diabetes_model.predict(transformed)[0]

    # Get probability if the model supports it
    confidence = 0.0
    if hasattr(_diabetes_model, "predict_proba"):
        proba = _diabetes_model.predict_proba(transformed)[0]
        confidence = round(float(max(proba)), 4)

    return {
        "diabetes_risk": bool(prediction),
        "confidence": confidence,
    }


def reload_models():
    """Force reload of all model artifacts."""
    global _glucose_model, _glucose_preprocessor, _diabetes_model, _diabetes_preprocessor
    _glucose_model = None
    _glucose_preprocessor = None
    _diabetes_model = None
    _diabetes_preprocessor = None
    logger.info("Model cache cleared — will reload on next prediction")
