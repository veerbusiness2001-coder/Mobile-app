"use client"

import { Inbox } from "lucide-react"
import { AppCard } from "@/components/app-card"
import type { TrackedApp, AppStatus } from "@/lib/app-data"

interface AppListProps {
  apps: TrackedApp[]
  onStatusChange: (id: string, status: AppStatus) => void
  onDelete: (id: string) => void
}

export function AppList({ apps, onStatusChange, onDelete }: AppListProps) {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
        <div className="bg-secondary rounded-2xl h-16 w-16 flex items-center justify-center mb-4">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">No apps found</h3>
        <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="px-5 pb-28 flex flex-col gap-3">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  )
}
