'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalApps: number
  avgUsagePerUser: number
  topCategories: Array<{ name: string; value: number }>
  userGrowth: Array<{ month: string; users: number }>
}

export default function AnalyticsPage() {
  const supabase = createClient()
  const [data, setData] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    totalApps: 0,
    avgUsagePerUser: 0,
    topCategories: [],
    userGrowth: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [supabase])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Get total apps
      const { count: totalApps, data: appsData } = await supabase
        .from('tracked_apps')
        .select('*')

      // Get category breakdown
      const categoryStats = appsData?.reduce(
        (acc: Record<string, number>, app) => {
          acc[app.category] = (acc[app.category] || 0) + 1
          return acc
        },
        {}
      )

      const topCategories = Object.entries(categoryStats || {})
        .map(([name, value]) => ({ name, value: value as number }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)

      // Mock user growth data
      const userGrowth = [
        { month: 'Jan', users: 40 },
        { month: 'Feb', users: 65 },
        { month: 'Mar', users: 85 },
        { month: 'Apr', users: 120 },
        { month: 'May', users: 145 },
        { month: 'Jun', users: totalUsers || 0 },
      ]

      setData({
        totalUsers: totalUsers || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.75),
        totalApps: totalApps || 0,
        avgUsagePerUser: 240, // Mock data
        topCategories,
        userGrowth,
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const colors = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-foreground/60">Loading analytics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics & Reports
          </h1>
          <p className="text-foreground/60 mt-2">
            System usage and performance metrics
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-foreground/60">Total Users</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {data.totalUsers}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-foreground/60">Active Users</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {data.activeUsers}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-foreground/60">Total Apps</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {data.totalApps}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm font-medium text-foreground/60">
            Avg Usage/User
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {data.avgUsagePerUser}m
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            User Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                }}
              />
              <Bar dataKey="users" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Top App Categories
          </h2>
          {data.topCategories.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.topCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.topCategories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f3f4f6',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-foreground/60 text-center py-12">
              No data available
            </p>
          )}
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Category Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Apps Count
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {data.topCategories.map((cat) => (
                <tr key={cat.name} className="border-b border-border">
                  <td className="px-4 py-3 text-foreground">{cat.name}</td>
                  <td className="px-4 py-3 text-foreground">{cat.value}</td>
                  <td className="px-4 py-3 text-foreground/70">
                    {((cat.value / data.totalApps) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
