-- Workout programs / routines (reusable plans with target sets, reps and rest).
create table if not exists public.workout_programs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default '',
  -- [{ "name": "Bench Press", "muscle": "chest", "sets": 3, "reps": 10, "restSec": 90 }]
  exercises jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists workout_programs_user_idx
  on public.workout_programs (user_id, created_at desc);

alter table public.workout_programs enable row level security;

drop policy if exists "workout_programs_own" on public.workout_programs;
create policy "workout_programs_own" on public.workout_programs
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
