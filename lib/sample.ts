import type { Post, SocialItem, SiteSettings, Recipe } from './types';

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

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: 'r1',
    slug: 'green-power-smoothie',
    category: 'smoothie',
    title: { tr: 'Yeşil Güç Smoothie', en: 'Green Power Smoothie' },
    description: {
      tr: 'Ispanak, muz, fıstık ezmesi ve whey ile antrenman sonrası toparlanma içeceği.',
      en: 'Spinach, banana, peanut butter and whey for a post-workout recovery hit.',
    },
    ingredients: {
      tr: '1 avuç ıspanak\n1 muz\n1 yemek kaşığı fıstık ezmesi\n1 ölçek whey protein\n250 ml süt veya su\nbuz',
      en: '1 handful spinach\n1 banana\n1 tbsp peanut butter\n1 scoop whey protein\n250 ml milk or water\nice',
    },
    steps: {
      tr: 'Tüm malzemeleri blendera koy.\nPürüzsüz olana kadar çek.\nBardağa al ve hemen iç.',
      en: 'Add everything to a blender.\nBlend until smooth.\nPour and drink right away.',
    },
    kcal: 320,
    protein: 28,
    timeMin: 5,
    imageUrl: '/images/mustafa-2.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
    featured: true,
    createdAt: '2026-06-18T09:00:00Z',
  },
  {
    id: 'r2',
    slug: 'spicy-chicken-rice-bowl',
    category: 'highprotein',
    title: { tr: 'Acılı Tavuk & Pirinç Kasesi', en: 'Spicy Chicken & Rice Bowl' },
    description: {
      tr: 'Yüksek protein, düşük yağ. Meal-prep için ideal, 4 porsiyon.',
      en: 'High protein, low fat. Perfect for meal-prep, makes 4 portions.',
    },
    ingredients: {
      tr: '200 g tavuk göğsü\n1 su bardağı pirinç\n1 tatlı kaşığı pul biber\nzeytinyağı\ntuz, karabiber\nyeşillik',
      en: '200 g chicken breast\n1 cup rice\n1 tsp chili flakes\nolive oil\nsalt, pepper\ngreens',
    },
    steps: {
      tr: 'Pirinci haşla.\nTavuğu baharatla ve tavada pişir.\nKaseye pirinç, tavuk ve yeşillik ekle.\n4 porsiyona böl.',
      en: 'Cook the rice.\nSeason and pan-cook the chicken.\nBuild the bowl with rice, chicken and greens.\nSplit into 4 portions.',
    },
    kcal: 540,
    protein: 46,
    timeMin: 25,
    imageUrl: '/images/mustafa-1.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=UBMk30rjy0o',
    featured: false,
    createdAt: '2026-06-16T09:00:00Z',
  },
  {
    id: 'r3',
    slug: 'protein-overnight-oats',
    category: 'breakfast',
    title: { tr: 'Protein Yulaf Kasesi', en: 'Protein Overnight Oats' },
    description: {
      tr: 'Akşamdan hazırla, sabah enerjiyle başla. Yulaf, yoğurt, chia ve meyve.',
      en: 'Prep at night, wake up to fuel. Oats, yogurt, chia and berries.',
    },
    ingredients: {
      tr: '1/2 su bardağı yulaf\n150 g yoğurt\n1 yemek kaşığı chia\n1 ölçek protein tozu\nmeyve',
      en: '1/2 cup oats\n150 g yogurt\n1 tbsp chia\n1 scoop protein powder\nberries',
    },
    steps: {
      tr: 'Tüm malzemeleri kavanozda karıştır.\nGece boyu buzdolabında beklet.\nSabah meyveyle servis et.',
      en: 'Mix everything in a jar.\nRefrigerate overnight.\nTop with berries in the morning.',
    },
    kcal: 410,
    protein: 32,
    timeMin: 10,
    imageUrl: '/images/mustafa-4.jpg',
    youtubeUrl: null,
    featured: false,
    createdAt: '2026-06-14T09:00:00Z',
  },
  {
    id: 'r4',
    slug: 'chocolate-protein-bites',
    category: 'snack',
    title: { tr: 'Çikolatalı Protein Topları', en: 'Chocolate Protein Bites' },
    description: {
      tr: 'Şekersiz, taşınabilir atıştırmalık. Hurma, kakao ve fındık.',
      en: 'No added sugar, grab-and-go fuel. Dates, cacao and hazelnuts.',
    },
    ingredients: {
      tr: '8 hurma\n2 yemek kaşığı kakao\n1 avuç fındık\n1 ölçek protein tozu',
      en: '8 dates\n2 tbsp cacao\n1 handful hazelnuts\n1 scoop protein powder',
    },
    steps: {
      tr: 'Malzemeleri rondoda çek.\nToplar yap.\nBuzdolabında 30 dakika dinlendir.',
      en: 'Blitz in a food processor.\nRoll into bites.\nChill for 30 minutes.',
    },
    kcal: 180,
    protein: 12,
    timeMin: 15,
    imageUrl: '/images/mustafa-5.jpg',
    youtubeUrl: null,
    featured: false,
    createdAt: '2026-06-12T09:00:00Z',
  },
  {
    id: 'r5',
    slug: 'blueberry-antioxidant-blend',
    category: 'smoothie',
    title: { tr: 'Yaban Mersinli Antioksidan', en: 'Blueberry Antioxidant Blend' },
    description: {
      tr: 'Yaban mersini, pancar ve keten tohumu — toparlanma ve odak için.',
      en: 'Blueberry, beetroot and flax — built for recovery and focus.',
    },
    ingredients: {
      tr: '1 su bardağı yaban mersini\n1/2 küçük pancar\n1 yemek kaşığı keten tohumu\n250 ml su',
      en: '1 cup blueberries\n1/2 small beetroot\n1 tbsp flaxseed\n250 ml water',
    },
    steps: {
      tr: 'Hepsini blendera koy.\nPürüzsüz çek.\nSoğuk servis et.',
      en: 'Add all to a blender.\nBlend smooth.\nServe cold.',
    },
    kcal: 260,
    protein: 18,
    timeMin: 5,
    imageUrl: '/images/mustafa-3.jpg',
    youtubeUrl: null,
    featured: false,
    createdAt: '2026-06-10T09:00:00Z',
  },
  {
    id: 'r6',
    slug: 'salmon-sweet-potato',
    category: 'highprotein',
    title: { tr: 'Somon & Tatlı Patates', en: 'Salmon & Sweet Potato' },
    description: {
      tr: 'Omega-3 ve yavaş karbonhidrat. Fırında 30 dakikada hazır.',
      en: 'Omega-3 and slow carbs. Oven-ready in 30 minutes.',
    },
    ingredients: {
      tr: '1 somon fileto\n1 tatlı patates\nzeytinyağı\ntuz, karabiber\nlimon',
      en: '1 salmon fillet\n1 sweet potato\nolive oil\nsalt, pepper\nlemon',
    },
    steps: {
      tr: "Fırını 200°C'ye ısıt.\nTatlı patatesi dilimle ve yağla.\nSomonu ekle, 25-30 dk pişir.\nLimonla servis et.",
      en: 'Heat oven to 200°C.\nSlice and oil the sweet potato.\nAdd the salmon, bake 25-30 min.\nServe with lemon.',
    },
    kcal: 600,
    protein: 44,
    timeMin: 30,
    imageUrl: '/images/hero.jpg',
    youtubeUrl: null,
    featured: false,
    createdAt: '2026-06-08T09:00:00Z',
  },
];

export const SAMPLE_SETTINGS: SiteSettings = {
  whatsappUrl: 'https://wa.me/905555555555',
  instagramUrl: 'https://instagram.com',
  tiktokUrl: '',
  youtubeUrl: '',
  heroVideoUrl: '',
};
