import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getSettings } from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ScrollProgress } from '@/components/ScrollProgress';
import { EbookPopup } from '@/components/EbookPopup';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const settings = await getSettings();

  return (
    <>
      <ScrollProgress />
      <Header locale={locale} dict={dict} settings={settings} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} dict={dict} settings={settings} />
      <WhatsAppFloat url={settings.whatsappUrl} />
      <EbookPopup t={dict.nutrition.ebook.popup} />
    </>
  );
}
