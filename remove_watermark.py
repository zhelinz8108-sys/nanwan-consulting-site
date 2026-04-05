"""
一键去水印脚本 for ProPainter
用法: python remove_watermark.py
"""
import os
import sys
import numpy as np

VIDEO_FILE = "video.mp4"
PROPAINTER_DIR = os.path.dirname(os.path.abspath(__file__))
FRAMES_DIR = os.path.join(PROPAINTER_DIR, "inputs", "watermark", "frames")
MASKS_DIR = os.path.join(PROPAINTER_DIR, "inputs", "watermark", "masks")
OUTPUT_DIR = os.path.join(PROPAINTER_DIR, "results")
VIDEO_PATH = os.path.join(PROPAINTER_DIR, VIDEO_FILE)


def cv2_imread(path):
    """OpenCV 中文路径兼容读取"""
    import cv2
    data = np.fromfile(path, dtype=np.uint8)
    return cv2.imdecode(data, cv2.IMREAD_COLOR)


def cv2_imwrite(path, img):
    """OpenCV 中文路径兼容写入"""
    import cv2
    ext = os.path.splitext(path)[1]
    ok, buf = cv2.imencode(ext, img)
    if ok:
        buf.tofile(path)


def step1_extract_frames():
    import av
    print("=" * 50)
    print("Step 1: Extracting frames...")
    os.makedirs(FRAMES_DIR, exist_ok=True)

    container = av.open(VIDEO_PATH)
    stream = container.streams.video[0]
    w, h = stream.width, stream.height
    fps = float(stream.average_rate)
    total = stream.frames
    print(f"  Video: {w}x{h}, {fps:.1f}fps, {total} frames, {total/fps:.1f}s")

    count = 0
    for frame in container.decode(video=0):
        img = frame.to_ndarray(format='bgr24')
        cv2_imwrite(os.path.join(FRAMES_DIR, f"{count:05d}.jpg"), img)
        count += 1
        if count % 100 == 0:
            print(f"  Extracted {count}/{total}...")

    container.close()
    print(f"  Done! {count} frames")
    return w, h, fps, count


def step2_create_mask(w, h):
    import cv2
    print("=" * 50)
    print("Step 2: Creating watermark mask...")
    os.makedirs(MASKS_DIR, exist_ok=True)

    first_frame = cv2_imread(os.path.join(FRAMES_DIR, "00000.jpg"))
    if first_frame is None:
        print("ERROR: Cannot read first frame")
        sys.exit(1)

    mask = np.zeros((h, w), dtype=np.uint8)

    watermarks = [
        # 左列 - logo + OVERSEAS STUDENT SERVICE (更靠左更大)
        (50, 200, 420, 400),   # 左上
        (50, 440, 420, 640),   # 左中
        (50, 680, 420, 880),   # 左下
        # 右列 - 美笑房产 USWOO
        (460, 210, 760, 380),  # 右上
        (460, 450, 760, 620),  # 右中
        (460, 690, 760, 860),  # 右下
    ]

    pad = 15
    for (x1, y1, x2, y2) in watermarks:
        x1, y1 = max(0, x1 - pad), max(0, y1 - pad)
        x2, y2 = min(w, x2 + pad), min(h, y2 + pad)
        mask[y1:y2, x1:x2] = 255

    preview = first_frame.copy()
    overlay = preview.copy()
    overlay[mask > 0] = [0, 0, 255]
    preview = cv2.addWeighted(preview, 0.6, overlay, 0.4, 0)
    cv2_imwrite(os.path.join(PROPAINTER_DIR, "mask_preview.jpg"), preview)

    frame_files = sorted([f for f in os.listdir(FRAMES_DIR) if f.endswith('.jpg')])
    for fname in frame_files:
        cv2_imwrite(os.path.join(MASKS_DIR, fname.replace(".jpg", ".png")), mask)

    print(f"  Done! mask_preview.jpg created")
    print(f"  Open mask_preview.jpg to check red areas cover all watermarks")
    return len(frame_files)


def step3_run(total_frames):
    import subprocess
    print("=" * 50)
    print(f"Step 3: AI watermark removal ({total_frames} frames)...")

    cmd = [
        sys.executable,
        os.path.join(PROPAINTER_DIR, "inference_propainter.py"),
        "--video", os.path.join("inputs", "watermark", "frames"),
        "--mask", os.path.join("inputs", "watermark", "masks"),
        "--output", OUTPUT_DIR,
        "--resize_ratio", "0.5",
        "--ref_stride", "10",
        "--neighbor_length", "10",
        "--subvideo_length", "80",
    ]

    print(f"  CMD: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=PROPAINTER_DIR)

    if result.returncode == 0:
        print("\n  Done!")
    else:
        print(f"\n  Error code: {result.returncode}")


def main():
    print("=" * 50)
    print("  Video Watermark Remover (ProPainter)")
    print("=" * 50)

    if not os.path.exists(VIDEO_PATH):
        print(f"ERROR: {VIDEO_PATH} not found")
        sys.exit(1)

    for f in ["ProPainter.pth", "recurrent_flow_completion.pth", "raft-things.pth"]:
        if not os.path.exists(os.path.join(PROPAINTER_DIR, "weights", f)):
            print(f"ERROR: missing weights/{f}")
            sys.exit(1)
    print("Model check OK\n")

    w, h, fps, count = step1_extract_frames()
    total = step2_create_mask(w, h)

    print("\nOpen mask_preview.jpg to verify. Press Enter to start AI removal (Ctrl+C to cancel)...")
    input()

    step3_run(total)

    print("\n" + "=" * 50)
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 50)


if __name__ == "__main__":
    main()
