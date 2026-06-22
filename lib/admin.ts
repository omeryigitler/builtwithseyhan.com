import { createBrowserSupabase } from './supabase/client';
import type {
  Category,
  LocalizedText,
  Post,
  PostType,
  SiteSettings,
  SocialItem,
} from './types';
import type { User } from '@supabase/supabase-js';

function db() {
  const s = createBrowserSupabase();
  if (!s) throw new Error('Supabase is not configured.');
  return s;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function signInWithGoogle(nextPath: string) {
  const s = db();
  await s.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      queryParams: { prompt: 'select_account' },
    },
  });
}

export async function signOutAdmin() {
  const s = createBrowserSupabase();
  if (s) await s.auth.signOut();
}

export function onAuthChange(cb: (user: User | null) => void): () => void {
  const s = createBrowserSupabase();
  if (!s) {
    cb(null);
    return () => {};
  }
  s.auth.getUser().then(({ data }) => cb(data.user ?? null));
  const {
    data: { subscription },
  } = s.auth.onAuthStateChange((_event, session) => cb(session?.user ?? null));
  return () => subscription.unsubscribe();
}

// ─── Media upload ──────────────────────────────────────────────────────────────

export async function uploadMedia(file: File, folder: string): Promise<string> {
  const s = db();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await s.storage
    .from('media')
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return s.storage.from('media').getPublicUrl(path).data.publicUrl;
}

// ─── Posts ─────────────────────────────────────────────────────────────────────

export interface PostInput {
  id?: string;
  slug: string;
  type: PostType;
  category: Category;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  imageUrl: string | null;
  videoUrl: string | null;
  socialUrl: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

function toPostRow(input: PostInput) {
  return {
    slug: input.slug,
    type: input.type,
    category: input.category,
    title_tr: input.title.tr,
    title_en: input.title.en,
    excerpt_tr: input.excerpt.tr,
    excerpt_en: input.excerpt.en,
    body_tr: input.body.tr,
    body_en: input.body.en,
    image_url: input.imageUrl,
    video_url: input.videoUrl,
    social_url: input.socialUrl,
    featured: input.featured,
    published: input.published,
    sort_order: input.sortOrder,
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromPostRow(r: any): Post {
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
    createdAt: r.created_at ?? '',
  };
}

function fromSocialRow(r: any): SocialItem {
  return {
    id: String(r.id),
    imageUrl: r.image_url,
    socialUrl: r.social_url ?? '',
    platform: r.platform ?? 'instagram',
    caption: { tr: r.caption_tr ?? '', en: r.caption_en ?? '' },
    createdAt: r.created_at ?? '',
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function listAllPosts(): Promise<Post[]> {
  const s = db();
  const { data, error } = await s
    .from('posts')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromPostRow);
}

export async function savePost(input: PostInput): Promise<void> {
  const s = db();
  const row = toPostRow(input);
  const { error } = input.id
    ? await s.from('posts').update(row).eq('id', input.id)
    : await s.from('posts').insert(row);
  if (error) throw error;
}

export async function deletePost(id: string): Promise<void> {
  const s = db();
  const { error } = await s.from('posts').delete().eq('id', id);
  if (error) throw error;
}

// ─── Social wall ────────────────────────────────────────────────────────────────

export interface SocialInput {
  id?: string;
  imageUrl: string;
  socialUrl: string;
  platform: string;
  caption: LocalizedText;
  sortOrder: number;
}

export async function listSocial(): Promise<SocialItem[]> {
  const s = db();
  const { data, error } = await s
    .from('social_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromSocialRow);
}

export async function saveSocial(input: SocialInput): Promise<void> {
  const s = db();
  const row = {
    image_url: input.imageUrl,
    social_url: input.socialUrl,
    platform: input.platform,
    caption_tr: input.caption.tr,
    caption_en: input.caption.en,
    sort_order: input.sortOrder,
  };
  const { error } = input.id
    ? await s.from('social_items').update(row).eq('id', input.id)
    : await s.from('social_items').insert(row);
  if (error) throw error;
}

export async function deleteSocial(id: string): Promise<void> {
  const s = db();
  const { error } = await s.from('social_items').delete().eq('id', id);
  if (error) throw error;
}

// ─── Settings ────────────────────────────────────────────────────────────────────

export async function getSettingsAdmin(): Promise<SiteSettings> {
  const s = db();
  const { data } = await s.from('settings').select('*').eq('id', 1).maybeSingle();
  return {
    whatsappUrl: data?.whatsapp_url ?? '',
    instagramUrl: data?.instagram_url ?? '',
    tiktokUrl: data?.tiktok_url ?? '',
    youtubeUrl: data?.youtube_url ?? '',
    heroVideoUrl: data?.hero_video_url ?? '',
  };
}

export async function saveSettings(input: SiteSettings): Promise<void> {
  const s = db();
  const { error } = await s
    .from('settings')
    .update({
      whatsapp_url: input.whatsappUrl,
      instagram_url: input.instagramUrl,
      tiktok_url: input.tiktokUrl,
      youtube_url: input.youtubeUrl,
      hero_video_url: input.heroVideoUrl,
    })
    .eq('id', 1);
  if (error) throw error;
}
