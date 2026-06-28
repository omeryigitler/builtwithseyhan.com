import { createBrowserSupabase } from './supabase/client';

function db() {
  const s = createBrowserSupabase();
  if (!s) throw new Error('Supabase is not configured.');
  return s;
}

export interface MemberPostInput {
  authorName: string;
  instagram: string;
  caption: string;
  imageUrl: string | null;
}

/** Upload a member's image into media/members/ (allowed for authenticated users). */
export async function uploadMemberImage(file: File): Promise<string> {
  const s = db();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `members/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await s.storage.from('media').upload(path, file, { contentType: file.type });
  if (error) throw error;
  return s.storage.from('media').getPublicUrl(path).data.publicUrl;
}

/** Submit a member post. Always created unapproved (admin moderates). */
export async function submitMemberPost(input: MemberPostInput): Promise<void> {
  const s = db();
  const { data: auth } = await s.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Sign in required.');
  const { error } = await s.from('member_posts').insert({
    user_id: uid,
    author_name: input.authorName,
    instagram: input.instagram,
    caption: input.caption,
    image_url: input.imageUrl,
    approved: false,
  });
  if (error) throw error;
}
