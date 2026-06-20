import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  getPosts,
  getFeaturedVideos,
  getBlogPosts,
  getSocialItems,
  getSettings,
} from '@/lib/content';
import { Hero } from '@/components/sections/Hero';
import { LogoMarquee } from '@/components/LogoMarquee';
import { FeaturedVideos } from '@/components/sections/FeaturedVideos';
import { ContentFeed } from '@/components/sections/ContentFeed';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { GuideSection } from '@/components/sections/GuideSection';
import { SocialWall } from '@/components/sections/SocialWall';
import { WhatsAppCTA } from '@/components/sections/WhatsAppCTA';

export const revalidate = 300;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  const [posts, videos, blog, social, settings] = await Promise.all([
    getPosts(),
    getFeaturedVideos(),
    getBlogPosts(6),
    getSocialItems(),
    getSettings(),
  ]);

  return (
    <>
      <Hero locale={locale} dict={dict} settings={settings} />
      <LogoMarquee dict={dict} />
      <FeaturedVideos videos={videos} locale={locale} dict={dict} />
      <ContentFeed posts={posts} locale={locale} dict={dict} />
      <BlogPreview posts={blog} locale={locale} dict={dict} />
      <GuideSection dict={dict} settings={settings} />
      <SocialWall items={social} settings={settings} locale={locale} dict={dict} />
      <WhatsAppCTA dict={dict} settings={settings} />
    </>
  );
}
