-- Recipe detail fields: slug + ingredients/steps (localized, multiline).
alter table public.recipes add column if not exists slug text;
alter table public.recipes add column if not exists ingredients_tr text default '';
alter table public.recipes add column if not exists ingredients_en text default '';
alter table public.recipes add column if not exists steps_tr text default '';
alter table public.recipes add column if not exists steps_en text default '';

create unique index if not exists recipes_slug_key on public.recipes (slug) where slug is not null;
