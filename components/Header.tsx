'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitch } from './LanguageSwitch';
import { buttonClasses } from './ui/Button';

interface Props {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function Header({ locale, dict, settings }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const base = `/${locale}`;
  const links = [
    { label: dict.nav.videos, href: `${base}#videos` },
    { label: dict.nav.feed, href: `${base}#feed` },
    { label: dict.nav.nutrition, href: `${base}/nutrition` },
    { label: dict.nav.training, href: `${base}/training` },
    { label: dict.nav.track, href: `${base}/track` },
    { label: dict.nav.blog, href: `${base}/blog` },
    { label: dict.nav.social, href: `${base}#social` },
  ];

  // Only the homepage has a dark full-screen hero behind the header. There the
  // header uses light text until scrolled; on every other page (light masthead)
  // it stays theme-aware dark text so it's readable at the top too.
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const onDark = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200 bg-white/90 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.07)] backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90'
          : 'border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <Link href={base} className="group flex items-center gap-2.5" aria-label={dict.brand}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-base font-black text-black shadow-[0_4px_14px_rgba(204,255,0,0.45)] transition-transform group-hover:scale-105">
            B
          </span>
          <span
            className={`text-sm font-black uppercase tracking-tight ${
              onDark ? 'text-white drop-shadow' : 'text-gray-900 dark:text-white'
            }`}
          >
            Built With Seyhan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative text-sm font-semibold transition-colors ${
                onDark
                  ? 'text-white/85 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <div
            className={`flex items-center gap-2.5 border-l pl-6 ${
              onDark ? 'border-white/25' : 'border-gray-200 dark:border-gray-800'
            }`}
          >
            <LanguageSwitch locale={locale} onDark={onDark} />
            <ThemeToggle labels={dict.theme} onDark={onDark} />
            {settings.whatsappUrl && (
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses({ variant: 'primary', size: 'sm' })}
              >
                WhatsApp
              </a>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`rounded-lg p-1 lg:hidden ${onDark ? 'text-white' : 'text-gray-900 dark:text-white'}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t border-gray-200 bg-white px-5 py-6 lg:hidden dark:border-gray-800 dark:bg-gray-950">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-gray-800 dark:text-gray-100"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
              <LanguageSwitch locale={locale} />
              <ThemeToggle labels={dict.theme} />
            </div>
            {settings.whatsappUrl && (
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses({ variant: 'primary', size: 'md', fullWidth: true })}
              >
                WhatsApp
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
