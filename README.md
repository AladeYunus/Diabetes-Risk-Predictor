# 🧠 Deep Learning for EEG Mental Workload Classification

[![CI](https://github.com/AladeYunus/Deep-Learning-Model-For-Mental-Workload-Classification/actions/workflows/ci.yml/badge.svg)](https://github.com/<YOUR_USERNAME>/Deep-Learning-Model-For-Mental-Workload-Classification/actions)
[![Python](https://img.shields.io/badge/python-3.9%2B-blue.svg)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)](https://www.tensorflow.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

This repository provides a **reproducible research pipeline** for EEG-based mental workload classification.
It compares **Logistic Regression** and **Convolutional Neural Networks (CNN)** models with clear preprocessing,
metrics, and visualization utilities.

---

## 🚀 Features

✅ Modular deep learning & classical ML baselines  
✅ Reproducible config system (`--config config.yaml`)  
✅ Automatic visualizations & metrics storage  
✅ Optuna-based hyperparameter tuning  
✅ EEG preprocessing via MNE (optional)  
✅ Docker & CI/CD ready  
✅ Research-grade documentation & citation metadata  

---

## 🧩 File Overview

| File | Description |
|------|--------------|
| `workload_pipeline.py` | Main pipeline (load → preprocess → train → evaluate) |
| `visualize_results.py` | Plots accuracy/F1/ROC between models |
| `preprocess_eeg.py` | Optional EEG filtering + referencing (MNE) |
| `tune.py` | Optuna hyperparameter tuning |
| `predict.py` | Inference script for trained models |
| `config.yaml` | Default experiment settings |
| `Makefile` | Shortcuts for training, tuning, visualization |
| `tests/test_loader.py` | CI tests for data and functions |

---

## ⚙️ Quickstart

```bash
# Create environment and install deps
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Train both models (LR + CNN)
python workload_pipeline.py --config config.yaml

# Visualize results
python visualize_results.py --metrics_path ./outputs/metrics.json

# Tune hyperparameters
make tune-lr
make tune-cnn

# Optional preprocessing
python preprocess_eeg.py --data_path WLDataCW.mat --out_path cleaned.npy
```

---

## 📊 Outputs

Each run creates an `outputs/` directory containing:
- `metrics.json` (accuracy, F1, ROC-AUC)
- Model weights (`.keras`, `.pkl`)
- Learning curves (`cnn_loss.png`, `cnn_accuracy.png`)
- ROC curves for both models

---

## 🔬 Future Work

- Implement **EEGNet** and **LSTM** architectures  
- Add **subject-wise cross-validation** for better generalization  
- Integrate **explainability** tools (Grad-CAM, permutation importance)  
- Extend to **multi-class** workload levels  
- Publish results in open EEG benchmarks  

---

## 🧾 Citation

If you use this project, please cite:

```
Yunus, A. O. (2025). Deep Learning Model for EEG Mental Workload Classification. GitHub Repository.
https://github.com/AladeYunus/Deep-Learning-Model-For-Mental-Workload-Classification
```

---

## 🧠 License & Ethics

Licensed under the **MIT License**.  
EEG data can contain sensitive information — ensure proper consent and anonymization.
Not for clinical or diagnostic use.

---
