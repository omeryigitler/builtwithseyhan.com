import { createServerSupabase } from './supabase/server';
import type { Post, SocialItem, SiteSettings, Recipe, MemberPost } from './types';
import { SAMPLE_POSTS, SAMPLE_SOCIAL, SAMPLE_SETTINGS, SAMPLE_RECIPES } from './sample';

// ─── Row mappers (snake_case DB → camelCase app types) ───────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapPost(r: any): Post {
  return {
    id: String(r.id),
    slug: r.slug,
    type: r.type,
    category: r.category,
    title: { tr: r.title_tr ?? '', en: r.title_en ?? '' },
    excerpt: { tr: r.excerpt_tr ?? '', en: r.excerpt_en ?? '' },
    body: { tr: r.body_tr ?? '', en: r.body_en ?? '' },
    imageUrl: r.image_url ?? null,
    videoUrl: r.video_url ?? null,
    socialUrl: r.social_url ?? null,
    featured: !!r.featured,
    createdAt: r.created_at ?? new Date().toISOString(),
  };
}

function mapSocial(r: any): SocialItem {
  return {
    id: String(r.id),
    imageUrl: r.image_url,
    socialUrl: r.social_url,
    platform: r.platform ?? 'instagram',
    caption: { tr: r.caption_tr ?? '', en: r.caption_en ?? '' },
    createdAt: r.created_at ?? new Date().toISOString(),
  };
}

function mapMemberPost(r: any): MemberPost {
  return {
    id: String(r.id),
    authorName: r.author_name ?? '',
    instagram: r.instagram ?? '',
    caption: r.caption ?? '',
    imageUrl: r.image_url ?? null,
    approved: !!r.approved,
    createdAt: r.created_at ?? new Date().toISOString(),
  };
}

function mapRecipe(r: any): Recipe {
  return {
    id: String(r.id),
    slug: r.slug || String(r.id),
    category: r.category,
    title: { tr: r.title_tr ?? '', en: r.title_en ?? '' },
    description: { tr: r.description_tr ?? '', en: r.description_en ?? '' },
    ingredients: { tr: r.ingredients_tr ?? '', en: r.ingredients_en ?? '' },
    steps: { tr: r.steps_tr ?? '', en: r.steps_en ?? '' },
    kcal: Number(r.kcal ?? 0),
    protein: Number(r.protein ?? 0),
    timeMin: Number(r.time_min ?? 0),
    imageUrl: r.image_url ?? null,
    youtubeUrl: r.youtube_url ?? null,
    featured: !!r.featured,
    createdAt: r.created_at ?? new Date().toISOString(),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── Posts ───────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return SAMPLE_POSTS;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) return SAMPLE_POSTS;
  return data.map(mapPost);
}

export async function getFeaturedVideos(limit = 5): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.type === 'video').slice(0, limit);
}

export async function getBlogPosts(limit?: number): Promise<Post[]> {
  const posts = await getPosts();
  const blog = posts.filter((p) => p.type === 'blog');
  return limit ? blog.slice(0, limit) : blog;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((p) => p.slug);
}

// ─── Recipes (Nutrition) ──────────────────────────────────────────────────────

export async function getRecipes(): Promise<Recipe[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return SAMPLE_RECIPES;

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) return SAMPLE_RECIPES;
  return data.map(mapRecipe);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipes = await getRecipes();
  return recipes.find((r) => r.slug === slug || r.id === slug) ?? null;
}

export async function getAllRecipeSlugs(): Promise<string[]> {
  const recipes = await getRecipes();
  return recipes.map((r) => r.slug);
}

// ─── Member posts (community, public = approved only) ─────────────────────────

export async function getMemberPosts(limit = 12): Promise<MemberPost[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('member_posts')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map(mapMemberPost);
}

// ─── Social wall ──────────────────────────────────────────────────────────────

export async function getSocialItems(): Promise<SocialItem[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return SAMPLE_SOCIAL;

  const { data, error } = await supabase
    .from('social_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) return SAMPLE_SOCIAL;
  return data.map(mapSocial);
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings> {
  const supabase = await createServerSupabase();
  if (!supabase) return SAMPLE_SETTINGS;

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (error || !data) return SAMPLE_SETTINGS;
  const s: SiteSettings = {
    whatsappUrl: data.whatsapp_url ?? '',
    instagramUrl: data.instagram_url ?? '',
    tiktokUrl: data.tiktok_url ?? '',
    youtubeUrl: data.youtube_url ?? '',
    heroVideoUrl: data.hero_video_url ?? '',
  };
  // Default (untouched) settings row → show sample links so the WhatsApp /
  // social buttons aren't missing before the admin fills them in.
  const allEmpty =
    !s.whatsappUrl && !s.instagramUrl && !s.tiktokUrl && !s.youtubeUrl && !s.heroVideoUrl;
  return allEmpty ? SAMPLE_SETTINGS : s;
}
