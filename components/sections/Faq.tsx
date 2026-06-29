'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export function Faq({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
        <span className="h-px w-8 bg-brand" /> {eyebrow}
      </div>
      <h2 className="mb-8 font-display text-4xl uppercase leading-[0.9] text-gray-900 dark:text-white sm:text-5xl">
        {title}
      </h2>

      <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-white/10 dark:border-white/10">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-bold text-gray-900 dark:text-white">{it.q}</span>
                <span className="shrink-0 text-brand">
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              {isOpen && (
                <p className="-mt-1 pb-5 pr-8 leading-relaxed text-gray-600 dark:text-gray-300">
                  {it.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
