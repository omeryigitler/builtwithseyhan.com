'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

/** Browser Supabase client (admin panel: Google auth + writes via RLS). */
export function createBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
