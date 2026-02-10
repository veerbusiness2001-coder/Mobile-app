'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Edit, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddAppModal from '@/components/admin/add-app-modal'

interface TrackedApp {
  id: string
  user_id: string
  name: string
  developer: string
  category: string
  status: string
  rating: number
  usage_minutes: number
  icon: string
  color: string
  created_at: string
}

export default function AppsPage() {
  const supabase = createClient()
  const [apps, setApps] = useState<TrackedApp[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const categories = [
    'all',
    'Social',
    'Productivity',
    'Entertainment',
    'Health',
    'Finance',
    'Education',
    'Shopping',
    'Utilities',
  ]

  useEffect(() => {
    fetchApps()
  }, [supabase])

  const fetchApps = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tracked_apps')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setApps(data || [])
    } catch (error) {
      console.error('Error fetching apps:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteApp = async (appId: string) => {
    if (!confirm('Are you sure you want to delete this app?')) return

    try {
      const { error } = await supabase
        .from('tracked_apps')
        .delete()
        .eq('id', appId)

      if (error) throw error
      fetchApps()
    } catch (error) {
      console.error('Error deleting app:', error)
    }
  }

  const filteredApps = apps.filter(
    (app) =>
      (selectedCategory === 'all' || app.category === selectedCategory) &&
      (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.developer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Apps Database</h1>
          <p className="text-foreground/60 mt-2">
            Manage all tracked applications
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add App
        </Button>
      </div>

      <AddAppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAppAdded={fetchApps}
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/40" />
          <input
            type="text"
            placeholder="Search apps by name or developer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center">
            <p className="text-foreground/60">Loading apps...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="col-span-full p-8 text-center">
            <p className="text-foreground/60">No apps found</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`${app.color} rounded-lg w-12 h-12 flex items-center justify-center shrink-0`}>
                    <span className="text-lg text-white font-semibold">
                      {app.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {app.name}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {app.developer}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Category:</span>
                  <span className="text-foreground font-medium">
                    {app.category}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Status:</span>
                  <span className={`text-sm font-semibold ${
                    app.status === 'installed'
                      ? 'text-green-600 dark:text-green-400'
                      : app.status === 'wishlist'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Rating:</span>
                  <span className="text-foreground font-medium">
                    {app.rating} ⭐
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  disabled
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:bg-red-500/10"
                  onClick={() => handleDeleteApp(app.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
