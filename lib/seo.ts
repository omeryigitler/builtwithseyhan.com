/** Builders for JSON-LD structured data (Google rich results). */

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';
const ORG = { '@type': 'Organization', name: 'Built With Seyhan', url: SITE };

export function organizationLd(socials: string[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Built With Seyhan',
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    sameAs: socials.filter(Boolean),
  };
}

export function articleLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: opts.url,
    image: opts.image ? [opts.image] : undefined,
    datePublished: opts.datePublished,
    author: ORG,
    publisher: organizationLd(),
  };
}

/** ISO-8601 duration from minutes, e.g. 15 → "PT15M". */
function isoDuration(min?: number): string | undefined {
  return min && min > 0 ? `PT${Math.round(min)}M` : undefined;
}

export function recipeLd(opts: {
  name: string;
  description: string;
  url: string;
  image?: string | null;
  category?: string;
  timeMin?: number;
  kcal?: number;
  protein?: number;
  ingredients?: string[];
  steps?: string[];
  video?: string | null;
  datePublished?: string;
}) {
  const nutrition =
    opts.kcal || opts.protein
      ? {
          '@type': 'NutritionInformation',
          ...(opts.kcal ? { calories: `${opts.kcal} kcal` } : {}),
          ...(opts.protein ? { proteinContent: `${opts.protein} g` } : {}),
        }
      : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: opts.name,
    description: opts.description,
    mainEntityOfPage: opts.url,
    image: opts.image ? [opts.image] : undefined,
    recipeCategory: opts.category,
    totalTime: isoDuration(opts.timeMin),
    datePublished: opts.datePublished,
    author: ORG,
    nutrition,
    recipeIngredient: opts.ingredients?.length ? opts.ingredients : undefined,
    recipeInstructions: opts.steps?.length
      ? opts.steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text }))
      : undefined,
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
