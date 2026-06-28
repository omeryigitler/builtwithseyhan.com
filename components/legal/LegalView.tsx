import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize } from '@/lib/types';
import { LEGAL_UPDATED, type LegalDoc } from '@/lib/legal';

export function LegalView({
  doc,
  locale,
  dict,
}: {
  doc: LegalDoc;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="px-5 pb-24 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-5xl uppercase leading-[0.9] text-gray-900 sm:text-6xl dark:text-white">
          {localize(doc.title, locale)}
        </h1>
        <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-400">
          {dict.legal.updated}: {LEGAL_UPDATED}
        </p>
        <p className="mt-6 leading-relaxed text-gray-600 dark:text-gray-300">
          {localize(doc.intro, locale)}
        </p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((s, i) => (
            <div key={i}>
              <h2 className="mb-2 font-display text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
                {localize(s.heading, locale)}
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-gray-600 dark:text-gray-400">
                {localize(s.body, locale)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
