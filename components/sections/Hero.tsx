import Link from 'next/link';
import { ArrowRight, Instagram, ChevronDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { buttonClasses } from '@/components/ui/Button';
import { HeroMedia } from '@/components/HeroMedia';

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
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Full-screen background collage: photo (4s) then video clips back-to-back */}
      <HeroMedia />

      {/* Cinematic dark scrim for readable white text over the footage */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/80"
        aria-hidden="true"
      />
      {/* Lime glow accent */}
      <div className="pointer-events-none absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full bg-brand/25 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-32 text-center sm:px-6">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          {dict.hero.eyebrow}
        </span>

        <h1 className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {dict.hero.title}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-gray-200 drop-shadow sm:text-xl">
          {dict.hero.subtitle}
        </p>

        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
          <Link
            href={`/${locale}#feed`}
            className={buttonClasses({ variant: 'primary', size: 'lg', className: 'w-full sm:w-auto' })}
          >
            {dict.hero.ctaExplore}
            <ArrowRight size={18} />
          </Link>
          {settings.whatsappUrl && (
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({
                variant: 'outline',
                size: 'lg',
                className: 'w-full border-white/40 text-white hover:bg-white hover:text-black sm:w-auto',
              })}
            >
              {dict.hero.ctaWhatsapp}
            </a>
          )}
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses({
                variant: 'ghost',
                size: 'lg',
                className: 'w-full text-white hover:bg-white/10 hover:text-white sm:w-auto',
              })}
            >
              <Instagram size={18} /> {dict.hero.ctaInstagram}
            </a>
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <Link
        href={`/${locale}#videos`}
        aria-label={dict.hero.ctaExplore}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </Link>
    </section>
  );
}
