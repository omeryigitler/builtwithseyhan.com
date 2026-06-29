/**
 * Where owner notifications (contact, coaching, new subscriber) are delivered.
 * Defaults to contact@builtwithseyhan.com; override per-route with an env var.
 */
export function notifyAddress(specific?: string): string {
  return (specific && specific.trim()) || 'contact@builtwithseyhan.com';
}

/**
 * Minimal Resend email sender. No-ops (returns false) when RESEND_API_KEY is
 * unset, so the app works without an email provider. Failures are logged to the
 * server function logs and never throw.
 */
export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Built With Seyhan <onboarding@resend.dev>',
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error('[email] Resend rejected', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[email] Resend request failed', err);
    return false;
  }
}
