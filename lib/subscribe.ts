/** Window event the e-book card dispatches to open the capture popup on demand. */
export const EBOOK_OPEN_EVENT = 'bws:ebook-open';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Capture an e-book lead. Posts to /api/subscribe which stores it in Supabase
 * and (when RESEND_API_KEY is set) emails the e-book download link in the
 * visitor's language.
 */
export async function subscribeEmail(email: string, locale = 'en'): Promise<void> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) throw new Error('invalid-email');

  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: clean, source: 'ebook-popup', locale }),
  });
  if (!res.ok) throw new Error('subscribe-failed');
}
