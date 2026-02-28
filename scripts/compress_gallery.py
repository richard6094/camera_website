"""
Batch-compress gallery images to WebP format.
- Resizes to max 1600px on the longest side (preserves aspect ratio)
- Converts to WebP with quality=82 (good balance of quality vs size)
- Preserves original directory structure under output folder
- Skips files that already exist in output (re-runnable)
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Fix encoding for Chinese characters in Windows console
sys.stdout.reconfigure(encoding='utf-8')

SRC_DIR = Path(r"E:\Mandler\images\全部照片筛选")
OUT_DIR = Path(r"E:\Mandler\images\gallery_webp")
MAX_LONG_SIDE = 1600
WEBP_QUALITY = 82


def compress_image(src: Path, dst: Path):
    """Resize & convert a single image to WebP."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as img:
        # Convert RGBA/P to RGB for WebP compatibility
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Resize if larger than MAX_LONG_SIDE
        w, h = img.size
        long_side = max(w, h)
        if long_side > MAX_LONG_SIDE:
            ratio = MAX_LONG_SIDE / long_side
            new_w = int(w * ratio)
            new_h = int(h * ratio)
            img = img.resize((new_w, new_h), Image.LANCZOS)

        img.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)


def main():
    if not SRC_DIR.exists():
        print(f"Source directory not found: {SRC_DIR}")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Collect all image files
    extensions = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp"}
    files = [
        f for f in SRC_DIR.rglob("*")
        if f.is_file() and f.suffix.lower() in extensions
    ]

    total = len(files)
    print(f"Found {total} images to process")
    print(f"Source: {SRC_DIR}")
    print(f"Output: {OUT_DIR}")
    print(f"Max size: {MAX_LONG_SIDE}px | WebP quality: {WEBP_QUALITY}")
    print("-" * 60)

    processed = 0
    skipped = 0
    total_src_size = 0
    total_dst_size = 0

    for i, src_file in enumerate(sorted(files), 1):
        rel = src_file.relative_to(SRC_DIR)
        dst_file = OUT_DIR / rel.with_suffix(".webp")

        if dst_file.exists():
            skipped += 1
            total_dst_size += dst_file.stat().st_size
            total_src_size += src_file.stat().st_size
            print(f"[{i}/{total}] SKIP (exists): {rel}")
            continue

        try:
            src_size = src_file.stat().st_size
            compress_image(src_file, dst_file)
            dst_size = dst_file.stat().st_size

            total_src_size += src_size
            total_dst_size += dst_size
            processed += 1

            ratio = dst_size / src_size * 100
            print(
                f"[{i}/{total}] {rel.with_suffix('.webp')}"
                f"  {src_size/1024:.0f}KB → {dst_size/1024:.0f}KB ({ratio:.0f}%)"
            )
        except Exception as e:
            print(f"[{i}/{total}] ERROR: {rel} — {e}")

    print("-" * 60)
    print(f"Done! Processed: {processed}, Skipped: {skipped}, Total: {total}")
    if total_src_size > 0:
        print(
            f"Total: {total_src_size/1024/1024:.1f} MB → {total_dst_size/1024/1024:.1f} MB"
            f" (saved {(1 - total_dst_size/total_src_size)*100:.0f}%)"
        )


if __name__ == "__main__":
    main()
