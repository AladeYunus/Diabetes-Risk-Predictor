"""Tests for the FastAPI endpoints."""

import pytest
from fastapi.testclient import TestClient

from api.main import app


@pytest.fixture(scope="module")
def client():
    return TestClient(app)


@pytest.fixture(scope="module")
def ensure_models_trained():
    """Ensure models are trained before API tests."""
    from src.config import GLUCOSE_MODEL_PATH, DIABETES_MODEL_PATH
    if not GLUCOSE_MODEL_PATH.exists() or not DIABETES_MODEL_PATH.exists():
        from src.train import main
        main()


class TestHealthEndpoint:
    def test_health_returns_200(self, client):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data


class TestGlucosePrediction:
    def _sample_glucose_payload(self):
        payload = {f"F{i}": 0.0 for i in range(1, 35)}
        payload["F4"] = "UK"
        payload["F9"] = "Very low"
        return payload

    def test_glucose_prediction_success(self, client, ensure_models_trained):
        response = client.post("/predict/glucose", json=self._sample_glucose_payload())
        assert response.status_code == 200
        data = response.json()
        assert "predicted_glucose" in data
        assert isinstance(data["predicted_glucose"], float)

    def test_glucose_missing_fields_returns_422(self, client):
        response = client.post("/predict/glucose", json={"F1": 1.0})
        assert response.status_code == 422

    def test_glucose_invalid_type_returns_422(self, client):
        payload = self._sample_glucose_payload()
        payload["F1"] = "not_a_number"
        response = client.post("/predict/glucose", json=payload)
        assert response.status_code == 422


class TestDiabetesPrediction:
    def _sample_diabetes_payload(self):
        return {f"F{i}": 0.0 for i in range(1, 21)}

    def test_diabetes_prediction_success(self, client, ensure_models_trained):
        response = client.post("/predict/diabetes", json=self._sample_diabetes_payload())
        assert response.status_code == 200
        data = response.json()
        assert "diabetes_risk" in data
        assert "confidence" in data
        assert isinstance(data["diabetes_risk"], bool)

    def test_diabetes_with_null_f20(self, client, ensure_models_trained):
        payload = self._sample_diabetes_payload()
        payload["F20"] = None
        response = client.post("/predict/diabetes", json=payload)
        assert response.status_code == 200

    def test_diabetes_missing_fields_returns_422(self, client):
        response = client.post("/predict/diabetes", json={"F1": 1.0})
        assert response.status_code == 422
