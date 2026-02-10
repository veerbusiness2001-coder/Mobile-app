"use client"

import React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { AppCategory, AppStatus, TrackedApp } from "@/lib/app-data"
import { categories } from "@/lib/app-data"

interface AddAppDialogProps {
  onAdd: (app: TrackedApp) => void
}

const appIcons = ["Camera", "FileText", "Music", "BookOpen", "Hash", "Play", "Heart", "TrendingUp", "Pen", "ShoppingBag", "Lock", "AtSign"]
const appColors = ["bg-pink-500", "bg-sky-500", "bg-emerald-500", "bg-orange-500", "bg-red-500", "bg-amber-500", "bg-blue-500", "bg-green-500"]

export function AddAppDialog({ onAdd }: AddAppDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [developer, setDeveloper] = useState("")
  const [category, setCategory] = useState<AppCategory>("Productivity")
  const [status, setStatus] = useState<AppStatus>("installed")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newApp: TrackedApp = {
      id: Date.now().toString(),
      name: name.trim(),
      developer: developer.trim() || "Unknown",
      category,
      status,
      rating: 0,
      usageMinutes: 0,
      icon: appIcons[Math.floor(Math.random() * appIcons.length)],
      color: appColors[Math.floor(Math.random() * appColors.length)],
      lastUsed: "Never",
      size: `${Math.floor(Math.random() * 400 + 50)} MB`,
    }

    onAdd(newApp)
    setName("")
    setDeveloper("")
    setCategory("Productivity")
    setStatus("installed")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-24 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
          style={{ zIndex: 40, right: "max(1rem, calc(50% - 224px + 1rem))" }}
          aria-label="Add new app"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground w-[calc(100%-2.5rem)] max-w-[calc(28rem-2.5rem)] rounded-2xl p-5">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New App</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Fill in the details below to track a new app.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="app-name" className="text-sm text-foreground">App Name</Label>
            <Input
              id="app-name"
              placeholder="e.g. Notion"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="developer" className="text-sm text-foreground">Developer</Label>
            <Input
              id="developer"
              placeholder="e.g. Notion Labs"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-foreground">Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as AppCategory)}>
                <SelectTrigger className="bg-secondary border-border text-foreground rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-foreground focus:bg-secondary focus:text-foreground">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-foreground">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as AppStatus)}>
                <SelectTrigger className="bg-secondary border-border text-foreground rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  <SelectItem value="installed" className="text-foreground focus:bg-secondary focus:text-foreground">Installed</SelectItem>
                  <SelectItem value="wishlist" className="text-foreground focus:bg-secondary focus:text-foreground">Wishlist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-semibold mt-1">
            Add App
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
