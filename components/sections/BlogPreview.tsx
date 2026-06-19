import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PostCard } from '@/components/PostCard';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Post } from '@/lib/types';

export function BlogPreview({
  posts,
  locale,
  dict,
}: {
  posts: Post[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="blog" className="bg-white px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-3 text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {dict.blog.title}
            </h2>
            <p className="max-w-xl text-lg text-gray-500 dark:text-gray-400">{dict.blog.subtitle}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand dark:text-white"
          >
            {dict.blog.viewAll} <ArrowRight size={16} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">{dict.blog.empty}</p>
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
