# Preview & Testing Guide

## 🎬 How to View the Preview

### In v0.dev
1. Click the **"Preview"** button at the top right of the code block
2. The app will open in a new preview window
3. You'll see the splash screen → onboarding → auth → main app flow

### Local Development
```bash
npm install
npm run dev
```
Then open `http://localhost:3000` in your browser

## 🔍 What You Can Test

### Main App (No Backend Required)
- Splash screen animation
- Onboarding flow
- Auth screen (mock)
- App list display
- Search functionality
- Category filtering
- Stats view
- Profile/settings
- Theme switching
- Notifications

### Admin Panel (Requires Backend Setup)
- Navigate to `http://localhost:3000/admin`
- Dashboard with statistics
- User management
- App database management
- Analytics and charts
- Settings panel

## 📋 Testing Checklist

### Main App Flow
- [ ] Splash screen loads
- [ ] Onboarding slides work
- [ ] Auth screen accepts input
- [ ] Apps display correctly
- [ ] Search filters apps
- [ ] Category filter works
- [ ] Stats page loads
- [ ] Profile page accessible
- [ ] Theme toggle works
- [ ] Notifications panel opens

### Admin Panel (After Backend Setup)
- [ ] Can access `/admin` as admin user
- [ ] Dashboard shows stats
- [ ] Can search users
- [ ] Can change user roles
- [ ] Can add new apps
- [ ] Can delete apps
- [ ] Analytics charts load
- [ ] Settings page works
- [ ] Mobile responsive

## 🚀 Quick Start Testing

### Without Backend (Works Now)
1. Open preview
2. Click through splash screen
3. Complete onboarding
4. Try the auth screen
5. Browse apps
6. Test search and filters
7. Check stats view
8. Try profile settings

### With Backend Setup (After Configuration)
1. Configure Supabase
2. Run database migrations
3. Create admin account
4. Access `/admin`
5. Test admin features
6. Manage users and apps

## 🔧 Backend Setup for Full Testing

To test the admin panel:

### Step 1: Configure Supabase
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Step 2: Create Database
Execute `scripts/001_create_tables.sql` in Supabase

### Step 3: Create Admin User
1. Sign up in the app
2. Set role to 'admin' in Supabase
3. Access `/admin`

## 🎨 UI Components to Check

### Splash Screen
- Smooth loading animation
- Logo display
- Skip button functionality

### Onboarding
- Carousel working
- Slide transitions smooth
- Navigation buttons functional

### Auth Screen
- Form validation
- Input handling
- Button states

### App List
- App cards render correctly
- Icons display properly
- Status badges show correctly
- Colors apply properly

### Admin Dashboard
- Stats cards load
- Charts render
- Tables display data
- Navigation works

## 📊 Data to Inspect

### Main App (Sample Data)
- 12 sample apps
- 8 categories
- Various statuses
- Different ratings
- Usage statistics

### Admin (Real Data)
- User profiles
- Tracked apps
- Support messages
- Category breakdown

## 🔐 Testing Authentication

### Main App Auth (Mock)
```
Email: any email
Password: any password
Starts onboarding after auth
```

### Admin Auth (Supabase)
```
Requires real Supabase account
Must have role: 'admin'
Credentials stored in database
```

## 🌐 Testing Different Views

### Mobile View
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Test responsive design

### Tablet View
1. Open DevTools
2. Select iPad or tablet device
3. Check layout adjustments

### Desktop View
1. Full-size browser window
2. Test full layout
3. Check hover states

## 🎯 Feature Testing

### Search
- Type app names
- Type developer names
- Clear search
- No results state

### Filters
- Select categories
- Filter wishlist
- Combine search + filter
- Reset filters

### Stats
- Verify calculations
- Check data accuracy
- View trends
- Compare metrics

### Settings
- Toggle theme
- Change notifications
- Adjust preferences
- Check persistence

## 🐛 Known Limitations (Before Backend)

Currently without Supabase:
- Data resets on refresh
- No real authentication
- No user persistence
- Sample data only
- Admin panel not functional

These are normal and expected until backend is configured.

## ✅ After Backend Setup

Once Supabase is configured:
- Real user authentication
- Persistent data
- Admin panel functional
- User management
- Analytics working
- Database-backed

## 📸 Screenshots to Check

- [ ] Splash screen shows correctly
- [ ] Onboarding carousel displays
- [ ] Auth form validates input
- [ ] App cards show with colors
- [ ] Search results update
- [ ] Stats view shows charts
- [ ] Admin dashboard loads
- [ ] User table displays
- [ ] Analytics charts render
- [ ] Settings page loads

## 🔄 Refresh & State

### Testing State Persistence
1. Make changes in app
2. Refresh page
3. **Note:** Changes reset without backend
4. With backend: Changes persist

### Testing Navigation
1. Navigate between tabs
2. Go back/forward
3. Refresh on different pages
4. Check state preservation

## 📝 Testing Notes

Record your observations:
- [ ] All features working?
- [ ] Any errors in console?
- [ ] UI looks correct?
- [ ] Responsive design OK?
- [ ] Performance acceptable?
- [ ] Theme switching smooth?

## 🚀 Next Steps

1. ✅ Test main app flow
2. ⏳ Setup Supabase backend
3. ⏳ Test admin panel
4. ⏳ Test data persistence
5. ⏳ Deploy to production

---

**Ready to test?** Open the preview and start exploring!
