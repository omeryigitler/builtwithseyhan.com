import type { Post, SocialItem, SiteSettings } from './types';

/**
 * Sample content shown until Supabase is configured (and as a graceful
 * fallback). Uses local images already in /public/images. Admin content
 * replaces all of this once the database is connected.
 */
export const SAMPLE_POSTS: Post[] = [
  {
    id: 's1',
    slug: 'full-body-strength',
    type: 'video',
    category: 'training',
    title: { tr: 'Tüm Vücut Güç Antrenmanı', en: 'Full Body Strength Session' },
    excerpt: {
      tr: 'Haftada 3 gün uygulanabilen, eklem dostu tam vücut rutini.',
      en: 'A joint-friendly full-body routine you can run 3x a week.',
    },
    body: {
      tr: 'Bu antrenmanda büyük kas gruplarını hedefleyen bileşik hareketlere odaklanıyoruz...',
      en: 'In this session we focus on compound movements that target the big muscle groups...',
    },
    imageUrl: '/images/mustafa-2.jpg',
    videoUrl: 'https://www.youtube.com/embed/UBMk30rjy0o',
    socialUrl: null,
    featured: true,
    createdAt: '2026-06-10T09:00:00Z',
  },
  {
    id: 's2',
    slug: 'morning-routine',
    type: 'video',
    category: 'lifestyle',
    title: { tr: 'Sabah Rutini', en: 'Morning Routine' },
    excerpt: {
      tr: 'Güne daha enerjik başlamak için 10 dakikalık rutin.',
      en: 'A 10-minute routine to start the day with more energy.',
    },
    body: {
      tr: 'Sabahları enerjini yükseltmek için basit ama etkili adımlar...',
      en: 'Simple but effective steps to raise your energy in the morning...',
    },
    imageUrl: '/images/mustafa-1.jpg',
    videoUrl: 'https://www.youtube.com/embed/2vjPBrBU-TM',
    socialUrl: null,
    featured: true,
    createdAt: '2026-06-08T09:00:00Z',
  },
  {
    id: 's3',
    slug: 'eating-for-energy',
    type: 'blog',
    category: 'nutrition',
    title: { tr: 'Enerji İçin Beslenme', en: 'Eating for Energy' },
    excerpt: {
      tr: 'Gün boyu tok ve enerjik kalmanın pratik yolları.',
      en: 'Practical ways to stay full and energized all day.',
    },
    body: {
      tr: 'Protein, lif ve doğru karbonhidrat dengesi enerjinin anahtarı...',
      en: 'A balance of protein, fiber and the right carbs is the key to energy...',
    },
    imageUrl: '/images/mustafa-4.jpg',
    videoUrl: null,
    socialUrl: null,
    featured: false,
    createdAt: '2026-06-05T09:00:00Z',
  },
  {
    id: 's4',
    slug: 'discipline-over-motivation',
    type: 'blog',
    category: 'mindset',
    title: { tr: 'Disiplin, Motivasyondan Önce Gelir', en: 'Discipline Over Motivation' },
    excerpt: {
      tr: 'Motivasyon biter, disiplin kalır. Sistemini nasıl kurarsın?',
      en: 'Motivation fades, discipline stays. How to build your system.',
    },
    body: {
      tr: 'Küçük, tekrarlanabilir alışkanlıklar uzun vadede her şeyi değiştirir...',
      en: 'Small, repeatable habits change everything over the long run...',
    },
    imageUrl: '/images/mustafa-3.jpg',
    videoUrl: null,
    socialUrl: null,
    featured: false,
    createdAt: '2026-06-02T09:00:00Z',
  },
  {
    id: 's5',
    slug: 'push-day',
    type: 'image',
    category: 'fitness',
    title: { tr: 'İtiş Günü', en: 'Push Day' },
    excerpt: {
      tr: 'Göğüs, omuz ve triceps için yüksek hacimli bir gün.',
      en: 'A high-volume day for chest, shoulders and triceps.',
    },
    body: { tr: '', en: '' },
    imageUrl: '/images/mustafa-5.jpg',
    videoUrl: null,
    socialUrl: 'https://instagram.com',
    featured: false,
    createdAt: '2026-05-30T09:00:00Z',
  },
];

export const SAMPLE_SOCIAL: SocialItem[] = [
  {
    id: 'so1',
    imageUrl: '/images/mustafa-1.jpg',
    socialUrl: 'https://instagram.com',
    platform: 'instagram',
    caption: { tr: 'Antrenman günü', en: 'Training day' },
    createdAt: '2026-06-11T09:00:00Z',
  },
  {
    id: 'so2',
    imageUrl: '/images/mustafa-3.jpg',
    socialUrl: 'https://instagram.com',
    platform: 'instagram',
    caption: { tr: 'Form kontrolü', en: 'Form check' },
    createdAt: '2026-06-09T09:00:00Z',
  },
  {
    id: 'so3',
    imageUrl: '/images/mustafa-5.jpg',
    socialUrl: 'https://instagram.com',
    platform: 'instagram',
    caption: { tr: 'Sahne hazırlığı', en: 'Stage prep' },
    createdAt: '2026-06-07T09:00:00Z',
  },
  {
    id: 'so4',
    imageUrl: '/images/mustafa-4.jpg',
    socialUrl: 'https://instagram.com',
    platform: 'instagram',
    caption: { tr: 'Günlük disiplin', en: 'Everyday discipline' },
    createdAt: '2026-06-04T09:00:00Z',
  },
];

export const SAMPLE_SETTINGS: SiteSettings = {
  whatsappUrl: 'https://wa.me/905555555555',
  instagramUrl: 'https://instagram.com',
  tiktokUrl: '',
  youtubeUrl: '',
};
