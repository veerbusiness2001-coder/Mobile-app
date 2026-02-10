# Preview Troubleshooting Guide

## Why Isn't the Preview Showing?

If you don't see the preview in the v0 interface, here are the solutions:

### Solution 1: Click the Preview Button
1. Look for the **Version Box** in the top right of your chat
2. Click on it to open the Preview
3. The preview should now display your app

### Solution 2: Wait for Build to Complete
The app needs to build after changes. This usually takes 30-60 seconds.
- Look for a loading indicator in the Version Box
- Wait until it shows "Ready" status
- Then click to open the preview

### Solution 3: Hard Refresh the Preview
1. Open the preview
2. Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. Wait for the page to reload completely

### Solution 4: Check for Build Errors
If the preview still doesn't work, there may be a build error:

1. **Check the console:**
   - Open browser DevTools (F12)
   - Go to the Console tab
   - Look for red error messages

2. **Common errors and fixes:**

   **Error: "Environment variable not found"**
   - The Supabase credentials are missing
   - This is OK for testing the mobile UI (splash, onboarding, auth)
   - To use admin panel, set up Supabase credentials
   - See ADMIN_SETUP.md for instructions

   **Error: "Module not found"**
   - Run `npm install` or `pnpm install`
   - Some dependencies may not have installed automatically

   **Error: "Cannot find component"**
   - Check that all imported components exist
   - Component names must match file names exactly

### Solution 5: Clear Cache and Rebuild
1. Close the preview
2. Wait 10-15 seconds
3. Click the Version Box again to rebuild
4. Open the preview

---

## What Should You See When Preview Works?

### Main Mobile App
You should see a mobile phone frame (or full width on mobile) with:

1. **Splash Screen** (first load)
   - AppTrack logo
   - "Tracking apps made simple" tagline
   - Loading bar animation
   - Auto-advances to onboarding

2. **Onboarding Screen** (after splash)
   - Feature carousel with:
     - Track your apps
     - Manage your library
     - Get insights
     - Organize with wishlist
   - Swipe to navigate
   - "Get Started" button at the end

3. **Auth Screen** (after onboarding)
   - Email input field
   - Password input field
   - Name input field
   - Login/Signup toggle
   - "Continue" button

4. **Main App** (after auth)
   - Header with search and notification icons
   - Stats cards showing:
     - Total apps
     - Total usage
     - Most used app
     - Active categories
   - Categories filter (horizontal scroll)
   - App list with cards
   - Bottom navigation (Home, Stats, Wishlist, Profile)

---

## Preview Features to Test

### Mobile App Features
- [ ] Splash screen displays and auto-advances
- [ ] Onboarding carousel works with swipe
- [ ] Auth form fills and validates
- [ ] Home view shows stats
- [ ] App cards display with icons
- [ ] Category filter works
- [ ] Search functionality works
- [ ] Stats view displays charts
- [ ] Wishlist filtering works
- [ ] Profile view displays user info
- [ ] Bottom navigation tabs switch views
- [ ] Notifications panel opens/closes
- [ ] Theme toggle works (if implemented)

### Mobile Responsiveness
- [ ] App fits mobile screens (375px width)
- [ ] Touch elements are tappable (44px+ height)
- [ ] Text is readable
- [ ] Images load and display
- [ ] No horizontal scroll (except intentional)

---

## Environment Variables Needed for Full Features

To see the admin panel and backend features in preview:

1. Create a `.env.local` file in the project root
2. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Get these from your Supabase project:
   - Go to supabase.com and sign in
   - Select your project
   - Go to Settings → API
   - Copy the URL and anon key

4. Paste into `.env.local`
5. Rebuild the preview (close and reopen)

Without these, the admin panel will show a "Loading..." screen and redirect to login.

---

## Testing the Admin Panel

If you have set up Supabase (see above):

1. In the preview, navigate to `/admin` in the URL bar
   - Or add `/admin` to the current URL

2. You'll be redirected to login if not authenticated

3. To create an admin user:
   - Sign up using the auth screen
   - Go to Supabase SQL editor
   - Run: `UPDATE profiles SET role = 'admin' WHERE id = 'your_user_id'`
   - Refresh the page

4. You should now see the admin dashboard with:
   - Dashboard overview
   - Navigation to Users, Apps, Analytics, Settings

---

## Browser Console Debugging

If you see errors, check the console for details:

1. Open DevTools: `F12` or `Right-click → Inspect`
2. Go to the Console tab
3. Look for errors (red text)
4. Common messages:
   - `"NEXT_PUBLIC_SUPABASE_URL is not set"` → Add to .env.local
   - `"Failed to fetch"` → Check network tab
   - `"Cannot read property 'x' of undefined"` → Component prop missing

---

## Performance Optimization

If preview is slow:

1. **Check network:**
   - Open DevTools → Network tab
   - Look for large files or slow requests
   - Typical load: 2-5 seconds

2. **Check memory:**
   - Open DevTools → Performance tab
   - Record a profile (1-2 seconds)
   - Look for janky animations

3. **Common issues:**
   - Too many components rendering
   - Large state objects
   - Inefficient re-renders
   - Large image files

---

## Still Having Issues?

1. **Check the logs:**
   - Look in the browser console (DevTools)
   - Check for error messages with full details

2. **Read the docs:**
   - START_HERE.md - Quick overview
   - ADMIN_SETUP.md - Backend setup
   - FEATURES_OVERVIEW.md - All features

3. **Rebuild the project:**
   - Close preview
   - Wait 10 seconds
   - Click to reopen (forces rebuild)

4. **Ask for help:**
   - Include the error message from console
   - Include what you see vs. what you expect
   - Include steps to reproduce

---

## Version History

| Version | Status | Preview | Features |
|---------|--------|---------|----------|
| 1.0.0   | Latest | Working | Mobile app + Admin panel |

---

**Last Updated:** February 10, 2026
**Preview Build:** v1.0.0
**Next.js:** 16.1.6
**React:** 19.2.3
