import numpy as np
from workload_pipeline import normalize_eeg, to_cnn_input, prepare_lr_features

def test_shapes():
    N, C, T = 10, 62, 512
    X = np.random.randn(N, C, T).astype(np.float32)
    Xz = normalize_eeg(X, 'zscore')
    assert Xz.shape == (N, C, T)
    Xc = to_cnn_input(Xz)
    assert Xc.shape == (N, T, C, 1)
    Xf = prepare_lr_features(Xz)
    assert Xf.shape == (N, C*T)
