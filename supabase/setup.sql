-- ════════════════════════════════════════════════════════════════════════════
-- Built With Seyhan — ONE-SHOT Supabase setup.
-- Paste this whole file into the Supabase SQL Editor and press "Run".
-- Safe to re-run (idempotent). Combines 0001_init + 0002_seed + 0003_subscribers.
-- ════════════════════════════════════════════════════════════════════════════

-- ─── Admin allow-list ────────────────────────────────────────────────────────
create table if not exists public.admins (
  email text primary key
);

-- 👉 Admin Google account(s) (must match NEXT_PUBLIC_ADMIN_EMAILS):
insert into public.admins (email) values ('yigitleromer@gmail.com')
  on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ─── Posts (feed: video / image / blog) ──────────────────────────────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  type text not null check (type in ('video', 'image', 'blog')),
  category text not null
    check (category in ('fitness','health','lifestyle','nutrition','mindset','training')),
  title_tr text default '',
  title_en text default '',
  excerpt_tr text default '',
  excerpt_en text default '',
  body_tr text default '',
  body_en text default '',
  image_url text,
  video_url text,
  social_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_type_idx on public.posts (type);
create index if not exists posts_published_idx on public.posts (published);

-- ─── Social wall ──────────────────────────────────────────────────────────────
create table if not exists public.social_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  social_url text not null default '',
  platform text not null default 'instagram',
  caption_tr text default '',
  caption_en text default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Site settings (single row) ──────────────────────────────────────────────
create table if not exists public.settings (
  id int primary key default 1,
  whatsapp_url text default '',
  instagram_url text default '',
  tiktok_url text default '',
  youtube_url text default '',
  hero_video_url text default '',
  nav_visibility jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);
alter table public.settings add column if not exists nav_visibility jsonb not null default '{}'::jsonb;
insert into public.settings (id) values (1) on conflict (id) do nothing;

-- ─── Recipes (Nutrition) ──────────────────────────────────────────────────────
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  category text not null
    check (category in ('smoothie','highprotein','breakfast','snack')),
  title_tr text default '',
  title_en text default '',
  description_tr text default '',
  description_en text default '',
  ingredients_tr text default '',
  ingredients_en text default '',
  steps_tr text default '',
  steps_en text default '',
  kcal int not null default 0,
  protein int not null default 0,
  time_min int not null default 0,
  image_url text,
  youtube_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
-- Recipe detail columns (safe to re-run on an existing table)
alter table public.recipes add column if not exists slug text;
alter table public.recipes add column if not exists ingredients_tr text default '';
alter table public.recipes add column if not exists ingredients_en text default '';
alter table public.recipes add column if not exists steps_tr text default '';
alter table public.recipes add column if not exists steps_en text default '';
create unique index if not exists recipes_slug_key on public.recipes (slug) where slug is not null;

-- ─── updated_at trigger ───────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

drop trigger if exists settings_touch on public.settings;
create trigger settings_touch before update on public.settings
  for each row execute function public.touch_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table public.posts enable row level security;
alter table public.social_items enable row level security;
alter table public.settings enable row level security;
alter table public.recipes enable row level security;
alter table public.admins enable row level security;

drop policy if exists "posts public read" on public.posts;
create policy "posts public read" on public.posts
  for select using (published = true);

drop policy if exists "social public read" on public.social_items;
create policy "social public read" on public.social_items
  for select using (true);

drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings
  for select using (true);

drop policy if exists "recipes public read" on public.recipes;
create policy "recipes public read" on public.recipes
  for select using (published = true);

drop policy if exists "posts admin all" on public.posts;
create policy "posts admin all" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "social admin all" on public.social_items;
create policy "social admin all" on public.social_items
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "settings admin all" on public.settings;
create policy "settings admin all" on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "recipes admin all" on public.recipes;
create policy "recipes admin all" on public.recipes
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins self read" on public.admins;
create policy "admins self read" on public.admins
  for select using (public.is_admin());

-- ─── Subscribers (e-book / newsletter leads) ──────────────────────────────────
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'ebook-popup',
  created_at timestamptz not null default now()
);
create unique index if not exists subscribers_email_key
  on public.subscribers (lower(email));

alter table public.subscribers enable row level security;

drop policy if exists "subscribers_insert_public" on public.subscribers;
create policy "subscribers_insert_public" on public.subscribers
  for insert to anon, authenticated with check (true);

drop policy if exists "subscribers_select_admin" on public.subscribers;
create policy "subscribers_select_admin" on public.subscribers
  for select to authenticated using (public.is_admin());

-- ─── Storage bucket: media ────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('media', 'media', true)
  on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());

drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());

