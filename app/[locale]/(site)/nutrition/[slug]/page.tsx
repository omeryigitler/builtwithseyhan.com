import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Flame, Dumbbell, Clock } from 'lucide-react';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getRecipeBySlug, getAllRecipeSlugs } from '@/lib/content';
import { localize, lines } from '@/lib/types';
import { toEmbedUrl } from '@/lib/media';
import { JsonLd } from '@/components/seo/JsonLd';
import { recipeLd } from '@/lib/seo';
import { PrintButton } from '@/components/nutrition/PrintButton';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return {};
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const title = localize(recipe.title, loc);
  const description = localize(recipe.description, loc);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/nutrition/${slug}`,
      languages: { tr: `/tr/nutrition/${slug}`, en: `/en/nutrition/${slug}` },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      images: recipe.imageUrl ? [recipe.imageUrl] : undefined,
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const title = localize(recipe.title, locale);
  const desc = localize(recipe.description, locale);
  const cat = dict.nutrition.categories[recipe.category];
  const ingredients = lines(localize(recipe.ingredients, locale));
  const steps = lines(localize(recipe.steps, locale));
  const t = dict.nutrition.detail;

  return (
    <article className="px-5 pb-24 pt-32 sm:px-6 sm:pt-40">
      <JsonLd
        data={recipeLd({
          name: title,
          description: desc,
          url: `${SITE_URL}/${locale}/nutrition/${recipe.slug}`,
          image: recipe.imageUrl,
          category: cat,
          timeMin: recipe.timeMin,
          kcal: recipe.kcal,
          protein: recipe.protein,
          ingredients,
          steps,
          video: recipe.youtubeUrl,
          datePublished: recipe.createdAt,
        })}
      />

      <div className="mx-auto max-w-4xl">
        <Link
          href={`/${locale}/nutrition`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-brand print:hidden"
        >
          <ArrowLeft size={16} /> {t.back}
        </Link>

        <span className="mb-3 inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-brand">
          {cat}
        </span>
        <h1 className="mb-4 font-display text-4xl uppercase leading-[0.9] text-gray-900 dark:text-white sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">{desc}</p>

        {/* Macros */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-bold text-gray-900 dark:text-white">
          <span className="inline-flex items-center gap-2">
            <Flame size={18} className="text-brand" /> {recipe.kcal}
            <span className="font-normal text-gray-400">{dict.nutrition.macros.kcal}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Dumbbell size={18} className="text-brand" /> {recipe.protein}
            <span className="font-normal text-gray-400">{dict.nutrition.macros.protein}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={18} className="text-brand" /> {recipe.timeMin}
            <span className="font-normal text-gray-400">{dict.nutrition.macros.time}</span>
          </span>
          <PrintButton label={t.print} />
        </div>

        {recipe.imageUrl && (
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800">
            <Image
              src={recipe.imageUrl}
              alt={title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Ingredients + steps */}
        <div className="mt-12 grid gap-12 sm:grid-cols-[1fr_1.4fr]">
          {ingredients.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
                {t.ingredients}
              </h2>
              <ul className="space-y-2.5">
                {ingredients.map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {steps.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
                {t.steps}
              </h2>
              <ol className="space-y-4">
                {steps.map((it, i) => (
                  <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-300">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-black text-black">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{it}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Video */}
        {recipe.youtubeUrl && (
          <div className="mt-12 print:hidden">
            <h2 className="mb-4 font-display text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
              {t.watchVideo}
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black">
              <iframe
                className="h-full w-full"
                src={toEmbedUrl(recipe.youtubeUrl)}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
