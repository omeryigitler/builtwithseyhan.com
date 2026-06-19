import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getBlogPosts } from '@/lib/content';
import { PostCard } from '@/components/PostCard';
import { Reveal } from '@/components/Reveal';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { tr: '/tr/blog', en: '/en/blog' },
    },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const posts = await getBlogPosts();

  return (
    <section className="px-5 pb-20 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white md:text-5xl">
            {dict.blog.title}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-500 dark:text-gray-400">
            {dict.blog.subtitle}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">{dict.blog.empty}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i, 3) * 0.05}>
                <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                  <PostCard post={post} locale={locale} dict={dict} />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
