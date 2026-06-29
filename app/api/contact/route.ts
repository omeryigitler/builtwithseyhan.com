import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  let name = '';
  let email = '';
  let message = '';
  try {
    const b = await request.json();
    name = String(b.name ?? '').trim().slice(0, 120);
    email = String(b.email ?? '').trim().toLowerCase().slice(0, 160);
    message = String(b.message ?? '').trim().slice(0, 4000);
  } catch {
    /* ignore */
  }

  if (!EMAIL_RE.test(email) || message.length < 2) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const to = process.env.CONTACT_TO || 'contact@builtwithseyhan.com';
  await sendEmail({
    to,
    replyTo: email,
    subject: `İletişim formu — ${name || email}`,
    html: `<div style="font-family:Helvetica,Arial,sans-serif;color:#111;padding:16px">
      <h2 style="margin:0 0 8px">Yeni mesaj</h2>
      <p style="margin:0 0 4px"><b>İsim:</b> ${esc(name)}</p>
      <p style="margin:0 0 4px"><b>E-posta:</b> ${esc(email)}</p>
      <p style="margin:12px 0 0;white-space:pre-line">${esc(message)}</p>
    </div>`,
  });

  return NextResponse.json({ ok: true });
}
