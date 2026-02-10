"use client"

import { Home, BarChart3, Bookmark, User } from "lucide-react"

type Tab = "home" | "stats" | "wishlist" | "profile"

interface BottomNavProps {
  active: Tab
  onTabChange: (tab: Tab) => void
}

export function BottomNav({ active, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as Tab, label: "Home", icon: Home },
    { id: "stats" as Tab, label: "Stats", icon: BarChart3 },
    { id: "wishlist" as Tab, label: "Wishlist", icon: Bookmark },
    { id: "profile" as Tab, label: "Profile", icon: User },
  ]

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-md border-t border-border"
      style={{ zIndex: 50 }}
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around py-2 pb-6">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <tab.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>{tab.label}</span>
              {isActive && <span className="h-1 w-1 rounded-full bg-primary mt-0.5" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
