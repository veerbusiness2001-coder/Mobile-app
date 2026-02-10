# AppTrack - Quick Start Guide

## Preview the App

The app is now ready to preview! You should see the main mobile app interface with:
- **Splash Screen** - Initial loading screen with AppTrack branding
- **Onboarding** - Feature walkthrough (swipe through to continue)
- **Auth Screen** - Login/signup screen (local demo)
- **Main App** - Full mobile app tracker interface

## Features in the Main App

### Home Tab
- View all tracked apps with usage statistics
- Search for apps by name or developer
- Filter by app categories
- Mark apps as installed, wishlist, or archived
- Delete apps from your list

### Stats Tab
- View detailed usage analytics
- See total hours spent on apps
- Category breakdown with charts
- Usage trends over time

### Wishlist Tab
- View apps you want to try
- Convert to tracked apps

### Profile Tab
- View your profile information
- Toggle notifications
- Logout option
- See app statistics

## Admin Panel (Backend)

Access the admin panel at `/admin` to manage the entire system:

### Admin Dashboard
- View total users, apps, and usage statistics
- Recent activity overview
- System health metrics

### User Management (`/admin/users`)
- View all registered users
- Change user roles (user/admin)
- Delete users
- Sort and search users

### App Database (`/admin/apps`)
- Add new apps to the system database
- View all available apps
- Delete apps
- Edit app details (name, developer, category)
- Filter by category

### Analytics (`/admin/analytics`)
- User growth trends
- App usage statistics
- Category breakdown
- User activity charts
- Export data (ready to implement)

### Settings (`/admin/settings`)
- Configure app categories
- Manage notification settings
- System preferences
- Feature toggles

## Environment Setup (Required for Backend)

To use the backend features, you need to set up Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your Supabase URL and Anon Key
3. Add them to your `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
4. Run the database migration from `scripts/001_create_tables.sql` in your Supabase SQL editor
5. Create an admin user and set their role to "admin" in the profiles table

## Current Limitations

The main app currently uses **local state** (in-memory data). To persist data:
- Implement Supabase integration in the main app
- Update state management to use Supabase queries
- Add real authentication with Supabase Auth

The admin panel is **fully functional** with Supabase integration already in place.

## Architecture

```
app/
├── page.tsx              # Main mobile app (splash, onboarding, auth, app phases)
├── layout.tsx            # Root layout
└── admin/                # Admin panel routes
    ├── layout.tsx        # Admin layout with auth check
    ├── page.tsx          # Dashboard
    ├── users/page.tsx    # User management
    ├── apps/page.tsx     # App database management
    ├── analytics/page.tsx # Analytics & reports
    └── settings/page.tsx # System settings

components/
├── splash-screen.tsx     # Splash screen
├── onboarding-screen.tsx # Onboarding flow
├── auth-screen.tsx       # Login/signup
├── app-header.tsx        # Main app header
├── search-bar.tsx        # Search functionality
├── app-list.tsx          # List of apps
├── stats-view.tsx        # Analytics view
├── profile-view.tsx      # User profile
└── admin/                # Admin components
    ├── admin-nav.tsx     # Admin sidebar
    ├── stat-card.tsx     # Stat card component
    └── add-app-modal.tsx # Add app modal

lib/
├── app-data.ts          # Sample data and types
└── supabase/            # Supabase client setup
    ├── client.ts
    ├── server.ts
    └── middleware.ts
```

## Next Steps

1. **Test the mobile app** - Go through splash screen, onboarding, and auth
2. **Setup Supabase** - Follow environment setup above
3. **Test admin panel** - Create admin user and access `/admin`
4. **Integrate main app** - Connect main app to Supabase data
5. **Deploy** - Use the Publish button to deploy to Vercel

Enjoy AppTrack! 🚀
