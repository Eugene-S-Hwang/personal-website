"use client";

import { createContext, useContext } from "react";
import { useFingerDetection } from "@/hooks/handDetectionNav";

const FingerDetectionContext = createContext<ReturnType<typeof useFingerDetection> | null>(null);

export function FingerDetectionProvider({ children }: { children: React.ReactNode }) {
    const detection = useFingerDetection();
    return (
        <FingerDetectionContext.Provider value={detection}>
            {children}
        </FingerDetectionContext.Provider>
    );
}

export function useFingerDetectionContext() {
    const ctx = useContext(FingerDetectionContext);
    if (!ctx) throw new Error("useFingerDetectionContext must be used within FingerDetectionProvider");
    return ctx;
}