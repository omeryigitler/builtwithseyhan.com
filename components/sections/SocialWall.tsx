import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize, type SocialItem, type SiteSettings } from '@/lib/types';

export function SocialWall({
  items,
  settings,
  locale,
  dict,
}: {
  items: SocialItem[];
  settings: SiteSettings;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="social" className="bg-gray-50 px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black uppercase tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {dict.social.title}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">{dict.social.subtitle}</p>
          {settings.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand dark:text-white"
            >
              <Instagram size={18} /> Instagram
            </a>
          )}
        </div>

        {items.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">{dict.social.empty}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 4) * 0.04}>
                <a
                  href={item.socialUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={dict.social.viewPost}
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={item.imageUrl}
                    alt={localize(item.caption, locale) || dict.social.viewPost}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                    <Instagram size={28} className="text-white" />
                  </span>
                  {localize(item.caption, locale) && (
                    <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                      {localize(item.caption, locale)}
                    </span>
                  )}
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
