"use client"

import { useEffect, useState } from "react"
import { Smartphone } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"logo" | "fade-out">("logo")

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("fade-out"), 2000)
    const timer2 = setTimeout(() => onComplete(), 2600)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center max-w-md mx-auto transition-opacity duration-500 ${
        phase === "fade-out" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      </div>

      {/* Logo */}
      <div className="relative flex flex-col items-center gap-5">
        <div
          className={`h-20 w-20 rounded-3xl bg-primary/15 border border-primary/20 flex items-center justify-center transition-all duration-700 ${
            phase === "logo" ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        >
          <Smartphone className="h-10 w-10 text-primary" />
        </div>

        <div
          className={`flex flex-col items-center gap-1.5 transition-all duration-700 delay-300 ${
            phase === "logo" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <h1 className="text-2xl font-bold text-foreground tracking-tight">AppTrack</h1>
          <p className="text-xs text-muted-foreground">Track. Organize. Manage.</p>
        </div>

        {/* Loading bar */}
        <div className="w-32 h-1 rounded-full bg-secondary overflow-hidden mt-4">
          <div className="h-full bg-primary rounded-full animate-loading-bar" />
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1">
        <p className="text-[10px] text-muted-foreground/60 tracking-widest uppercase">Powered by</p>
        <p className="text-xs font-semibold text-muted-foreground">AppTrack Labs</p>
      </div>
    </div>
  )
}
