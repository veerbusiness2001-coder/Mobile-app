## AppTrack – Mobile App Tracking Platform

AppTrack is a full-stack **mobile app usage tracking platform** built with Next.js 16 and Supabase.  
It includes a **mobile-style client app** and a full **admin dashboard** for managing users, apps, and analytics.

---

### Features

- **Mobile App (Client)**
  - Splash screen and multi-step onboarding
  - Email/password style auth screen (demo/local state)
  - Home view with tracked apps and usage stats
  - Search and category filters
  - Wishlist and app state (installed / wishlist / archived)
  - Stats view with charts and usage summaries
  - Profile view with preferences and basic settings
  - Dark/light theme support and responsive mobile layout

- **Admin Panel (`/admin`)**
  - Dashboard with KPIs (users, apps, usage)
  - User management (roles, search, delete)
  - App database management (CRUD for apps)
  - Analytics & reports (Recharts charts)
  - System settings and configuration
  - Role-based access control (admin-only routes)

- **Backend / Data**
  - Supabase PostgreSQL database
  - Supabase Auth for users and roles
  - Row Level Security (RLS) on tables
  - Database schema defined in `scripts/001_create_tables.sql`

For a more detailed overview, see `PROJECT_SUMMARY.md` and `FEATURES_OVERVIEW.md`.

---

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19, shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Auth & DB**: Supabase (PostgreSQL, RLS)
- **Forms & Validation**: React Hook Form + Zod

See `package.json` for exact versions.

---

### Project Structure (High Level)

```text
app/
  page.tsx            # Mobile app (splash → onboarding → auth → main)
  layout.tsx          # Root layout
  admin/              # Admin panel
    layout.tsx        # Admin layout with auth checks
    page.tsx          # Admin dashboard
    users/page.tsx    # User management
    apps/page.tsx     # App database
    analytics/page.tsx# Analytics & reports
    settings/page.tsx # System settings

components/
  *.tsx               # Mobile app UI (splash, onboarding, lists, stats, etc.)
  admin/*.tsx         # Admin navigation, stat cards, dialogs
  ui/*.tsx            # Reusable shadcn/ui components

lib/
  app-data.ts         # Sample data and shared types
  supabase/           # Supabase client & server helpers
    client.ts
    server.ts
    middleware.ts

scripts/
  001_create_tables.sql  # Supabase database schema
```

Documentation files (how to use everything) live in:

- `START_HERE.md`
- `PROJECT_SUMMARY.md`
- `FEATURES_OVERVIEW.md`
- `ADMIN_SETUP.md`
- `ADMIN_QUICK_START.md`
- `PREVIEW_TROUBLESHOOTING.md`
- `README_DOCUMENTATION.md`

---

### Getting Started (Local Development)

1. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

2. **Set up environment variables** (required for admin/Supabase features)
   - Copy `.env.local.example` to `.env.local`:
     ```bash
     cp .env.local.example .env.local   # PowerShell: copy .env.local.example .env.local
     ```
   - Fill in your Supabase credentials:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - You get these from your Supabase project settings.

3. **Apply database schema in Supabase**
   - Open the Supabase SQL editor.
   - Paste and run the contents of `scripts/001_create_tables.sql`.

4. **Create an admin user**
   - Sign up from the app/admin auth flow, or create a user in Supabase Auth.
   - In the `profiles` table, set that user’s role to `"admin"`.

5. **Run the dev server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
   - Mobile app: open `http://localhost:3000`
   - Admin panel: open `http://localhost:3000/admin`

---

### NPM / PNPM Scripts

- `pnpm dev` / `npm run dev` – start Next.js dev server
- `pnpm build` / `npm run build` – create production build
- `pnpm start` / `npm start` – run production server after build
- `pnpm lint` / `npm run lint` – run Next.js linting

---

### Additional Documentation

- **Quick start / overview**: `START_HERE.md`
- **All features & screens**: `FEATURES_OVERVIEW.md`
- **Admin & backend setup**: `ADMIN_SETUP.md`, `ADMIN_QUICK_START.md`
- **Technical architecture**: `BACKEND_ADMIN_IMPLEMENTATION.md`
- **Troubleshooting preview & builds**: `PREVIEW_TROUBLESHOOTING.md`

If you only read one extra file after this README, start with `START_HERE.md`.


