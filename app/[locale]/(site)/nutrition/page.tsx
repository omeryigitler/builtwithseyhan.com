import type { Metadata } from 'next';
import { Lock } from 'lucide-react';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getRecipes } from '@/lib/content';
import { FlipText } from '@/components/ui/FlipText';
import { RecipeIndex } from '@/components/nutrition/RecipeIndex';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.nutrition.title,
    description: dict.nutrition.subtitle,
    alternates: {
      canonical: `/${locale}/nutrition`,
      languages: { tr: '/tr/nutrition', en: '/en/nutrition' },
    },
  };
}

export default async function NutritionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const recipes = await getRecipes();

  return (
    <>
      {/* Masthead */}
      <section className="relative overflow-hidden px-5 pb-4 pt-32 sm:px-6 sm:pt-40">
        <div className="pointer-events-none absolute -left-24 top-28 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-[120px]" />
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            {dict.nutrition.eyebrow}
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.82] text-gray-900 sm:text-8xl lg:text-[9rem] dark:text-white">
            <FlipText text={dict.nutrition.title} />
            <span className="text-brand">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-gray-500 dark:text-gray-400">
            {dict.nutrition.subtitle}
          </p>
        </div>
      </section>

      {/* Recipe index */}
      <section className="px-5 pb-20 pt-6 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <RecipeIndex recipes={recipes} locale={locale} dict={dict} />
        </div>
      </section>

      {/* E-book — glassmorphism teaser */}
      <section className="px-5 pb-24 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 px-6 py-14 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-brand/40 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-brand/20 blur-[120px]" />
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="relative grid items-center gap-8 sm:grid-cols-[auto_1fr]">
            {/* frosted glass lock */}
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
              <Lock className="text-white" size={36} />
            </div>
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                {dict.nutrition.ebook.badge}
              </span>
              <h2 className="font-display text-4xl uppercase tracking-tight text-white sm:text-5xl">
                {dict.nutrition.ebook.title}
              </h2>
              <p className="mt-3 max-w-lg text-gray-300">{dict.nutrition.ebook.subtitle}</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl">
                <Lock size={15} /> {dict.nutrition.ebook.locked}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
