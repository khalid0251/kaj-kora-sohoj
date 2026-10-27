import os
import sys
import io
import time
import base64
import uuid
import requests
import numpy as np
from flask import Flask, render_template, request, jsonify, send_from_directory
from PIL import Image, ImageEnhance
import cv2
import onnxruntime as ort

# Windows কনসোলে UTF-8 আউটপুট নিশ্চিত করা
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# .env কনফিগারেশন স্বয়ংক্রিয়ভাবে লোড করা (Dependency-free)
def load_env_file():
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    if os.path.exists(env_path):
        try:
            with open(env_path, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        k, v = line.split('=', 1)
                        k, v = k.strip(), v.strip().strip('"').strip("'")
                        if k and k not in os.environ:
                            os.environ[k] = v
        except Exception as e:
            print(f"Warning reading .env file: {e}")

load_env_file()

# কাজ করা সহজ (Kaj Kora Sohoj) - Flask Application
app = Flask(__name__)

# ডিরেক্টরি সেটআপ
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'uploads', 'processed')
RECENT_PHOTOS_FOLDER = os.path.join(app.root_path, 'static', 'recent_photos')
OUTFIT_FOLDER = os.path.join(app.root_path, 'static', 'outfits')
MODEL_FOLDER = os.path.join(app.root_path, 'models')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RECENT_PHOTOS_FOLDER, exist_ok=True)
os.makedirs(OUTFIT_FOLDER, exist_ok=True)
os.makedirs(MODEL_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RECENT_PHOTOS_FOLDER'] = RECENT_PHOTOS_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024  # ২০ মেগাবাইট পর্যন্ত আপলোড

def init_recent_photos_folder():
    """যদি recent_photos ফোল্ডার খালি থাকে, তবে পূর্বের প্রসেসড ছবিগুলো দিয়ে স্বয়ংক্রিয়ভাবে গ্যালারি পপুলেট করা"""
    try:
        os.makedirs(RECENT_PHOTOS_FOLDER, exist_ok=True)
        valid_exts = ('.jpg', '.jpeg', '.png', '.webp')
        existing = [f for f in os.listdir(RECENT_PHOTOS_FOLDER) if f.lower().endswith(valid_exts)]
        if len(existing) == 0 and os.path.exists(UPLOAD_FOLDER):
            import shutil
            proc_files = [f for f in os.listdir(UPLOAD_FOLDER) if f.lower().endswith(valid_exts)]
            proc_files.sort(key=lambda f: os.path.getmtime(os.path.join(UPLOAD_FOLDER, f)), reverse=True)
            for pf in proc_files[:30]:
                try:
                    shutil.copy2(os.path.join(UPLOAD_FOLDER, pf), os.path.join(RECENT_PHOTOS_FOLDER, pf))
                except Exception:
                    pass
    except Exception as e:
        print(f"Warning initializing recent photos: {e}")

init_recent_photos_folder()

def get_recent_photos_list(limit=60):
    """সর্বশেষ এডিট করা ছবির তালিকা (Newest first)"""
    if not os.path.exists(RECENT_PHOTOS_FOLDER):
        return []
    valid_exts = ('.jpg', '.jpeg', '.png', '.webp')
    files = [f for f in os.listdir(RECENT_PHOTOS_FOLDER) if f.lower().endswith(valid_exts)]
    files.sort(key=lambda f: os.path.getmtime(os.path.join(RECENT_PHOTOS_FOLDER, f)), reverse=True)
    return files[:limit]

# rembg মডেল সেশন (হাই-ডিটেইলিং হেয়ার ও বিয়ার্ড এজের জন্য isnet-general-use)
rembg_session = None

def get_rembg_session():
    global rembg_session
    if rembg_session is None:
        try:
            import rembg
            rembg_session = rembg.new_session("isnet-general-use")
            print("isnet-general-use rembg session loaded successfully!")
        except Exception as e:
            print(f"isnet-general-use load warning: {e}")
            try:
                import rembg
                rembg_session = rembg.new_session("u2net_human_seg")
            except Exception:
                rembg_session = None
    return rembg_session

# OpenCV Haar Cascade ফেস ডিটেক্টর লোড
cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade_path)

# MediaPipe FaceLandmarker ডিটেক্টর সেশন
face_landmarker_detector = None
FACE_LANDMARKER_MODEL_PATH = os.path.join(MODEL_FOLDER, 'face_landmarker.task')

def get_face_landmarker():
    global face_landmarker_detector
    if face_landmarker_detector is None:
        if os.path.exists(FACE_LANDMARKER_MODEL_PATH):
            try:
                from mediapipe.tasks import python as mp_python
                from mediapipe.tasks.python import vision as mp_vision
                base_options = mp_python.BaseOptions(model_asset_path=FACE_LANDMARKER_MODEL_PATH)
                options = mp_vision.FaceLandmarkerOptions(
                    base_options=base_options,
                    output_face_blendshapes=False,
                    output_facial_transformation_matrixes=False,
                    num_faces=1
                )
                face_landmarker_detector = mp_vision.FaceLandmarker.create_from_options(options)
                print("MediaPipe FaceLandmarker loaded successfully!")
            except Exception as e:
                print(f"MediaPipe FaceLandmarker load warning: {e}")
    return face_landmarker_detector

# GFPGAN AI ফেস এনহ্যান্সার সেশন (ONNX Runtime)
gfpgan_session = None
GFPGAN_MODEL_PATH = os.path.join(MODEL_FOLDER, 'GFPGANv1.4.onnx')
GFPGAN_MODEL_URL = "https://huggingface.co/datasets/Gourieff/ReActor/resolve/main/models/facerestore_models/GFPGANv1.4.onnx"

def get_gfpgan_session():
    global gfpgan_session
    if gfpgan_session is None:
        if not os.path.exists(GFPGAN_MODEL_PATH):
            try:
                import urllib.request
                print(f"GFPGANv1.4.onnx মডেল পাওয়া যায়নি। ডাউনলোড শুরু হচ্ছে (~৩৪০ মেগাবাইট)...")
                urllib.request.urlretrieve(GFPGAN_MODEL_URL, GFPGAN_MODEL_PATH)
                print("GFPGANv1.4.onnx সফলভাবে ডাউনলোড হয়েছে!")
            except Exception as dl_err:
                print(f"GFPGAN মডেল অটো-ডাউনলোড ব্যর্থ: {dl_err}")
                return None
        try:
            # CPU/GPU অপ্টিমাইজড ইনফারেন্স সেশন
            opts = ort.SessionOptions()
            opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
            gfpgan_session = ort.InferenceSession(GFPGAN_MODEL_PATH, opts, providers=['CPUExecutionProvider'])
            print("GFPGANv1.4 AI Model loaded successfully via ONNX Runtime!")
        except Exception as e:
            print(f"GFPGAN load warning: {e}")
    return gfpgan_session


