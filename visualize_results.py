# -----------------------------
# visualize_results.py
# -----------------------------
# Usage:
#   python visualize_results.py --metrics_path ./outputs/metrics.json --output_dir ./outputs

import argparse
import json
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


def main():
    parser = argparse.ArgumentParser(description="Visualize CNN vs Logistic Regression metrics")
    parser.add_argument("--metrics_path", type=str, default="./outputs/metrics.json")
    parser.add_argument("--output_dir", type=str, default="./outputs")
    args = parser.parse_args()

    metrics_path = Path(args.metrics_path)
    outdir = Path(args.output_dir)
    outdir.mkdir(parents=True, exist_ok=True)

    with metrics_path.open("r") as f:
        all_metrics = json.load(f)

    # Collect test metrics for available models
    rows = []
    for model_name in ("logreg", "cnn"):
        if model_name in all_metrics and "test" in all_metrics[model_name]:
            m = all_metrics[model_name]["test"]
            rows.append({
                "model": model_name,
                "accuracy": m.get("accuracy", np.nan),
                "precision": m.get("precision", np.nan),
                "recall": m.get("recall", np.nan),
                "f1": m.get("f1", np.nan),
                "roc_auc": m.get("roc_auc", np.nan),
            })

    if not rows:
        raise SystemExit("No metrics found in metrics.json. Run workload_pipeline.py first.")

    df = pd.DataFrame(rows).set_index("model")
    df.to_csv(outdir / "comparison_table.csv")
    print("Saved:", outdir / "comparison_table.csv")

    # Bar chart for core metrics
    metrics_to_plot = ["accuracy", "precision", "recall", "f1", "roc_auc"]
    present = [m for m in metrics_to_plot if m in df.columns]
    values = df[present].to_numpy()

    x = np.arange(len(present))
    width = 0.35

    fig, ax = plt.subplots(figsize=(8, 5))
    for i, model in enumerate(df.index):
        ax.bar(x + (i - (len(df.index)-1)/2)*width, values[i], width=width, label=model)

    ax.set_xticks(x)
    ax.set_xticklabels([m.replace("_", " ").upper() for m in present])
    ax.set_ylim(0, 1.0)
    ax.set_ylabel("Score (0-1)")
    ax.set_title("CNN vs Logistic Regression — Test Metrics")
    ax.legend()
    fig.tight_layout()
    fig.savefig(outdir / "compare_metrics.png", dpi=150)
    print("Saved:", outdir / "compare_metrics.png")


if __name__ == "__main__":
    main()
