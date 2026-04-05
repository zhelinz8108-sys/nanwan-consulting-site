"""
一键去水印脚本 for ProPainter
用法: python remove_watermark.py
"""
import os
import sys
import numpy as np

# ===== 配置 =====
VIDEO_FILE = "video.mp4"
PROPAINTER_DIR = os.path.dirname(os.path.abspath(__file__))
FRAMES_DIR = os.path.join(PROPAINTER_DIR, "inputs", "watermark", "frames")
MASKS_DIR = os.path.join(PROPAINTER_DIR, "inputs", "watermark", "masks")
OUTPUT_DIR = os.path.join(PROPAINTER_DIR, "results")
VIDEO_PATH = os.path.join(PROPAINTER_DIR, VIDEO_FILE)


def step1_extract_frames():
    """提取视频帧（用 av 库）"""
    import av
    import cv2
    print("=" * 50)
    print("第1步：提取视频帧...")
    os.makedirs(FRAMES_DIR, exist_ok=True)

    container = av.open(VIDEO_PATH)
    stream = container.streams.video[0]
    w = stream.width
    h = stream.height
    fps = float(stream.average_rate)
    total = stream.frames
    print(f"  视频: {w}x{h}, {fps:.1f}fps, {total}帧, {total/fps:.1f}秒")

    count = 0
    for frame in container.decode(video=0):
        img = frame.to_ndarray(format='bgr24')
        cv2.imwrite(os.path.join(FRAMES_DIR, f"{count:05d}.jpg"), img)
        count += 1
        if count % 100 == 0:
            print(f"  已提取 {count}/{total} 帧...")

    container.close()
    print(f"  完成！共 {count} 帧")
    return w, h, fps, count


def step2_create_mask(w, h):
    """生成水印遮罩"""
    import cv2
    print("=" * 50)
    print("第2步：生成水印遮罩...")
    os.makedirs(MASKS_DIR, exist_ok=True)

    # 读取第一帧
    first_frame = cv2.imread(os.path.join(FRAMES_DIR, "00000.jpg"))
    mask = np.zeros((h, w), dtype=np.uint8)

    # 视频 960x1706 竖屏，水印分布：
    # 左列3个: OVERSEAS STUDENT SERVICE (logo + 文字)
    # 右列3个: 美笑房产 USWOO (红色块)
    watermarks = [
        # (x1, y1, x2, y2) 像素坐标 for 960x1706
        # 左上 - logo + OVERSEAS STUDENT SERVICE
        (130, 240, 380, 360),
        # 左中
        (130, 480, 380, 600),
        # 左下
        (130, 720, 380, 840),
        # 右上 - 美笑房产 USWOO
        (500, 250, 720, 350),
        # 右中
        (500, 490, 720, 590),
        # 右下
        (500, 730, 720, 830),
    ]

    pad = 15  # 额外扩展像素
    for (x1, y1, x2, y2) in watermarks:
        x1 = max(0, x1 - pad)
        y1 = max(0, y1 - pad)
        x2 = min(w, x2 + pad)
        y2 = min(h, y2 + pad)
        mask[y1:y2, x1:x2] = 255

    # 保存预览
    preview = first_frame.copy()
    overlay = preview.copy()
    overlay[mask > 0] = [0, 0, 255]
    preview = cv2.addWeighted(preview, 0.6, overlay, 0.4, 0)
    cv2.imwrite(os.path.join(PROPAINTER_DIR, "mask_preview.jpg"), preview)

    # 为每帧生成 mask
    frame_files = sorted([f for f in os.listdir(FRAMES_DIR) if f.endswith('.jpg')])
    for fname in frame_files:
        cv2.imwrite(os.path.join(MASKS_DIR, fname.replace(".jpg", ".png")), mask)

    print(f"  完成！mask_preview.jpg 已生成")
    print(f"  请打开 mask_preview.jpg 检查红色区域是否覆盖水印")
    return len(frame_files)


def step3_run(total_frames):
    """运行 ProPainter"""
    import subprocess
    print("=" * 50)
    print("第3步：AI 去水印处理中...")
    print(f"  共 {total_frames} 帧，请耐心等待...")

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

    print(f"  命令: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=PROPAINTER_DIR)

    if result.returncode == 0:
        print("\n  处理完成！")
    else:
        print(f"\n  出错，返回码: {result.returncode}")


def main():
    print("=" * 50)
    print("  视频去水印工具 (ProPainter)")
    print("=" * 50)

    if not os.path.exists(VIDEO_PATH):
        print(f"错误：找不到 {VIDEO_PATH}")
        sys.exit(1)

    # 检查模型
    for f in ["ProPainter.pth", "recurrent_flow_completion.pth", "raft-things.pth"]:
        if not os.path.exists(os.path.join(PROPAINTER_DIR, "weights", f)):
            print(f"错误：缺少 weights/{f}")
            sys.exit(1)
    print("模型检查通过 ✓\n")

    w, h, fps, count = step1_extract_frames()
    total = step2_create_mask(w, h)

    print("\n打开 mask_preview.jpg 看看红色区域对不对。")
    input("没问题按 Enter 开始去水印（Ctrl+C 取消）...")

    step3_run(total)

    print("\n" + "=" * 50)
    print(f"输出在: {OUTPUT_DIR}")
    print("=" * 50)


if __name__ == "__main__":
    main()
