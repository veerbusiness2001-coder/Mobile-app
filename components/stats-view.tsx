"use client"

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts"
import type { TrackedApp } from "@/lib/app-data"

interface StatsViewProps {
  apps: TrackedApp[]
}

export function StatsView({ apps }: StatsViewProps) {
  const installed = apps.filter((a) => a.status === "installed")
  const topApps = [...installed].sort((a, b) => b.usageMinutes - a.usageMinutes).slice(0, 6)
  const totalMinutes = installed.reduce((sum, a) => sum + a.usageMinutes, 0)
  const totalHours = Math.round(totalMinutes / 60)

  const categoryData = installed.reduce<Record<string, number>>((acc, app) => {
    acc[app.category] = (acc[app.category] || 0) + app.usageMinutes
    return acc
  }, {})

  const chartData = Object.entries(categoryData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, minutes]) => ({
      name: name.slice(0, 4),
      hours: Math.round((minutes / 60) * 10) / 10,
    }))

  const barColors = [
    "hsl(152, 60%, 52%)",
    "hsl(200, 70%, 50%)",
    "hsl(35, 90%, 55%)",
    "hsl(340, 75%, 55%)",
    "hsl(280, 65%, 60%)",
  ]

  return (
    <div className="px-5 pb-28">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-foreground">Usage Stats</h2>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
        <p className="text-xs text-muted-foreground mb-1">Total Screen Time</p>
        <p className="text-3xl font-bold text-foreground font-mono">{totalHours}h</p>
        <p className="text-xs text-primary mt-1 font-medium">
          {totalMinutes > 0 ? `${Math.round(totalMinutes / 7)}m / day avg` : "No usage data"}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
        <p className="text-xs text-muted-foreground mb-4">Usage by Category</p>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(0, 0%, 55%)" }}
              />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-xs text-muted-foreground mb-3">Most Used Apps</p>
        <div className="flex flex-col gap-3">
          {topApps.map((app, i) => {
            const hours = Math.floor(app.usageMinutes / 60)
            const minutes = app.usageMinutes % 60
            const percentage = totalMinutes > 0 ? (app.usageMinutes / totalMinutes) * 100 : 0
            return (
              <div key={app.id} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 font-mono">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground truncate">{app.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">
                      {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: barColors[i % barColors.length],
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