def enhance_face_gfpgan(img_bgr, face_box):
    """
    GFPGAN ডিপ লার্নিং মডেল দিয়ে ঝাপসা মুখমণ্ডলকে এইচডি ফেস রিস্টোরেশন করে।
    মূল ব্যক্তির চেহারা বা পরিচয়ের কোনো পরিবর্তন ছাড়াই চুল, চোখ, ত্বক ও নাক নিখুঁত শার্প করে।
    """
    session = get_gfpgan_session()
    if session is None or face_box is None:
        return img_bgr

    try:
        x, y, w, h = face_box
        H, W = img_bgr.shape[:2]

        # মুখের চারপাশে ২৫% স্বাভাবিক মার্জিন রাখা
        margin_x = int(w * 0.25)
        margin_y = int(h * 0.25)

        x1 = max(0, x - margin_x)
        y1 = max(0, y - margin_y)
        x2 = min(W, x + w + margin_x)
        y2 = min(H, y + h + margin_y)

        crop_w = x2 - x1
        crop_h = y2 - y1
        if crop_w < 50 or crop_h < 50:
            return img_bgr

        face_crop = img_bgr[y1:y2, x1:x2]

        # মডেল ইনপুট ফরম্যাট: 512x512 RGB Float32 [-1, 1]
        face_512 = cv2.resize(face_crop, (512, 512), interpolation=cv2.INTER_LANCZOS4)
        face_rgb = cv2.cvtColor(face_512, cv2.COLOR_BGR2RGB).astype(np.float32)
        face_norm = (face_rgb / 255.0 - 0.5) / 0.5
        input_tensor = np.transpose(face_norm, (2, 0, 1))[np.newaxis, ...]

        # ইনফারেন্স রান
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        res = session.run([output_name], {input_name: input_tensor})[0]

        # আউটপুট ডিম্যাপিং ও পোস্ট-প্রসেসিং
        out_img = np.squeeze(res, axis=0)
        out_img = np.transpose(out_img, (1, 2, 0))
        out_img = (out_img * 0.5 + 0.5) * 255.0
        out_img = np.clip(out_img, 0, 255).astype(np.uint8)
        out_bgr = cv2.cvtColor(out_img, cv2.COLOR_RGB2BGR)

        # রিস্টোর করা ফেসকে আবার মূল ক্রপ সাইজে রূপান্তর
        restored_crop = cv2.resize(out_bgr, (crop_w, crop_h), interpolation=cv2.INTER_LANCZOS4)

        # সফট ওভাল ব্লেন্ডিং মাস্ক (যাতে কোনো কাঁচা জোড়া বা লাইন না থাকে)
        mask = np.zeros((crop_h, crop_w), dtype=np.float32)
        center = (crop_w // 2, crop_h // 2)
        axes = (int(crop_w * 0.44), int(crop_h * 0.48))
        cv2.ellipse(mask, center, axes, 0, 0, 360, 1.0, -1)
        mask = cv2.GaussianBlur(mask, (21, 21), 11)
        mask_3d = np.repeat(mask[:, :, np.newaxis], 3, axis=2)

        # আলফা ব্লেন্ড
        blended = (restored_crop * mask_3d + face_crop * (1.0 - mask_3d)).astype(np.uint8)
        img_bgr[y1:y2, x1:x2] = blended
    except Exception as e:
        print(f"GFPGAN inference error: {e}")

    return img_bgr


def apply_studio_color_correction(bgr_img):
    """
    OpenCV Studio Color Correction & Retouching:
    ১. CLAHE (Contrast Limited Adaptive Histogram Equalization) দিয়ে শ্যাডো ব্যালান্স
    ২. ত্বকের প্রাকৃতিক স্কিন টোন ওয়ার্মথ ও ডাইনামিক রেঞ্জ সমন্বয়
    ৩. আনশার্প মাস্কিং (Unsharp Mask) দিয়ে প্রফেশনাল স্টুডিও ক্রিস্প শার্পনেস
    """
    # ১. LAB কালার স্পেসে রূপান্তর
    lab = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2LAB)
    l_channel, a_channel, b_channel = cv2.split(lab)

    # ২. CLAHE প্রয়োগ
    clahe = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8))
    l_enhanced = clahe.apply(l_channel)

    # ন্যাচারাল স্কিন লুকের জন্য হালকা মিশ্রণ (৪০% রিলিজ, ৬০% উন্নত)
    l_final = cv2.addWeighted(l_channel, 0.40, l_enhanced, 0.60, 0)

    # স্টুডিও সফট ওয়ার্মথ
    b_channel = cv2.add(b_channel, 2)

    lab_merged = cv2.merge([l_final, a_channel, b_channel])
    corrected_bgr = cv2.cvtColor(lab_merged, cv2.COLOR_LAB2BGR)

    # ৩. বাইল্যাটারাল স্কিন স্মুথিং (ত্বকের টেক্সচার মসৃণ করে কিন্তু চোখ, চুল, ভ্রুর ধার ঠিক রাখে)
    smooth = cv2.bilateralFilter(corrected_bgr, d=5, sigmaColor=30, sigmaSpace=30)
    balanced = cv2.addWeighted(corrected_bgr, 0.80, smooth, 0.20, 0)

    # ৪. আনশার্প মাস্কিং (Unsharp Mask) দিয়ে হাই-এন্ড স্টুডিও ডিটেইলিং
    blurred = cv2.GaussianBlur(balanced, (0, 0), sigmaX=1.2)
    crisp = cv2.addWeighted(balanced, 1.30, blurred, -0.30, 0)

    return crisp


def soft_edge_cleanup(rgba_img, blur_ksize=(3, 3), sigma=0.5, **kwargs):
    """
    Adaptive Soft Edge Cleanup for Hair and Beard:
    আগ্রাসী ইরোশন (cv2.erode) পুরোপুরি বাদ দিয়ে শুধুমাত্র আলফা মাস্কের উপর সফট ৩x৩ গাউসিয়ান ব্লার
    প্রয়োগ করা হয়, যাতে চুল ও দাড়ির সূক্ষ্ম টেক্সচার সম্পূর্ণ অক্ষুণ্ণ থাকে এবং কোনো
    অপ্রাকৃতিক কাট বা ক্লিপিং ছাড়া প্রাকৃতিক মসৃণ প্রান্ত নিশ্চিত হয়।
    """
    img_np = np.array(rgba_img)
    if img_np.ndim < 3 or img_np.shape[2] < 4:
        return rgba_img

    rgb = img_np[:, :, :3]
    alpha = img_np[:, :, 3]

    # সফট ৩x৩ গাউসিয়ান ব্লার দিয়ে মসৃণ ও প্রাকৃতিক এজ
    smooth_alpha = cv2.GaussianBlur(alpha, blur_ksize, sigma)

    cleaned_np = np.dstack((rgb, smooth_alpha))
    return Image.fromarray(cleaned_np, mode="RGBA")

clean_cutout_edges = soft_edge_cleanup


def blend_with_background(rgba_subject, bg_color_hex, target_size):
    """
    নিখুঁত অ্যান্টি-অ্যালিয়াসিং ও এজ ব্লেন্ডিং:
    ১. আলফা ফেদারিং ও সাব-পিক্সেল আলফা ব্লেন্ডিং
    ২. কোনো কৃত্রিম বা ধারালো কাট-আউট এজ থাকবে না
    """
    target_w, target_h = target_size
    rgba_np = np.array(rgba_subject)

    rgb_fg = rgba_np[:, :, :3].astype(np.float32)
    alpha = rgba_np[:, :, 3].astype(np.float32) / 255.0

    # এজ ফেদারিং (১ পিক্সেল স্মুথিং ব্লার) যা চুল ও কাঁধের ডার্ক ফ্রিঞ্জ দূর করে
    alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0.6)

    # হেক্স কালার
    hex_clean = bg_color_hex.lstrip('#')
    if len(hex_clean) == 6:
        bg_r = int(hex_clean[0:2], 16)
        bg_g = int(hex_clean[2:4], 16)
        bg_b = int(hex_clean[4:6], 16)
    else:
        bg_r, bg_g, bg_b = 255, 255, 255

    bg_canvas = np.zeros((target_h, target_w, 3), dtype=np.float32)
    bg_canvas[:, :] = [bg_r, bg_g, bg_b]

    # Sub-pixel Alpha Compositing: Result = Foreground * Alpha + Background * (1 - Alpha)
    alpha_3d = np.repeat(alpha_blurred[:, :, np.newaxis], 3, axis=2)
    composited = rgb_fg * alpha_3d + bg_canvas * (1.0 - alpha_3d)
    composited = np.clip(composited, 0, 255).astype(np.uint8)

    return Image.fromarray(composited, mode="RGB")


