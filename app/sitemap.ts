import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { getAllSlugs } from '@/lib/content';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push({ url: `${SITE}/${locale}`, changeFrequency: 'weekly', priority: 1 });
    routes.push({ url: `${SITE}/${locale}/nutrition`, changeFrequency: 'weekly', priority: 0.8 });
    routes.push({ url: `${SITE}/${locale}/blog`, changeFrequency: 'weekly', priority: 0.8 });
    for (const slug of slugs) {
      routes.push({
        url: `${SITE}/${locale}/blog/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return routes;
}
