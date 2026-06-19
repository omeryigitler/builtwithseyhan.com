'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { PostCard } from '@/components/PostCard';
import { PostModal } from '@/components/PostModal';
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

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  return (
    <section id="feed" className="bg-gray-50 px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {dict.feed.title}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">{dict.feed.subtitle}</p>
        </div>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <FilterChip active={active === 'all'} onClick={() => setActive('all')}>
            {dict.feed.all}
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={active === c} onClick={() => setActive(c)}>
              {dict.categories[c] ?? c}
            </FilterChip>
          ))}
        </div>

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

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
        active
          ? 'border-brand bg-brand text-black'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700'
      }`}
    >
      {children}
    </button>
  );
}
