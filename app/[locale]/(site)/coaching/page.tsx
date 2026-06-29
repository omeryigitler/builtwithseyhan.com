import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { LeadForm } from '@/components/forms/LeadForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.coaching.title,
    description: dict.coaching.subtitle,
    alternates: {
      canonical: `/${locale}/coaching`,
      languages: { tr: '/tr/coaching', en: '/en/coaching' },
    },
  };
}

export default async function CoachingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const c = dict.coaching;

  return (
    <div className="px-5 pb-24 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-2">
        {/* Pitch */}
        <section>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
            {c.eyebrow}
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.9] text-gray-900 dark:text-white sm:text-6xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-md text-lg text-gray-500 dark:text-gray-400">{c.subtitle}</p>

          <ul className="mt-8 space-y-3">
            {c.perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                  <Check size={14} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Application form */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-tight text-gray-900 dark:text-white">
            {c.applyTitle}
          </h2>
          <LeadForm
            endpoint="/api/coaching"
            locale={locale}
            submitLabel={c.form.submit}
            successText={c.form.success}
            errorText={c.form.error}
            fields={[
              { name: 'name', label: c.form.name, required: true },
              { name: 'email', label: c.form.email, type: 'email', required: true },
              { name: 'goal', label: c.form.goal, type: 'select', options: c.form.goals },
              {
                name: 'experience',
                label: c.form.experience,
                type: 'select',
                options: c.form.experiences,
              },
              { name: 'message', label: c.form.message, type: 'textarea' },
            ]}
          />
        </section>
      </div>
    </div>
  );
}
