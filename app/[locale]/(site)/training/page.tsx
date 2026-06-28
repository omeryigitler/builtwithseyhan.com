import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { FlipText } from '@/components/ui/FlipText';
import { MuscleMap } from '@/components/training/MuscleMap';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.training.title,
    description: dict.training.subtitle,
    alternates: {
      canonical: `/${locale}/training`,
      languages: { tr: '/tr/training', en: '/en/training' },
    },
  };
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* Masthead */}
      <section className="relative overflow-hidden px-5 pb-4 pt-32 sm:px-6 sm:pt-40">
        <div className="pointer-events-none absolute -right-24 top-28 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-[120px]" />
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            {dict.training.eyebrow}
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.82] text-gray-900 sm:text-8xl lg:text-[9rem] dark:text-white">
            <FlipText text={dict.training.title} />
            <span className="text-brand">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-500 dark:text-gray-400">
            {dict.training.subtitle}
          </p>
        </div>
      </section>

      {/* Muscle map */}
      <section className="px-5 pb-24 pt-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <MuscleMap t={dict.training} />
        </div>
      </section>
    </>
  );
}
