'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries';

export type SearchRecord = {
  type: string;
  typeLabel: string;
  title: string;
  excerpt: string;
  href: string;
  image: string | null;
};

export function SearchView({
  records,
  dict,
}: {
  records: SearchRecord[];
  dict: Dictionary;
}) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const t = dict.search;

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return records.filter(
      (r) =>
        r.title.toLowerCase().includes(term) || r.excerpt.toLowerCase().includes(term),
    );
  }, [q, records]);

  const term = q.trim();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-5xl uppercase leading-[0.9] text-gray-900 dark:text-white sm:text-6xl">
        {t.title}
      </h1>

      <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-5 dark:border-gray-700 dark:bg-gray-900">
        <Search size={20} className="shrink-0 text-gray-400" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.placeholder}
          className="w-full bg-transparent py-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white"
        />
      </div>

      <div className="mt-8">
        {term.length < 2 ? (
          <p className="text-sm text-gray-400">{t.prompt}</p>
        ) : results.length === 0 ? (
          <p className="text-sm text-gray-400">{t.empty}</p>
        ) : (
          <>
            <p className="mb-5 text-sm text-gray-400">
              {results.length} {t.results}
            </p>
            <div className="space-y-3">
              {results.map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-200 p-3 transition-colors hover:border-brand dark:border-gray-800"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    {r.image && (
                      <Image src={r.image} alt={r.title} fill sizes="96px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand">
                      {r.typeLabel}
                    </span>
                    <div className="truncate font-bold text-gray-900 dark:text-white">{r.title}</div>
                    <div className="truncate text-sm text-gray-500">{r.excerpt}</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
