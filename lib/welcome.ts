import type { SupabaseClient } from '@supabase/supabase-js';
import { sendEmail } from './email';

type Loc = 'tr' | 'en';

const COPY = {
  tr: {
    subject: 'Built With Seyhan’a hoş geldin 💪',
    heading: 'Hesabın hazır',
    intro: (n: string) =>
      `${n ? n + ', ' : ''}aramıza hoş geldin! Artık antrenmanlarını takip edebilir, sana atanan programları görebilir ve toplulukla içerik paylaşabilirsin.`,
    button: 'Panele git',
    footer: 'Bu maili builtwithseyhan.com’da hesap oluşturduğun için aldın.',
  },
  en: {
    subject: 'Welcome to Built With Seyhan 💪',
    heading: 'Your account is ready',
    intro: (n: string) =>
      `${n ? n + ', ' : ''}welcome to the crew! You can now track your workouts, follow the programs assigned to you and share with the community.`,
    button: 'Open your dashboard',
    footer: 'You received this because you created an account at builtwithseyhan.com.',
  },
};

function html(locale: Loc, name: string, dashUrl: string): string {
  const c = COPY[locale];
  return `
  <div style="background:#0b0f17;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#e5e7eb">
    <div style="max-width:520px;margin:0 auto;background:#0f1420;border:1px solid #1f2937;border-radius:20px;padding:32px">
      <div style="font-size:13px;font-weight:800;letter-spacing:2px;color:#9ca3af;text-transform:uppercase">Built With Seyhan</div>
      <h1 style="font-size:30px;margin:12px 0 10px;color:#ffffff;text-transform:uppercase;line-height:1.05">${c.heading}</h1>
      <p style="font-size:15px;line-height:1.6;color:#cbd5e1;margin:0 0 20px">${c.intro(name)}</p>
      <a href="${dashUrl}"
         style="display:block;text-align:center;background:#CCFF00;color:#000;font-weight:800;font-size:15px;
                text-transform:uppercase;letter-spacing:1px;text-decoration:none;padding:16px 22px;border-radius:999px">
        ${c.button}
      </a>
      <p style="font-size:12px;color:#6b7280;margin-top:26px;border-top:1px solid #1f2937;padding-top:16px">${c.footer}</p>
    </div>
  </div>`;
}

/**
 * Send a one-time, localized welcome email to the currently signed-in user.
 * Idempotent: records `welcomed` in the user's metadata so repeated calls
 * (e.g. from both the OAuth callback and the sign-up modal) send only once.
 */
export async function sendAccountWelcome(
  supabase: SupabaseClient,
  opts: { locale: Loc; siteUrl: string },
): Promise<void> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email || user.user_metadata?.welcomed) return;

    const full = String(user.user_metadata?.full_name || user.user_metadata?.name || '');
    const name = full.trim().split(/\s+/)[0] || '';
    const dashUrl = `${opts.siteUrl.replace(/\/$/, '')}/${opts.locale}/track`;

    const ok = await sendEmail({
      to: user.email,
      subject: COPY[opts.locale].subject,
      html: html(opts.locale, name, dashUrl),
    });
    if (ok) await supabase.auth.updateUser({ data: { welcomed: true } });
  } catch (err) {
    console.error('[welcome] failed', err);
  }
}
