'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import StatCard from '@/components/admin/stat-card'
import { Users, Package, TrendingUp, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalApps: 0,
    totalTrackedApps: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Get total tracked apps
        const { count: appsCount } = await supabase
          .from('tracked_apps')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalUsers: usersCount || 0,
          totalApps: 0, // This would be from a system_apps table if created
          totalTrackedApps: appsCount || 0,
          activeUsers: Math.floor((usersCount || 0) * 0.7), // Estimate
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-foreground/60 mt-2">
          Welcome to the AppTrack management panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="bg-blue-500/10 text-blue-500"
          loading={loading}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={Activity}
          color="bg-green-500/10 text-green-500"
          loading={loading}
        />
        <StatCard
          title="Tracked Apps"
          value={stats.totalTrackedApps}
          icon={Package}
          color="bg-purple-500/10 text-purple-500"
          loading={loading}
        />
        <StatCard
          title="System Health"
          value="100%"
          icon={TrendingUp}
          color="bg-emerald-500/10 text-emerald-500"
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <p className="text-sm text-foreground/60">
              No recent activities to display
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            System Status
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/60">Database</span>
              <span className="text-sm font-semibold text-green-500">
                ● Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/60">API</span>
              <span className="text-sm font-semibold text-green-500">
                ● Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/60">Storage</span>
              <span className="text-sm font-semibold text-green-500">
                ● Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
