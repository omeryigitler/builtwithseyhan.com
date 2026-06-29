'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';

const KEY = 'bws_consent';

/**
 * Cookie/analytics consent banner (KVKK/GDPR). Vercel Analytics is cookieless,
 * but we still let visitors opt out: analytics only loads after "Accept", and
 * the choice is remembered in localStorage.
 */
export function ConsentAnalytics({ locale, t }: { locale: Locale; t: Dictionary['consent'] }) {
  const [choice, setChoice] = useState<'accepted' | 'rejected' | null | 'pending'>('pending');

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setChoice(v === 'accepted' || v === 'rejected' ? v : null);
    } catch {
      setChoice(null);
    }
  }, []);

  const decide = (v: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setChoice(v);
  };

  return (
    <>
      {choice === 'accepted' && <Analytics />}

      {choice === null && (
        <div className="animate-fade-in-up fixed inset-x-0 bottom-0 z-[80] p-4">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-2xl backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm text-gray-600 dark:text-gray-300">
              {t.text}{' '}
              <Link href={`/${locale}/privacy`} className="font-bold text-gray-900 underline underline-offset-2 dark:text-brand">
                {t.privacy}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => decide('rejected')}
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-bold text-gray-700 transition hover:border-gray-500 dark:border-gray-700 dark:text-gray-200"
              >
                {t.reject}
              </button>
              <button
                type="button"
                onClick={() => decide('accepted')}
                className="rounded-full bg-brand px-5 py-2 text-sm font-black uppercase tracking-wider text-black transition hover:bg-brand-hover"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
