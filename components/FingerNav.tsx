"use client";

import { useState } from "react";
import { useFingerDetection } from "@/hooks/handDetectionNav";

interface FingerNavProps {
    onNavigate: (viewId: string) => void;
}

export default function FingerNav( { onNavigate } : FingerNavProps) {
  const { fingerCount, isRunning, enable, disable, error, videoElRef } =
    useFingerDetection(onNavigate);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    if (isRunning) {
      disable();
    } else {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    enable();
  };

  return (
    <>
      <style>{`
        .font-mono-dm { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

      {showConfirm && (
        <div
          className="font-mono-dm fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-full max-w-sm border border-black/[0.08] bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-[0.75rem] uppercase tracking-widest text-neutral-900">
              Enable finger navigation?
            </h2>
            <p className="mb-6 text-xs leading-relaxed text-neutral-500">
              This will turn on your webcam and let you navigate by holding up
              fingers.
            </p>
            <ul className="mb-6 text-xs leading-relaxed text-neutral-500">
                <li>1 Finger → Home Page</li>
                <li>2 Finger → Activities Page</li>
                <li>3 Finger → Blog Page</li>
                <li>4 Finger → Projects Page</li>
                <li>5 Finger → Contacts Page</li>
            </ul>
            <p className="mb-6 text-xs leading-relaxed text-neutral-500">
              This feature will not store your webcam footage in any way. 
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="cursor-pointer border border-black/20 bg-white px-4 py-2 text-[0.65rem] uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="cursor-pointer border border-neutral-900 bg-neutral-900 px-4 py-2 text-[0.65rem] uppercase tracking-widest text-white transition-colors hover:bg-neutral-700"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="font-mono-dm fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <video
            ref={videoElRef}
            className={[
            "aspect-video w-48 border border-black/[0.08] object-cover shadow-sm",
            isRunning ? "block" : "hidden",
            ].join(" ")}
            playsInline
            muted
        />

        {/* Finger count readout — only shown when running */}
        {isRunning && (
            <div className="border border-black/[0.08] bg-white px-3 py-2 text-[0.65rem] uppercase tracking-widest text-neutral-400 shadow-sm">
            {fingerCount !== null ? `✋ ${fingerCount} finger${fingerCount === 1 ? "" : "s"}` : "no hand detected"}
            </div>
        )}
    
        {/* Error message */}
        {error && (
            <div className="max-w-48 border border-red-100 bg-white px-3 py-2 text-right text-[0.65rem] text-red-400 shadow-sm">
            {error}
            </div>
        )}
    
        {/* Toggle button */}
        <button
            onClick={handleToggle}
            className={[
            "cursor-pointer border px-4 py-2 text-[0.65rem] uppercase tracking-widest shadow-sm transition-all duration-150",
            isRunning
                ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700"
                : "border-black/20 bg-white text-neutral-900 hover:bg-neutral-100",
            ].join(" ")}
        >
            {isRunning ? "● detecting" : "Enable Finger Navigation"}
        </button>
 
      </div>
    </>
  );
}
