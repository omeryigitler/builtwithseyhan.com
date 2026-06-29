import { NextResponse } from 'next/server';
import { sendEmail, notifyAddress } from '@/lib/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  const f = { name: '', email: '', goal: '', experience: '', message: '' };
  try {
    const b = await request.json();
    f.name = String(b.name ?? '').trim().slice(0, 120);
    f.email = String(b.email ?? '').trim().toLowerCase().slice(0, 160);
    f.goal = String(b.goal ?? '').trim().slice(0, 120);
    f.experience = String(b.experience ?? '').trim().slice(0, 120);
    f.message = String(b.message ?? '').trim().slice(0, 4000);
  } catch {
    /* ignore */
  }

  if (!EMAIL_RE.test(f.email)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const to = notifyAddress(process.env.COACHING_TO || process.env.CONTACT_TO);
  await sendEmail({
    to,
    replyTo: f.email,
    subject: `Koçluk başvurusu — ${f.name || f.email}`,
    html: `<div style="font-family:Helvetica,Arial,sans-serif;color:#111;padding:16px">
      <h2 style="margin:0 0 8px">Yeni koçluk başvurusu 🏋️</h2>
      <p style="margin:0 0 4px"><b>İsim:</b> ${esc(f.name)}</p>
      <p style="margin:0 0 4px"><b>E-posta:</b> ${esc(f.email)}</p>
      <p style="margin:0 0 4px"><b>Hedef:</b> ${esc(f.goal)}</p>
      <p style="margin:0 0 4px"><b>Deneyim:</b> ${esc(f.experience)}</p>
      <p style="margin:12px 0 0;white-space:pre-line">${esc(f.message)}</p>
    </div>`,
  });

  return NextResponse.json({ ok: true });
}
