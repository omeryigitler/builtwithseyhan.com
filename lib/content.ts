import { createServerSupabase } from './supabase/server';
import type { Post, SocialItem, SiteSettings } from './types';
import { SAMPLE_POSTS, SAMPLE_SOCIAL, SAMPLE_SETTINGS } from './sample';

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

  if (error || !data) return SAMPLE_POSTS;
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

// ─── Social wall ──────────────────────────────────────────────────────────────

export async function getSocialItems(): Promise<SocialItem[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return SAMPLE_SOCIAL;

  const { data, error } = await supabase
    .from('social_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error || !data) return SAMPLE_SOCIAL;
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
  return {
    whatsappUrl: data.whatsapp_url ?? '',
    instagramUrl: data.instagram_url ?? '',
    tiktokUrl: data.tiktok_url ?? '',
    youtubeUrl: data.youtube_url ?? '',
  };
}
