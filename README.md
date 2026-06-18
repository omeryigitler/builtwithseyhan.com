# Mustafa Seyhan Coaching

React + Vite tabanlı fitness koçluğu sitesi. İçerik (before/after görselleri, sosyal
linkler, Malta salon bilgisi) **Firebase** üzerinden yönetilir; başvuru/lead'ler
serverless bir fonksiyon ile **Resend** üzerinden `contact@builtwithseyhan.com`'a düşer
ve Firestore'a kaydedilir.

## Mimari

- **Firebase Firestore** — içerik & "değişkenler" (`testimonials`, `settings/site`) + `leads`.
- **Firebase Storage** — before/after görselleri (gerçek dosya, public URL).
- **Firebase Auth** — admin panelini kilitler (**Google ile giriş**, yalnız allow-list'teki e-posta).
- **Vercel Function** (`api/contact.ts`) — Resend ile e-posta + `firebase-admin` ile lead yazma.
- **Cal.com** — online koçluk randevuları (env üzerinden link).

Firebase yapılandırılmamışsa site yine de çalışır (içerik boş görünür) — `lib/firebase.ts`
içindeki `isFirebaseReady` ile graceful fallback.

## Yerelde Çalıştırma

Gereksinim: Node.js

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim çıktısı
```

`.env` dosyasını `.env.example`'dan kopyalayıp doldurun.

## Kurulum

### 1. Firebase
1. [console.firebase.google.com](https://console.firebase.google.com) → yeni proje.
2. **Firestore Database** (production mode), **Storage**, **Authentication → Google** sağlayıcısını aç.
3. Admin girişi (allow-list) `yigitleromer@gmail.com` olarak ayarlı — `.env.example`,
   `firestore.rules`, `storage.rules` üçünde de aynı. Yeni admin eklersen üçünü birlikte
   güncelle (giriş e-postası **gerçek bir Google hesabı** olmalı).
   > `contact@builtwithseyhan.com` bir GİRİŞ adresi değildir — yalnız lead maillerinin
   > düştüğü kutudur (`CONTACT_EMAIL`, Cloudflare/Zoho yönlendirmesi). Panele girişle
   > ilgisi yoktur.
4. Project settings → Web app kaydet → config değerlerini `.env`'e (`VITE_FIREBASE_*`).
5. Güvenlik kurallarını yayınla:
   ```bash
   npm i -g firebase-tools && firebase login
   firebase deploy --only firestore:rules,storage --project <PROJECT_ID>
   ```
   (Kurallar: `firestore.rules`, `storage.rules`. **Bu adım atlanırsa admin yazma çalışmaz.**)
6. Project settings → Service accounts → **Generate new private key** → JSON'u tek satıra
   sıkıştırıp Vercel env `FIREBASE_SERVICE_ACCOUNT`'a koy.

### 2. Resend (e-posta)
1. [resend.com](https://resend.com) → hesap → `builtwithseyhan.com` domain'ini doğrula (DNS).
2. API key oluştur → Vercel env `RESEND_API_KEY`.
3. `CONTACT_EMAIL=contact@builtwithseyhan.com` (Vercel env).
4. Gelen mailleri okumak için: **Cloudflare Email Routing** (ücretsiz, Gmail'e yönlendir)
   veya **Zoho Mail**.

### 3. Cal.com (randevu)
1. [cal.com](https://cal.com) → ücretsiz hesap → event type oluştur.
2. Linki `VITE_SCHEDULING_URL`'e koy. Boş bırakılırsa booking modal e-posta başvurusu gösterir.

### 4. Vercel env değişkenleri
Project Settings → Environment Variables:
- Client: tüm `VITE_*` (Firebase + Cal.com + sosyal).
- Server (gizli): `RESEND_API_KEY`, `CONTACT_EMAIL`, `FIREBASE_SERVICE_ACCOUNT`.

## Admin Paneli
Logoya **3 kez** tıkla → **Google ile giriş**. Sadece `VITE_ADMIN_EMAILS` ve kurallardaki
adresle eşleşen hesap içeri girebilir; başka bir Google hesabı girerse "yetkili değil" der.
Giriş sonrası: dönüşümler (before/after), sosyal linkler ve Malta salon bilgisi yönetilir.
Tüm değişiklikler canlıdır — ziyaretçiler anında görür.

> 3 kez tıklama güvenlik değil, sadece paneli açma jestidir. Asıl güvenlik Google Auth +
> e-posta allow-list + Firestore/Storage kurallarıdır.
