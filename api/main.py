"""FastAPI application — Diabetes Risk Predictor API.

Endpoints:
    GET  /health              — Health check
    POST /predict/glucose     — Predict blood glucose level
    POST /predict/diabetes    — Predict diabetes risk
    POST /stripe/webhook      — Stripe payment webhook
"""

import logging
import os
import sys
from collections import defaultdict
from datetime import date

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.schemas import (
    DiabetesRequest,
    DiabetesResponse,
    ErrorResponse,
    GlucoseRequest,
    GlucoseResponse,
    HealthResponse,
)
from src.config import ALLOWED_ORIGINS, FREE_TIER_DAILY_LIMIT
from src.predict import predict_diabetes, predict_glucose

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Diabetes Risk Predictor",
    description="Predicts blood glucose levels and diabetes risk using ML models.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory rate limiter (per-IP, per-day)
_usage: dict = defaultdict(lambda: {"date": None, "count": 0})


def _check_rate_limit(client_ip: str, api_key: str | None = None):
    """Enforce free-tier daily limit. API key holders bypass."""
    if api_key:
        return  # Pro users — no limit

    today = date.today().isoformat()
    entry = _usage[client_ip]
    if entry["date"] != today:
        entry["date"] = today
        entry["count"] = 0

    entry["count"] += 1
    if entry["count"] > FREE_TIER_DAILY_LIMIT:
        raise HTTPException(
            status_code=429,
            detail=f"Free tier limit reached ({FREE_TIER_DAILY_LIMIT} predictions/day). Upgrade to Pro for unlimited access.",
        )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    from src.config import GLUCOSE_MODEL_PATH, DIABETES_MODEL_PATH
    models_loaded = GLUCOSE_MODEL_PATH.exists() and DIABETES_MODEL_PATH.exists()
    return HealthResponse(status="healthy", version="1.0.0", models_loaded=models_loaded)


@app.post(
    "/predict/glucose",
    response_model=GlucoseResponse,
    responses={400: {"model": ErrorResponse}, 429: {"model": ErrorResponse}},
)
async def predict_glucose_endpoint(request: Request, body: GlucoseRequest):
    """Predict blood glucose level from 34 health features."""
    api_key = request.headers.get("X-API-Key")
    _check_rate_limit(request.client.host, api_key)

    try:
        result = predict_glucose(body.to_features_dict())
        return GlucoseResponse(**result)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="Models not trained yet. Run: python -m src.train")
    except Exception as e:
        logger.exception("Glucose prediction failed")
        raise HTTPException(status_code=500, detail="Prediction failed. Please try again.")


@app.post(
    "/predict/diabetes",
    response_model=DiabetesResponse,
    responses={400: {"model": ErrorResponse}, 429: {"model": ErrorResponse}},
)
async def predict_diabetes_endpoint(request: Request, body: DiabetesRequest):
    """Predict diabetes risk from 20 health features."""
    api_key = request.headers.get("X-API-Key")
    _check_rate_limit(request.client.host, api_key)

    try:
        result = predict_diabetes(body.to_features_dict())
        return DiabetesResponse(**result)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="Models not trained yet. Run: python -m src.train")
    except Exception as e:
        logger.exception("Diabetes prediction failed")
        raise HTTPException(status_code=500, detail="Prediction failed. Please try again.")
