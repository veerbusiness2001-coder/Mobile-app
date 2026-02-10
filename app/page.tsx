"use client"

import { useState, useMemo, useCallback } from "react"
import { AppHeader } from "@/components/app-header"
import { SearchBar } from "@/components/search-bar"
import { StatsCards } from "@/components/stats-cards"
import { CategoryFilter } from "@/components/category-filter"
import { AppList } from "@/components/app-list"
import { BottomNav } from "@/components/bottom-nav"
import { StatsView } from "@/components/stats-view"
import { ProfileView } from "@/components/profile-view"
import { AddAppDialog } from "@/components/add-app-dialog"
import { NotificationPanel } from "@/components/notification-panel"
import { SplashScreen } from "@/components/splash-screen"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { AuthScreen } from "@/components/auth-screen"
import { sampleApps, type AppCategory, type AppStatus, type TrackedApp } from "@/lib/app-data"

type Tab = "home" | "stats" | "wishlist" | "profile"
type AppPhase = "splash" | "onboarding" | "auth" | "app"

export default function Page() {
  const [phase, setPhase] = useState<AppPhase>("splash")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const [apps, setApps] = useState<TrackedApp[]>(sampleApps)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | "All">("All")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [unreadCount, setUnreadCount] = useState(3)

  const filteredApps = useMemo(() => {
    let filtered = apps

    if (activeTab === "wishlist") {
      filtered = filtered.filter((a) => a.status === "wishlist")
    }

    if (selectedCategory !== "All" && activeTab === "home") {
      filtered = filtered.filter((a) => a.category === selectedCategory)
    }

    if (searchQuery.trim() && activeTab === "home") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.developer.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [apps, activeTab, selectedCategory, searchQuery])

  const handleStatusChange = (id: string, status: AppStatus) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
  }

  const handleDelete = (id: string) => {
    setApps((prev) => prev.filter((app) => app.id !== id))
  }

  const handleLike = (id: string) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, liked: !app.liked } : app)))
  }

  const handleAddApp = (app: TrackedApp) => {
    setApps((prev) => [app, ...prev])
  }

  const handleSplashComplete = useCallback(() => {
    setPhase("onboarding")
  }, [])

  const handleOnboardingComplete = useCallback(() => {
    setPhase("auth")
  }, [])

  const handleLogin = useCallback((userData: { name: string; email: string }) => {
    setUser(userData)
    setPhase("app")
  }, [])

  const handleLogout = useCallback(() => {
    setUser(null)
    setPhase("auth")
  }, [])

  // Phase: Splash screen
  if (phase === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  // Phase: Onboarding
  if (phase === "onboarding") {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />
  }

  // Phase: Auth
  if (phase === "auth") {
    return <AuthScreen onLogin={handleLogin} />
  }

  // Phase: Main app
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      <main className="min-h-screen">
        <AppHeader
        onSearchToggle={() => setSearchOpen(!searchOpen)}
        onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
        unreadCount={notificationsEnabled ? unreadCount : 0}
        appCount={apps.length}
      />

      {searchOpen && (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClose={() => {
            setSearchOpen(false)
            setSearchQuery("")
          }}
        />
      )}

      {activeTab === "home" && (
        <>
          <StatsCards apps={apps} />
          <div className="px-5 mb-3">
            <h2 className="text-sm font-semibold text-foreground">Categories</h2>
          </div>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <div className="flex items-center justify-between px-5 mb-3">
            <h2 className="text-sm font-semibold text-foreground">Your Apps</h2>
            <span className="text-xs text-muted-foreground">{filteredApps.length} apps</span>
          </div>
          <AppList apps={filteredApps} onStatusChange={handleStatusChange} onDelete={handleDelete} onLike={handleLike} />
        </>
      )}

      {activeTab === "stats" && <StatsView apps={apps} />}

      {activeTab === "wishlist" && (
        <>
          <div className="px-5 mb-4">
            <h2 className="text-lg font-bold text-foreground">Wishlist</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Apps you want to try</p>
          </div>
          <AppList apps={filteredApps} onStatusChange={handleStatusChange} onDelete={handleDelete} onLike={handleLike} />
        </>
      )}

      {activeTab === "profile" && (
        <ProfileView
          apps={apps}
          notificationsEnabled={notificationsEnabled}
          onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <NotificationPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onUnreadCountChange={setUnreadCount}
        enabled={notificationsEnabled}
      />
        <AddAppDialog onAdd={handleAddApp} />
        <BottomNav active={activeTab} onTabChange={setActiveTab} />
      </main>
    </div>
  )
}
