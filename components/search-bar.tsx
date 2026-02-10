"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

export function SearchBar({ value, onChange, onClose }: SearchBarProps) {
  return (
    <div className="px-5 pb-3 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your apps..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground h-10 rounded-xl focus-visible:ring-primary"
          autoFocus
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="rounded-full text-muted-foreground hover:text-foreground shrink-0"
        aria-label="Close search"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}
