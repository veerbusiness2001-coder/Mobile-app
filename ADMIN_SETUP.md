# AppTrack Admin Panel Setup Guide

## Overview

The AppTrack admin panel provides comprehensive management capabilities including:
- **User Management** - View and manage all users, assign roles
- **App Database Management** - Add, edit, delete apps in the system
- **Analytics & Reports** - View usage statistics and app category distribution
- **System Settings** - Configure system-wide settings and preferences

## Backend Setup

### 1. Supabase Configuration

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Add Environment Variables:**
   - Create a `.env.local` file in the project root
   - Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   ```

### 2. Database Schema Setup

Run the SQL migration script in your Supabase dashboard:

**Location:** `scripts/001_create_tables.sql`

**Tables Created:**
- `profiles` - User profiles with role management (user/admin)
- `tracked_apps` - Apps tracked by users with usage statistics
- `support_messages` - Support chat messages

**Features:**
- Row Level Security (RLS) for data protection
- Automatic profile creation on user signup
- Admin access controls

### 3. Create Admin User

To create an admin user:

1. Sign up a new account through the app
2. Go to Supabase dashboard
3. Open the `profiles` table
4. Find your user and change `role` from `'user'` to `'admin'`
5. Log in and access `/admin` route

## Admin Panel Routes

### Dashboard
- **Route:** `/admin`
- **Access:** Admin users only
- **Features:**
  - System statistics (total users, apps, active users)
  - System health status
  - Quick stats overview

### User Management
- **Route:** `/admin/users`
- **Features:**
  - Search users by name or email
  - View user details and join date
  - Change user roles (user ↔ admin)
  - Delete users (with confirmation)

### App Database
- **Route:** `/admin/apps`
- **Features:**
  - View all tracked apps
  - Filter by category
  - Search apps
  - Add new apps to the system
  - Delete apps
  - View app details (name, developer, rating, etc.)

### Analytics & Reports
- **Route:** `/admin/analytics`
- **Features:**
  - User growth chart
  - App category distribution pie chart
  - Key metrics (total users, apps, usage)
  - Category breakdown table
  - Export reports

### Settings
- **Route:** `/admin/settings`
- **Features:**
  - Notification preferences
  - System configuration
  - API endpoint settings
  - Maintenance mode toggle
  - Security settings
  - 2FA and session management

## Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,              -- References auth.users
  full_name TEXT,                   -- User's full name
  email TEXT,                       -- User's email
  role TEXT DEFAULT 'user',         -- 'user' or 'admin'
  created_at TIMESTAMPTZ,           -- Account creation date
  updated_at TIMESTAMPTZ            -- Last update date
);
```

### Tracked Apps Table
```sql
CREATE TABLE tracked_apps (
  id UUID PRIMARY KEY,              -- Unique app ID
  user_id UUID NOT NULL,            -- References auth.users
  name TEXT NOT NULL,               -- App name
  developer TEXT NOT NULL,          -- Developer name
  category TEXT NOT NULL,           -- App category
  status TEXT DEFAULT 'installed',  -- 'installed', 'wishlist', 'archived'
  rating NUMERIC(2,1),              -- User rating (0-5)
  usage_minutes INTEGER DEFAULT 0,  -- Total usage time
  icon TEXT DEFAULT 'Smartphone',   -- Icon type
  color TEXT DEFAULT 'bg-primary',  -- Icon background color
  last_used TEXT,                   -- Last usage date
  size TEXT,                        -- App size
  created_at TIMESTAMPTZ,           -- Date added
  updated_at TIMESTAMPTZ            -- Last update date
);
```

### Support Messages Table
```sql
CREATE TABLE support_messages (
  id UUID PRIMARY KEY,              -- Unique message ID
  user_id UUID NOT NULL,            -- References auth.users
  message TEXT NOT NULL,            -- Message content
  sender TEXT NOT NULL,             -- 'user' or 'admin'
  is_read BOOLEAN DEFAULT false,    -- Read status
  created_at TIMESTAMPTZ            -- Message timestamp
);
```

## Security Features

### Row Level Security (RLS)
- Users can only see their own data
- Admins can see all data
- Data is protected at the database level

### Authentication
- Email/password authentication via Supabase
- Session management with middleware
- Automatic token refresh

### Admin Protection
- Admin routes require authentication
- Role verification on every admin access
- Admin status checked against database role

## Development

### Running Locally
```bash
npm install
npm run dev
```

### Accessing Admin Panel
1. Sign up or login with admin account
2. Navigate to `http://localhost:3000/admin`

### Testing

To test admin features:
1. Create two accounts
2. Make one admin in Supabase dashboard
3. Login as admin and access `/admin` routes
4. Test user management, app management, etc.

## Troubleshooting

### Can't access `/admin`
- Check if user has `role: 'admin'` in profiles table
- Verify Supabase credentials in `.env.local`
- Check browser console for errors

### Database connection error
- Verify Supabase URL and key are correct
- Check if SQL migrations were executed
- Confirm database tables exist

### RLS policy errors
- Ensure user is logged in (has valid session)
- Check RLS policies are properly configured
- Verify user ID matches in policies

## API Reference

### User Management
- `GET /admin/users` - Fetch all users
- `PATCH /admin/users/:id` - Update user role
- `DELETE /admin/users/:id` - Delete user

### App Management
- `GET /admin/apps` - Fetch all apps
- `POST /admin/apps` - Create new app
- `DELETE /admin/apps/:id` - Delete app

### Analytics
- `GET /admin/analytics` - Fetch analytics data
- Stats include: users, apps, growth metrics, category breakdown

## Next Steps

1. Set up Supabase project
2. Run database migrations
3. Create admin user
4. Test admin panel
5. Configure settings as needed
6. Deploy to production

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Check browser console for errors
4. Review database RLS policies