def calculate_passport_crop_box(x, y, w, h):
    """
    Exact Mathematical Passport Crop Calculation based on detected face (x, y, w, h):
    1. Height Calculation: Face height (h) takes up exactly 45% of total final height:
       Formula: H = int(h / 0.45)
    2. Width Calculation (4:5 Ratio): Strictly maintain standard 40x50 mm aspect ratio (4:5):
       Formula: W = int(H * 0.8)
    3. Vertical Alignment (Headroom): Leave 20% of total target height above the face:
       Formula: y_min = int(y - (H * 0.20))
       Bottom crop line: y_max = y_min + H
    4. Horizontal Centering: Center the face perfectly in the middle of the frame:
       Formula: cx = x + (w // 2)
       x_min = int(cx - (W / 2))
       x_max = x_min + W
    """
    # 1. Height Calculation (Face height occupies exactly 45% of total final height)
    H = int(h / 0.45)

    # 2. Width Calculation (Standard 4:5 passport aspect ratio)
    W = int(H * 0.8)

    # 3. Vertical Alignment (20% headroom above face)
    y_min = int(y - (H * 0.20))
    y_max = y_min + H

    # 4. Horizontal Centering
    cx = x + (w // 2)
    x_min = int(cx - (W / 2))
    x_max = x_min + W

    return x_min, y_min, x_max, y_max, W, H


def detect_and_smart_crop(rgba_img, target_ratio=0.8, target_size=None, bg_color="#FFFFFF"):
    """
    Fine-tuned dynamic cropping and composition for standard passport photo (40x50mm):
    1. Face detection via MediaPipe FaceLandmarker with fallback to OpenCV Haar Cascade.
    2. Exact mathematical crop box calculation (H = int(h / 0.45), W = int(H * 0.8), etc.)
    3. Dynamic transparent padding if any coordinate exceeds original image dimensions.
    4. Resizing to standard passport target size (472x591 px @ 300 DPI).
    """
    original_width, original_height = rgba_img.size
    if target_size is not None:
        target_w, target_h = target_size
    else:
        target_w = 472
        target_h = 591

    if rgba_img.mode == "RGBA":
        bg_check = Image.new("RGB", (original_width, original_height), (255, 255, 255))
        bg_check.paste(rgba_img, mask=rgba_img.split()[3])
        rgb_np = np.array(bg_check)
        alpha_np = np.array(rgba_img.split()[3])
    else:
        rgb_np = np.array(rgba_img.convert("RGB"))
        alpha_np = np.full((original_height, original_width), 255, dtype=np.uint8)

    face_detected = False
    top_y = int(original_height * 0.15)
    chin_y = int(original_height * 0.55)
    face_h = max(40, chin_y - top_y)
    face_w = int(face_h * 0.80)
    face_x = int(round(original_width / 2.0 - face_w / 2.0))
    face_y = top_y

    # ১. MediaPipe FaceLandmarker দিয়ে নিখুঁত ফেস বাউন্ডারি ও চিবুক শনাক্তকরণ
    detector = get_face_landmarker()
    if detector is not None:
        try:
            import mediapipe as mp
            mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_np)
            res = detector.detect(mp_img)
            if res.face_landmarks and len(res.face_landmarks) > 0:
                lms = res.face_landmarks[0]
                top_y = int(round(lms[10].y * original_height))
                chin_y = int(round(lms[152].y * original_height))
                left_x = int(round(lms[234].x * original_width))
                right_x = int(round(lms[454].x * original_width))

                face_x = left_x
                face_y = top_y
                face_w = max(40, abs(right_x - left_x))
                face_h = max(40, abs(chin_y - top_y))
                face_detected = True
        except Exception as e:
            print(f"MediaPipe crop landmark warning: {e}")

    # ২. ফলব্যাক: OpenCV Haar Cascade ফেস ডিটেকশন
    if not face_detected:
        gray = cv2.cvtColor(rgb_np, cv2.COLOR_RGB2GRAY)
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.05,
            minNeighbors=3,
            minSize=(int(min(original_width, original_height) * 0.08), int(min(original_width, original_height) * 0.08))
        )
        if len(faces) > 0:
            x, y, w, h = max(faces, key=lambda b: b[2] * b[3])
            face_x = x
            face_y = y
            face_w = w
            face_h = h
            face_detected = True

    # ৩. ফলব্যাক: আলফা সিলুয়েট বডি ডিটেকশন
    if not face_detected:
        y_idx, x_idx = np.where(alpha_np > 25)
        if len(y_idx) > 0 and len(x_idx) > 0:
            top_y = int(np.min(y_idx))
            face_h = int((np.max(y_idx) - top_y) * 0.40)
            face_w = int(face_h * 0.80)
            face_x = int(round(np.mean(x_idx) - face_w / 2.0))
            face_y = top_y

    # ৪. ডাইনামিক পাসপোর্ট ক্রপিং ম্যাথ (সূত্রের শতভাগ বাস্তবায়ন)
    x_min, y_min, x_max, y_max, W, H = calculate_passport_crop_box(face_x, face_y, face_w, face_h)

    # ৫. Dynamic Padding: কোনো প্রান্ত বাইরে চলে গেলে ইমেজ না টেনে বা বিকৃত না করে স্বচ্ছ প্যাডিং যোগ করা
    pad_left = max(0, -x_min)
    pad_top = max(0, -y_min)
    pad_right = max(0, x_max - original_width)
    pad_bottom = max(0, y_max - original_height)

    if pad_left > 0 or pad_top > 0 or pad_right > 0 or pad_bottom > 0:
        padded_width = original_width + pad_left + pad_right
        padded_height = original_height + pad_top + pad_bottom
        padded_canvas = Image.new("RGBA", (padded_width, padded_height), (0, 0, 0, 0))
        padded_canvas.paste(rgba_img, (pad_left, pad_top))

        crop_x1 = x_min + pad_left
        crop_y1 = y_min + pad_top
        crop_x2 = crop_x1 + W
        crop_y2 = crop_y1 + H

        cropped = padded_canvas.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    else:
        cropped = rgba_img.crop((x_min, y_min, x_max, y_max))

    # পাসপোর্ট স্ট্যান্ডার্ড সাইজে রিসাইজ
    resized_subject = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # ফেস ডিটেকশন (GFPGAN ও পোশাক ফিটিংয়ের জন্য সরাসরি target_size ফ্রেমে)
    bg_resized = Image.new("RGB", (target_w, target_h), (255, 255, 255))
    bg_resized.paste(resized_subject, mask=resized_subject.split()[3])
    gray_resized = cv2.cvtColor(np.array(bg_resized), cv2.COLOR_RGB2GRAY)

    faces = face_cascade.detectMultiScale(
        gray_resized,
        scaleFactor=1.05,
        minNeighbors=3,
        minSize=(int(target_w * 0.15), int(target_h * 0.15))
    )
    scaled_face_box = None
    if len(faces) > 0:
        scaled_face_box = tuple(max(faces, key=lambda b: b[2] * b[3]))

    return resized_subject, scaled_face_box


# =============================================================================
# 🌟 AUTOMATIC OUTFIT OVERLAY PIPELINE
# =============================================================================

