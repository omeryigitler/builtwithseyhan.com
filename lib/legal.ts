import type { LocalizedText } from './types';

export interface LegalSection {
  heading: LocalizedText;
  body: LocalizedText;
}

export interface LegalDoc {
  title: LocalizedText;
  intro: LocalizedText;
  sections: LegalSection[];
}

/** Last-updated date shown on both documents. */
export const LEGAL_UPDATED = '2026-06-28';
export const LEGAL_CONTACT = 'contact@builtwithseyhan.com';

export const PRIVACY: LegalDoc = {
  title: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
  intro: {
    tr: 'Bu politika, Built With Seyhan’ı kullandığında hangi kişisel verileri işlediğimizi ve haklarını açıklar. (Bu metin bir başlangıç şablonudur; yayına almadan önce bir hukukçuya gözden geçirtmeni öneririz.)',
    en: 'This policy explains what personal data we process when you use Built With Seyhan and your rights. (This is a starting template; have it reviewed by a lawyer before going live.)',
  },
  sections: [
    {
      heading: { tr: 'Topladığımız veriler', en: 'Data we collect' },
      body: {
        tr: '• Hesap bilgileri: ad ve e-posta (Google ile veya e-posta/şifre ile giriş).\n• Antrenman verileri: oluşturduğun programlar, kaydettiğin antrenmanlar, setler.\n• Paylaştığın içerik: topluluk gönderileri (foto, açıklama, Instagram).\n• E-bülten: e-kitap için bıraktığın e-posta adresi.',
        en: '• Account: name and email (Google or email/password sign-in).\n• Workout data: the programs you create, the workouts and sets you log.\n• Content you share: community posts (photo, caption, Instagram).\n• Newsletter: the email you leave for the e-book.',
      },
    },
    {
      heading: { tr: 'Verileri nasıl kullanıyoruz', en: 'How we use your data' },
      body: {
        tr: 'Hesabını yönetmek, antrenmanlarını saklamak ve cihazların arasında senkronlamak, koçun program atayabilmesi, topluluk içeriğini yayınlamak ve istersen sana e-kitap/bülten göndermek için.',
        en: 'To run your account, store and sync your workouts across devices, let your coach assign programs, publish community content, and send you the e-book/newsletter if you opt in.',
      },
    },
    {
      heading: { tr: 'Hizmet sağlayıcılar', en: 'Processors' },
      body: {
        tr: 'Verilerini güvenli üçüncü taraf altyapılarda işliyoruz: Supabase (veritabanı ve kimlik doğrulama, AB bölgesi), Vercel (barındırma) ve Google (isteğe bağlı giriş). Verilerini satmıyoruz.',
        en: 'We process your data on trusted third-party infrastructure: Supabase (database & authentication, EU region), Vercel (hosting) and Google (optional sign-in). We do not sell your data.',
      },
    },
    {
      heading: { tr: 'Çerezler', en: 'Cookies' },
      body: {
        tr: 'Oturumunu açık tutmak (kimlik doğrulama) ve dil tercihini hatırlamak için gerekli çerezleri kullanırız.',
        en: 'We use essential cookies to keep you signed in (authentication) and to remember your language preference.',
      },
    },
    {
      heading: { tr: 'Haklarn (KVKK / GDPR)', en: 'Your rights (KVKK / GDPR)' },
      body: {
        tr: 'Verilerine erişme, düzeltme ve silinmesini isteme hakkın vardır. Hesabındaki içeriği panelinden silebilir veya tüm verilerinin silinmesi için bizimle iletişime geçebilirsin.',
        en: 'You have the right to access, correct and request deletion of your data. You can delete your content from your panel, or contact us to have all your data removed.',
      },
    },
    {
      heading: { tr: 'İletişim', en: 'Contact' },
      body: {
        tr: `Gizlilikle ilgili her konu için: ${LEGAL_CONTACT}`,
        en: `For any privacy matter: ${LEGAL_CONTACT}`,
      },
    },
  ],
};

export const TERMS: LegalDoc = {
  title: { tr: 'Kullanım Şartları', en: 'Terms of Service' },
  intro: {
    tr: 'Built With Seyhan’ı kullanarak aşağıdaki şartları kabul etmiş olursun. (Bu metin bir başlangıç şablonudur; yayına almadan önce bir hukukçuya gözden geçirtmeni öneririz.)',
    en: 'By using Built With Seyhan you agree to the following terms. (This is a starting template; have it reviewed by a lawyer before going live.)',
  },
  sections: [
    {
      heading: { tr: 'Hesaplar', en: 'Accounts' },
      body: {
        tr: 'Doğru bilgilerle bir hesap oluşturmaktan ve hesabının güvenliğinden sen sorumlusun. Hesabını istediğin zaman kapatabilirsin.',
        en: 'You are responsible for creating an account with accurate information and for keeping it secure. You may close your account at any time.',
      },
    },
    {
      heading: { tr: 'Sağlık uyarısı', en: 'Health disclaimer' },
      body: {
        tr: 'Buradaki antrenman, beslenme ve içerikler yalnızca bilgilendirme amaçlıdır; tıbbi tavsiye değildir. Yeni bir programa başlamadan önce bir sağlık uzmanına danış. Egzersizleri kendi sorumluluğunda yaparsın.',
        en: 'The training, nutrition and content here are for information only and are not medical advice. Consult a healthcare professional before starting any program. You exercise at your own risk.',
      },
    },
    {
      heading: { tr: 'Üye içeriği', en: 'Member content' },
      body: {
        tr: 'Paylaştığın içerikten sen sorumlusun. Yasa dışı, hakaret içeren veya başkalarının haklarını ihlal eden içerik paylaşamazsın. Uygunsuz içerikleri yayından kaldırma hakkımız saklıdır.',
        en: 'You are responsible for the content you share. You may not post unlawful, abusive or infringing content. We may remove content that violates these terms.',
      },
    },
    {
      heading: { tr: 'Fikri mülkiyet', en: 'Intellectual property' },
      body: {
        tr: 'Sitedeki marka, tasarım ve içerikler Built With Seyhan’a aittir ve izinsiz kullanılamaz. Kendi paylaştığın içeriğin sahibi sensin.',
        en: 'The brand, design and content on this site belong to Built With Seyhan and may not be used without permission. You retain ownership of the content you post.',
      },
    },
    {
      heading: { tr: 'Sorumluluğun sınırı', en: 'Limitation of liability' },
      body: {
        tr: 'Hizmet “olduğu gibi” sunulur. Kullanımından doğabilecek dolaylı zararlardan sorumlu değiliz.',
        en: 'The service is provided “as is”. We are not liable for indirect damages arising from its use.',
      },
    },
    {
      heading: { tr: 'Değişiklikler & iletişim', en: 'Changes & contact' },
      body: {
        tr: `Bu şartları zaman zaman güncelleyebiliriz. Sorular için: ${LEGAL_CONTACT}`,
        en: `We may update these terms from time to time. Questions: ${LEGAL_CONTACT}`,
      },
    },
  ],
};
