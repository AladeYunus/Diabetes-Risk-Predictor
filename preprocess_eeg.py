#!/usr/bin/env python3
# preprocess_eeg.py (optional MNE-based hygiene)
# Usage: python preprocess_eeg.py --data_path WLDataCW.mat --out_path cleaned.npy

import argparse
import numpy as np
from scipy.io import loadmat

try:
    import mne
except Exception:
    mne = None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--data_path', required=True)
    ap.add_argument('--out_path', required=True)
    ap.add_argument('--sfreq', type=float, default=256.0, help='Sampling rate (Hz), if known')
    args = ap.parse_args()

    if mne is None:
        raise SystemExit('mne not installed. `pip install mne` or remove this step.')

    mat = loadmat(args.data_path)
    X = mat['data']
    y = mat['label'].squeeze()

    # To (N, 62, 512)
    if X.shape == (62, 512, y.shape[0]):
        X = np.transpose(X, (2,0,1))
    elif X.shape == (512, 62, y.shape[0]):
        X = np.transpose(X, (2,1,0))
    elif X.shape == (y.shape[0], 62, 512):
        pass
    else:
        raise SystemExit(f'Unexpected shape: {X.shape}')

    N, C, T = X.shape
    info = mne.create_info(ch_names=[f'EEG{i+1}' for i in range(C)], sfreq=args.sfreq, ch_types='eeg')
    out = np.empty_like(X, dtype=np.float32)

    for i in range(N):
        raw = mne.io.RawArray(X[i], info, verbose='ERROR')
        raw.set_eeg_reference('average', verbose='ERROR')
        raw.notch_filter(50.0, verbose='ERROR')
        raw.filter(1.0, 45.0, verbose='ERROR')
        out[i] = raw.get_data().astype(np.float32)

    np.save(args.out_path, out)
    print('Saved cleaned EEG to', args.out_path)

if __name__ == '__main__':
    main()
