import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  loading?: boolean
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  loading = false,
}: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground/60">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {loading ? (
              <span className="animate-pulse">--</span>
            ) : (
              value
            )}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
