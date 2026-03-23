"""Pydantic request/response schemas for the API."""

from typing import Optional

from pydantic import BaseModel, Field


class GlucoseRequest(BaseModel):
    """Request body for glucose prediction. 34 features required."""
    F1: float
    F2: float
    F3: float
    F4: str = Field(description="Categorical feature (e.g. 'UK', 'USA')")
    F5: float
    F6: float
    F7: float
    F8: float
    F9: str = Field(description="Categorical feature (e.g. 'Very low', 'Low', 'Medium', 'High')")
    F10: float
    F11: float
    F12: float
    F13: float
    F14: float
    F15: float
    F16: float
    F17: float
    F18: float
    F19: float
    F20: float
    F21: float
    F22: float
    F23: float
    F24: float
    F25: float
    F26: float
    F27: float
    F28: float
    F29: float
    F30: float
    F31: float
    F32: float
    F33: float
    F34: float

    def to_features_dict(self) -> dict:
        return self.model_dump()


class GlucoseResponse(BaseModel):
    predicted_glucose: float


class DiabetesRequest(BaseModel):
    """Request body for diabetes prediction. 20 features required."""
    F1: float
    F2: float
    F3: float
    F4: float
    F5: float
    F6: float
    F7: float
    F8: float
    F9: float
    F10: float
    F11: float
    F12: float
    F13: float
    F14: float
    F15: float
    F16: float
    F17: float
    F18: float
    F19: float
    F20: Optional[float] = Field(None, description="Can be null — will be imputed")

    def to_features_dict(self) -> dict:
        return self.model_dump()


class DiabetesResponse(BaseModel):
    diabetes_risk: bool
    confidence: float


class HealthResponse(BaseModel):
    status: str
    version: str
    models_loaded: bool


class ErrorResponse(BaseModel):
    detail: str
