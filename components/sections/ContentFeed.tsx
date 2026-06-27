'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { PostCard } from '@/components/PostCard';
import { PostModal } from '@/components/PostModal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UnderlineTabs } from '@/components/ui/UnderlineTabs';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { Category, Post } from '@/lib/types';

export function ContentFeed({
  posts,
  locale,
  dict,
}: {
  posts: Post[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState<Category | 'all'>('all');
  const [selected, setSelected] = useState<Post | null>(null);

  const categories = useMemo(() => {
    const set = new Set<Category>();
    posts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const tabs = [
    { value: 'all' as const, label: dict.feed.all },
    ...categories.map((c) => ({ value: c, label: dict.categories[c] ?? c })),
  ];

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  return (
    <section
      id="feed"
      className="bg-gray-50 px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={dict.feed.eyebrow}
          title={dict.feed.title}
          subtitle={dict.feed.subtitle}
          flip
        />

        <UnderlineTabs tabs={tabs} value={active} onChange={setActive} className="mb-10" />

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">{dict.feed.empty}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i, 3) * 0.05}>
                {post.type === 'blog' ? (
                  <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                    <PostCard post={post} locale={locale} dict={dict} />
                  </Link>
                ) : (
                  <button type="button" onClick={() => setSelected(post)} className="block h-full w-full">
                    <PostCard post={post} locale={locale} dict={dict} />
                  </button>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <PostModal post={selected} locale={locale} dict={dict} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
