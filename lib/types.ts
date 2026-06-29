import type { Locale } from '@/i18n/config';

export type PostType = 'video' | 'image' | 'blog';

export type Category =
  | 'fitness'
  | 'health'
  | 'lifestyle'
  | 'nutrition'
  | 'mindset'
  | 'training';

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface Post {
  id: string;
  slug: string;
  type: PostType;
  category: Category;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  imageUrl: string | null;
  /** YouTube / Vimeo / Instagram URL or a Storage video URL. */
  videoUrl: string | null;
  /** Link to the original social post (Instagram, TikTok, …). */
  socialUrl: string | null;
  featured: boolean;
  createdAt: string;
}

export interface SocialItem {
  id: string;
  imageUrl: string;
  socialUrl: string;
  platform: string;
  caption: LocalizedText;
  createdAt: string;
}

export interface MemberPost {
  id: string;
  authorName: string;
  instagram: string;
  caption: string;
  imageUrl: string | null;
  approved: boolean;
  createdAt: string;
}

export type RecipeCategory = 'smoothie' | 'highprotein' | 'breakfast' | 'snack';

export interface Recipe {
  id: string;
  /** URL slug for the detail page (falls back to id when unset). */
  slug: string;
  category: RecipeCategory;
  title: LocalizedText;
  description: LocalizedText;
  /** Multiline (one per line) ingredients, localized. */
  ingredients: LocalizedText;
  /** Multiline (one per line) preparation steps, localized. */
  steps: LocalizedText;
  /** Energy in kcal. */
  kcal: number;
  /** Protein in grams. */
  protein: number;
  /** Prep/cook time in minutes. */
  timeMin: number;
  imageUrl: string | null;
  /** YouTube/Vimeo URL for the recipe video (opens in a lightbox). */
  youtubeUrl: string | null;
  featured: boolean;
  createdAt: string;
}

/** Split a multiline localized field into trimmed, non-empty lines. */
export function lines(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.replace(/^[-•*\d.)\s]+/, '').trim())
    .filter(Boolean);
}

export interface SiteSettings {
  whatsappUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  /** Optional full-screen hero background video (mp4 URL). Empty = use image. */
  heroVideoUrl: string;
}

/** Pick the right language with a graceful fallback. */
export function localize(text: LocalizedText | undefined, locale: Locale): string {
  if (!text) return '';
  return text[locale] || text.en || text.tr || '';
}
