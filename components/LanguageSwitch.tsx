'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale, LOCALE_COOKIE } from '@/i18n/config';

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // Remember the manual choice so middleware honours it next time.
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    const segments = pathname.split('/');
    segments[1] = next; // segment[0] is '' (leading slash), [1] is the locale
    router.push(segments.join('/') || `/${next}`);
    router.refresh();
  };

  return (
    <div className="flex items-center rounded-full border border-gray-200 p-0.5 text-xs font-bold dark:border-gray-700">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === locale
              ? 'bg-gray-900 text-white dark:bg-brand dark:text-black'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
