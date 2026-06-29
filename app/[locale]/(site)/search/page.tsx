import type { Metadata } from 'next';
import { Suspense } from 'react';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getPosts, getRecipes } from '@/lib/content';
import { localize } from '@/lib/types';
import { SearchView, type SearchRecord } from '@/components/search/SearchView';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.search.title,
    robots: { index: false },
    alternates: { canonical: `/${locale}/search` },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const [posts, recipes] = await Promise.all([getPosts(), getRecipes()]);

  const postHref = (p: (typeof posts)[number]) =>
    p.type === 'blog' ? `/${locale}/blog/${p.slug}` : p.type === 'video' ? `/${locale}/videos` : `/${locale}#feed`;

  const records: SearchRecord[] = [
    ...posts.map((p) => ({
      type: p.type,
      typeLabel: dict.categories[p.category] ?? p.type,
      title: localize(p.title, locale),
      excerpt: localize(p.excerpt, locale),
      href: postHref(p),
      image: p.imageUrl,
    })),
    ...recipes.map((r) => ({
      type: 'recipe',
      typeLabel: dict.nutrition.categories[r.category],
      title: localize(r.title, locale),
      excerpt: localize(r.description, locale),
      href: `/${locale}/nutrition/${r.slug}`,
      image: r.imageUrl,
    })),
  ];

  return (
    <div className="px-5 pb-24 pt-32 sm:px-6 sm:pt-40">
      <Suspense>
        <SearchView records={records} dict={dict} />
      </Suspense>
    </div>
  );
}
