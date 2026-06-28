import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { FlipText } from '@/components/ui/FlipText';
import { WorkoutTracker } from '@/components/track/WorkoutTracker';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.track.title,
    description: dict.track.subtitle,
    alternates: {
      canonical: `/${locale}/track`,
      languages: { tr: '/tr/track', en: '/en/track' },
    },
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-4 pt-32 sm:px-6 sm:pt-40">
        <div className="pointer-events-none absolute -left-24 top-28 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-[120px]" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            {dict.track.eyebrow}
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.82] text-gray-900 sm:text-7xl dark:text-white">
            <FlipText text={dict.track.title} />
            <span className="text-brand">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-gray-500 dark:text-gray-400">
            {dict.track.subtitle}
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 pt-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <WorkoutTracker locale={locale} dict={dict} />
        </div>
      </section>
    </>
  );
}
