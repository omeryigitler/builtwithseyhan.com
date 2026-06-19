# Built With Seyhan

**Fitness • Health • LifeStyle** — a content / blog site built with **Next.js (App Router)**
and **Supabase**. Posts (video / photo / article), a social wall and site settings are managed
from a built-in **admin panel**. Visitors from **Turkey** get the Turkish site (`/tr`),
everyone else gets English (`/en`); the choice can be changed manually and is remembered.

## Architecture

- **Next.js 15 (App Router)** — server-rendered pages, SSG/ISR blog, SEO (metadata, hreflang,
  sitemap, robots).
- **Country-based i18n** — `middleware.ts` reads Vercel's `x-vercel-ip-country`
  (`TR → /tr`, else `/en`) with a manual `TR | EN` switch saved in a cookie.
- **Theme** — light by default, dark toggle (`next-themes`), lime brand accent.
- **Supabase**
  - **Postgres** — `posts`, `social_items`, `settings` (+ `admins` allow-list).
  - **Storage** — `media` bucket for uploaded images / thumbnails.
  - **Auth** — Google sign-in for the admin panel; writes guarded by **RLS** (`is_admin()`).

If Supabase isn't configured the site still renders using built-in **sample content**
(`lib/sample.ts`) — handy for local preview before credentials exist.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en or /tr)
npm run build    # production build
npm run lint
```

Copy `.env.example` → `.env.local` and fill it in.

## Setup

### 1. Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → run `supabase/migrations/0001_init.sql` (schema + RLS + storage).
   Optionally run `0002_seed.sql` for sample content.
3. In `0001_init.sql` the admin allow-list is seeded with `yigitleromer@gmail.com` —
   change/add rows in the `public.admins` table for every admin (must be a real Google account).
4. **Authentication → Providers → Google**: enable it, add the Google OAuth client ID/secret,
   and add the redirect URL `https://YOUR_DOMAIN/auth/callback` (and
   `http://localhost:3000/auth/callback` for local).
5. **Project Settings → API** → copy the Project URL and the `anon` key into env.

### 2. Environment variables
Local `.env.local` and Vercel → Project Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://builtwithseyhan.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_ADMIN_EMAILS=yigitleromer@gmail.com   # must match the admins table
SUPABASE_SERVICE_ROLE_KEY=...                      # server only (optional, future use)
```

### 3. Deploy (Vercel)
Vercel auto-detects Next.js. Push the branch, set the env vars, deploy. Country routing
works automatically on Vercel (the `x-vercel-ip-country` header).

## Admin panel
Go to **`/admin`** (e.g. `/en/admin`) → **Sign in with Google**. Only accounts in the
`admins` table (and `NEXT_PUBLIC_ADMIN_EMAILS`) get in. From there:

- **Posts** — add/edit video, photo and article posts (bilingual TR/EN, category, image
  upload, video URL, featured/published).
- **Social Wall** — upload images that link out to Instagram/social posts.
- **Settings** — WhatsApp, Instagram, TikTok, YouTube links (used in the header, footer,
  CTAs and floating WhatsApp button).

Content is read with ISR (`revalidate = 300s`), so changes appear within a few minutes
(or instantly on a new deploy).
