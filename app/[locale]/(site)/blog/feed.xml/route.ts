import { getBlogPosts } from '@/lib/content';
import { localize } from '@/lib/types';
import { isLocale, defaultLocale, locales, type Locale } from '@/i18n/config';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';

export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const posts = await getBlogPosts();
  const title = locale === 'tr' ? 'Built With Seyhan — Blog' : 'Built With Seyhan — Blog';
  const desc =
    locale === 'tr'
      ? 'Fitness, sağlık ve yaşam üzerine yazılar.'
      : 'Articles on fitness, health and lifestyle.';

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(localize(p.title, locale))}</title>
      <link>${SITE}/${locale}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/${locale}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.createdAt).toUTCString()}</pubDate>
      <description>${esc(localize(p.excerpt, locale))}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${SITE}/${locale}/blog</link>
    <atom:link href="${SITE}/${locale}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(desc)}</description>
    <language>${locale}</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
