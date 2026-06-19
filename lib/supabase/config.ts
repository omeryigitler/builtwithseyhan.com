export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * The site renders fully without Supabase (falls back to sample content),
 * so every data call must check this first.
 */
export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http')
);

/** Allow-listed admin emails (client gate; real gate is RLS in Postgres). */
export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | undefined | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