-- ─── Optional seed content (delete later from the admin panel) ─────────────────
insert into public.posts
  (slug, type, category, title_tr, title_en, excerpt_tr, excerpt_en, body_tr, body_en, image_url, video_url, featured, sort_order)
values
  (
    'full-body-strength', 'video', 'training',
    'Tüm Vücut Güç Antrenmanı', 'Full Body Strength Session',
    'Haftada 3 gün uygulanabilen, eklem dostu tam vücut rutini.',
    'A joint-friendly full-body routine you can run 3x a week.',
    '', '',
    null, 'https://www.youtube.com/watch?v=UBMk30rjy0o', true, 1
  ),
  (
    'morning-routine', 'video', 'lifestyle',
    'Sabah Rutini', 'Morning Routine',
    'Güne daha enerjik başlamak için 10 dakikalık rutin.',
    'A 10-minute routine to start the day with more energy.',
    '', '',
    null, 'https://www.youtube.com/watch?v=2vjPBrBU-TM', true, 2
  ),
  (
    'eating-for-energy', 'blog', 'nutrition',
    'Enerji İçin Beslenme', 'Eating for Energy',
    'Gün boyu tok ve enerjik kalmanın pratik yolları.',
    'Practical ways to stay full and energized all day.',
    'Protein, lif ve doğru karbonhidrat dengesi enerjinin anahtarı...',
    'A balance of protein, fiber and the right carbs is the key to energy...',
    null, null, false, 3
  )
on conflict (slug) do nothing;

-- ─── Workout tracker (per-user, account-based) ────────────────────────────────
create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  performed_on date not null default current_date,
  title text not null default '',
  notes text not null default '',
  duration_sec int not null default 0,
  exercises jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists workout_sessions_user_idx
  on public.workout_sessions (user_id, performed_on desc);
alter table public.workout_sessions enable row level security;
drop policy if exists "workout_sessions_own" on public.workout_sessions;
create policy "workout_sessions_own" on public.workout_sessions
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Workout programs / routines (target sets / reps / rest per exercise)
create table if not exists public.workout_programs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default '',
  exercises jsonb not null default '[]'::jsonb,
  coach_assigned boolean not null default false,
  assigned_by uuid,
  created_at timestamptz not null default now()
);
create index if not exists workout_programs_user_idx
  on public.workout_programs (user_id, created_at desc);
alter table public.workout_programs enable row level security;
drop policy if exists "workout_programs read own" on public.workout_programs;
create policy "workout_programs read own" on public.workout_programs
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "workout_programs insert own" on public.workout_programs;
create policy "workout_programs insert own" on public.workout_programs
  for insert to authenticated with check (auth.uid() = user_id and coach_assigned = false);
drop policy if exists "workout_programs update own" on public.workout_programs;
create policy "workout_programs update own" on public.workout_programs
  for update to authenticated
  using (auth.uid() = user_id and coach_assigned = false)
  with check (auth.uid() = user_id and coach_assigned = false);
drop policy if exists "workout_programs delete own" on public.workout_programs;
create policy "workout_programs delete own" on public.workout_programs
  for delete to authenticated using (auth.uid() = user_id and coach_assigned = false);
drop policy if exists "workout_programs admin all" on public.workout_programs;
create policy "workout_programs admin all" on public.workout_programs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Profiles + auto-create trigger (so the coach can list members).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text default '',
  full_name text default '',
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own" on public.profiles
  for select to authenticated using (auth.uid() = id);
drop policy if exists "profiles admin read" on public.profiles;
create policy "profiles admin read" on public.profiles
  for select to authenticated using (public.is_admin());
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();
insert into public.profiles (id, email, full_name)
  select id, email, coalesce(raw_user_meta_data ->> 'full_name', '')
  from auth.users on conflict (id) do nothing;

-- Member-submitted content ("From the community"), moderated by admins.
create table if not exists public.member_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null default '',
  instagram text not null default '',
  caption text not null default '',
  image_url text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists member_posts_approved_idx
  on public.member_posts (approved, created_at desc);
alter table public.member_posts enable row level security;
drop policy if exists "member_posts read approved" on public.member_posts;
create policy "member_posts read approved" on public.member_posts
  for select using (approved = true);
drop policy if exists "member_posts read own" on public.member_posts;
create policy "member_posts read own" on public.member_posts
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "member_posts insert own" on public.member_posts;
create policy "member_posts insert own" on public.member_posts
  for insert to authenticated with check (auth.uid() = user_id and approved = false);
drop policy if exists "member_posts delete own" on public.member_posts;
create policy "member_posts delete own" on public.member_posts
  for delete to authenticated using (auth.uid() = user_id);
drop policy if exists "member_posts admin all" on public.member_posts;
create policy "member_posts admin all" on public.member_posts
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "media member insert" on storage.objects;
create policy "media member insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = 'members');
