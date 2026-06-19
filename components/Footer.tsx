import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { SocialIcons } from './SocialIcons';

interface Props {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function Footer({ locale, dict, settings }: Props) {
  const base = `/${locale}`;
  const links = [
    { label: dict.nav.videos, href: `${base}#videos` },
    { label: dict.nav.feed, href: `${base}#feed` },
    { label: dict.nav.blog, href: `${base}/blog` },
    { label: dict.nav.social, href: `${base}#social` },
  ];

  return (
    <footer className="mt-12 rounded-t-[3rem] bg-gray-900 px-6 pb-6 pt-20 text-white dark:rounded-none dark:border-t dark:border-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-sm">
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-sm font-black text-black">
                B
              </span>
              <span className="text-lg font-black uppercase tracking-tight">Built With Seyhan</span>
            </div>
            <p className="text-sm text-gray-400">{dict.footer.tagline}</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-300 transition-colors hover:text-brand">
                {l.label}
              </Link>
            ))}
          </nav>

          <SocialIcons settings={settings} />
        </div>

        <hr className="my-10 border-gray-800" />

        <div className="text-center text-xs text-gray-500">
          {dict.footer.credit}{' '}
          <a
            href="https://omeryigitler.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand transition-all duration-300 hover:tracking-wider hover:text-brand-hover"
          >
            Ömer YİĞİTLER
          </a>
        </div>
        <div className="mt-2 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Built With Seyhan. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
