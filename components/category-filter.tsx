"use client"

import React from "react"

import {
  Users,
  Zap,
  Play,
  Heart,
  DollarSign,
  BookOpen,
  ShoppingBag,
  Settings,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AppCategory } from "@/lib/app-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Zap,
  Play,
  Heart,
  DollarSign,
  BookOpen,
  ShoppingBag,
  Settings,
}

interface CategoryFilterProps {
  selected: AppCategory | "All"
  onSelect: (category: AppCategory | "All") => void
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const categories: { name: AppCategory | "All"; icon: string }[] = [
    { name: "All", icon: "LayoutGrid" },
    { name: "Social", icon: "Users" },
    { name: "Productivity", icon: "Zap" },
    { name: "Entertainment", icon: "Play" },
    { name: "Health", icon: "Heart" },
    { name: "Finance", icon: "DollarSign" },
    { name: "Education", icon: "BookOpen" },
    { name: "Shopping", icon: "ShoppingBag" },
    { name: "Utilities", icon: "Settings" },
  ]

  return (
    <div className="px-5 pb-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by category">
        {categories.map((cat) => {
          const isSelected = selected === cat.name
          const Icon = cat.icon === "LayoutGrid" ? LayoutGrid : iconMap[cat.icon]
          return (
            <Button
              key={cat.name}
              role="tab"
              aria-selected={isSelected}
              variant={isSelected ? "default" : "secondary"}
              size="sm"
              className={`rounded-full shrink-0 gap-1.5 text-xs font-medium h-8 px-3 ${
                isSelected
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-border"
              }`}
              onClick={() => onSelect(cat.name)}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {cat.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
