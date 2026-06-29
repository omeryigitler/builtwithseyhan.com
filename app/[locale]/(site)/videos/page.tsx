import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getVideoPosts } from '@/lib/content';
import { VideoGallery } from '@/components/videos/VideoGallery';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.videosPage.title,
    description: dict.videosPage.subtitle,
    alternates: {
      canonical: `/${locale}/videos`,
      languages: { tr: '/tr/videos', en: '/en/videos' },
    },
  };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const videos = await getVideoPosts();

  return (
    <div className="px-5 pb-24 pt-32 sm:px-6 sm:pt-40">
      <section className="mx-auto max-w-7xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
          {dict.videosPage.eyebrow}
        </p>
        <h1 className="font-display text-6xl uppercase leading-[0.82] text-gray-900 dark:text-white sm:text-8xl">
          {dict.videosPage.title}
          <span className="text-brand">.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-gray-500 dark:text-gray-400">
          {dict.videosPage.subtitle}
        </p>

        <div className="mt-12">
          <VideoGallery videos={videos} locale={locale} dict={dict} />
        </div>
      </section>
    </div>
  );
}
