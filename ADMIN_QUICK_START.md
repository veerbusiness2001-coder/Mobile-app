# Admin Panel - Quick Start Guide

## 🚀 Access the Admin Panel

### Prerequisites
✅ Supabase project set up
✅ Environment variables configured
✅ Database migrations executed
✅ Admin user created

### Admin Panel URL
```
http://localhost:3000/admin
```

## 📊 Dashboard Pages

### 1. **Dashboard** (`/admin`)
   - View key statistics
   - System health status
   - Quick overview cards

### 2. **User Management** (`/admin/users`)
   - Search and filter users
   - Change user roles
   - Delete users
   - View user details

### 3. **Apps Database** (`/admin/apps`)
   - View all tracked apps
   - Filter by category
   - Add new apps
   - Delete apps

### 4. **Analytics** (`/admin/analytics`)
   - User growth charts
   - Category distribution
   - Detailed statistics
   - Export reports

### 5. **Settings** (`/admin/settings`)
   - Notification preferences
   - System configuration
   - Security settings

## 🔐 Create Admin User (First Time)

1. Sign up a new account in the app
2. Go to your Supabase dashboard
3. Navigate to the `profiles` table
4. Find your user record
5. Change the `role` column from `'user'` to `'admin'`
6. Refresh the app or reload the admin page
7. You should now have access to `/admin`

## 🛠️ Environment Setup

Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## 🗄️ Database Schema

The system creates three main tables:

**profiles** - User accounts
- id (UUID)
- full_name (TEXT)
- email (TEXT)
- role (TEXT: 'user' or 'admin')
- created_at, updated_at (TIMESTAMPS)

**tracked_apps** - App tracking data
- id (UUID)
- user_id (UUID)
- name, developer (TEXT)
- category, status (TEXT)
- rating, usage_minutes (NUMERIC/INTEGER)
- color, icon (TEXT)
- created_at, updated_at (TIMESTAMPS)

**support_messages** - Support chat
- id (UUID)
- user_id (UUID)
- message (TEXT)
- sender ('user' or 'admin')
- is_read (BOOLEAN)
- created_at (TIMESTAMP)

## 🔒 Security

✅ Row Level Security (RLS) enabled
✅ Users can only access their own data
✅ Admins can access all data
✅ Email/password authentication
✅ Session management with middleware
✅ Admin routes protected

## ⚡ Features

### User Management
- Search users
- Change roles
- Delete accounts
- View join dates

### App Management
- Add new apps
- Delete apps
- Filter by category
- Search by name/developer
- View app details

### Analytics
- User growth trends
- App category pie chart
- Key metrics
- Category breakdown

### Settings
- Toggle notifications
- Configure API endpoints
- Maintenance mode
- Security settings

## 🐛 Troubleshooting

### Can't access `/admin`
```
✗ Not logged in
✗ User role not set to 'admin'
✗ Supabase credentials wrong
→ Check profile.role in Supabase
```

### Database errors
```
✗ Tables don't exist
✗ RLS policies missing
✗ Connection issues
→ Run SQL migrations
→ Check Supabase URL/Key
```

### Data not loading
```
✗ User not authenticated
✗ RLS blocking queries
✗ User_id mismatch
→ Check browser console
→ Verify auth session
→ Check database RLS
```

## 📝 Common Tasks

### Add a new app to the system
1. Go to `/admin/apps`
2. Click "Add App"
3. Fill in app details
4. Select category and color
5. Click "Add App"

### Promote user to admin
1. Go to `/admin/users`
2. Find user in list
3. Click edit button
4. Change role to "Admin"
5. Click "Save"

### View analytics
1. Go to `/admin/analytics`
2. View user growth chart
3. Check category distribution
4. View detailed stats table
5. Export report if needed

## 🚀 Next Steps

1. ✅ Configure Supabase
2. ✅ Run database migrations
3. ✅ Create admin user
4. ✅ Test admin features
5. ✅ Deploy to production

## 📚 More Information

See `ADMIN_SETUP.md` for detailed setup instructions
