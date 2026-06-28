-- ── Profiles (so the coach can list members) ─────────────────────────────────
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

-- Auto-create a profile row whenever a user signs up.
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

-- Backfill any users who signed up before the trigger existed.
insert into public.profiles (id, email, full_name)
  select id, email, coalesce(raw_user_meta_data ->> 'full_name', '')
  from auth.users
  on conflict (id) do nothing;

-- ── Coach-assigned programs ───────────────────────────────────────────────────
alter table public.workout_programs
  add column if not exists coach_assigned boolean not null default false;
alter table public.workout_programs
  add column if not exists assigned_by uuid;

-- Replace the single "own" policy with granular ones: members can READ their
-- coach-assigned programs but only create/edit/delete their OWN (non-coach) ones.
drop policy if exists "workout_programs_own" on public.workout_programs;

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
