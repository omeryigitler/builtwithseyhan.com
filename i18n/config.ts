export const locales = ['tr', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Language used when geo says Turkey, or when the visitor chose it. */
export const turkishLocale: Locale = 'tr';

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Cookie that remembers a manual TR|EN choice (overrides geo). */
export const LOCALE_COOKIE = 'bws_lang';
