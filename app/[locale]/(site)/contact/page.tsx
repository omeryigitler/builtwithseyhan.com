import type { Metadata } from 'next';
import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { LeadForm } from '@/components/forms/LeadForm';
import { Faq } from '@/components/sections/Faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqLd } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { tr: '/tr/contact', en: '/en/contact' },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <div className="px-5 pb-24 pt-32 sm:px-6 sm:pt-40">
      <JsonLd data={faqLd(dict.faq.items)} />

      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{c.eyebrow}</p>
        <h1 className="font-display text-5xl uppercase leading-[0.9] text-gray-900 dark:text-white sm:text-7xl">
          {c.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-gray-500 dark:text-gray-400">{c.subtitle}</p>

        <div className="mt-10">
          <LeadForm
            endpoint="/api/contact"
            locale={locale}
            submitLabel={c.form.submit}
            successText={c.form.success}
            errorText={c.form.error}
            fields={[
              { name: 'name', label: c.form.name, required: true },
              { name: 'email', label: c.form.email, type: 'email', required: true },
              { name: 'message', label: c.form.message, type: 'textarea', required: true },
            ]}
          />
        </div>
      </section>

      <section className="mt-24">
        <Faq eyebrow={dict.faq.eyebrow} title={dict.faq.title} items={dict.faq.items} />
      </section>
    </div>
  );
}
