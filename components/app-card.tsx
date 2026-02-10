"use client"

import React from "react"

import {
  Camera,
  FileText,
  Music,
  BookOpen,
  Hash,
  Play,
  Heart,
  TrendingUp,
  Pen,
  ShoppingBag,
  Lock,
  AtSign,
  Star,
  Clock,
  MoreVertical,
  Trash2,
  Archive,
  Bookmark,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { TrackedApp, AppStatus } from "@/lib/app-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  FileText,
  Music,
  BookOpen,
  Hash,
  Play,
  Heart,
  TrendingUp,
  Pen,
  ShoppingBag,
  Lock,
  AtSign,
}

interface AppCardProps {
  app: TrackedApp
  onStatusChange: (id: string, status: AppStatus) => void
  onDelete: (id: string) => void
}

export function AppCard({ app, onStatusChange, onDelete }: AppCardProps) {
  const Icon = iconMap[app.icon] || FileText
  const hours = Math.floor(app.usageMinutes / 60)
  const minutes = app.usageMinutes % 60

  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3.5 transition-colors hover:border-primary/30">
      <div className={`${app.color} rounded-xl h-12 w-12 flex items-center justify-center shrink-0`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">{app.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{app.developer}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground shrink-0"
                aria-label={`Options for ${app.name}`}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={5} collisionPadding={16} className="bg-card border-border text-foreground w-48">
              {app.status !== "wishlist" && (
                <DropdownMenuItem
                  onClick={() => onStatusChange(app.id, "wishlist")}
                  className="text-foreground focus:bg-secondary focus:text-foreground"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Move to Wishlist
                </DropdownMenuItem>
              )}
              {app.status !== "archived" && (
                <DropdownMenuItem
                  onClick={() => onStatusChange(app.id, "archived")}
                  className="text-foreground focus:bg-secondary focus:text-foreground"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
              )}
              {app.status !== "installed" && (
                <DropdownMenuItem
                  onClick={() => onStatusChange(app.id, "installed")}
                  className="text-foreground focus:bg-secondary focus:text-foreground"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Mark as Installed
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => onDelete(app.id)}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs text-muted-foreground">{app.rating}</span>
          </div>
          {app.usageMinutes > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
              </span>
            </div>
          )}
          <Badge
            variant="secondary"
            className={`text-[10px] h-5 px-1.5 rounded-md font-medium ${
              app.status === "installed"
                ? "bg-primary/15 text-primary"
                : app.status === "wishlist"
                  ? "bg-amber-400/15 text-amber-400"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {app.status === "installed" ? "Installed" : app.status === "wishlist" ? "Wishlist" : "Archived"}
          </Badge>
        </div>
      </div>
    </div>
  )
}
