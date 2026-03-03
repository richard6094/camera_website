"""
Extract frames from green-screen aperture video, chroma-key, and save as WebP with alpha.

Input:  Green-screen video of lens aperture opening (1280x720, 144 frames, green BG)
Output: Individual WebP frames with transparent background in client/public/images/aperture-frames/

The video content area is ~720x720 (cols 280-999), with black bars on left/right.
Green screen HSV: H≈59, S≈250, V≈240.
"""

import cv2
import numpy as np
import os
import sys

# ── Config ──
VIDEO_PATH = r"C:\Users\49016\Downloads\lens_aperture_animation.mp4"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "client", "public", "images", "aperture-frames")
NUM_FRAMES = 36         # Number of frames to extract (evenly spaced)
OUTPUT_SIZE = 720        # Output frame size (square)
WEBP_QUALITY = 85        # WebP quality (with alpha)

# Green screen HSV range (OpenCV H: 0-180, S: 0-255, V: 0-255)
GREEN_LOWER = np.array([30, 60, 60])
GREEN_UPPER = np.array([90, 255, 255])

# Black threshold (for removing black bars)
BLACK_THRESHOLD = 15


def extract_and_process():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    cap = cv2.VideoCapture(VIDEO_PATH)
    if not cap.isOpened():
        print(f"Error: Cannot open video {VIDEO_PATH}")
        sys.exit(1)

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"Video: {width}x{height}, {total_frames} frames, {fps} fps, {total_frames/fps:.1f}s")
    print(f"Extracting {NUM_FRAMES} frames to {OUTPUT_DIR}")

    # Calculate frame indices to extract (evenly spaced)
    frame_indices = np.linspace(0, total_frames - 1, NUM_FRAMES, dtype=int)

    # Find content bounds from first frame
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    ret, first_frame = cap.read()
    if not ret:
        print("Error: Cannot read first frame")
        sys.exit(1)

    # Detect content area (non-black region)
    gray = cv2.cvtColor(first_frame, cv2.COLOR_BGR2GRAY)
    col_means = gray.mean(axis=0)
    row_means = gray.mean(axis=1)
    active_cols = np.where(col_means > BLACK_THRESHOLD)[0]
    active_rows = np.where(row_means > BLACK_THRESHOLD)[0]

    if len(active_cols) == 0 or len(active_rows) == 0:
        print("Error: Cannot detect content area")
        sys.exit(1)

    # Content crop region (with small margin)
    x1 = max(0, active_cols[0] - 2)
    x2 = min(width, active_cols[-1] + 3)
    y1 = max(0, active_rows[0] - 2)
    y2 = min(height, active_rows[-1] + 3)

    # Make it square (use the larger dimension)
    content_w = x2 - x1
    content_h = y2 - y1
    side = max(content_w, content_h)

    # Center the crop
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    x1 = max(0, cx - side // 2)
    x2 = min(width, x1 + side)
    y1 = max(0, cy - side // 2)
    y2 = min(height, y1 + side)

    print(f"Content area: ({x1},{y1}) to ({x2},{y2}) = {x2-x1}x{y2-y1}")

    processed = 0
    for i, frame_idx in enumerate(frame_indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            print(f"Warning: Cannot read frame {frame_idx}, skipping")
            continue

        # Crop to content area
        cropped = frame[y1:y2, x1:x2]

        # Resize to output size
        if cropped.shape[0] != OUTPUT_SIZE or cropped.shape[1] != OUTPUT_SIZE:
            cropped = cv2.resize(cropped, (OUTPUT_SIZE, OUTPUT_SIZE), interpolation=cv2.INTER_AREA)

        # ── Chroma key (outer edge only) ──
        # Only remove green screen around the lens body; keep all interior pixels
        # (black aperture blades, dark glass, etc.) fully opaque.
        hsv = cv2.cvtColor(cropped, cv2.COLOR_BGR2HSV)

        # Create green mask
        green_mask = cv2.inRange(hsv, GREEN_LOWER, GREEN_UPPER)

        # Also treat pure-black bars (from video letterboxing) as background,
        # but ONLY if they are connected to the image border (flood-fill approach).
        gray_cropped = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)
        black_mask = gray_cropped < BLACK_THRESHOLD

        # Combine green + border-connected black into a raw background mask
        raw_bg = (green_mask > 0) | black_mask

        # Flood-fill from all 4 edges to find only the OUTER background region.
        # This preserves black/dark pixels inside the lens body.
        h_c, w_c = raw_bg.shape
        flood_seed = np.zeros((h_c + 2, w_c + 2), dtype=np.uint8)
        flood_input = raw_bg.astype(np.uint8) * 255

        # Flood from every border pixel that is background
        for col in range(w_c):
            if flood_input[0, col] == 255:
                cv2.floodFill(flood_input, flood_seed, (col, 0), 128)
            if flood_input[h_c - 1, col] == 255:
                cv2.floodFill(flood_input, flood_seed, (col, h_c - 1), 128)
        for row in range(h_c):
            if flood_input[row, 0] == 255:
                cv2.floodFill(flood_input, flood_seed, (0, row), 128)
            if flood_input[row, w_c - 1] == 255:
                cv2.floodFill(flood_input, flood_seed, (w_c - 1, row), 128)

        # Only pixels marked 128 (flood-filled from border) are true background
        outer_bg_mask = flood_input == 128

        # Create alpha channel (255 = opaque, 0 = transparent)
        alpha = np.where(outer_bg_mask, 0, 255).astype(np.uint8)

        # Smooth alpha edges to reduce harsh edges
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        # Erode slightly to remove green fringe at the lens border
        alpha_eroded = cv2.erode(alpha, kernel, iterations=1)
        # Blur for soft edges
        alpha_smooth = cv2.GaussianBlur(alpha_eroded, (3, 3), 0.8)

        # Despill: remove green color cast from edge pixels
        # Find edge pixels (where alpha is partial)
        edge_mask = (alpha_smooth > 10) & (alpha_smooth < 245)
        if edge_mask.any():
            b, g, r = cropped[:,:,0], cropped[:,:,1], cropped[:,:,2]
            # Where green channel dominates, reduce it
            green_dominant = g.astype(float) > (np.maximum(r, b).astype(float) * 1.1)
            despill_mask = edge_mask & green_dominant
            if despill_mask.any():
                avg_rb = ((r[despill_mask].astype(float) + b[despill_mask].astype(float)) / 2)
                cropped[:,:,1][despill_mask] = np.clip(avg_rb, 0, 255).astype(np.uint8)

        # Create BGRA image
        bgra = cv2.cvtColor(cropped, cv2.COLOR_BGR2BGRA)
        bgra[:,:,3] = alpha_smooth

        # Save as WebP with alpha
        filename = f"aperture_{i:03d}.webp"
        filepath = os.path.join(OUTPUT_DIR, filename)
        cv2.imwrite(filepath, bgra, [cv2.IMWRITE_WEBP_QUALITY, WEBP_QUALITY])

        file_size = os.path.getsize(filepath)
        processed += 1
        print(f"  [{i+1}/{NUM_FRAMES}] Frame {frame_idx} → {filename} ({file_size/1024:.1f} KB, alpha pixels: {(alpha_smooth > 0).sum()})")

    cap.release()

    # Calculate total size
    total_size = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in os.listdir(OUTPUT_DIR) if f.endswith('.webp'))
    print(f"\nDone! {processed} frames extracted, total size: {total_size/1024:.0f} KB ({total_size/1024/1024:.1f} MB)")


if __name__ == "__main__":
    extract_and_process()
