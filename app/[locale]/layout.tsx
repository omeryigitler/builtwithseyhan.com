import type { Metadata, Viewport } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ServiceWorker } from '@/components/ServiceWorker';
import { isLocale, locales, type Locale } from '@/i18n/config';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === 'tr';
  const title = 'Built With Seyhan — Fitness • Health • LifeStyle';
  const description = isTr
    ? 'Antrenman, sağlıklı yaşam ve günlük disiplin. Video, fotoğraf ve yazılarla fitness & lifestyle içerikleri.'
    : 'Training, wellness and everyday discipline. Fitness & lifestyle content in video, photo and writing.';

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s — Built With Seyhan' },
    description,
    icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: '/tr', en: '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: 'Built With Seyhan',
      title,
      description,
      url: `/${locale}`,
      locale: isTr ? 'tr_TR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <html lang={loc} suppressHydrationWarning className={`${inter.variable} ${bebas.variable}`}>
      <body className="bg-gray-50 font-sans text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorker />
      </body>
    </html>
  );
}
