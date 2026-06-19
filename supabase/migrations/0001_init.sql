-- Built With Seyhan — initial schema, RLS and storage.
-- Run this in the Supabase SQL Editor (or via the Supabase CLI).
-- Safe to re-run.

-- ─── Admin allow-list ────────────────────────────────────────────────────────
create table if not exists public.admins (
  email text primary key
);

-- 👉 Add the admin Google account(s) here (must match NEXT_PUBLIC_ADMIN_EMAILS):
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

-- ─── Social wall (images that link out to social posts) ───────────────────────
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
  updated_at timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);
insert into public.settings (id) values (1) on conflict (id) do nothing;

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
alter table public.admins enable row level security;

-- Public can read published posts; everyone can read social + settings.
drop policy if exists "posts public read" on public.posts;
create policy "posts public read" on public.posts
  for select using (published = true);

drop policy if exists "social public read" on public.social_items;
create policy "social public read" on public.social_items
  for select using (true);

drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings
  for select using (true);

-- Admins have full access (these OR with the public read policies).
drop policy if exists "posts admin all" on public.posts;
create policy "posts admin all" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "social admin all" on public.social_items;
create policy "social admin all" on public.social_items
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "settings admin all" on public.settings;
create policy "settings admin all" on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins self read" on public.admins;
create policy "admins self read" on public.admins
  for select using (public.is_admin());

-- ─── Storage bucket: media (images / thumbnails) ──────────────────────────────
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
