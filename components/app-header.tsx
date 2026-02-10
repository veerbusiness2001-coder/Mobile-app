"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  onSearchToggle: () => void
  onNotificationsToggle: () => void
  unreadCount: number
  appCount: number
}

export function AppHeader({ onSearchToggle, onNotificationsToggle, unreadCount, appCount }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-12 pb-4">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">AppTrack</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{appCount} apps tracked</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
          onClick={onSearchToggle}
          aria-label="Search apps"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary relative"
          onClick={onNotificationsToggle}
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
