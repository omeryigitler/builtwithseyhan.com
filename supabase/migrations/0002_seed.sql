-- Optional sample content so the site looks alive right after connecting
-- Supabase. Safe to skip or delete these rows later from the admin panel.
-- Replace the image URLs with uploads from the admin panel when ready.

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
