# Mustafa Seyhan Coaching

Mustafa Seyhan için hazırlanmış, React ve Vite tabanlı uzaktan fitness koçluğu landing page'i.

## Yerelde Çalıştırma

Gereksinim: Node.js

1. Bağımlılıkları kur:
   `npm install`
2. Geliştirme sunucusunu başlat:
   `npm run dev`
3. Üretim çıktısını kontrol et:
   `npm run build`

## Randevu Entegrasyonu

Site Supabase kullanmaz. Başvuru/randevu akışı Cal.com veya Calendly linki üzerinden çalışır.

Yerelde `.env` dosyası oluşturup şu değişkenleri tanımlayın:

```bash
VITE_SCHEDULING_URL=https://cal.com/your-handle/analysis
VITE_CONTACT_EMAIL=info@mustafaseyhancoaching.com
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-profile/
VITE_X_URL=https://x.com/your-profile
VITE_SITE_URL=https://builtwithseyhan.com/
```

Vercel canlı ortamında da aynı değişkenler `Project Settings -> Environment Variables` altında tanımlanmalıdır. `VITE_SCHEDULING_URL` boş bırakılırsa site takvim gömmek yerine çalışan e-posta başvuru yedeğini gösterir.
