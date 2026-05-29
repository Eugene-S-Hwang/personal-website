"use client";

import { useFingerDetection } from "@/hooks/handDetectionNav";

interface FingerNavProps {
    onNavigate: (viewId: string) => void;
}

export default function FingerNav( { onNavigate } : FingerNavProps) {
  const { fingerCount, isRunning, enable, disable, error, videoElRef } =
    useFingerDetection(onNavigate);
 
  return (
    <>
      <style>{`
        .font-mono-dm { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

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
            onClick={isRunning ? disable : enable}
            className={[
            "cursor-pointer border px-4 py-2 text-[0.65rem] uppercase tracking-widest shadow-sm transition-all duration-150",
            isRunning
                ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700"
                : "border-black/20 bg-white text-neutral-900 hover:bg-neutral-100",
            ].join(" ")}
        >
            {isRunning ? "● detecting" : "finger nav"}
        </button>
 
      </div>
    </>
  );
}
