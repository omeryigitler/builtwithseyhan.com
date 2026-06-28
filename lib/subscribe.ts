import { createBrowserSupabase } from './supabase/client';

/** Window event the e-book card dispatches to open the capture popup on demand. */
export const EBOOK_OPEN_EVENT = 'bws:ebook-open';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Capture an e-book lead. Persists to Supabase when configured; otherwise
 * resolves so the UI keeps working (leads are stored once Supabase is wired).
 */
export async function subscribeEmail(email: string): Promise<void> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) throw new Error('invalid-email');

  const supabase = createBrowserSupabase();
  if (!supabase) return; // no backend yet — succeed locally

  const { error } = await supabase
    .from('subscribers')
    .insert({ email: clean, source: 'ebook-popup' });

  // 23505 = unique violation (already subscribed) — treat as success.
  if (error && error.code !== '23505') throw error;
}
