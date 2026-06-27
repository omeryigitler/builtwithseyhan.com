import type { Dictionary } from '@/i18n/dictionaries';
import type { SiteSettings } from '@/lib/types';
import { buttonClasses } from '@/components/ui/Button';

export function WhatsAppCTA({
  dict,
  settings,
}: {
  dict: Dictionary;
  settings: SiteSettings;
}) {
  if (!settings.whatsappUrl) return null;

  return (
    <section className="bg-gray-50 px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gray-900 px-8 py-16 text-center text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand opacity-20 blur-[100px]" />
        <h2 className="relative mb-4 font-display text-4xl uppercase tracking-tight md:text-5xl">
          {dict.whatsappCta.title}
        </h2>
        <p className="relative mx-auto mb-8 max-w-md text-lg text-gray-300">
          {dict.whatsappCta.subtitle}
        </p>
        <a
          href={settings.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({ variant: 'primary', size: 'xl', className: 'relative' })}
        >
          {dict.whatsappCta.button}
        </a>
      </div>
    </section>
  );
}
