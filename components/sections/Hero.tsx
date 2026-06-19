import Link from 'next/link';
import { ArrowRight, Instagram } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { buttonClasses } from '@/components/ui/Button';

export function Hero({
  locale,
  dict,
  settings,
}: {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}) {
  return (
    <section className="relative overflow-hidden bg-gray-50 px-5 pb-20 pt-36 transition-colors duration-500 dark:bg-gray-950 sm:px-6 sm:pt-44 md:pb-28">
      {/* Aurora glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 hidden h-full w-full max-w-7xl -translate-x-1/2 opacity-30 dark:opacity-60 md:block">
        <div className="animate-blob absolute left-10 top-16 h-96 w-96 rounded-full bg-brand opacity-20 mix-blend-screen blur-[120px]" />
        <div
          className="animate-blob absolute right-10 top-40 h-96 w-96 rounded-full bg-emerald-500 opacity-20 mix-blend-screen blur-[120px]"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="animate-blob absolute -bottom-20 left-1/3 h-96 w-96 rounded-full bg-lime-400 opacity-20 mix-blend-screen blur-[120px]"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
          <span className="h-2 w-2 rounded-full bg-brand" />
          {dict.hero.eyebrow}
        </span>

        <h1 className="mb-6 text-4xl font-black uppercase leading-[1.02] tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {dict.hero.title}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
          {dict.hero.subtitle}
        </p>

        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
          <Link href={`/${locale}#feed`} className={buttonClasses({ variant: 'primary', size: 'lg', className: 'w-full sm:w-auto' })}>
            {dict.hero.ctaExplore}
            <ArrowRight size={18} />
          </Link>
          {settings.whatsappUrl && (
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({ variant: 'outline', size: 'lg', className: 'w-full sm:w-auto' })}
            >
              {dict.hero.ctaWhatsapp}
            </a>
          )}
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({ variant: 'ghost', size: 'lg', className: 'w-full sm:w-auto' })}
            >
              <Instagram size={18} /> {dict.hero.ctaInstagram}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
