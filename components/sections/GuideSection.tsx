import { BookOpen, Zap } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { buttonClasses } from '@/components/ui/Button';

export function GuideSection({
  dict,
  settings,
}: {
  dict: Dictionary;
  settings: SiteSettings;
}) {
  return (
    <section className="bg-white px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900 md:flex-row md:p-12 md:text-left">
        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl bg-brand text-black shadow-lg">
          <BookOpen size={40} />
        </div>
        <div className="flex-1">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-brand">
            <Zap size={13} className="fill-brand text-black dark:text-brand" /> {dict.guide.badge}
          </span>
          <h2 className="mb-2 font-display text-3xl uppercase tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {dict.guide.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{dict.guide.subtitle}</p>
        </div>
        {settings.whatsappUrl && (
          <a
            href={settings.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonClasses({ variant: 'primary', size: 'lg', className: 'flex-shrink-0' })}
          >
            {dict.guide.cta}
          </a>
        )}
      </div>
    </section>
  );
}
