-- E-book / newsletter leads captured by the 10s popup.
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'ebook-popup',
  created_at timestamptz not null default now()
);

-- One row per email (case-insensitive). Duplicate inserts raise 23505,
-- which the client treats as success.
create unique index if not exists subscribers_email_key
  on public.subscribers (lower(email));

alter table public.subscribers enable row level security;

-- Anyone may subscribe (insert only — no read access for the public).
drop policy if exists "subscribers_insert_public" on public.subscribers;
create policy "subscribers_insert_public" on public.subscribers
  for insert to anon, authenticated with check (true);

-- Only admins can read the captured leads.
drop policy if exists "subscribers_select_admin" on public.subscribers;
create policy "subscribers_select_admin" on public.subscribers
  for select to authenticated using (public.is_admin());
