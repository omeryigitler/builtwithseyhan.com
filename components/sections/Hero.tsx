import Link from 'next/link';
import { ArrowRight, Instagram, ChevronDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { buttonClasses } from '@/components/ui/Button';

// Hero background image. Upload the real photo to /public/images/hero.jpg —
// until that file exists, the Unsplash fallback below is shown.
const HERO_IMAGE = '/images/hero.jpg';
const HERO_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2070&q=80';

export function Hero({
  locale,
  dict,
  settings,
}: {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}) {
  // Hero video is admin-editable (Settings → Hero video). Until one is set,
  // the poster image stands in, so the hero never looks broken.
  const videoUrl = settings.heroVideoUrl;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Full-screen background: video if set, otherwise the photo
          (/images/hero.jpg, with an Unsplash fallback until it's uploaded). */}
      {videoUrl ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          aria-hidden="true"
        >
          <source src={videoUrl} />
        </video>
      ) : (
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}'), url('${HERO_IMAGE_FALLBACK}')` }}
          aria-hidden="true"
        />
      )}

      {/* Theme-aware scrim so text stays readable (bright in light, cinematic in dark) */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/85 via-white/55 to-white/90 dark:from-gray-950/88 dark:via-gray-950/60 dark:to-gray-950/95"
        aria-hidden="true"
      />
      {/* Lime glow accent */}
      <div className="pointer-events-none absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full bg-brand/30 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-32 text-center sm:px-6">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-300/70 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-700 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-gray-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          {dict.hero.eyebrow}
        </span>

        <h1 className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight text-gray-900 drop-shadow-sm dark:text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {dict.hero.title}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-200 sm:text-xl">
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

      {/* Scroll hint */}
      <Link
        href={`/${locale}#videos`}
        aria-label={dict.hero.ctaExplore}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </Link>
    </section>
  );
}
