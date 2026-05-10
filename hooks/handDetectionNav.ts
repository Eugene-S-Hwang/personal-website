import { useState, useRef, useCallback, useEffect, RefObject } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useRouter } from "next/navigation";

const MODEL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";

const FINGER_PAIRS = [
    [8,  7],   // index
    [12, 11],  // middle
    [16, 15],  // ring
    [20, 19],  // pinky
];

const HAND_CONNECTIONS = [
    [0,1],[1,2],[2,3],[3,4],        // thumb
    [0,5],[5,6],[6,7],[7,8],        // index
    [0,9],[9,10],[10,11],[11,12],   // middle
    [0,13],[13,14],[14,15],[15,16], // ring
    [0,17],[17,18],[18,19],[19,20], // pinky
    [5,9],[9,13],[13,17],           // palm
];

const PAGES = ["/", "/activities", "/blog", "/contact"];
const numbers = [1, 2, 3, 4]

const PAGES_MAP = new Map<number, string>();

for(const n of numbers){
    PAGES_MAP.set(n, PAGES[n - 1]);
}

function count_fingers(landmarks: {x: number; y: number; z: number }[], handedness: string) : number {
    let fingers = 0

    if (handedness === "Right"){
        if (landmarks[4].x > landmarks[5].x){
            fingers += 1
        }
    }
    else{
        if (landmarks[4].x < landmarks[5].x){
            fingers += 1
        }
    }
        
 
    // Four fingers — tip.y < pip.y means finger is raised
    for (const [tip_idx, pip_idx] of FINGER_PAIRS){
        if (landmarks[tip_idx].y < landmarks[pip_idx].y){
            fingers += 1
        }
    }
        
    return fingers
}

const DEBOUNCE_FRAMES = 8;

interface UseFingerDetectionReturn {
    fingerCount: number | null;   // null = no hand detected
    isRunning: boolean;
    enable: () => void;
    disable: () => void;
    error: string | null;
    videoElRef: RefObject<HTMLVideoElement | null>;
}

export function useFingerDetection() : UseFingerDetectionReturn {
    const [fingerCount, setFingerCount] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const landmarkerRef   = useRef<HandLandmarker | null>(null);
    const videoRef        = useRef<HTMLVideoElement | null>(null);
    const rafRef          = useRef<number | null>(null);
    const candidateRef    = useRef<number>(0);
    const streakRef       = useRef<number>(0);
    const lastConfirmed   = useRef<number | null>(null);
    const router = useRouter();

    const videoElRef = useRef<HTMLVideoElement | null>(null);
    
    const initLandmarker = useCallback(async () => {
        if(landmarkerRef.current) return;

        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        const handLandmarker = await HandLandmarker.createFromOptions(
            vision, {
                baseOptions: { modelAssetPath: MODEL },
                numHands: 1,
                runningMode: "VIDEO",
            }
        );

        landmarkerRef.current = handLandmarker;
    }, []);

    const debounce = useCallback((raw: number) : number | null => {
        if(raw === candidateRef.current){
            streakRef.current += 1;
        } 
        else {
            candidateRef.current = raw;
            streakRef.current    = 1;
        }
    
        if (
        streakRef.current >= DEBOUNCE_FRAMES &&
        candidateRef.current !== lastConfirmed.current
        ) {
            lastConfirmed.current = candidateRef.current;
            streakRef.current     = 0;
            return candidateRef.current;
        }
        return null;
    }, []);

    const detect = useCallback(() => {
        const video     = videoRef.current;
        const landmarker = landmarkerRef.current;
        if (!video || !landmarker || video.readyState < 2) {
            rafRef.current = requestAnimationFrame(detect);
            return;
        }

        const detections = landmarker.detectForVideo(video, performance.now());

        if(detections.landmarks.length > 0){
            const landmarks = detections.landmarks[0];
            const handedness = detections.handedness[0][0].displayName;
            const raw_count = count_fingers(landmarks, handedness);
            const confirmed_count = debounce(raw_count);

            if(confirmed_count !== null){
                setFingerCount(raw_count);
                const newPage = PAGES_MAP.get(confirmed_count);
                if(newPage){
                    router.push(newPage);
                    requestAnimationFrame(enable);
                }
            }
        }
        else{
            candidateRef.current = 0;
            streakRef.current = 0;
            lastConfirmed.current = null;
            setFingerCount(null);
        }

        rafRef.current = requestAnimationFrame(detect);
    }, [debounce]);

    const enable = useCallback(async () => {
        setError(null);

        try {
            await initLandmarker();

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            });

            // const video = document.createElement("video");

            const video = videoElRef.current!;
            video.srcObject = stream;
            video.playsInline = false;
            video.muted = true;
            await video.play();

            videoRef.current = video;
            setIsRunning(true);
            rafRef.current = requestAnimationFrame(detect);
        }
        catch (err) {
            setError(
                err instanceof Error ? err.message : "Could not access webcam."
            );
        }
    }, [initLandmarker, detect]);

    const disable = useCallback(() => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
     
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((t) => t.stop());
          videoRef.current = null;
        }
     
        candidateRef.current  = 0;
        streakRef.current     = 0;
        lastConfirmed.current = null;
     
        setFingerCount(null);
        setIsRunning(false);
    }, []);

    useEffect(() => {
        return () => disable();
    }, [disable]);

    return { fingerCount, isRunning, enable, disable, error, videoElRef };
}




// await handLandmarker.setOptions({ runningMode: "VIDEO" });

// let lastVideoTime = -1;
// function renderLoop(): void {
//     const video = document.getElementById("video");

//     if (video.currentTime !== lastVideoTime) {
//         const detections = handLandmarker.detectForVideo(video);
//         processResults(detections);
//         lastVideoTime = video.currentTime;
//     }

//     requestAnimationFrame(() => {
//         renderLoop();
//     });
// }