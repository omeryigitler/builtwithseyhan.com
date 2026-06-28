import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Server-side Supabase client (cookie-aware, for auth + RLS reads).
 * Returns null when Supabase isn't configured so callers can fall back.
 */
export async function createServerSupabase() {
  if (!isSupabaseConfigured) return null;

  // During static generation (generateStaticParams, sitemap, ISR prerender)
  // there is no request scope, so cookies() throws. Fall back to a cookieless
  // client — every build-time read is public (anon) data anyway.
  let cookieStore: Awaited<ReturnType<typeof cookies>> | null = null;
  try {
    cookieStore = await cookies();
  } catch {
    cookieStore = null;
  }

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore?.getAll() ?? [];
      },
      setAll(cookiesToSet: CookieToSet[]) {
        if (!cookieStore) return;
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore!.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore; middleware refreshes.
        }
      },
    },
  });
}
