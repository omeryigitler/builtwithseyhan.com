-- Nutrition recipes (powers the /nutrition page when Supabase is connected).
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  category text not null
    check (category in ('smoothie','highprotein','breakfast','snack')),
  title_tr text default '',
  title_en text default '',
  description_tr text default '',
  description_en text default '',
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

alter table public.recipes enable row level security;

drop policy if exists "recipes public read" on public.recipes;
create policy "recipes public read" on public.recipes
  for select using (published = true);

drop policy if exists "recipes admin all" on public.recipes;
create policy "recipes admin all" on public.recipes
  for all using (public.is_admin()) with check (public.is_admin());
