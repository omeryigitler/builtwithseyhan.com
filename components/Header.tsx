'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    { label: dict.nav.blog, href: `${base}/blog` },
    { label: dict.nav.social, href: `${base}#social` },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200 bg-white/85 py-3 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/85'
          : 'border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link href={base} className="flex items-center gap-2.5" aria-label={dict.brand}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm font-black text-brand dark:bg-brand dark:text-black">
            B
          </span>
          <span className="text-sm font-black uppercase tracking-tight text-gray-900 dark:text-white">
            Built With Seyhan
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-5 dark:border-gray-800">
            <LanguageSwitch locale={locale} />
            <ThemeToggle labels={dict.theme} />
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
          className="text-gray-900 lg:hidden dark:text-white"
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
