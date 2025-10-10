PY=python
OUT=outputs
DATA=WLDataCW.mat

.PHONY: env both logreg cnn viz tune-lr tune-cnn clean

env:
	python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt

both:
	$(PY) workload_pipeline.py --data_path $(DATA) --model both --norm zscore --epochs 30 --output_dir $(OUT)

logreg:
	$(PY) workload_pipeline.py --data_path $(DATA) --model logreg --output_dir $(OUT)

cnn:
	$(PY) workload_pipeline.py --data_path $(DATA) --model cnn --norm zscore --epochs 50 --output_dir $(OUT)

viz:
	$(PY) visualize_results.py --metrics_path $(OUT)/metrics.json --output_dir $(OUT)

tune-lr:
	$(PY) tune.py --data_path $(DATA) --model logreg --trials 30 --output_dir $(OUT)

tune-cnn:
	$(PY) tune.py --data_path $(DATA) --model cnn --trials 25 --epochs 20 --output_dir $(OUT)

clean:
	rm -rf $(OUT) **/__pycache__ .pytest_cache .venv
