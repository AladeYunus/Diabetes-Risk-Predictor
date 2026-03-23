"""Tests for model training and evaluation."""

import numpy as np
import pytest

from src.models import (
    evaluate_classifier,
    evaluate_regressor,
    train_diabetes_models,
    train_glucose_models,
)
from src.preprocessing import (
    load_diabetes_data,
    load_glucose_data,
    prepare_diabetes_data,
    prepare_glucose_data,
)


@pytest.fixture(scope="module")
def glucose_data():
    train, test = load_glucose_data()
    return prepare_glucose_data(train, test)


@pytest.fixture(scope="module")
def diabetes_data():
    train, test = load_diabetes_data()
    return prepare_diabetes_data(train, test)


class TestGlucoseModels:
    def test_train_glucose_models_returns_results(self, glucose_data):
        X_train, X_test, y_train, y_test, _ = glucose_data
        best_model, results = train_glucose_models(X_train, X_test, y_train, y_test)
        assert best_model is not None
        assert len(results) == 3

    def test_glucose_best_model_r2_above_threshold(self, glucose_data):
        X_train, X_test, y_train, y_test, _ = glucose_data
        best_model, results = train_glucose_models(X_train, X_test, y_train, y_test)
        best_r2 = max(r["metrics"]["r2"] for r in results)
        assert best_r2 > 0.5, f"Best R² is {best_r2}, expected > 0.5"

    def test_glucose_model_predictions_shape(self, glucose_data):
        X_train, X_test, y_train, y_test, _ = glucose_data
        best_model, _ = train_glucose_models(X_train, X_test, y_train, y_test)
        predictions = best_model.predict(X_test)
        assert predictions.shape == y_test.shape

    def test_evaluate_regressor(self, glucose_data):
        X_train, X_test, y_train, y_test, _ = glucose_data
        best_model, _ = train_glucose_models(X_train, X_test, y_train, y_test)
        metrics = evaluate_regressor(best_model, X_test, y_test)
        assert "mse" in metrics
        assert "rmse" in metrics
        assert "r2" in metrics
        assert metrics["rmse"] >= 0
        assert metrics["mse"] >= 0


class TestDiabetesModels:
    def test_train_diabetes_models_returns_results(self, diabetes_data):
        X_train, X_test, y_train, y_test, _ = diabetes_data
        best_model, results = train_diabetes_models(X_train, X_test, y_train, y_test)
        assert best_model is not None
        assert len(results) == 4

    def test_diabetes_best_model_f1_above_threshold(self, diabetes_data):
        X_train, X_test, y_train, y_test, _ = diabetes_data
        best_model, results = train_diabetes_models(X_train, X_test, y_train, y_test)
        best_f1 = max(r["metrics"]["f1"] for r in results)
        assert best_f1 > 0.6, f"Best F1 is {best_f1}, expected > 0.6"

    def test_diabetes_model_predictions_binary(self, diabetes_data):
        X_train, X_test, y_train, y_test, _ = diabetes_data
        best_model, _ = train_diabetes_models(X_train, X_test, y_train, y_test)
        predictions = best_model.predict(X_test)
        assert set(np.unique(predictions)).issubset({0, 1})

    def test_evaluate_classifier(self, diabetes_data):
        X_train, X_test, y_train, y_test, _ = diabetes_data
        best_model, _ = train_diabetes_models(X_train, X_test, y_train, y_test)
        metrics = evaluate_classifier(best_model, X_test, y_test)
        assert all(k in metrics for k in ["accuracy", "precision", "recall", "f1"])
        assert all(0 <= v <= 1 for v in metrics.values())
