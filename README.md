# DiabetesPredict UK

Free, browser-based diabetes risk assessment powered by machine learning. Enter 8 health metrics from your latest GP check-up and get an instant risk score — no data leaves your device.

**[Try it live](https://aladeyunus.github.io/Diabetes-Risk-Predictor/)**

## How It Works

The app runs a logistic regression model entirely in JavaScript. Your health data is never sent to any server.

1. Enter 8 health metrics (glucose, BMI, blood pressure, age, etc.)
2. The model scales your inputs and computes a risk probability
3. You get an instant risk score with a factor-by-factor breakdown

## Tech Stack

- **Frontend:** Static HTML/CSS/JS (GitHub Pages)
- **Model:** Logistic regression trained on the [Pima Indians Diabetes Dataset](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database) (768 samples, 77% CV accuracy)
- **Training:** Python 3 + scikit-learn (coefficients exported to JSON)

## Project Structure

```
docs/              GitHub Pages site
  index.html       Main app — prediction form + client-side ML
  model.json       Exported model coefficients + scaler params
  privacy.html     UK GDPR privacy policy
  terms.html       Terms of service
scripts/
  train_pima.py    Model training script (reproduces model.json)
data/
  pima.csv         Pima Indians Diabetes Dataset (768 rows)
```

## Reproducing the Model

```bash
python -m venv .venv
source .venv/bin/activate
pip install numpy scikit-learn
python scripts/train_pima.py
```

This regenerates `docs/model.json` with fresh coefficients.

## Model Limitations

- Trained on female Pima Indian participants aged 21+ — accuracy may vary for other demographics
- ~77% cross-validated accuracy (wrong roughly 1 in 4 times)
- **Not a medical device** — for educational purposes only
- Not endorsed by the NHS or any medical body

## Deployment

The `docs/` folder is served by GitHub Pages. To deploy:

1. Push to `main` branch
2. In repo Settings > Pages, set source to `main` branch, `/docs` folder
3. Site goes live at `https://aladeyunus.github.io/Diabetes-Risk-Predictor/`

## UK Compliance

- UK GDPR: No personal data collected or stored (client-side only)
- Cookie consent banner included (essential cookies only)
- Privacy policy and terms of service pages included
- Health disclaimer prominently displayed
- UK English throughout

## Future Roadmap

See [TODO.md](TODO.md) for planned features including API deployment, Stripe payments, and user accounts.

## Health Disclaimer

This tool is **not a medical device**. It is not regulated by the MHRA and is not endorsed by the NHS. Predictions are statistical estimates and should not be used for clinical decisions. Always consult a qualified healthcare professional.

## Licence

MIT

## Author

**Yunus Alade** — [GitHub](https://github.com/AladeYunus)
