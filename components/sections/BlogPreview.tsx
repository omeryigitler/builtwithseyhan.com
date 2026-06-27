import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PostCard } from '@/components/PostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
    <section
      id="blog"
      className="bg-white px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={dict.blog.eyebrow}
          title={dict.blog.title}
          subtitle={dict.blog.subtitle}
          flip
          action={
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900 underline decoration-brand decoration-2 underline-offset-[6px] transition-all hover:decoration-[3px] dark:text-white"
            >
              {dict.blog.viewAll} <ArrowRight size={16} />
            </Link>
          }
        />

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
