"use client";

import { useFingerDetection } from "@/hooks/handDetectionNav";

interface FingerNavProps {
    onNavigate: (viewId: string) => void;
}

export default function FingerNav( { onNavigate } : FingerNavProps) {
  const { fingerCount, isRunning, enable, disable, error, videoElRef } =
    useFingerDetection(onNavigate);
 
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2">
        <video
            ref={videoElRef}
            className={[
            "rounded-xl w-48 aspect-video object-cover shadow-md",
            isRunning ? "block" : "hidden",
            ].join(" ")}
            playsInline
            muted
        />

        {/* Finger count readout — only shown when running */}
        {isRunning && (
            <div className="font-mono text-xs tracking-widest uppercase text-neutral-400 bg-white border border-black/[0.08] rounded-lg px-3 py-2 shadow-sm">
            {fingerCount !== null ? `✋ ${fingerCount} finger${fingerCount === 1 ? "" : "s"}` : "no hand detected"}
            </div>
        )}
    
        {/* Error message */}
        {error && (
            <div className="font-mono text-xs text-red-400 bg-white border border-red-100 rounded-lg px-3 py-2 shadow-sm max-w-48 text-right">
            {error}
            </div>
        )}
    
        {/* Toggle button */}
        <button
            onClick={isRunning ? disable : enable}
            className={[
            "font-mono text-[11px] tracking-widest uppercase font-medium px-4 py-2 rounded-lg border transition-colors duration-150 shadow-sm cursor-pointer",
            isRunning
                ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-700"
                : "bg-white text-neutral-900 border-black/20 hover:bg-neutral-100",
            ].join(" ")}
        >
            {isRunning ? "● detecting" : "finger nav"}
        </button>
 
    </div>
  );
}