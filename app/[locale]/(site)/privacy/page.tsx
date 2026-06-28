import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { localize } from '@/lib/types';
import { PRIVACY } from '@/lib/legal';
import { LegalView } from '@/components/legal/LegalView';

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  return {
    title: localize(PRIVACY.title, loc),
    alternates: { canonical: `/${locale}/privacy`, languages: { tr: '/tr/privacy', en: '/en/privacy' } },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return <LegalView doc={PRIVACY} locale={locale} dict={dict} />;
}
