-- Admin-toggleable navbar / homepage areas (videos, coaching, …).
alter table public.settings
  add column if not exists nav_visibility jsonb not null default '{}'::jsonb;
