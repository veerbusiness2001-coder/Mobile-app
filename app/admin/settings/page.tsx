'use client'

import { useState } from 'react'
import { Bell, Lock, Globe, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    appUpdates: true,
    userReports: true,
    maintenanceMode: false,
    apiEndpoint: 'https://api.apptrack.local',
    maxUploadSize: '50MB',
  })

  const [savedMessage, setSavedMessage] = useState('')

  const handleChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setSavedMessage('Settings saved successfully!')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-foreground/60 mt-2">
          Configure system-wide settings and preferences
        </p>
      </div>

      {savedMessage && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-600 dark:text-green-400">
          {savedMessage}
        </div>
      )}

      {/* Notifications Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Notification Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-foreground/60">
                Receive email notifications for important events
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleChange('emailNotifications', e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="font-medium text-foreground">App Updates</p>
              <p className="text-sm text-foreground/60">
                Notify about new app updates and releases
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.appUpdates}
                onChange={(e) => handleChange('appUpdates', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="font-medium text-foreground">User Reports</p>
              <p className="text-sm text-foreground/60">
                Receive notification for user reports and feedback
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.userReports}
                onChange={(e) => handleChange('userReports', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            System Configuration
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg">
            <label className="block text-sm font-medium text-foreground mb-2">
              API Endpoint
            </label>
            <input
              type="text"
              value={settings.apiEndpoint}
              onChange={(e) => handleChange('apiEndpoint', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-foreground/60 mt-1">
              Base URL for API requests
            </p>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Upload Size
            </label>
            <input
              type="text"
              value={settings.maxUploadSize}
              onChange={(e) => handleChange('maxUploadSize', e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-foreground/60 mt-1">
              Maximum file upload size
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="font-medium text-foreground">Maintenance Mode</p>
              <p className="text-sm text-foreground/60">
                Put the system in maintenance mode
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  handleChange('maintenanceMode', e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Security Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-foreground/60">
                  Require 2FA for admin accounts
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                Enabled
              </span>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <p className="font-medium text-foreground mb-3">
              Session Management
            </p>
            <Button variant="outline" className="w-full">
              View Active Sessions
            </Button>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <p className="font-medium text-foreground mb-3">
              API Keys
            </p>
            <Button variant="outline" className="w-full">
              Manage API Keys
            </Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}
