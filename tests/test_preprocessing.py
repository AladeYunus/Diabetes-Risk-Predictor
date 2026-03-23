"""Tests for data preprocessing pipelines."""

import numpy as np
import pandas as pd
import pytest

from src.config import GLUCOSE_CATEGORICAL_COLS
from src.preprocessing import (
    build_diabetes_preprocessor,
    build_glucose_preprocessor,
    load_diabetes_data,
    load_glucose_data,
    prepare_diabetes_data,
    prepare_glucose_data,
)


class TestDataLoading:
    def test_load_glucose_data(self):
        train, test = load_glucose_data()
        assert isinstance(train, pd.DataFrame)
        assert isinstance(test, pd.DataFrame)
        assert "Target" in train.columns
        assert "Target" in test.columns
        assert len(train) > 0
        assert len(test) > 0

    def test_load_diabetes_data(self):
        train, test = load_diabetes_data()
        assert isinstance(train, pd.DataFrame)
        assert isinstance(test, pd.DataFrame)
        assert "Class" in train.columns
        assert len(train) > 0

    def test_glucose_data_has_expected_features(self):
        train, _ = load_glucose_data()
        expected = [f"F{i}" for i in range(1, 35)] + ["Target"]
        assert list(train.columns) == expected

    def test_diabetes_data_has_expected_features(self):
        train, _ = load_diabetes_data()
        expected = [f"F{i}" for i in range(1, 21)] + ["Class"]
        assert list(train.columns) == expected

    def test_glucose_no_missing_values(self):
        train, _ = load_glucose_data()
        assert train.drop(columns=["F4", "F9"]).isnull().sum().sum() == 0

    def test_diabetes_has_missing_f20(self):
        train, _ = load_diabetes_data()
        assert train["F20"].isnull().sum() > 0


class TestGlucosePreprocessor:
    def test_build_glucose_preprocessor(self):
        preprocessor = build_glucose_preprocessor()
        assert preprocessor is not None

    def test_prepare_glucose_data_shapes(self):
        train, test = load_glucose_data()
        X_train, X_test, y_train, y_test, preprocessor = prepare_glucose_data(train, test)
        assert X_train.shape[0] > X_test.shape[0]
        assert X_train.shape[1] == X_test.shape[1]
        assert len(y_train) == X_train.shape[0]
        assert len(y_test) == X_test.shape[0]

    def test_prepare_glucose_data_no_nans(self):
        train, test = load_glucose_data()
        X_train, X_test, _, _, _ = prepare_glucose_data(train, test)
        assert not np.isnan(X_train).any()
        assert not np.isnan(X_test).any()


class TestDiabetesPreprocessor:
    def test_build_diabetes_preprocessor(self):
        preprocessor = build_diabetes_preprocessor()
        assert preprocessor is not None

    def test_prepare_diabetes_data_shapes(self):
        train, test = load_diabetes_data()
        X_train, X_test, y_train, y_test, preprocessor = prepare_diabetes_data(train, test)
        assert X_train.shape[0] > X_test.shape[0]
        assert X_train.shape[1] == X_test.shape[1] == 20
        assert len(y_train) == X_train.shape[0]

    def test_prepare_diabetes_data_no_nans_after_imputation(self):
        train, test = load_diabetes_data()
        X_train, X_test, _, _, _ = prepare_diabetes_data(train, test)
        assert not np.isnan(X_train).any()
        assert not np.isnan(X_test).any()

    def test_diabetes_target_is_binary(self):
        train, test = load_diabetes_data()
        _, _, y_train, y_test, _ = prepare_diabetes_data(train, test)
        assert set(np.unique(y_train)).issubset({0, 1})
        assert set(np.unique(y_test)).issubset({0, 1})
