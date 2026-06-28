import type { Dictionary } from './en';

export const tr: Dictionary = {
  brand: 'Built With Seyhan',
  tagline: 'Fitness • Sağlık • Yaşam Tarzı',

  nav: {
    home: 'Ana Sayfa',
    videos: 'Videolar',
    feed: 'Akış',
    nutrition: 'Beslenme',
    training: 'Antrenman',
    track: 'Takip',
    blog: 'Blog',
    social: 'Sosyal',
    menuOpen: 'Menüyü aç',
    menuClose: 'Menüyü kapat',
  },

  theme: {
    toLight: 'Açık moda geç',
    toDark: 'Koyu moda geç',
  },

  language: {
    label: 'Dili değiştir',
  },

  hero: {
    eyebrow: 'Fitness • Sağlık • Yaşam Tarzı',
    title: 'Built With Seyhan',
    subtitle: 'Daha iyi antrenman. Daha güçlü yaşam. Günlük disiplin, gerçek içerik.',
    ctaExplore: 'İçerikleri Keşfet',
    ctaWhatsapp: 'WhatsApp',
    ctaInstagram: 'Instagram',
  },

  videos: {
    eyebrow: 'Kamerada',
    title: 'Öne Çıkan Videolar',
    subtitle: 'Antrenmanlar, analizler ve günlük motivasyon.',
    watch: 'İzle',
    empty: 'Videolar çok yakında.',
  },

  feed: {
    eyebrow: 'Güncel',
    title: 'Son İçerikler',
    subtitle: 'Yolculuktan videolar, fotoğraflar ve notlar.',
    all: 'Tümü',
    readMore: 'Devamını oku',
    watch: 'İzle',
    empty: 'Yeni içerikler yolda.',
  },

  blog: {
    eyebrow: 'Günlük',
    title: 'Blog',
    subtitle: 'Fitness, sağlık ve yaşam tarzı — kısa ve uygulanabilir.',
    readMore: 'Yazıyı oku',
    viewAll: 'Tüm yazılar',
    empty: 'İlk yazılar çok yakında.',
    minRead: 'dk okuma',
  },

  social: {
    eyebrow: 'Sosyal',
    title: 'Yolculuğu Takip Et',
    subtitle: 'Instagram ve diğer platformlardan kareler.',
    viewPost: 'Gönderiye git',
    empty: 'Sosyal gönderiler çok yakında.',
  },

  nutrition: {
    eyebrow: 'Antrenmanı besle',
    title: 'Beslenme',
    subtitle:
      'Tarifler, smoothie’ler ve yüksek proteinli öğünler — basit, tekrarlanabilir ve antrenmana göre.',
    all: 'Tümü',
    watch: 'Tarifi izle',
    empty: 'Tarifler çok yakında.',
    categories: {
      smoothie: 'Smoothie',
      highprotein: 'Yüksek Protein',
      breakfast: 'Kahvaltı',
      snack: 'Atıştırmalık',
    },
    macros: {
      kcal: 'kcal',
      protein: 'g protein',
      time: 'dk',
    },
    ebook: {
      badge: 'Premium',
      title: 'Beslenme El Kitabı',
      subtitle: 'Tarifler ve öğün planlarından oluşan e-kitap. Ücretsiz aç — çok yakında.',
      locked: 'Kilitli',
      cta: 'Haber ver',
      popup: {
        title: 'El Kitabını Aç',
        subtitle:
          'Tarifler, makrolar ve öğün planları — mailini bırak, gelen kutuna düşsün.',
        placeholder: 'sen@mail.com',
        submit: 'Bana gönder',
        success: 'Tamamdır — gelen kutunu kontrol et!',
        error: 'Bir şeyler ters gitti. Lütfen tekrar dene.',
        privacy: 'Spam yok. İstediğin an çıkabilirsin.',
        dismiss: 'Belki sonra',
      },
    },
  },

  showcase: {
    eyebrow: 'Deneyim',
    title: 'Hepsi tek ekranda',
    subtitle: 'Videolar, tarifler ve antrenman — hızlı, mobil öncelikli tek bir merkez.',
    cta: 'İçerikleri keşfet',
  },

  guide: {
    badge: 'Ücretsiz',
    title: 'Ücretsiz Başlangıç Rehberi',
    subtitle: 'Daha iyi antrenman ve beslenmeye başlamak için kısa, dolu dolu bir rehber.',
    cta: "WhatsApp'tan Al",
  },

  community: {
    eyebrow: 'Topluluktan',
    title: 'Üyelerin paylaşımları',
    subtitle: 'Üyelerden gelen ilerleme, rekor ve kareler.',
    share: 'Sen de paylaş',
    empty: 'İlk paylaşan sen ol.',
    signInFirst: 'Paylaşmak için (Takip sayfasından) giriş yap.',
    submitTitle: 'Gönderini paylaş',
    namePlaceholder: 'Adın',
    captionPlaceholder: 'Bir şeyler yaz…',
    instagramPlaceholder: 'Instagram (opsiyonel) — örn. @sen',
    image: 'Fotoğraf',
    pasteUrl: 'veya bir görsel adresi yapıştır',
    submit: 'Onaya gönder',
    submitting: 'Gönderiliyor…',
    thanks: 'Teşekkürler! Gönderin onay bekliyor.',
    viewInstagram: 'Instagram',
  },

  whatsappCta: {
    title: 'Başlamaya hazır mısın?',
    subtitle: 'Doğrudan WhatsApp’tan yaz — sorular, koçluk veya iş birlikleri.',
    button: 'WhatsApp’tan Yaz',
  },

  training: {
    eyebrow: 'Anatomi',
    title: 'Kasına Göre Çalış',
    subtitle: 'Figürdeki bir kas grubuna dokun, nasıl çalışılacağını gör.',
    hint: 'Bir kas grubu seç',
    exercisesLabel: 'Temel hareketler',
    muscles: {
      shoulders: {
        name: 'Omuzlar',
        desc: 'Genişlik ve itiş gücü için üç başlı deltoidler. Yuvarlak, dolgun omuzlar için her açıyı çalış.',
        exercises: ['Omuz Press', 'Yana Açış', 'Face Pull'],
      },
      chest: {
        name: 'Göğüs',
        desc: 'Pektoraller her itişin merkezi. Dolgun ve dengeli gelişim için incline, düz ve flye açıları.',
        exercises: ['Bench Press', 'Incline Dumbbell Press', 'Cable Flye'],
      },
      arms: {
        name: 'Kollar',
        desc: 'Çekiş gücü ve detay için biceps ve ön kol. Negatifi kontrol et, tam açıkta çalış.',
        exercises: ['Barbell Curl', 'Hammer Curl', 'Cable Pushdown'],
      },
      core: {
        name: 'Karın',
        desc: 'Karın ve derin stabilizatörler kuvveti aktarır, omurgayı korur. Yük altında ve kasılı çalış.',
        exercises: ['Hanging Leg Raise', 'Cable Crunch', 'Plank'],
      },
      legs: {
        name: 'Bacaklar',
        desc: 'Quadlar, hamstringler ve baldırlar — motor. En büyük kaslar, kuvvet ve form için en büyük getiri.',
        exercises: ['Squat', 'Romanian Deadlift', 'Leg Press'],
      },
    },
  },

  auth: {
    signInTitle: 'Tekrar hoş geldin',
    signUpTitle: 'Aramıza katıl',
    signIn: 'Giriş yap',
    signUp: 'Kaydol',
    createAccount: 'Hesap oluştur',
    namePlaceholder: 'Adın',
    emailPlaceholder: 'E-posta',
    passwordPlaceholder: 'Şifre',
    google: 'Google ile devam et',
    or: 'veya',
    welcomeBackText: 'Antrenmanını kaydet, programını takip et, topluluğa katıl.',
    joinText: 'Ücretsiz hesabını oluştur, ekiple antrenmana başla.',
    haveAccount: 'Zaten üye misin?',
    noAccount: 'Yeni misin?',
    confirmEmail: 'Az kaldı — hesabını onaylamak için e-postanı kontrol et.',
    rateLimitHint: 'E-posta limiti doldu — bunun yerine “Google ile devam et”i kullan.',
    close: 'Kapat',
  },

  track: {
    eyebrow: 'Antrenman takibi',
    title: 'Takip',
    subtitle: 'Her seti kaydet. Alışkanlığı kur. Rakamların yükselişini izle.',
    signInTitle: 'Takibe başlamak için giriş yap',
    signInSubtitle: 'Antrenmanların buluta kaydolsun, her cihazdan devam et.',
    google: 'Google ile devam et',
    emailPlaceholder: 'sen@mail.com',
    emailButton: 'Giriş linki gönder',
    emailSent: 'Giriş linki için gelen kutunu kontrol et.',
    signOut: 'Çıkış',
    start: 'Antrenmana Başla',
    statWorkouts: 'Antrenman',
    statWeek: 'Bu hafta',
    statVolume: 'Hacim (kg)',
    historyTitle: 'Geçmiş',
    empty: 'Henüz antrenman yok — Antrenmana Başla’ya bas.',
    newWorkout: 'Yeni Antrenman',
    titlePlaceholder: 'Antrenman adı (örn. İtiş Günü)',
    addExercise: 'Egzersiz Ekle',
    addSet: 'Set ekle',
    finish: 'Bitir',
    cancel: 'Vazgeç',
    discardConfirm: 'Bu antrenman silinsin mi?',
    rest: 'Dinlenme',
    skip: 'Geç',
    pickerTitle: 'Egzersiz ekle',
    search: 'Egzersiz ara…',
    customPlaceholder: 'Özel egzersiz adı',
    add: 'Ekle',
    deleteConfirm: 'Bu antrenman silinsin mi?',
    setsLabel: 'set',
    programsTitle: 'Programlarım',
    createProgram: 'Program Oluştur',
    newProgram: 'Yeni Program',
    editProgram: 'Programı Düzenle',
    programNamePlaceholder: 'Program adı (örn. İtiş Günü)',
    emptyWorkout: 'Hızlı antrenman (programsız)',
    startProgram: 'Başla',
    noPrograms: 'Henüz program yok — set ve dinlenmeni planlamak için bir tane oluştur.',
    targetSets: 'Set',
    targetReps: 'Tekrar',
    restLabel: 'Dinlenme',
    sec: 'sn',
    saveProgram: 'Programı kaydet',
    weightPlaceholder: 'kg',
    repsPlaceholder: 'tekrar',
    exercisesLabel: 'egzersiz',
    coachProgram: 'Hoca',
    adminPanel: 'Admin Paneli',
    progressTitle: 'İlerleme',
    recordsTitle: 'Kişisel Rekorlar',
    volumePerWorkout: 'Antrenman başına hacim',
    muscles: {
      chest: 'Göğüs',
      back: 'Sırt',
      shoulders: 'Omuz',
      arms: 'Kol',
      legs: 'Bacak',
      core: 'Karın',
      cardio: 'Kardiyo',
    },
  },

  categories: {
    fitness: 'Fitness',
    health: 'Sağlık',
    lifestyle: 'Yaşam Tarzı',
    nutrition: 'Beslenme',
    mindset: 'Motivasyon',
    training: 'Antrenman İpuçları',
  },

  types: {
    video: 'Video',
    image: 'Fotoğraf',
    blog: 'Yazı',
  },

  post: {
    back: 'Geri',
    backToBlog: 'Tüm yazılar',
    shareWhatsapp: "WhatsApp'ta paylaş",
    viewOriginal: 'Orijinal gönderiyi gör',
    related: 'Daha fazla içerik',
  },

  footer: {
    tagline: 'Fitness, sağlık ve yaşam tarzı içerikleri.',
    rights: 'Tüm hakları saklıdır.',
    credit: 'Tasarım & Geliştirme',
  },

  partners: {
    title: 'Güvenle çalıştıklarımız',
  },

  common: {
    comingSoon: 'Çok yakında',
    notFound: 'Sayfa bulunamadı',
    backHome: 'Ana sayfaya dön',
  },
};
