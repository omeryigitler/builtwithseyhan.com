'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Instagram, ChevronDown } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { buttonClasses } from '@/components/ui/Button';

const POSTER = '/images/hero.png';
const CLIPS = ['/hero/clip1.mp4', '/hero/clip2.mp4', '/hero/clip3.mp4', '/hero/clip4.mp4'];
const PHOTO_MS = 4000;

type Phase = 'photo' | number; // 'photo' or a clip index

export function Hero({
  locale,
  dict,
  settings,
}: {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}) {
  const [phase, setPhase] = useState<Phase>('photo');
  const videoRef = useRef<HTMLVideoElement>(null);
  const showText = phase === 'photo'; // text only during the opening photo

  // Hold on the photo (with text), then start the clips.
  useEffect(() => {
    if (phase !== 'photo') return;
    const t = setTimeout(() => setPhase(0), PHOTO_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (typeof phase === 'number' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [phase]);

  const next = () =>
    setPhase((p) => {
      if (typeof p !== 'number') return 0;
      return p + 1 >= CLIPS.length ? 'photo' : p + 1;
    });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background: photo (4s) then clips back-to-back, looping */}
      <div className="absolute inset-0 -z-20 bg-gray-950">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            phase === 'photo' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${POSTER}')` }}
          aria-hidden="true"
        />
        {typeof phase === 'number' && (
          <video
            ref={videoRef}
            key={phase}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={POSTER}
            onEnded={next}
            onError={next}
            aria-hidden="true"
          >
            <source src={CLIPS[phase]} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Scrim: darker behind the text, lighter while clips play */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-b transition-all duration-700 ${
          showText ? 'from-black/55 via-black/35 to-black/80' : 'from-black/10 via-transparent to-black/40'
        }`}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-24 top-24 -z-10 h-80 w-80 rounded-full bg-brand/25 blur-[120px]" />

      {/* Overlay text — fades out when the clips start */}
      <div
        className={`relative z-10 mx-auto w-full max-w-5xl px-5 py-32 text-center transition-all duration-700 sm:px-6 ${
          showText ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
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

      {/* Scroll hint (icon stays) */}
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