def fit_and_overlay_outfit(resized_subject, outfit_img, target_size, bg_color="#FFFFFF", scaled_face_box=None):
    """
    স্বয়ংক্রিয় পোশাক পরিধান (Natural Garment Overlay Pipeline):
    ১. ফেস ল্যান্ডমার্ক (MediaPipe FaceLandmarker) অথবা Haar Cascade ডিটেকশন দিয়ে
       চিবুক (Chin), কপাল, চোয়াল (Jawline) ও মুখের উচ্চতা/প্রস্থ নির্ণয়।
    ২. মুখের প্রস্থের ২.৮ গুণ অনুযায়ী স্যুটের সাইজ স্বাভাবিক কাঁধের মাপে স্কেলিং।
    ৩. কলার নচ (Collar Notch) চিবুকের নিচে নিখুঁত পাসপোর্ট রেশিওতে প্লেসমেন্ট।
    ৪. ব্যবহারকারীর পুরোনো শার্ট/টি-শার্ট ও শরীর নিখুঁতভাবে ইরেজ (Erased) করে যাতে
       নতুন স্যুটের নিচে বা পাশে পুরোনো পোশাক উঁকি না দেয়।
    ৫. লেয়ার অর্ডার:
       - লেয়ার ১: ব্যাকগ্রাউন্ড কালার
       - লেয়ার ২: ব্যবহারকারীর সংরক্ষিত মুখমণ্ডল ও ঘাড়
       - লেয়ার ৩: নির্বাচিত নতুন পোশাক (স্যুট/শার্ট/পাঞ্জাবি) সবার উপরে
    """
    import mediapipe as mp

    target_w, target_h = target_size
    subject_rgba = resized_subject.copy()

    chin_x = target_w // 2
    chin_y = int(target_h * 0.58)
    face_h = int(target_h * 0.36)
    face_w = int(target_w * 0.38)
    jaw_pts = None

    detector = get_face_landmarker()
    if detector is not None:
        try:
            rgb_np = np.array(subject_rgba.convert("RGB"))
            mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_np)
            res = detector.detect(mp_img)
            if res.face_landmarks and len(res.face_landmarks) > 0:
                lms = res.face_landmarks[0]
                chin_x = int(round(lms[152].x * target_w))
                chin_y = int(round(lms[152].y * target_h))
                forehead_y = int(round(lms[10].y * target_h))
                face_h = max(40, abs(chin_y - forehead_y))
                left_jaw_x = int(round(lms[234].x * target_w))
                right_jaw_x = int(round(lms[454].x * target_w))
                face_w = max(50, abs(right_jaw_x - left_jaw_x))
                jaw_indices = [234, 93, 132, 58, 172, 136, 150, 149, 176, 148,
                               152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454]
                jaw_pts = [(int(round(lms[i].x * target_w)), int(round(lms[i].y * target_h)))
                           for i in jaw_indices]
        except Exception as lm_err:
            print(f"Landmark detection warning: {lm_err}")

    if jaw_pts is None:
        if scaled_face_box:
            fx, fy, fw, fh = scaled_face_box
            chin_x = fx + fw // 2
            chin_y = fy + fh
            face_h = fh
            face_w = fw
        jaw_pts = []
        for a in range(180, 361, 10):
            rad = np.radians(a)
            px = int(chin_x + (face_w // 2) * np.cos(rad))
            py = int(chin_y - int(face_h * 0.4) + int(face_h * 0.4) * np.sin(rad))
            jaw_pts.append((px, py))

    # ১. পোশাক স্কেলিং: মুখের প্রস্থের ২.৮ গুণ অনুযায়ী
    desired_outfit_w = int(round(face_w * 2.80))
    out_scale = desired_outfit_w / float(outfit_img.width)
    scaled_w = desired_outfit_w
    scaled_h = int(round(outfit_img.height * out_scale))
    scaled_outfit = outfit_img.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

    # ২. কলার নচ পজিশনিং (স্যুটের y=55 চিবুক থেকে ০.১৫*face_h নিচে স্থাপিত হয়)
    collar_notch_target_y = chin_y + int(round(face_h * 0.15))
    paste_x = chin_x - scaled_w // 2
    paste_y = collar_notch_target_y - int(round(55 * out_scale))

    # ৩. সংরক্ষিত অংশ (Face + Neck Corridor)
    face_neck_keep = np.zeros((target_h, target_w), dtype=np.uint8)
    upper_region_poly = (
        [(0, 0), (target_w, 0), (jaw_pts[-1][0], jaw_pts[-1][1])]
        + list(reversed(jaw_pts))
        + [(0, jaw_pts[0][1])]
    )
    cv2.fillPoly(face_neck_keep, [np.array(upper_region_poly, dtype=np.int32)], 255)

    neck_half_w = int(round(face_w * 0.42))
    neck_keep_poly = [
        (chin_x - neck_half_w, chin_y - 2),
        (chin_x + neck_half_w, chin_y - 2),
        (chin_x + int(neck_half_w * 0.95), collar_notch_target_y + 10),
        (chin_x - int(neck_half_w * 0.95), collar_notch_target_y + 10),
    ]
    cv2.fillPoly(face_neck_keep, [np.array(neck_keep_poly, dtype=np.int32)], 255)
    always_keep = face_neck_keep > 0

    # ৪. পুরোনো পোশাক ও শরীরের অংশ স্মুথলি ইরেজ করা
    subj_arr = np.array(subject_rgba).astype(np.uint8)
    subj_a = subj_arr[:, :, 3].astype(np.float32) / 255.0
    erase_mask = np.zeros((target_h, target_w), dtype=np.float32)
    fade_start_y = max(int(jaw_pts[0][1]), chin_y)
    fade_ramp = 18.0
    for y in range(fade_start_y, target_h):
        progress = min(1.0, (y - fade_start_y) / fade_ramp)
        erase_mask[y, :] = np.where(always_keep[y, :], 0.0, progress)

    # ফেদারিং ও মসৃণ এজ ব্লেন্ডিং
    erase_soft = cv2.GaussianBlur(erase_mask, (11, 11), 2.5)
    erase_mask = np.where(
        (erase_mask > 0.05) & (erase_mask < 0.95),
        0.4 * erase_mask + 0.6 * erase_soft,
        erase_mask
    )
    erase_mask = np.clip(erase_mask, 0.0, 1.0)

    keep_factor = 1.0 - erase_mask
    final_alpha = np.clip(subj_a * keep_factor * 255.0, 0, 255).astype(np.uint8)
    masked_subject = Image.fromarray(np.dstack((subj_arr[:, :, :3], final_alpha)), mode="RGBA")

    # ৫. ব্যাকগ্রাউন্ড কালার কম্পোজিট
    if bg_color.lower() == "transparent":
        composite = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    else:
        hex_clean = bg_color.lstrip("#")
        if len(hex_clean) == 6:
            bg_r = int(hex_clean[0:2], 16)
            bg_g = int(hex_clean[2:4], 16)
            bg_b = int(hex_clean[4:6], 16)
        else:
            bg_r, bg_g, bg_b = 255, 255, 255
        composite = Image.new("RGBA", (target_w, target_h), (bg_r, bg_g, bg_b, 255))

    # ৬. সুনির্দিষ্ট ৩-লেয়ার কম্পোজিটিং
    composite.paste(masked_subject, (0, 0), masked_subject)
    composite.paste(scaled_outfit, (paste_x, paste_y), scaled_outfit)
    return composite


# =============================================================================
# 🌟 GENERATIVE AI INPAINTING OUTFIT REPLACEMENT SYSTEM (STABILITY AI)
# =============================================================================

def generate_inpainting_mask(img_rgb, face_landmarker_detector=None):
    """
    MediaPipe FaceLandmarker (বা OpenCV Haar Cascade) দিয়ে ব্যবহারকারীর ফেস, হেড ও চোয়াল শনাক্ত করে
    একটি নির্ভুল বাইনারি মাস্ক তৈরি করে:
    - হেড, চুল, কান, মুখমণ্ডল ও চিবুক (Head/Hair/Face) = BLACK (0) -> Keep (সংরক্ষিত থাকবে)
    - চিবুক ও চোয়ালের নিচের অংশ (গলা, কলার, কাঁধ, পুরোনো পোশাক ও ব্যাকগ্রাউন্ড) = WHITE (255) -> Inpaint
    - সীমানায় হালকা ব্লার (Feathering) থাকে যাতে গলার ত্বকের সাথে নতুন শার্ট/স্যুটের সংযোগ ১০০% মসৃণ হয়।
    """
    W, H = img_rgb.size
    img_np = np.array(img_rgb)

    jaw_pts = None
    detector = face_landmarker_detector or get_face_landmarker()
    if detector is not None:
        try:
            import mediapipe as mp
            mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_np)
            res = detector.detect(mp_img)
            if res.face_landmarks and len(res.face_landmarks) > 0:
                lms = res.face_landmarks[0]
                jaw_indices = [234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 
                               377, 400, 378, 379, 365, 397, 288, 361, 323, 454]
                jaw_pts = [(int(round(lms[i].x * W)), int(round(lms[i].y * H))) for i in jaw_indices]
        except Exception as lm_err:
            print(f"Landmark detection warning during mask generation: {lm_err}")

    if not jaw_pts:
        gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.06, minNeighbors=4)
        if len(faces) > 0:
            fx, fy, fw, fh = max(faces, key=lambda b: b[2] * b[3])
            chin_x = fx + fw // 2
            chin_y = fy + fh
            face_w = fw
            face_h = fh
            jaw_pts = []
            for a in range(180, 361, 10):
                rad = np.radians(a)
                px = int(chin_x + (face_w // 2) * np.cos(rad))
                py = int(chin_y - int(face_h * 0.4) + int(face_h * 0.4) * np.sin(rad))
                jaw_pts.append((px, py))
        else:
            mid_y = int(H * 0.45)
            jaw_pts = [(0, mid_y), (W // 2, mid_y + int(H * 0.05)), (W, mid_y)]

    mask = np.full((H, W), 255, dtype=np.uint8)
    left_jaw = jaw_pts[0]
    right_jaw = jaw_pts[-1]
    upper_poly = [(0, 0), (W, 0), (W, right_jaw[1])] + list(reversed(jaw_pts)) + [(0, left_jaw[1])]
    cv2.fillPoly(mask, [np.array(upper_poly, dtype=np.int32)], 0)
    mask = cv2.GaussianBlur(mask, (3, 3), 0)
    return Image.fromarray(mask, mode="L")


# ১৫টি প্রফেশনাল পোশাকের জন্য হাই-এন্ড স্টুডিও প্রম্পট ডিকশনারি
OUTFIT_PROMPTS = {
    'suit_black': "A person wearing a sharp, impeccably tailored black business suit jacket, crisp white buttoned dress shirt, clean pointed collar, elegant dark silk necktie, studio portrait photography, ultra-realistic, 8k resolution, photorealistic fabric texture",
    'suit_navy': "A person wearing an impeccably tailored navy blue formal business suit jacket, crisp pressed white collared dress shirt, matching dark blue necktie, studio portrait lighting, photorealistic, hyper-detailed",
    'suit_charcoal': "A person wearing an executive charcoal grey wool business suit jacket, crisp white dress shirt with pointed collar, matching grey tie, studio portrait lighting, photorealistic, high resolution",
    'suit_tuxedo': "A person wearing a luxurious black executive formal tuxedo, satin lapels, crisp white pleated dress shirt, black silk bow tie, studio portrait photography, ultra-realistic, high detail",
    'shirt_white': "A person wearing a crisp, perfectly ironed white formal button-down collared dress shirt, sharp collar, studio lighting, highly detailed cotton fabric texture, photorealistic portrait",
    'shirt_blue': "A person wearing a stylish light sky blue formal button-up collared business shirt, crisp collar, studio portrait photography, photorealistic, fine fabric texture",
    'shirt_black': "A person wearing a sleek modern black formal button-up collared shirt, sharp collar, professional studio lighting, crisp fabric, photorealistic portrait",
    'shirt_check': "A person wearing a neat subtle checkered pattern formal collared business shirt, crisp collar, studio portrait lighting, high resolution, photorealistic",
    'panjabi_white': "A person wearing an elegant traditional white cotton-silk Panjabi Kurta with delicate mandarin collar, professional studio portrait, photorealistic, high detail",
    'panjabi_navy': "A person wearing an exquisite navy blue festive Panjabi Kurta with fine neck embroidery, studio portrait lighting, photorealistic, detailed fabric",
    'panjabi_maroon': "A person wearing a rich maroon festive Panjabi Kurta with subtle gold embroidery along the mandarin collar, studio portrait, photorealistic, high resolution",
    'saree_red': "A woman wearing an elegant traditional red silk saree draped neatly over the shoulder with gold zari border and matching blouse, studio portrait photography, photorealistic",
    'saree_blue': "A woman wearing an exquisite royal blue designer silk saree with elegant border and tailored blouse, studio portrait lighting, photorealistic",
    'hijab_black': "A woman wearing a professional elegant black hijab neatly framed around the face with modest formal business attire, studio lighting, photorealistic"
}


def build_outfit_prompt(outfit_id, custom_hex_color=None):
    """
    পোশাক আইডি ও ঐচ্ছিক কাস্টম রঙের উপর ভিত্তি করে প্রফেশনাল স্টুডিও প্রম্পট তৈরি করে।
    """
    base_prompt = OUTFIT_PROMPTS.get(outfit_id)
    if not base_prompt:
        base_prompt = "A person wearing a highly detailed professional business suit and white shirt, studio lighting, photorealistic"

    if custom_hex_color and custom_hex_color.lower() not in ('none', 'default', ''):
        hex_clean = custom_hex_color.lstrip('#').lower()
        color_map = {
            '111827': 'black',
            '1e3a8a': 'navy blue',
            '1e293b': 'dark slate grey',
            '374151': 'charcoal grey',
            '4b5563': 'medium grey',
            'ffffff': 'pure white',
            '0284c7': 'sky blue',
            '047857': 'emerald green',
            'b91c1c': 'crimson red',
            '831843': 'maroon',
            '581c87': 'royal purple',
            '78350f': 'warm brown'
        }
        color_name = color_map.get(hex_clean, f"color #{hex_clean}")

        if 'suit' in outfit_id:
            base_prompt = f"A person wearing a tailored {color_name} business suit jacket, crisp white buttoned dress shirt with pointed collar, tie, studio portrait lighting, 8k resolution, photorealistic"
        elif 'shirt' in outfit_id:
            base_prompt = f"A person wearing a crisp {color_name} formal button-down collared dress shirt, sharp collar, studio lighting, photorealistic"
        elif 'panjabi' in outfit_id:
            base_prompt = f"A person wearing an elegant {color_name} festive Panjabi Kurta with fine collar detailing, studio portrait, photorealistic"
        elif 'saree' in outfit_id:
            base_prompt = f"A woman wearing an elegant {color_name} silk saree with gold border, studio portrait photography, photorealistic"

    return base_prompt


def inpaint_with_stability(image_pil, mask_pil, prompt, api_key=None):
    """
    Stability AI Official Inpainting API (/v2beta/stable-image/edit/inpaint) কল করে।
    """
    api_key = api_key or os.getenv('STABILITY_API_KEY')
    if not api_key:
        raise ValueError(
            "Stability AI API Key পাওয়া যায়নি! অনুগ্রহ করে .env ফাইলে STABILITY_API_KEY সেট করুন।"
        )

    if mask_pil.size != image_pil.size:
        mask_pil = mask_pil.resize(image_pil.size, Image.Resampling.NEAREST)

    url = "https://api.stability.ai/v2beta/stable-image/edit/inpaint"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "image/*"
    }

    img_buf = io.BytesIO()
    image_pil.save(img_buf, format="PNG")
    img_buf.seek(0)

    mask_buf = io.BytesIO()
    mask_pil.save(mask_buf, format="PNG")
    mask_buf.seek(0)

    files = {
        "image": ("image.png", img_buf, "image/png"),
        "mask": ("mask.png", mask_buf, "image/png"),
    }
    data = {
        "prompt": prompt,
        "output_format": "png",
        "mode": "mask"
    }

    response = requests.post(url, headers=headers, files=files, data=data, timeout=60)
    if response.status_code == 200:
        return Image.open(io.BytesIO(response.content)).convert("RGB")
    else:
        err_msg = response.text
        try:
            err_json = response.json()
            err_msg = err_json.get('message', err_msg)
        except Exception:
            pass
        raise RuntimeError(f"Stability AI ইনপেইন্টিং ব্যর্থ ({response.status_code}): {err_msg}")


def inpaint_with_huggingface(image_pil, mask_pil, prompt, token=None):
    """
    Hugging Face Inference API / Client ব্যবহার করে ফ্রি ব্যাকআপ ইনপেইন্টিং।
    """
    token = token or os.getenv('HUGGINGFACE_API_TOKEN')
    if not token:
        raise ValueError("Hugging Face Token পাওয়া যায়নি! অনুগ্রহ করে .env ফাইলে HUGGINGFACE_API_TOKEN সেট করুন।")

    from huggingface_hub import InferenceClient
    client = InferenceClient(api_key=token)

    # Use image-to-image with prompt
    res_img = client.image_to_image(image=image_pil, prompt=prompt)
    if res_img is None:
        raise RuntimeError("Hugging Face API কোনো ছবি রিটার্ন করেনি।")
    return res_img


def inpaint_outfit_with_failover(image_pil, mask_pil, prompt):
    """
    🌟 মাল্টি-টিয়ার অটো-ফেলওভার ইঞ্জিন (Auto-Failover Pipeline):
    টিয়ার ১: প্রথমে Stability AI দিয়ে চেষ্টা করবে (সর্বোচ্চ স্টুডিও কোয়ালিটি)।
    টিয়ার ২: Stability AI ব্যর্থ হলে (যেমন ক্রেডিট শেষ, কোটা সমস্যা বা এরর),
             স্বয়ংক্রিয়ভাবে Hugging Face API দিয়ে চেষ্টা করবে।
    টিয়ার ৩: উভয় ক্লাউড API ব্যর্থ হলে বা ইন্টারনেট না থাকলে এক্সেপশন রেইজ করবে,
             যাতে সিস্টেম লোকাল MediaPipe ২ডি স্যুটে ফলব্যাক করে।
    """
    errors = []

    # ১. টিয়ার ১: Stability AI
    stability_key = os.getenv('STABILITY_API_KEY')
    if stability_key:
        try:
            print("[Auto-Failover Tier 1] Attempting Stability AI Inpainting...")
            return inpaint_with_stability(image_pil, mask_pil, prompt, api_key=stability_key), "Stability AI"
        except Exception as e:
            err_msg = f"Stability AI error: {e}"
            print(f"[Auto-Failover Tier 1 Warning] {err_msg}")
            errors.append(err_msg)

    # ২. টিয়ার ২: Hugging Face (ফ্রি ব্যাকআপ)
    hf_token = os.getenv('HUGGINGFACE_API_TOKEN')
    if hf_token:
        try:
            print("[Auto-Failover Tier 2] Attempting Hugging Face Inference...")
            res = inpaint_with_huggingface(image_pil, mask_pil, prompt, token=hf_token)
            return res, "Hugging Face"
        except Exception as e:
            err_msg = f"Hugging Face error: {e}"
            print(f"[Auto-Failover Tier 2 Warning] {err_msg}")
            errors.append(err_msg)

    raise RuntimeError("; ".join(errors) if errors else "No AI provider available")


def process_studio_photo(image_bytes, photo_size="passport", bg_color="#FFFFFF", outfit="none", outfit_color="#111827", retouch=True, brightness=True):
    """
    অটোমেটিক পাসপোর্ট ফটো স্টুডিও পাইপলাইন:
    ১. rembg (isnet-general-use) দিয়ে আলফা ম্যাটিং সহ নিখুঁত ব্যাকগ্রাউন্ড রিমুভ
    ২. ডাইনামিক স্মার্ট পাসপোর্ট রেশিও ক্রপ (ফেস ও শোল্ডার অ্যাওয়ারনেস)
    ৩. স্বয়ংক্রিয় পোশাক ফিটিং (যদি পোশাক নির্বাচন করা থাকে) অথবা ব্যাকগ্রাউন্ড কালার প্রয়োগ
    ৪. GFPGAN AI ফেস রিস্টোরেশন ও স্টুডিও কালার কারেকশন
    ৫. আউটপুট সেভ ও ডাটা ইউআরআই রিটার্ন
    """
    import rembg

    size_configs = {
        'passport': {'size': (472, 591), 'ratio': 472.0 / 591.0, 'label': 'পাসপোর্ট (৪০×৫০ মিমি)'},
        'stamp': {'size': (236, 295), 'ratio': 236.0 / 295.0, 'label': 'স্ট্যাম্প (২০×২৫ মিমি)'},
        'visa': {'size': (600, 600), 'ratio': 1.0, 'label': 'ভিসা (৫০×৫০ মিমি)'}
    }
    cfg = size_configs.get(photo_size, size_configs['passport'])
    target_w, target_h = cfg['size']
    target_ratio = cfg['ratio']

    session = get_rembg_session()
    rembg_kwargs = {
        'alpha_matting': True,
        'alpha_matting_foreground_threshold': 240,
        'alpha_matting_background_threshold': 10,
        'alpha_matting_erode_size': 5,
    }
    if session:
        rembg_kwargs['session'] = session

    try:
        nobg_bytes = rembg.remove(image_bytes, **rembg_kwargs)
    except Exception as e:
        print(f"rembg with alpha matting fallback warning: {e}")
        nobg_bytes = rembg.remove(image_bytes, session=session) if session else rembg.remove(image_bytes)

    raw_subject_rgba = Image.open(io.BytesIO(nobg_bytes)).convert("RGBA")

    # ২. Adaptive Edge Cleanup (Hair & Beard preservation without aggressive erosion)
    cleaned_subject_rgba = soft_edge_cleanup(raw_subject_rgba, blur_ksize=(3, 3), sigma=0.5)

    # ৩. ফ্রন্টএন্ড Cropper.js থেকে ক্রপকৃত ইমেজ টার্গেট পাসপোর্ট সাইজে রূপান্তর
    resized_subject = cleaned_subject_rgba.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # ফেস ডিটেকশন (GFPGAN ও পোশাক ফিটিংয়ের জন্য সরাসরি target_size ফ্রেমে)
    bg_resized = Image.new("RGB", (target_w, target_h), (255, 255, 255))
    bg_resized.paste(resized_subject, mask=resized_subject.split()[3])
    gray_resized = cv2.cvtColor(np.array(bg_resized), cv2.COLOR_RGB2GRAY)
    faces = face_cascade.detectMultiScale(
        gray_resized,
        scaleFactor=1.05,
        minNeighbors=3,
        minSize=(int(target_w * 0.15), int(target_h * 0.15))
    )
    scaled_face_box = tuple(max(faces, key=lambda b: b[2] * b[3])) if len(faces) > 0 else None

    has_outfit = bool(outfit and outfit.lower() != 'none')
    outfit_applied_by_ai = False
    ai_engine_used = None

    # 🌟 মাল্টি-টিয়ার অটো-ফেলওভার জেনারেটিভ এআই (Stability AI -> Hugging Face -> Local 2D)
    if has_outfit and (os.getenv('STABILITY_API_KEY') or os.getenv('HUGGINGFACE_API_TOKEN')):
        try:
            print(f"[Photo Studio] Starting Auto-Failover outfit generation for: {outfit}")
            orig_rgb = Image.new("RGB", resized_subject.size, (255, 255, 255))
            if resized_subject.mode == "RGBA":
                orig_rgb.paste(resized_subject, mask=resized_subject.split()[3])
            else:
                orig_rgb.paste(resized_subject)

            mask_img = generate_inpainting_mask(orig_rgb)
            outfit_prompt = build_outfit_prompt(outfit, custom_hex_color=outfit_color)

            inpainted_rgb, ai_engine_used = inpaint_outfit_with_failover(orig_rgb, mask_img, outfit_prompt)

            inpainted_buf = io.BytesIO()
            inpainted_rgb.save(inpainted_buf, format="PNG")
            inpainted_bytes = inpainted_buf.getvalue()

            if session:
                nobg_ai = rembg.remove(inpainted_bytes, session=session, **rembg_kwargs)
            else:
                nobg_ai = rembg.remove(inpainted_bytes, **rembg_kwargs)

            ai_subject = Image.open(io.BytesIO(nobg_ai)).convert("RGBA")
            ai_subject = ai_subject.resize((target_w, target_h), Image.Resampling.LANCZOS)

            if bg_color.lower() == 'transparent':
                composite_pil = ai_subject
            else:
                composite_pil = blend_with_background(ai_subject, bg_color, (target_w, target_h))

            outfit_applied_by_ai = True
            print(f"[Photo Studio] Outfit generated successfully via {ai_engine_used}!")
        except Exception as ai_err:
            print(f"[Photo Studio Warning] All cloud AI tiers failed ({ai_err}). Seamlessly falling back to Tier 3 Local MediaPipe 2D Engine!")

    # Fallback to local 2D outfit overlay if AI inpainting was not performed or failed
    if has_outfit and not outfit_applied_by_ai:
        outfit_path = os.path.join(OUTFIT_FOLDER, f"{outfit}.png")
        if outfit_path and os.path.exists(outfit_path):
            outfit_img = Image.open(outfit_path).convert("RGBA")
            composite_pil = fit_and_overlay_outfit(
                resized_subject,
                outfit_img,
                (target_w, target_h),
                bg_color=bg_color,
                scaled_face_box=scaled_face_box
            )
        else:
            if bg_color.lower() == 'transparent':
                composite_pil = resized_subject
            else:
                composite_pil = blend_with_background(resized_subject, bg_color, (target_w, target_h))
    elif not has_outfit:
        if bg_color.lower() == 'transparent':
            composite_pil = resized_subject
        else:
            composite_pil = blend_with_background(resized_subject, bg_color, (target_w, target_h))

    # OpenCV প্রসেসিং (GFPGAN ফেস রিস্টোরেশন + স্টুডিও কালার কারেকশন)
    subject_np = np.array(composite_pil)
    bgr = cv2.cvtColor(subject_np[:, :, :3], cv2.COLOR_RGB2BGR)

    # AI ফেস এনহ্যান্সমেন্ট (GFPGAN)
    if scaled_face_box is not None:
        bgr = enhance_face_gfpgan(bgr, scaled_face_box)

    # স্টুডিও কালার কারেকশন
    if retouch:
        bgr = apply_studio_color_correction(bgr)

    if brightness:
        bgr = cv2.convertScaleAbs(bgr, alpha=1.04, beta=5)

    final_rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

    out_buf = io.BytesIO()
    unique_id = uuid.uuid4().hex[:8]

    if bg_color.lower() == 'transparent' and not has_outfit:
        alpha_mask = subject_np[:, :, 3] if subject_np.shape[2] == 4 else None
        if alpha_mask is not None:
            final_img = Image.fromarray(np.dstack((final_rgb, alpha_mask)))
        else:
            final_img = Image.fromarray(final_rgb)
        filename = f"{photo_size}_photo_{unique_id}.png"
        mime_type = "image/png"
        final_img.save(out_buf, format="PNG")
    else:
        final_img = Image.fromarray(final_rgb, mode="RGB")
        filename = f"{photo_size}_photo_{unique_id}.jpg"
        mime_type = "image/jpeg"
        final_img.save(out_buf, format="JPEG", quality=98)

    out_buf.seek(0)
    file_bytes = out_buf.getvalue()

    saved_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    with open(saved_path, 'wb') as f:
        f.write(file_bytes)

    # Save a copy into static/recent_photos/
    recent_path = os.path.join(app.config['RECENT_PHOTOS_FOLDER'], filename)
    with open(recent_path, 'wb') as f:
        f.write(file_bytes)

    b64_str = f"data:{mime_type};base64," + base64.b64encode(file_bytes).decode('utf-8')
    dimension_str = f"{target_w} × {target_h} পিক্সেল (৩০০ DPI)"

    return b64_str, filename, dimension_str


@app.route('/')
def dashboard():
    """হোমপেজ / মূল ড্যাশবোর্ড"""
    return render_template('index.html')


@app.route('/photo-edit')
def photo_edit():
    """৩-কলাম প্রফেশনাল স্টুডিও ফটো এডিটিং পেজ"""
    recent_photos = get_recent_photos_list()
    return render_template('photo_edit.html', recent_photos=recent_photos)


@app.route('/api/recent-photos')
def api_recent_photos():
    """সাম্প্রতিক এডিট করা ছবির তালিকা API"""
    files = get_recent_photos_list()
    return jsonify({
        'success': True,
        'photos': [
            {
                'filename': f,
                'url': f"/static/recent_photos/{f}"
            }
            for f in files
        ]
    })


DOCUMENTS_JSON_PATH = os.path.join(app.root_path, 'documents.json')

def get_manual_documents():
    """Load manual document templates from documents.json"""
    if os.path.exists(DOCUMENTS_JSON_PATH):
        try:
            with open(DOCUMENTS_JSON_PATH, 'r', encoding='utf-8') as f:
                import json
                return json.load(f)
        except Exception as e:
            print(f"Error loading documents.json: {e}")
    return []


@app.route('/manual-documents')
def manual_documents():
    """ম্যানুয়াল ডকুমেন্ট টেমপ্লেট পেজ"""
    docs = get_manual_documents()
    return render_template('manual_documents.html', documents=docs)


@app.route('/api/manual-documents', methods=['GET', 'POST'])
def api_manual_documents():
    """ম্যানুয়াল ডকুমেন্ট তালিকা এবং নতুন ডকুমেন্ট সংরক্ষণের API"""
    if request.method == 'POST':
        try:
            new_doc = request.get_json()
            if not new_doc or 'title' not in new_doc:
                return jsonify({'success': False, 'error': 'ডকুমেন্টের শিরোনাম আবশ্যক!'}), 400
            
            docs = get_manual_documents()
            if 'id' not in new_doc or not new_doc['id']:
                new_doc['id'] = f"doc_{int(time.time())}"
            docs.append(new_doc)
            
            import json
            with open(DOCUMENTS_JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(docs, f, ensure_ascii=False, indent=2)
                
            return jsonify({'success': True, 'document': new_doc, 'total_count': len(docs)})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

    docs = get_manual_documents()
    return jsonify({
        'success': True,
        'count': len(docs),
        'documents': docs
    })


@app.route('/manual-documents/create')
@app.route('/manual-documents/create/<doc_id>')
def manual_document_create(doc_id=None):
    """ডকুমেন্ট তৈরির এডিটর পেজ (Document Creator View)"""
    doc_id = doc_id or request.args.get('doc', 'doc_protyoyon_help')
    if doc_id == 'doc_house_allocation':
        return render_template('house_allocation_creator.html')
    if doc_id == 'doc_unfinished_work':
        return render_template('unfinished_work_creator.html')
    if doc_id in ['doc_check_case', 'check_case', 'blank_check']:
        return render_template('check_case_creator.html')
    if doc_id in ['doc_form_fillup', 'form_fillup']:
        return render_template('form_fillup_creator.html')
    if doc_id in ['doc_ammoktar_dolil', 'ammoktar_dolil', 'power_of_attorney', 'doc_power_of_attorney']:
        return render_template('ammoktar_dolil_creator.html')

    docs = get_manual_documents()
    current_doc = next((d for d in docs if d.get('id') == doc_id), None)
    if not current_doc:
        current_doc = {
            'id': 'doc_protyoyon_help',
            'title': 'সাহায্যের জন্য প্রত্যয়ন পত্র',
            'category': 'প্রত্যয়ন পত্র',
            'language': 'বাংলা',
            'fields_count': 16,
            'doc_count': 1,
            'is_free': True
        }
    return render_template('document_creator.html', doc=current_doc, all_docs=docs)


@app.route('/manual-documents/house-allocation')
def house_allocation_document_create():
    """বসতঘর ক্ষতিগ্রস্ত হওয়ায় একটি বসতঘর বরাদ্দের আবেদন পেজ"""
    return render_template('house_allocation_creator.html')


@app.route('/manual-documents/unfinished-work')
def unfinished_work_document_create():
    """উন্নয়নমূলক/জনস্বার্থ সংশ্লিষ্ট অসমাপ্ত কাজ সমাপ্ত করার জন্য আবেদন পেজ"""
    return render_template('unfinished_work_creator.html')


@app.route('/manual-documents/check-case')
def check_case_document_create():
    """খালি চেক মামলা পেজ (লিগ্যাল সাইজ নন-জুডিশিয়াল স্ট্যাম্প)"""
    return render_template('check_case_creator.html')


@app.route('/manual-documents/form-fillup')
def form_fillup_document_create():
    """ফর্ম ফিলাপের অনুমতির জন্য আবেদন পেজ (A4 সাইজ)"""
    return render_template('form_fillup_creator.html')


@app.route('/manual-documents/ammoktar-dolil')
@app.route('/manual-documents/power-of-attorney')
def ammoktar_dolil_document_create():
    """আমমোক্তার দলিল পেজ (লিগ্যাল সাইজ নন-জুডিশিয়াল স্ট্যাম্প)"""
    return render_template('ammoktar_dolil_creator.html')



@app.route('/api/detect-face', methods=['POST'])
def api_detect_face():
    """
    দ্রুত ফেস ডিটেকশন API:
    আপলোডকৃত ছবি থেকে তাত্ক্ষণিকভাবে ফেস বাউন্ডিং বক্স (x, y, w, h)
    এবং AI-সাজেস্টেড ৪:৫ পাসপোর্ট ক্রপ বক্স রিটার্ন করে যাতে Cropper.js
    ফ্রন্টএন্ডে তা সরাসরি প্রাথমিক ক্রপ বক্স হিসেবে ড্র করতে পারে।
    """
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'কোনো ছবি পাওয়া যায়নি!'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'কোনো ফাইল নির্বাচন করা হয়নি!'}), 400

    try:
        file_bytes = file.read()
        np_arr = np.frombuffer(file_bytes, np.uint8)
        img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img_bgr is None:
            return jsonify({'success': False, 'error': 'ইমেজ ফরম্যাট সঠিক নয়!'}), 400

        orig_h, orig_w = img_bgr.shape[:2]
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

        face_detected = False
        fx, fy, fw, fh = 0, 0, 0, 0

        # ১. MediaPipe FaceLandmarker দিয়ে নিখুঁত ফেস শনাক্তকরণ
        detector = get_face_landmarker()
        if detector is not None:
            try:
                import mediapipe as mp
                mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)
                res = detector.detect(mp_img)
                if res.face_landmarks and len(res.face_landmarks) > 0:
                    lms = res.face_landmarks[0]
                    top_y = int(round(lms[10].y * orig_h))
                    chin_y = int(round(lms[152].y * orig_h))
                    left_x = int(round(lms[234].x * orig_w))
                    right_x = int(round(lms[454].x * orig_w))

                    fx = max(0, left_x)
                    fy = max(0, top_y)
                    fw = max(40, abs(right_x - left_x))
                    fh = max(40, abs(chin_y - top_y))
                    face_detected = True
            except Exception as e:
                print(f"Face API MediaPipe warning: {e}")

        # ২. ফলব্যাক: OpenCV Haar Cascade
        if not face_detected:
            gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(
                gray,
                scaleFactor=1.05,
                minNeighbors=3,
                minSize=(int(min(orig_w, orig_h) * 0.08), int(min(orig_w, orig_h) * 0.08))
            )
            if len(faces) > 0:
                x, y, w, h = max(faces, key=lambda b: b[2] * b[3])
                fx, fy, fw, fh = int(x), int(y), int(w), int(h)
                face_detected = True

        # ৩. ফলব্যাক: সেন্ট্রাল এরিয়া
        if not face_detected:
            fw = int(orig_w * 0.38)
            fh = int(fw * 1.25)
            fx = int((orig_w - fw) / 2)
            fy = int(orig_h * 0.20)

        # AI সাজেস্টেড ক্রপ বক্স গণনা (Face height 45%, 20% headroom, 4:5 ratio)
        crop_h = int(round(fh / 0.45))
        crop_w = int(round(crop_h * 0.80))
        crop_y = max(0, int(round(fy - (crop_h * 0.20))))
        crop_x = max(0, int(round((fx + fw / 2.0) - (crop_w / 2.0))))

        if crop_w > orig_w:
            crop_w = orig_w
            crop_h = int(round(crop_w / 0.80))
        if crop_h > orig_h:
            crop_h = orig_h
            crop_w = int(round(crop_h * 0.80))
        if crop_x + crop_w > orig_w:
            crop_x = max(0, orig_w - crop_w)
        if crop_y + crop_h > orig_h:
            crop_y = max(0, orig_h - crop_h)

        return jsonify({
            'success': True,
            'face_detected': face_detected,
            'face': {
                'x': fx,
                'y': fy,
                'w': fw,
                'h': fh
            },
            'suggested_crop': {
                'x': crop_x,
                'y': crop_y,
                'width': crop_w,
                'height': crop_h
            },
            'image_size': {
                'width': orig_w,
                'height': orig_h
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/photo-edit/process', methods=['POST'])
def process_photo():
    """
    স্টুডিও ফটো প্রসেসিং রুট:
    সরাসরি আপলোডকৃত ছবি গ্রহণ করে স্বয়ংক্রিয়ভাবে ব্যাকগ্রাউন্ড পরিবর্তন, 
    পোশাক ফিটিং এবং স্টুডিও রিটার্চ সম্পন্ন করে।
    """
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'কোনো ছবি পাওয়া যায়নি!'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'কোনো ফাইল নির্বাচন করা হয়নি!'}), 400

    photo_size = request.form.get('photo_size', 'passport')
    bg_color = request.form.get('bg_color', '#FFFFFF')
    outfit = request.form.get('outfit', 'none')
    outfit_color = request.form.get('outfit_color', '#111827')
    retouch = request.form.get('retouch', 'true').lower() == 'true'
    brightness = request.form.get('brightness', 'true').lower() == 'true'

    try:
        input_bytes = file.read()
        processed_data_uri, saved_filename, dimensions = process_studio_photo(
            input_bytes,
            photo_size=photo_size,
            bg_color=bg_color,
            outfit=outfit,
            outfit_color=outfit_color,
            retouch=retouch,
            brightness=brightness
        )

        return jsonify({
            'success': True,
            'processed_image': processed_data_uri,
            'download_filename': saved_filename,
            'download_url': f"/static/uploads/processed/{saved_filename}",
            'recent_url': f"/static/recent_photos/{saved_filename}",
            'dimensions': dimensions
        })
    except Exception as e:
        print(f"Studio photo processing error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/download/<filename>')
def download_file(filename):
    """প্রসেসকৃত ছবি ডাউনলোড রুট"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)


if __name__ == '__main__':
    print("Starting server at: http://127.0.0.1:5000/ and http://192.168.0.128:5000/")
    app.run(debug=True, host='0.0.0.0', port=5000)
