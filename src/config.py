"""Application configuration — all settings via environment variables."""

import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

# Data file paths
GLUCOSE_TRAIN_DATA = DATA_DIR / "Blood Glucose Level Prediction Model-Data.csv"
GLUCOSE_TEST_DATA = DATA_DIR / "Blood Glucose Level Prediction Model-Test.csv"
DIABETES_TRAIN_DATA = DATA_DIR / "Diabetes Prediction-Data.csv"
DIABETES_TEST_DATA = DATA_DIR / "Diabetes Prediction-Test.csv"

# Model file paths
GLUCOSE_MODEL_PATH = MODELS_DIR / "glucose_model.joblib"
DIABETES_MODEL_PATH = MODELS_DIR / "diabetes_model.joblib"
GLUCOSE_PREPROCESSOR_PATH = MODELS_DIR / "glucose_preprocessor.joblib"
DIABETES_PREPROCESSOR_PATH = MODELS_DIR / "diabetes_preprocessor.joblib"

# Model parameters
GLUCOSE_FEATURES_COUNT = 34
DIABETES_FEATURES_COUNT = 20
GLUCOSE_CATEGORICAL_COLS = ["F4", "F9"]
RANDOM_STATE = 42
TEST_SIZE = 0.2

# API settings
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))
API_WORKERS = int(os.getenv("API_WORKERS", "1"))

# Stripe settings
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
STRIPE_PRICE_ID_MONTHLY = os.getenv("STRIPE_PRICE_ID_MONTHLY", "")
STRIPE_PRICE_ID_ANNUAL = os.getenv("STRIPE_PRICE_ID_ANNUAL", "")

# Rate limiting (free tier)
FREE_TIER_DAILY_LIMIT = int(os.getenv("FREE_TIER_DAILY_LIMIT", "5"))

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
