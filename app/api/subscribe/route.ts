import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function welcomeHtml(): string {
  return `
  <div style="background:#0b0f17;padding:32px;font-family:Helvetica,Arial,sans-serif;color:#e5e7eb">
    <div style="max-width:520px;margin:0 auto">
      <div style="font-size:13px;font-weight:800;letter-spacing:2px;color:#9ca3af;text-transform:uppercase">Built With Seyhan</div>
      <h1 style="font-size:30px;margin:12px 0 8px;color:#ffffff;text-transform:uppercase">Welcome to the crew</h1>
      <p style="font-size:15px;line-height:1.6;color:#cbd5e1">
        Thanks for joining. Your starter guide is on the way — meanwhile, explore videos,
        recipes and the workout tracker on the site.
      </p>
      <a href="https://builtwithseyhan.com"
         style="display:inline-block;margin-top:20px;background:#CCFF00;color:#000;font-weight:800;
                text-transform:uppercase;letter-spacing:1px;text-decoration:none;padding:12px 22px;border-radius:999px">
        Open the site
      </a>
      <p style="font-size:12px;color:#6b7280;margin-top:28px">
        You received this because you signed up at builtwithseyhan.com.
      </p>
    </div>
  </div>`;
}

export async function POST(request: Request) {
  let email = '';
  let source = 'ebook-popup';
  try {
    const body = await request.json();
    email = String(body.email ?? '').trim().toLowerCase();
    source = String(body.source ?? 'ebook-popup');
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

  // Send the welcome email when an email provider is configured.
  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Built With Seyhan <onboarding@resend.dev>',
          to: [email],
          subject: 'Built With Seyhan — welcome 💪',
          html: welcomeHtml(),
        }),
      });
      // Surface Resend rejections (bad from-address, unverified domain, quota…)
      // in the Vercel function logs so delivery issues are debuggable. The lead
      // is already stored, so a mail error never fails the request.
      if (!res.ok) {
        console.error('[subscribe] Resend rejected the email', res.status, await res.text());
      }
    } catch (err) {
      console.error('[subscribe] Resend request failed', err);
    }
  }

  return NextResponse.json({ ok: true });
}
