"""
一键去水印脚本 for ProPainter
用法: python remove_watermark.py
"""
import os
import cv2
import numpy as np
import subprocess
import sys

# ===== 配置 =====
VIDEO_FILE = "#1801.MP4"
PROPAINTER_DIR = os.path.dirname(os.path.abspath(__file__))
FRAMES_DIR = os.path.join(PROPAINTER_DIR, "inputs", "watermark", "frames")
MASKS_DIR = os.path.join(PROPAINTER_DIR, "inputs", "watermark", "masks")
OUTPUT_DIR = os.path.join(PROPAINTER_DIR, "results")
VIDEO_PATH = os.path.join(PROPAINTER_DIR, VIDEO_FILE)

def step1_extract_frames():
    """第1步：从视频提取所有帧"""
    print("=" * 50)
    print("第1步：提取视频帧...")
    os.makedirs(FRAMES_DIR, exist_ok=True)

    cap = cv2.VideoCapture(VIDEO_PATH)
    if not cap.isOpened():
        print(f"错误：无法打开视频 {VIDEO_PATH}")
        sys.exit(1)

    fps = cap.get(cv2.CAP_PROP_FPS)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"  视频信息: {w}x{h}, {fps:.1f}fps, {total}帧, {total/fps:.1f}秒")

    count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        cv2.imwrite(os.path.join(FRAMES_DIR, f"{count:05d}.jpg"), frame)
        count += 1
        if count % 30 == 0:
            print(f"  已提取 {count}/{total} 帧...")

    cap.release()
    print(f"  完成！共提取 {count} 帧")
    return w, h, fps, count

def step2_create_mask():
    """第2步：自动检测水印位置并生成 mask"""
    print("=" * 50)
    print("第2步：生成水印遮罩 (mask)...")
    os.makedirs(MASKS_DIR, exist_ok=True)

    # 读取第一帧作为参考
    first_frame_path = os.path.join(FRAMES_DIR, "00000.jpg")
    frame = cv2.imread(first_frame_path)
    if frame is None:
        print("错误：无法读取第一帧")
        sys.exit(1)

    h, w = frame.shape[:2]

    # 创建黑色 mask（黑色=保留，白色=去除）
    mask = np.zeros((h, w), dtype=np.uint8)

    # 水印位置（根据截图中6个水印的大概位置）
    # 视频是竖屏的，水印分布在画面中间区域
    # 这里用相对坐标，适配不同分辨率

    watermark_regions = [
        # (x比例, y比例, 宽比例, 高比例) - 相对于视频尺寸
        # 左列 - OVERSEAS STUDENT SERVICE logo + 文字
        (0.12, 0.18, 0.28, 0.12),  # 左上水印
        (0.12, 0.38, 0.28, 0.12),  # 左中水印
        (0.12, 0.58, 0.28, 0.12),  # 左下水印
        # 右列 - 美笑房产 USWOO
        (0.55, 0.18, 0.28, 0.10),  # 右上水印
        (0.55, 0.38, 0.28, 0.10),  # 右中水印
        (0.55, 0.58, 0.28, 0.10),  # 右下水印
    ]

    for (rx, ry, rw, rh) in watermark_regions:
        x1 = int(rx * w)
        y1 = int(ry * h)
        x2 = int((rx + rw) * w)
        y2 = int((ry + rh) * h)
        # 稍微扩大区域确保覆盖
        pad_x = int(0.02 * w)
        pad_y = int(0.02 * h)
        x1 = max(0, x1 - pad_x)
        y1 = max(0, y1 - pad_y)
        x2 = min(w, x2 + pad_x)
        y2 = min(h, y2 + pad_y)
        mask[y1:y2, x1:x2] = 255

    # 保存 mask 预览（带框线的原图，方便检查）
    preview = frame.copy()
    mask_color = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
    mask_color[mask > 0] = [0, 0, 255]  # 红色标注
    preview = cv2.addWeighted(preview, 0.7, mask_color, 0.3, 0)
    cv2.imwrite(os.path.join(PROPAINTER_DIR, "mask_preview.jpg"), preview)
    print(f"  mask 预览已保存到 mask_preview.jpg，请检查红色区域是否覆盖了所有水印")

    # 为每一帧生成相同的 mask
    frame_files = sorted(os.listdir(FRAMES_DIR))
    for fname in frame_files:
        mask_path = os.path.join(MASKS_DIR, fname.replace(".jpg", ".png"))
        cv2.imwrite(mask_path, mask)

    print(f"  完成！共生成 {len(frame_files)} 个 mask 文件")
    return mask

def step3_run_propainter(total_frames):
    """第3步：运行 ProPainter 去水印"""
    print("=" * 50)
    print("第3步：运行 ProPainter AI 去水印...")
    print("  这一步需要一些时间，请耐心等待...")

    cmd = [
        sys.executable,
        os.path.join(PROPAINTER_DIR, "inference_propainter.py"),
        "--video", os.path.join("inputs", "watermark", "frames"),
        "--mask", os.path.join("inputs", "watermark", "masks"),
        "--output", OUTPUT_DIR,
        "--resize_ratio", "1.0",
        "--height", "-1",
        "--width", "-1",
        "--ref_stride", "10",
        "--neighbor_length", "10",
        "--subvideo_length", "80",
        "--save_frames",
    ]

    # 如果帧数太多，降低分辨率加速
    if total_frames > 300:
        print(f"  视频较长({total_frames}帧)，使用0.5倍分辨率加速处理...")
        cmd[cmd.index("1.0")] = "0.5"

    print(f"  执行命令: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=PROPAINTER_DIR)

    if result.returncode == 0:
        print("  ProPainter 处理完成！")
    else:
        print(f"  ProPainter 出错了，返回码: {result.returncode}")
        sys.exit(1)

def main():
    print("=" * 50)
    print("南湾去水印工具 v1.0 (基于 ProPainter)")
    print("=" * 50)

    if not os.path.exists(VIDEO_PATH):
        print(f"错误：找不到视频文件 {VIDEO_PATH}")
        print(f"请确保视频文件在: {PROPAINTER_DIR}")
        sys.exit(1)

    # 检查模型文件
    weights_dir = os.path.join(PROPAINTER_DIR, "weights")
    required = ["ProPainter.pth", "recurrent_flow_completion.pth", "raft-things.pth"]
    for f in required:
        if not os.path.exists(os.path.join(weights_dir, f)):
            print(f"错误：缺少模型文件 weights/{f}")
            sys.exit(1)
    print("模型文件检查通过 ✓")

    w, h, fps, total = step1_extract_frames()
    step2_create_mask()

    print("\n" + "=" * 50)
    print("请打开 mask_preview.jpg 检查红色区域是否覆盖了所有水印。")
    input("确认无误后按 Enter 继续运行 AI 去水印（或 Ctrl+C 取消）...")

    step3_run_propainter(total)

    print("\n" + "=" * 50)
    print("全部完成！输出文件在:")
    print(f"  {OUTPUT_DIR}")
    print("=" * 50)

if __name__ == "__main__":
    main()
