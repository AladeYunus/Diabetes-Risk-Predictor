"""Data preprocessing pipelines for glucose and diabetes models.

Fixes from original notebooks:
- Uses relative paths instead of hardcoded Google Drive paths
- Consistent OrdinalEncoder for both models (not mixed with LabelEncoder)
- Imputer fit on training data only (prevents data leakage)
- StandardScaler applied for consistent feature scaling
"""

import logging
from typing import Tuple

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import KNNImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder, StandardScaler

from src.config import (
    DIABETES_PREPROCESSOR_PATH,
    DIABETES_TRAIN_DATA,
    DIABETES_TEST_DATA,
    GLUCOSE_CATEGORICAL_COLS,
    GLUCOSE_PREPROCESSOR_PATH,
    GLUCOSE_TRAIN_DATA,
    GLUCOSE_TEST_DATA,
    MODELS_DIR,
    RANDOM_STATE,
    TEST_SIZE,
)

logger = logging.getLogger(__name__)


def load_glucose_data() -> Tuple[pd.DataFrame, pd.DataFrame]:
    """Load glucose prediction training and test datasets."""
    train_df = pd.read_csv(GLUCOSE_TRAIN_DATA)
    test_df = pd.read_csv(GLUCOSE_TEST_DATA)
    logger.info("Glucose data loaded: train=%d rows, test=%d rows", len(train_df), len(test_df))
    return train_df, test_df


def load_diabetes_data() -> Tuple[pd.DataFrame, pd.DataFrame]:
    """Load diabetes prediction training and test datasets."""
    train_df = pd.read_csv(DIABETES_TRAIN_DATA)
    test_df = pd.read_csv(DIABETES_TEST_DATA)
    logger.info("Diabetes data loaded: train=%d rows, test=%d rows", len(train_df), len(test_df))
    return train_df, test_df


def build_glucose_preprocessor() -> ColumnTransformer:
    """Build preprocessing pipeline for glucose model.

    - OrdinalEncoder for categorical columns (F4, F9)
    - StandardScaler for all numeric columns
    """
    numeric_cols = [f"F{i}" for i in range(1, 35) if f"F{i}" not in GLUCOSE_CATEGORICAL_COLS]

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1), GLUCOSE_CATEGORICAL_COLS),
            ("num", StandardScaler(), numeric_cols),
        ],
        remainder="drop",
    )
    return preprocessor


def build_diabetes_preprocessor() -> Pipeline:
    """Build preprocessing pipeline for diabetes model.

    - KNNImputer for missing values (F20 has ~50% missing)
    - StandardScaler for all features
    - Imputer is fit on training data only to prevent data leakage
    """
    preprocessor = Pipeline([
        ("imputer", KNNImputer(n_neighbors=5)),
        ("scaler", StandardScaler()),
    ])
    return preprocessor


def prepare_glucose_data(
    train_df: pd.DataFrame,
    test_df: pd.DataFrame,
) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, ColumnTransformer]:
    """Prepare glucose data: split, encode, scale.

    Returns (X_train, X_test, y_train, y_test, fitted_preprocessor).
    """
    train_df = train_df.drop_duplicates()

    X = train_df.drop("Target", axis=1)
    y = train_df["Target"].values

    from sklearn.model_selection import train_test_split
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE
    )

    preprocessor = build_glucose_preprocessor()
    X_train = preprocessor.fit_transform(X_train_raw)
    X_test = preprocessor.transform(X_test_raw)

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(preprocessor, GLUCOSE_PREPROCESSOR_PATH)
    logger.info("Glucose preprocessor saved to %s", GLUCOSE_PREPROCESSOR_PATH)

    return X_train, X_test, y_train, y_test, preprocessor


def prepare_diabetes_data(
    train_df: pd.DataFrame,
    test_df: pd.DataFrame,
) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, Pipeline]:
    """Prepare diabetes data: impute, scale.

    Imputer is fit on training data only to prevent data leakage.
    Returns (X_train, X_test, y_train, y_test, fitted_preprocessor).
    """
    X = train_df.drop("Class", axis=1)
    y = train_df["Class"].astype(int).values

    from sklearn.model_selection import train_test_split
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE
    )

    preprocessor = build_diabetes_preprocessor()
    X_train = preprocessor.fit_transform(X_train_raw)
    X_test = preprocessor.transform(X_test_raw)

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(preprocessor, DIABETES_PREPROCESSOR_PATH)
    logger.info("Diabetes preprocessor saved to %s", DIABETES_PREPROCESSOR_PATH)

    return X_train, X_test, y_train, y_test, preprocessor
