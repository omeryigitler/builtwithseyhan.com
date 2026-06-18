import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

type LeadType = 'coaching' | 'gym' | 'newsletter';

interface LeadPayload {
  type?: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  goal?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
  lang?: string;
}

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@builtwithseyhan.com';
const FROM = 'Built with Seyhan <noreply@builtwithseyhan.com>';

// ── Firebase Admin (lazy singleton; bypasses Firestore rules) ────────────────
let adminApp: App | null = null;
function getAdminApp(): App | null {
  if (adminApp) return adminApp;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  try {
    const creds = JSON.parse(raw);
    adminApp = getApps().length ? getApps()[0] : initializeApp({ credential: cert(creds) });
    return adminApp;
  } catch {
    return null;
  }
}

const clip = (v: unknown, max = 2000): string =>
  typeof v === 'string' ? v.slice(0, max) : '';

const SUBJECTS: Record<LeadType, string> = {
  coaching: 'Yeni koçluk başvurusu',
  gym: 'Yeni Malta salon kaydı (prim)',
  newsletter: 'Yeni bülten/e-kitap aboneliği',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body: LeadPayload =
    typeof req.body === 'string' ? safeParse(req.body) : (req.body ?? {});

  const type: LeadType = (['coaching', 'gym', 'newsletter'] as const).includes(
    body.type as LeadType
  )
    ? (body.type as LeadType)
    : 'coaching';

  const lead = {
    type,
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 60),
    goal: clip(body.goal),
    service: clip(body.service, 200),
    date: clip(body.date, 60),
    time: clip(body.time, 60),
    message: clip(body.message),
    lang: clip(body.lang, 10),
  };

  if (!lead.email && !lead.name) {
    res.status(400).json({ error: 'Missing contact info' });
    return;
  }

  const lines = [
    `Tip: ${type}`,
    lead.service && `Hizmet: ${lead.service}`,
    lead.date && `Tarih: ${lead.date}`,
    lead.time && `Saat: ${lead.time}`,
    '',
    lead.name && `İsim: ${lead.name}`,
    lead.email && `E-posta: ${lead.email}`,
    lead.phone && `Telefon: ${lead.phone}`,
    lead.goal && `\nHedef:\n${lead.goal}`,
    lead.message && `\nMesaj:\n${lead.message}`,
  ].filter(Boolean);

  // 1) Persist the lead (best effort — never lose it)
  let stored = false;
  const app = getAdminApp();
  if (app) {
    try {
      await getFirestore(app)
        .collection('leads')
        .add({ ...lead, createdAt: FieldValue.serverTimestamp() });
      stored = true;
    } catch {
      stored = false;
    }
  }

  // 2) Notify by email via Resend
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: FROM,
        to: CONTACT_EMAIL,
        replyTo: lead.email || undefined,
        subject: SUBJECTS[type],
        text: lines.join('\n'),
      });
      emailed = true;
    } catch {
      emailed = false;
    }
  }

  if (!stored && !emailed) {
    res.status(502).json({ error: 'Delivery failed' });
    return;
  }

  res.status(200).json({ ok: true, stored, emailed });
}

function safeParse(s: string): LeadPayload {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
