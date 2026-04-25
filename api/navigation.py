import cv2
import mediapipe as mp
from mediapipe.tasks import python as mp_python
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.components.containers import NormalizedLandmark
import urllib.request
import os

# ── Download MediaPipe model for hand landmarker ────────────────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "hand_landmarker.task")
MODEL_URL  = (
    "https://storage.googleapis.com/mediapipe-models/"
    "hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
)
 
if not os.path.exists(MODEL_PATH):
    print("Downloading hand landmarker model...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print("Model downloaded.\n")

# ── Landmark indices ───────────────────────────────────────────────────────────
# Tip and PIP (middle knuckle) for each of the four fingers
FINGER_PAIRS = [
    (8,  7),   # index
    (12, 11),  # middle
    (16, 15),  # ring
    (20, 19),  # pinky
]

HAND_CONNECTIONS = [
    (0,1),(1,2),(2,3),(3,4),        # thumb
    (0,5),(5,6),(6,7),(7,8),        # index
    (0,9),(9,10),(10,11),(11,12),   # middle
    (0,13),(13,14),(14,15),(15,16), # ring
    (0,17),(17,18),(18,19),(19,20), # pinky
    (5,9),(9,13),(13,17),           # palm
]

# Page each finger count maps to
PAGE_MAP = {
    1: "/",
    2: "/activities",
    3: "/blog",
    4: "/contact",
}

def draw_landmarks(frame, landmarks):
    h, w = frame.shape[:2]
    points = [(int(lm.x * w), int(lm.y * h)) for lm in landmarks]
    for a, b in HAND_CONNECTIONS:
        cv2.line(frame, points[a], points[b], (180, 180, 180), 1, cv2.LINE_AA)
    for i, (x, y) in enumerate(points):
        is_tip = i in (4, 8, 12, 16, 20)
        color  = (80, 220, 120) if is_tip else (255, 255, 255)
        cv2.circle(frame, (x, y), 5 if is_tip else 3, color, -1, cv2.LINE_AA)

# ------ Count fingers -------------------------------------

def count_fingers(landmarks, handedness: str) -> int:
    """
    Count how many fingers are extended.

    landmarks  : list of 21 NormalizedLandmark objects from MediaPipe
    handedness : "Left" or "Right" (MediaPipe labels from the camera's POV,
                 which is mirrored — so "Right" usually means the user's right hand)
    """
    fingers = 0

    # Thumb: compare x coordinates (sideways movement)
    # For a right hand the tip (4) is to the left of the IP joint (3) when extended.
    # Flip the comparison for a left hand.
    if handedness == "Right":
        if landmarks[4].x > landmarks[5].x:
            fingers += 1
    else:
        if landmarks[4].x < landmarks[5].x:
            fingers += 1
 
    # Four fingers — tip.y < pip.y means finger is raised
    for tip_idx, pip_idx in FINGER_PAIRS:
        if landmarks[tip_idx].y < landmarks[pip_idx].y:
            fingers += 1
 
    return fingers


# ── Debounce ───────────────────────────────────────────────────────────────────
DEBOUNCE_FRAMES   = 8
_last_confirmed   = 0
_candidate        = 0
_candidate_streak = 0
 
def debounce(raw_count: int) -> int | None:
    global _candidate, _candidate_streak, _last_confirmed
 
    if raw_count == _candidate:
        _candidate_streak += 1
    else:
        _candidate        = raw_count
        _candidate_streak = 1
 
    if _candidate_streak >= DEBOUNCE_FRAMES and _candidate != _last_confirmed:
        _last_confirmed   = _candidate
        _candidate_streak = 0
        return _candidate
 
    return None
 
 
# ── Main loop ──────────────────────────────────────────────────────────────────
def main():
    # Build the HandLandmarker using the new Tasks API
    base_options = mp_python.BaseOptions(model_asset_path=MODEL_PATH)
    options      = vision.HandLandmarkerOptions(
        base_options=base_options,
        num_hands=1,
        min_hand_detection_confidence=0.7,
        min_hand_presence_confidence=0.7,
        min_tracking_confidence=0.6,
    )
    landmarker = vision.HandLandmarker.create_from_options(options)
 
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise RuntimeError("Could not open webcam.")
 
    while True:
        ok, frame = cap.read()
        if not ok:
            break
 
        frame = cv2.flip(frame, 1)
 
        # Convert to MediaPipe Image format
        rgb      = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
        result   = landmarker.detect(mp_image)
 
        if result.hand_landmarks:
            for hand_landmarks, hand_handedness in zip(
                result.hand_landmarks,
                result.handedness,
            ):
                label     = hand_handedness[0].display_name   # "Left" or "Right"
                raw_count = count_fingers(hand_landmarks, label)
                confirmed = debounce(raw_count)
 
                if confirmed is not None and confirmed in PAGE_MAP:
                    page = PAGE_MAP[confirmed]
                    print(f"Fingers: {confirmed}  →  navigate to {page}")
                    # TODO: send page over WebSocket here
 
                draw_landmarks(frame, hand_landmarks)
 
                # Finger count overlay
                cv2.putText(
                    frame, f"Fingers: {raw_count}",
                    (16, 48), cv2.FONT_HERSHEY_SIMPLEX,
                    1.2, (255, 255, 255), 2, cv2.LINE_AA,
                )
 
                # Confirmed page overlay
                if _last_confirmed in PAGE_MAP:
                    cv2.putText(
                        frame, f"Page: {PAGE_MAP[_last_confirmed]}",
                        (16, 90), cv2.FONT_HERSHEY_SIMPLEX,
                        0.8, (80, 220, 120), 2, cv2.LINE_AA,
                    )
 
        cv2.imshow("Finger Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
 
    cap.release()
    cv2.destroyAllWindows()
    landmarker.close()
 
 
if __name__ == "__main__":
    main()
