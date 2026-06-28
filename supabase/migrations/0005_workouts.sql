-- Workout tracker — per-visitor workout logs (cloud, account-based).
-- Each signed-in user owns their own sessions (RLS by auth.uid()).
create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  performed_on date not null default current_date,
  title text not null default '',
  notes text not null default '',
  duration_sec int not null default 0,
  -- [{ "name": "Bench Press", "muscle": "chest", "sets": [{ "weight": 60, "reps": 10 }] }]
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
