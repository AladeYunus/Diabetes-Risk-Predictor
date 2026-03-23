# Diabetes Risk Predictor

ML-powered blood glucose and diabetes risk prediction API with a web frontend, built for the UK market.

## What It Does

Two machine learning models that predict health outcomes from clinical features:

1. **Blood Glucose Prediction** — Regression model predicting glucose levels from 34 features (R²=0.80, RMSE=92)
2. **Diabetes Risk Classification** — Binary classifier predicting diabetes risk from 20 features (Accuracy=91%, F1=0.91)

Both models are served via a FastAPI REST API with a clean web frontend, rate-limited free tier, and Pro subscription via Stripe.

## Tech Stack

- **ML**: Python 3.11+, scikit-learn, pandas, NumPy
- **API**: FastAPI, Pydantic, Uvicorn
- **Frontend**: Vanilla HTML/CSS/JS (no build step)
- **Payments**: Stripe (GBP)
- **Deployment**: Docker, GitHub Actions CI/CD
- **Testing**: pytest (28 tests, 84% coverage)

## Getting Started

### Prerequisites

- Python 3.11+
- pip

### Installation

```bash
git clone https://github.com/AladeYunus/Diabetes-Risk-Predictor.git
cd Diabetes-Risk-Predictor
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Environment Variables

```bash
cp .env.example .env
# Edit .env with your Stripe keys (optional for local dev)
```

### Train Models

```bash
python -m src.train
```

This trains all models and saves artifacts to `models/`.

### Run the API

```bash
uvicorn api.main:app --reload
```

API available at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

### Run the Frontend

Open `docs/index.html` in a browser, or serve it:

```bash
python -m http.server 3000 --directory docs
```

Live preview: [https://aladeyunus.github.io/Diabetes-Risk-Predictor/](https://aladeyunus.github.io/Diabetes-Risk-Predictor/)

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check — returns model status |
| `POST` | `/predict/glucose` | Predict blood glucose from 34 features |
| `POST` | `/predict/diabetes` | Predict diabetes risk from 20 features |

### Example: Diabetes Prediction

```bash
curl -X POST http://localhost:8000/predict/diabetes \
  -H "Content-Type: application/json" \
  -d '{"F1":-8.19,"F2":5154.64,"F3":727.84,"F4":7747.32,"F5":0,"F6":9693.21,"F7":-1.7,"F8":-690.99,"F9":3033.55,"F10":-60049.12,"F11":20.36,"F12":1.15,"F13":1.72,"F14":1,"F15":-7.86,"F16":-1.62,"F17":5.37,"F18":-5.94,"F19":-9.34,"F20":null}'
```

Response:
```json
{"diabetes_risk": true, "confidence": 0.92}
```

## Model Performance

| Model | Task | Key Metric | Score |
|-------|------|------------|-------|
| Gradient Boosting Regressor | Glucose Prediction | R² | 0.80 |
| Gradient Boosting Classifier | Diabetes Classification | F1 | 0.91 |
| Gradient Boosting Classifier | Diabetes Classification | Accuracy | 0.91 |

Cross-validated on training data with 5-fold CV.

## Testing

```bash
python -m pytest tests/ -v --cov=src --cov=api
```

28 tests covering preprocessing, model training, and API endpoints. 84% coverage.

## Deployment

### Docker

```bash
docker build -t diabetes-risk-predictor .
docker run -p 8000:8000 diabetes-risk-predictor
```

### Docker Compose

```bash
docker-compose up
```

### CI/CD

GitHub Actions runs on every PR and merge to main:
- Install dependencies
- Train models
- Run tests with coverage (70% minimum)
- Build Docker image

## Project Structure

```
├── api/                  # FastAPI application
│   ├── main.py           # API endpoints and middleware
│   └── schemas.py        # Pydantic request/response models
├── src/                  # Core ML modules
│   ├── config.py         # All configuration via env vars
│   ├── preprocessing.py  # Data loading, encoding, scaling
│   ├── models.py         # Model training and evaluation
│   ├── predict.py        # Inference interface
│   └── train.py          # Training script
├── data/                 # CSV datasets
├── models/               # Saved model artifacts (.joblib)
├── tests/                # Test suite (28 tests)
├── docs/                 # Web UI (GitHub Pages)
│   ├── index.html        # Main app (predictor + pricing)
│   ├── privacy.html      # UK GDPR privacy policy
│   └── terms.html        # Terms of service
├── .github/workflows/    # CI/CD pipeline
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── .env.example
```

## Health Disclaimer

This tool is **not a medical device**. It is not regulated by the MHRA and is not endorsed by the NHS. Predictions are statistical estimates and should not be used for clinical decisions. Always consult a qualified healthcare professional.

## UK Compliance

- UK GDPR compliant — prediction data processed in memory only, not stored
- Privacy Policy at `/privacy.html`
- Terms of Service at `/terms.html`
- Cookie consent banner (essential cookies only)
- Stripe Tax for UK VAT
- 14-day refund policy per Consumer Contracts Regulations 2013

## Licence

MIT — see [LICENSE](LICENSE).

## Author

**Yunus Alade**
- [GitHub](https://github.com/AladeYunus)
