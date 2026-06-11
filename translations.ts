
export type Language = 'en' | 'tr';

export const content = {
  en: {
    ui: {
      defaultServiceTitle: "Free Analysis",
      nutritionPlanTitle: "Nutrition Plan",
      coachBadge: "About The Coach",
      clientFallback: "Client",
      clientAlt: "Coaching client",
      menu: {
        open: "Open menu",
        close: "Close menu"
      },
      theme: {
        toLight: "Switch to light mode",
        toDark: "Switch to dark mode",
        light: "Light mode",
        dark: "Dark mode"
      },
      language: {
        label: "Change language",
        toTurkish: "Turkish",
        toEnglish: "English"
      },
      recording: "REC - [00:00:12]",
      videoPreviewLabel: "Open introduction video",
      videoCloseLabel: "Close video",
      videoRing: "WATCH SHOWREEL - PLAY VIDEO -",
      social: {
        linkedin: "LinkedIn profile",
        twitter: "X profile",
        email: "Send email"
      }
    },
    nav: {
      about: "About Me",
      services: "Coaching",
      stories: "Transformations",
      faq: "FAQ",
      bookBtn: "Start Now"
    },
    hero: {
      badge: "Limited spots for Summer '24",
      title: "Build your dream physique.\nMaster your metabolism.",
      subtitle: "Scientific programming, customized nutrition, and elite mindset coaching to help you look, feel, and perform at your absolute best.",
      bookBtn: "Start Your Transformation",
      programsBtn: "View Plans"
    },
    trustedBy: "Trusted by athletes using",
    process: {
      title: "How It Works",
      subtitle: "Your journey to elite performance in 3 simple steps.",
      steps: [
        {
          title: "Application & Audit",
          desc: "Fill out the form. We analyze your lifestyle, hormones, and current physique to see if we're a match."
        },
        {
          title: "The Blueprint",
          desc: "I build your custom training app and nutrition protocol. No cookie-cutter PDF files. Everything is tailored."
        },
        {
          title: "Execution & Scaling",
          desc: "We track data weekly. Biofeedback, sleep, gym performance. As your body adapts, the plan evolves."
        }
      ]
    },
    calculator: {
      badge: "Free Tool",
      title: "Calorie Calculator",
      subtitle: "Find out exactly how much you need to eat to reach your goals.",
      gender: { male: "Male", female: "Female" },
      inputs: { weight: "Weight (kg)", height: "Height (cm)", age: "Age", activity: "Activity Level" },
      activity: {
        sedentary: "Sedentary (Office Job)",
        light: "Light Exercise (1-2 days)",
        moderate: "Moderate (3-5 days)",
        active: "Active (6-7 days)",
        athlete: "Athlete (2x per day)"
      },
      calculateBtn: "Calculate My Numbers",
      reset: "Reset calculator",
      empty: {
        title: "Waiting for Data...",
        subtitle: "Enter your stats on the left to see your personalized metabolic breakdown."
      },
      result: {
        maintenance: "Maintenance Calories",
        cut: "Fat Loss (Cut)",
        bulk: "Muscle Gain (Bulk)",
        unitPerDay: "kcal/day",
        ctaText: "Numbers are just the start. Knowing WHAT to eat to hit these numbers while enjoying your life is the key.",
        ctaBtn: "Get My Meal Plan"
      }
    },
    newsletter: {
        badge: "Free Resource",
        title: "The Ultimate Fat Loss Guide",
        coverTitle: "FAT LOSS\nBLUEPRINT",
        subtitle: "Stop guessing. Get my 25-page PDF guide on metabolic adaptation and macronutrients delivered to your inbox for free.",
        placeholder: "Enter your email address",
        button: "Send Me The Guide",
        success: "Email draft opened. Send it to request the guide.",
        subject: "Fat loss guide request",
        emailLabel: "Email"
    },
    about: {
      quote: "NO EXCUSES. JUST RESULTS.",
      backgroundWord: "ELITE",
      title: "More than a trainer. \nA transformation architect.",
      p1: "With over 10 years of experience in competitive bodybuilding and sports nutrition, I don't guess—I engineer results.",
      p2: "My approach rejects 'bro-science'. We use data-driven protocols for training and nutrition that fit your lifestyle, ensuring sustainable results without starving yourself.",
      p3: "Whether you want to step on stage or simply look your best on the beach, I provide the roadmap. You just need to walk the path.",
      stats: "Clients Transformed"
    },
    services: {
      title: "Choose Your Path",
      subtitle: "Comprehensive coaching plans designed for your specific goals.",
      cards: {
        1: {
          title: 'Consultation',
          description: "A 30-minute video call to analyze your current physique, nutrition habits, and set realistic goals.",
          duration: '30 min',
          price: 'Free'
        },
        2: {
          title: 'Nutrition Audit',
          description: "Complete analysis of your diet with a custom macro-nutrient plan and supplement protocol.",
          duration: 'One-time',
          price: '$150'
        },
        3: {
          title: '1:1 Online Coaching',
          description: "The full package. Weekly check-ins, custom training app, nutrition adjustments, and 24/7 WhatsApp support.",
          duration: 'Monthly',
          price: '$300/mo'
        },
        4: {
          title: 'Contest Prep',
          description: "Elite level coaching for competitors. Posing, peak week protocols, and daily check-ins closer to show.",
          duration: '16 Weeks',
          price: '$1200'
        }
      }
    },
    testimonials: {
      title: "Real Results",
      subtitle: "See what happens when consistency meets strategy.",
      readMore: "View All Transformations",
      before: "BEFORE",
      after: "AFTER",
      items: [
        {
          name: "Emre K.",
          timeframe: "16 Weeks",
          result: "Lost 18kg / Added Muscle",
          quote: "I thought I had bad genetics. Mustafa showed me I just had a bad plan. The nutrition changes were a game changer."
        },
        {
          name: "Jessica M.",
          timeframe: "12 Weeks",
          result: "Glute Focus / Toning",
          quote: "I've never eaten this much food while getting leaner. The training intensity is next level."
        },
        {
          name: "Ahmet Y.",
          timeframe: "6 Months",
          result: "Competition Ready",
          quote: "From skinny-fat to stage ready. The peak week protocol was precise and stress-free."
        },
        {
          name: "Burak D.",
          timeframe: "8 Months",
          result: "Hardgainer Bulk",
          quote: "I was stuck at 65kg for years. We finally broke the plateau and I'm sitting at a lean 78kg now."
        },
        {
          name: "Elif S.",
          timeframe: "20 Weeks",
          result: "Postpartum Recovery",
          quote: "Getting my core strength back after pregnancy seemed impossible. Safe, effective, and encouraging."
        },
        {
          name: "Cem T.",
          timeframe: "1 Year",
          result: "Age 40+ Transformation",
          quote: "Proved that you can build your best body after 40. My energy levels are higher than in my 20s."
        }
      ]
    },
    faq: {
      title: "FAQ",
      subtitle: "Common questions about the process.",
      items: [
        {
          q: "Do I need a gym membership?",
          a: "Ideally, yes. To achieve maximum hypertrophy and strength, gym equipment is superior. However, I can design effective home-workout plans if you have basic equipment (dumbbells/bench)."
        },
        {
          q: "Do you provide meal plans?",
          a: "I provide 'Flexible Dieting' guidelines and example meal plans. I don't force you to eat chicken and rice 6 times a day. We calculate your macros and I teach you how to hit them with foods you enjoy."
        },
        {
          q: "Is there a refund policy?",
          a: "I commit 100% to you, and I expect the same. Due to the digital nature of the intellectual property provided, there are no refunds once the initial plan is sent."
        },
        {
          q: "How does communication work?",
          a: "We use a dedicated coaching app for workouts and data. For communication, we use WhatsApp for daily questions and Loom videos for weekly detailed check-ins."
        }
      ]
    },
    footer: {
      title: "Your turn.",
      subtitle: "Stop waiting for the 'perfect time'. The perfect time was yesterday. The next best time is now.",
      bookBtn: "Apply for Coaching",
      links: [
        { label: "About", href: "#about" },
        { label: "Transformations", href: "#testimonials" },
        { label: "Pricing", href: "#services" },
        { label: "FAQ", href: "#faq" }
      ],
      rights: "Mustafa Seyhan Coaching. All rights reserved."
    },
    modal: {
      title: "Schedule Your Assessment",
      schedulerTitle: (provider: string) => `${provider} Calendar`,
      schedulerSubtitle: "Choose an available day and time directly from the booking calendar.",
      schedulerOpen: "Open calendar in a new tab",
      formTitle: "Contact Details",
      formSubtitle: "Add your details so we can confirm availability and send the meeting link.",
      confirmedTitle: "Request Ready",
      confirmedMsg: "A pre-filled email draft has been opened. Send it to complete your coaching request.",
      done: "Back to Site",
      back: "Back",
      submitRequest: "Prepare Request",
      closeLabel: "Close modal",
      prevMonthLabel: "Previous month",
      nextMonthLabel: "Next month",
      unavailable: "Booked",
      datePlaceholder: "Select a date",
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone / WhatsApp",
        goal: "Goal",
        goalPlaceholder: "Briefly describe your goal, current routine, and biggest challenge."
      },
      email: {
        subject: "Coaching request",
        service: "Selected service",
        date: "Preferred date",
        time: "Preferred time",
        name: "Full name",
        email: "Email",
        phone: "Phone / WhatsApp",
        goal: "Goal"
      },
      serviceDetails: {
         duration: "30 min",
         platform: "Video Call",
         desc: "We will review your training history, injuries, and dietary preferences to build your custom roadmap.",
         poweredBy: "Mustafa Seyhan Systems",
         coachAlt: "Mustafa Seyhan"
      },
      months: {
        oct: "October"
      },
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  },
  tr: {
    ui: {
      defaultServiceTitle: "Ücretsiz Analiz",
      nutritionPlanTitle: "Beslenme Planı",
      coachBadge: "Koç Hakkında",
      clientFallback: "Danışan",
      clientAlt: "Koçluk danışanı",
      menu: {
        open: "Menüyü aç",
        close: "Menüyü kapat"
      },
      theme: {
        toLight: "Açık moda geç",
        toDark: "Koyu moda geç",
        light: "Açık mod",
        dark: "Koyu mod"
      },
      language: {
        label: "Dili değiştir",
        toTurkish: "Türkçe",
        toEnglish: "İngilizce"
      },
      recording: "KAYIT - [00:00:12]",
      videoPreviewLabel: "Tanıtım videosunu aç",
      videoCloseLabel: "Videoyu kapat",
      videoRing: "TANITIMI İZLE - VİDEOYU OYNAT -",
      social: {
        linkedin: "LinkedIn profili",
        twitter: "X profili",
        email: "E-posta gönder"
      }
    },
    nav: {
      about: "Hakkımda",
      services: "Uzaktan Eğitim",
      stories: "Değişimler",
      faq: "SSS",
      bookBtn: "Başvuru Yap"
    },
    hero: {
      badge: "Yaz dönemi kayıtları açıldı",
      title: "Hayalindeki fiziği inşa et.\nMetabolizmanı yönet.",
      subtitle: "En iyi halinize ulaşmanız için bilimsel antrenman programlaması, kişiye özel beslenme ve profesyonel süreç yönetimi.",
      bookBtn: "Değişimi Başlat",
      programsBtn: "Paketleri İncele"
    },
    trustedBy: "Sponsorlu sporcuların tercihi",
    process: {
      title: "Süreç Nasıl İşliyor?",
      subtitle: "3 basit adımda elit performansa giden yolculuk.",
      steps: [
        {
          title: "Başvuru ve Analiz",
          desc: "Formu doldurun. Yaşam tarzınızı, hormon profilinizi ve güncel fiziğinizi analiz edip uyumlu olup olmadığımıza bakalım."
        },
        {
          title: "Yol Haritası (Planlama)",
          desc: "Size özel antrenman uygulamanızı ve beslenme protokolünüzü hazırlıyorum. Hazır PDF dosyaları yok. Her şey kişiye özel."
        },
        {
          title: "Uygulama ve Ölçekleme",
          desc: "Verileri haftalık takip ediyoruz. Uyku, antrenman performansı, mezura ölçüleri. Vücudunuz değiştikçe plan da evrimleşiyor."
        }
      ]
    },
    calculator: {
      badge: "Ücretsiz Araç",
      title: "Kalori Hesaplayıcı",
      subtitle: "Hedefinize ulaşmak için ne kadar yemeniz gerektiğini öğrenin.",
      gender: { male: "Erkek", female: "Kadın" },
      inputs: { weight: "Kilo (kg)", height: "Boy (cm)", age: "Yaş", activity: "Aktivite Seviyesi" },
      activity: {
        sedentary: "Hareketsiz (Ofis işi)",
        light: "Hafif aktif (1-2 gün)",
        moderate: "Orta aktif (3-5 gün)",
        active: "Çok aktif (6-7 gün)",
        athlete: "Sporcu (Günde 2 idman)"
      },
      calculateBtn: "Hesapla",
      reset: "Hesaplayıcıyı sıfırla",
      empty: {
        title: "Veri Bekleniyor...",
        subtitle: "Metabolik analizinizi görmek için soldaki bilgileri doldurun."
      },
      result: {
        maintenance: "Koruma Kalorisi",
        cut: "Yağ Yakımı",
        bulk: "Kas Kazanımı",
        unitPerDay: "kcal/gün",
        ctaText: "Sayılar sadece başlangıç. Bu kalorileri tuttururken sevdiğiniz yemekleri nasıl yiyeceğinizi öğrenmek işin anahtarı.",
        ctaBtn: "Beslenme Planımı Oluştur"
      }
    },
    newsletter: {
        badge: "Ücretsiz Kaynak",
        title: "Definasyon Rehberi",
        coverTitle: "DEFINASYON\nREHBERİ",
        subtitle: "Deneme yanılmayı bırakın. Metabolik adaptasyon, makro besinler ve yağ yakımı üzerine hazırladığım 25 sayfalık rehberi ücretsiz indirin.",
        placeholder: "E-posta adresinizi girin",
        button: "Rehberi Gönder",
        success: "E-posta taslağı açıldı. Rehberi talep etmek için gönderin.",
        subject: "Definasyon rehberi talebi",
        emailLabel: "E-posta"
    },
    about: {
      quote: "MAZERET YOK. SADECE SONUÇ.",
      backgroundWord: "ELİT",
      title: "Sadece antrenör değil. \nDönüşüm mimarı.",
      p1: "Vücut geliştirme ve sporcu beslenmesi konusundaki 10 yılı aşkın tecrübemle, tahmin yürütmüyorum—sonuç üretiyorum.",
      p2: "Yaklaşımımda 'kulaktan dolma' bilgilere yer yok. Yaşam tarzınıza uygun, aç kalmadan sürdürülebilir sonuçlar almanızı sağlayan, veriye dayalı antrenman ve beslenme protokolleri kullanıyoruz.",
      p3: "İster podyuma çıkmak isteyin, ister plajda en iyi halinizle görünmek; ben size yol haritasını sunuyorum. Size sadece yolda yürümek kalıyor.",
      stats: "Dönüştürülen Fizik"
    },
    services: {
      title: "Yolculuğunu Seç",
      subtitle: "Hedeflerinize özel olarak tasarlanmış kapsamlı koçluk planları.",
      cards: {
        1: {
          title: 'Ücretsiz Analiz',
          description: "Mevcut fiziğinizi, beslenme alışkanlıklarınızı analiz etmek ve gerçekçi hedefler belirlemek için 30 dakikalık görüşme.",
          duration: '30 dk',
          price: 'Ücretsiz'
        },
        2: {
          title: 'Beslenme Denetimi',
          description: "Mevcut diyetinizin tam analizi, kişiye özel makro planlaması ve takviye protokolü oluşturulması.",
          duration: 'Tek Sefer',
          price: '₺2500'
        },
        3: {
          title: '1:1 Uzaktan Eğitim',
          description: "Tam kapsamlı paket. Haftalık form kontrolü, kişisel antrenman uygulaması, diyet revizyonları ve WhatsApp desteği.",
          duration: 'Aylık',
          price: '₺5000/ay'
        },
        4: {
          title: 'Yarışma Hazırlık',
          description: "Yarışmacılar için elit seviye koçluk. Poz dersleri, son hafta protokolleri ve sahneye yaklaştıkça günlük takip.",
          duration: '16 Hafta',
          price: '₺25.000'
        }
      }
    },
    testimonials: {
      title: "Gerçek Sonuçlar",
      subtitle: "İstikrar ve strateji birleştiğinde neler olduğuna bakın.",
      readMore: "Tüm Değişimleri Gör",
      before: "ÖNCESİ",
      after: "SONRASI",
      items: [
        {
          name: "Emre K.",
          timeframe: "16 Hafta",
          result: "18kg Yağ Yakımı / Kas Kütlesi",
          quote: "Genetiğimin kötü olduğunu sanıyordum. Mustafa bana sadece kötü bir planım olduğunu gösterdi."
        },
        {
          name: "Selin M.",
          timeframe: "12 Hafta",
          result: "Sıkılaşma / Form Tutma",
          quote: "Hayatımda hiç bu kadar çok yemek yiyip bu kadar incelmemiştim. Antrenman şiddeti bambaşka bir seviye."
        },
        {
          name: "Ahmet Y.",
          timeframe: "6 Ay",
          result: "Yarışma Formu",
          quote: "Zayıf ama yağlı halimden podyum formuna. Son hafta yüklemeleri nokta atışıydı."
        },
        {
          name: "Burak D.",
          timeframe: "8 Ay",
          result: "Zor Kilo Alanlar İçin Hacim",
          quote: "Yıllarca 65 kiloda takılı kalmıştım. Sonunda platoyu kırdık ve şu an 78 kilo defineyim."
        },
        {
          name: "Elif S.",
          timeframe: "20 Hafta",
          result: "Doğum Sonrası Toparlanma",
          quote: "Hamilelik sonrası karın kaslarımı geri kazanmak imkansız geliyordu. Güvenli ve motive edici bir süreçti."
        },
        {
          name: "Cem T.",
          timeframe: "1 Yıl",
          result: "40 Yaş Üstü Değişim",
          quote: "40 yaşından sonra en iyi fiziğime ulaşabileceğimi kanıtladık. Enerjim 20'li yaşlarımdan daha yüksek."
        }
      ]
    },
    faq: {
      title: "Merak Edilenler",
      subtitle: "Süreç hakkında sıkça sorulan sorular.",
      items: [
        {
          q: "Spor salonuna gitmem şart mı?",
          a: "Maksimum gelişim için evet, spor salonu ekipmanları daha üstündür. Ancak sadece temel ekipmanlarınız (dumbell/sehpa) varsa veya evde çalışmak zorundaysanız buna uygun etkili planlar da hazırlayabilirim."
        },
        {
          q: "Yemek listesi veriyor musunuz?",
          a: "Size esnek beslenme prensiplerini öğretiyorum. Sevmediğiniz şeyleri zorla yedirmek yerine, makro besin hedeflerinizi belirleyip kendi tercih ettiğiniz besinlerle bu hedefleri nasıl tutturacağınızı gösteriyorum."
        },
        {
          q: "İade politikanız var mı?",
          a: "Ben size %100 taahhüt veriyorum, aynısını sizden de bekliyorum. Hazırlanan planlar kişiye özel dijital içerik olduğu için plan gönderildikten sonra iade yapılmamaktadır."
        },
        {
          q: "İletişim nasıl sağlanıyor?",
          a: "Antrenman takibi için özel mobil uygulamamızı kullanıyoruz. İletişim için ise WhatsApp üzerinden günlük sorularınızı yanıtlıyor, haftalık detaylı analizleri sesli veya görüntülü mesajlarla yapıyorum."
        }
      ]
    },
    footer: {
      title: "Sıra sende.",
      subtitle: "'Mükemmel zamanı' beklemeyi bırakın. Mükemmel zaman dündü. En iyi ikinci zaman ise şimdi.",
      bookBtn: "Koçluk Başvurusu Yap",
      links: [
        { label: "Hakkımda", href: "#about" },
        { label: "Değişimler", href: "#testimonials" },
        { label: "Fiyatlandırma", href: "#services" },
        { label: "SSS", href: "#faq" }
      ],
      rights: "Mustafa Seyhan Koçluk. Tüm hakları saklıdır."
    },
    modal: {
      title: "Analiz Randevusu Oluştur",
      schedulerTitle: (provider: string) => `${provider} Takvimi`,
      schedulerSubtitle: "Size uygun gün ve saati doğrudan randevu takviminden seçin.",
      schedulerOpen: "Takvimi yeni sekmede aç",
      formTitle: "İletişim Bilgileri",
      formSubtitle: "Uygunluğu onaylayıp görüşme bilgilerini paylaşabilmemiz için bilgilerinizi ekleyin.",
      confirmedTitle: "Başvuru Hazırlandı",
      confirmedMsg: "Önceden doldurulmuş e-posta taslağı açıldı. Koçluk başvurunuzu tamamlamak için e-postayı gönderin.",
      done: "Siteye Dön",
      back: "Geri",
      submitRequest: "Başvuruyu Hazırla",
      closeLabel: "Pencereyi kapat",
      prevMonthLabel: "Önceki ay",
      nextMonthLabel: "Sonraki ay",
      unavailable: "Dolu",
      datePlaceholder: "Tarih seçin",
      fields: {
        name: "Ad Soyad",
        email: "E-posta",
        phone: "Telefon / WhatsApp",
        goal: "Hedef",
        goalPlaceholder: "Hedefinizi, mevcut rutininizi ve en büyük zorlandığınız noktayı kısaca yazın."
      },
      email: {
        subject: "Koçluk başvurusu",
        service: "Seçilen hizmet",
        date: "Tercih edilen tarih",
        time: "Tercih edilen saat",
        name: "Ad Soyad",
        email: "E-posta",
        phone: "Telefon / WhatsApp",
        goal: "Hedef"
      },
      serviceDetails: {
         duration: "30 dk",
         platform: "Görüntülü Görüşme",
         desc: "Antrenman geçmişinizi, sakatlık durumunuzu ve beslenme tercihlerinizi inceleyip size özel yol haritasını çıkaracağız.",
         poweredBy: "Mustafa Seyhan Sistemleri",
         coachAlt: "Mustafa Seyhan"
      },
      months: {
        oct: "Ekim"
      },
      days: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
    }
  }
};
