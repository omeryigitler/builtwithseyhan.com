import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { localize } from '@/lib/types';
import { TERMS } from '@/lib/legal';
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
    title: localize(TERMS.title, loc),
    alternates: { canonical: `/${locale}/terms`, languages: { tr: '/tr/terms', en: '/en/terms' } },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return <LegalView doc={TERMS} locale={locale} dict={dict} />;
}
