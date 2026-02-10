"use client"

import { useState, useEffect } from "react"
import { X, Download, AlertTriangle, TrendingUp, Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export interface AppNotification {
  id: string
  title: string
  message: string
  time: string
  type: "update" | "alert" | "milestone" | "recommendation" | "info"
  read: boolean
}

const defaultNotifications: AppNotification[] = [
  {
    id: "1",
    title: "App Update Available",
    message: "Notion has a new version (3.2.1) ready to install.",
    time: "5 min ago",
    type: "update",
    read: false,
  },
  {
    id: "2",
    title: "Screen Time Alert",
    message: "You've used Instagram for over 2 hours today.",
    time: "32 min ago",
    type: "alert",
    read: false,
  },
  {
    id: "3",
    title: "Usage Milestone",
    message: "Spotify has reached 300+ minutes of usage this week!",
    time: "1 hr ago",
    type: "milestone",
    read: false,
  },
  {
    id: "4",
    title: "New Recommendation",
    message: "Based on your apps, you might like Obsidian.",
    time: "3 hr ago",
    type: "recommendation",
    read: true,
  },
  {
    id: "5",
    title: "Weekly Summary Ready",
    message: "Your app usage report for this week is available.",
    time: "1 day ago",
    type: "info",
    read: true,
  },
]

const iconMap = {
  update: Download,
  alert: AlertTriangle,
  milestone: TrendingUp,
  recommendation: Star,
  info: CheckCircle2,
}

const colorMap = {
  update: "text-sky-400 bg-sky-400/15",
  alert: "text-amber-400 bg-amber-400/15",
  milestone: "text-primary bg-primary/15",
  recommendation: "text-rose-400 bg-rose-400/15",
  info: "text-muted-foreground bg-muted",
}

interface NotificationPanelProps {
  open: boolean
  onClose: () => void
  onUnreadCountChange: (count: number) => void
  enabled: boolean
}

export function NotificationPanel({ open, onClose, onUnreadCountChange, enabled }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>(defaultNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    onUnreadCountChange(unreadCount)
  }, [unreadCount, onUnreadCountChange])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-card border border-border rounded-t-3xl max-h-[75vh] flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-primary hover:text-primary hover:bg-primary/10 h-8 px-3"
                onClick={markAllRead}
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary"
              onClick={onClose}
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator className="bg-border" />
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {!enabled ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">Notifications are off</p>
              <p className="text-xs text-muted-foreground mt-1">Turn them on in Profile settings.</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">All caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">No notifications at the moment.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {notifications.map((notification) => {
                const Icon = iconMap[notification.type]
                const colors = colorMap[notification.type]
                return (
                  <div
                    key={notification.id}
                    role="button"
                    tabIndex={0}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                      notification.read ? "opacity-60" : ""
                    } hover:bg-secondary/50`}
                    onClick={() => markRead(notification.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        markRead(notification.id)
                      }
                    }}
                  >
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${colors}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-foreground truncate">{notification.title}</h4>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-muted-foreground">{notification.time}</span>
                        <button
                          type="button"
                          className="text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            dismiss(notification.id)
                          }}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
