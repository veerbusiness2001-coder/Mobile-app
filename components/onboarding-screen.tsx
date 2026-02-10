"use client"

import { useState } from "react"
import { Smartphone, BarChart3, Bell, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    icon: Smartphone,
    title: "Track Every App",
    description: "Keep tabs on all your installed apps, wishlisted favorites, and archived history in one organized place.",
    color: "bg-primary/15",
    iconColor: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description: "Get detailed screen time analytics, usage patterns, and weekly reports to understand your digital habits.",
    color: "bg-chart-2/15",
    iconColor: "text-[hsl(var(--chart-2))]",
  },
  {
    icon: Bell,
    title: "Stay Updated",
    description: "Receive notifications about app updates, price drops on wishlisted apps, and weekly usage summaries.",
    color: "bg-chart-3/15",
    iconColor: "text-[hsl(var(--chart-3))]",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All your data stays on your device. No cloud tracking, no third-party sharing. Your data, your control.",
    color: "bg-chart-4/15",
    iconColor: "text-[hsl(var(--chart-4))]",
  },
]

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const slide = slides[currentSlide]
  const SlideIcon = slide.icon
  const isLast = currentSlide === slides.length - 1

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      {/* Skip button */}
      <div className="flex justify-end px-5 pt-12 pb-2 shrink-0">
        {!isLast && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-secondary/80"
          >
            Skip
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        {/* Illustration area */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`h-48 w-48 rounded-full ${slide.color} blur-3xl opacity-50`} />
          </div>
          <div className={`relative h-32 w-32 rounded-[2rem] ${slide.color} border border-border/50 flex items-center justify-center`}>
            <SlideIcon className={`h-16 w-16 ${slide.iconColor}`} />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-3 text-center animate-slide-up" key={currentSlide}>
          <h2 className="text-2xl font-bold text-foreground tracking-tight text-balance">{slide.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] text-pretty">{slide.description}</p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-8 pb-10 pt-6 flex flex-col gap-6 shrink-0">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Action button */}
        <Button
          onClick={handleNext}
          className="w-full h-12 rounded-2xl text-sm font-semibold gap-2"
          size="lg"
        >
          {isLast ? "Get Started" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
