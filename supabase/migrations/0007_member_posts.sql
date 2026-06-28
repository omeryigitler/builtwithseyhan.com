-- Member-submitted content ("From the community"). Moderated: a post is only
-- public once an admin approves it. Members can submit + delete their own.
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

-- Public can read only approved posts.
drop policy if exists "member_posts read approved" on public.member_posts;
create policy "member_posts read approved" on public.member_posts
  for select using (approved = true);

-- A member can read their own (pending) posts.
drop policy if exists "member_posts read own" on public.member_posts;
create policy "member_posts read own" on public.member_posts
  for select to authenticated using (auth.uid() = user_id);

-- A member can submit their own — but cannot self-approve.
drop policy if exists "member_posts insert own" on public.member_posts;
create policy "member_posts insert own" on public.member_posts
  for insert to authenticated with check (auth.uid() = user_id and approved = false);

-- A member can delete their own.
drop policy if exists "member_posts delete own" on public.member_posts;
create policy "member_posts delete own" on public.member_posts
  for delete to authenticated using (auth.uid() = user_id);

-- Admins moderate everything (approve / edit / delete any).
drop policy if exists "member_posts admin all" on public.member_posts;
create policy "member_posts admin all" on public.member_posts
  for all using (public.is_admin()) with check (public.is_admin());

-- Allow signed-in members to upload their image into the media/members/ folder.
drop policy if exists "media member insert" on storage.objects;
create policy "media member insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = 'members');
