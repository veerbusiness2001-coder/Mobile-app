"use client"

import { Clock, Download, Star, Smartphone } from "lucide-react"
import type { TrackedApp } from "@/lib/app-data"

interface StatsCardsProps {
  apps: TrackedApp[]
}

export function StatsCards({ apps }: StatsCardsProps) {
  const installed = apps.filter((a) => a.status === "installed")
  const totalUsage = installed.reduce((sum, a) => sum + a.usageMinutes, 0)
  const avgRating = installed.length > 0
    ? (installed.reduce((sum, a) => sum + a.rating, 0) / installed.length).toFixed(1)
    : "0"
  const totalSize = installed.reduce((sum, a) => sum + Number.parseInt(a.size), 0)

  const stats = [
    {
      label: "Installed",
      value: installed.length.toString(),
      icon: Smartphone,
      accent: "text-primary",
    },
    {
      label: "Screen Time",
      value: `${Math.round(totalUsage / 60)}h`,
      icon: Clock,
      accent: "text-sky-400",
    },
    {
      label: "Avg Rating",
      value: avgRating,
      icon: Star,
      accent: "text-amber-400",
    },
    {
      label: "Storage",
      value: `${(totalSize / 1024).toFixed(1)}GB`,
      icon: Download,
      accent: "text-rose-400",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 px-5 pb-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-3 flex flex-col items-center gap-1.5 border border-border"
        >
          <stat.icon className={`h-4 w-4 ${stat.accent}`} />
          <span className="text-base font-bold text-foreground">{stat.value}</span>
          <span className="text-[10px] text-muted-foreground leading-tight text-center">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
