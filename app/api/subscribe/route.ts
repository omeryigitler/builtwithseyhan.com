import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { sendEmail, notifyAddress } from '@/lib/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Plain notification emailed to the site owner on every new subscriber. */
function notifyHtml(email: string, source: string): string {
  return `
  <div style="font-family:Helvetica,Arial,sans-serif;color:#111;padding:16px">
    <h2 style="margin:0 0 8px">Yeni abone 🎉</h2>
    <p style="margin:0 0 4px"><b>E-posta:</b> ${email}</p>
    <p style="margin:0 0 4px"><b>Kaynak:</b> ${source}</p>
    <p style="margin:0;color:#666;font-size:12px">${new Date().toISOString()}</p>
  </div>`;
}

/** Public URL of the e-book PDF. Override with EBOOK_URL (e.g. a Supabase
 * Storage link) for a stable address; otherwise fall back to the file shipped
 * in /public on the current deployment so it works on preview and production. */
function resolveEbookUrl(): string {
  if (process.env.EBOOK_URL) return process.env.EBOOK_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/ebook.pdf`;
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')}/ebook.pdf`;
  }
  return 'https://builtwithseyhan.com/ebook.pdf';
}

const COPY = {
  tr: {
    subject: 'Sağlıklı tarif e-kitabın hazır 💪',
    heading: 'Tarif kitabın hazır',
    intro:
      'Aramıza katıldığın için teşekkürler. Söz verdiğimiz sağlıklı tarifler e-kitabı hazır — aşağıdaki butondan hemen indir.',
    inside: 'Yüksek proteinli tarifler, makro dengeli öğün planları ve market listesi.',
    button: 'E-kitabı indir (PDF)',
    site: 'Siteyi keşfet',
    footer: 'Bu maili builtwithseyhan.com’a kaydolduğun için aldın.',
  },
  en: {
    subject: 'Your healthy-recipes e-book is ready 💪',
    heading: 'Your recipe book is ready',
    intro:
      'Thanks for joining. The healthy-recipes e-book we promised is ready — grab it from the button below.',
    inside: 'High-protein recipes, macro-balanced meal plans and a grocery shortlist.',
    button: 'Download the e-book (PDF)',
    site: 'Explore the site',
    footer: 'You received this because you signed up at builtwithseyhan.com.',
  },
};

function welcomeHtml(locale: 'tr' | 'en', ebookUrl: string, siteUrl: string): string {
  const c = COPY[locale];
  return `
  <div style="background:#0b0f17;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#e5e7eb">
    <div style="max-width:520px;margin:0 auto;background:#0f1420;border:1px solid #1f2937;border-radius:20px;padding:32px">
      <div style="font-size:13px;font-weight:800;letter-spacing:2px;color:#9ca3af;text-transform:uppercase">Built With Seyhan</div>
      <h1 style="font-size:30px;margin:12px 0 10px;color:#ffffff;text-transform:uppercase;line-height:1.05">${c.heading}</h1>
      <p style="font-size:15px;line-height:1.6;color:#cbd5e1;margin:0 0 18px">${c.intro}</p>

      <a href="${ebookUrl}"
         style="display:block;text-align:center;background:#CCFF00;color:#000;font-weight:800;font-size:15px;
                text-transform:uppercase;letter-spacing:1px;text-decoration:none;padding:16px 22px;border-radius:999px">
        ${c.button}
      </a>

      <p style="font-size:13px;line-height:1.6;color:#9ca3af;margin:18px 0 0">${c.inside}</p>

      <p style="margin:22px 0 0">
        <a href="${siteUrl}" style="color:#CCFF00;font-size:13px;font-weight:700;text-decoration:none">${c.site} →</a>
      </p>

      <p style="font-size:12px;color:#6b7280;margin-top:26px;border-top:1px solid #1f2937;padding-top:16px">
        ${c.footer}
      </p>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  let email = '';
  let source = 'ebook-popup';
  let locale: 'tr' | 'en' = 'en';
  try {
    const body = await request.json();
    email = String(body.email ?? '').trim().toLowerCase();
    source = String(body.source ?? 'ebook-popup');
    locale = body.locale === 'tr' ? 'tr' : 'en';
  } catch {
    /* ignore */
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }

  // Store the lead (RLS allows public insert). Duplicate (23505) is fine.
  try {
    const supabase = await createServerSupabase();
    if (supabase) {
      await supabase.from('subscribers').insert({ email, source });
    }
  } catch {
    /* ignore storage errors — still try to send */
  }

  // Email the e-book download link to the subscriber, and notify the owner.
  // sendEmail no-ops when RESEND_API_KEY is unset and logs any delivery error.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://builtwithseyhan.com';
  await sendEmail({
    to: email,
    subject: COPY[locale].subject,
    html: welcomeHtml(locale, resolveEbookUrl(), siteUrl),
  });

  const notifyTo = notifyAddress(process.env.SUBSCRIBE_NOTIFY_TO);
  await sendEmail({
    to: notifyTo,
    subject: 'Built With Seyhan — yeni abone 🎉',
    html: notifyHtml(email, source),
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
