# EEG Mental Workload Classifier — Model Card

**Intended use**: Educational and research comparison of classical ML (LR) vs. deep learning (CNN) for binary mental-workload classification from EEG.

**Data**: WLDataCW.mat (Pei et al., 2021). Binary labels (0=low, 1=medium). See README/usage for link and preprocessing.

**Preprocessing**: Optional MNE pipeline (average reference, 50 Hz notch, 1–45 Hz band-pass). Default per-sample z-score.

**Models**: Logistic Regression (scaled, class-weighted), CNN (BN/Dropout, EarlyStopping). Threshold default 0.5.

**Metrics**: Accuracy, Precision, Recall, F1, ROC-AUC; confusion matrices and ROC curves reported on held-out test.

**Limitations**: Possible subject leakage if IDs not available; binary labeling only; EEG is sensitive to artifacts.

**Ethics**: EEG may encode sensitive traits; use with consent and privacy safeguards. Not for clinical decision-making.

**Reproducibility**: Seeds fixed; versions logged; Dockerfile provided.
