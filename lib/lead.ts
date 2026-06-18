import { CONTACT_EMAIL } from '../siteConfig';

export type LeadType = 'coaching' | 'gym' | 'newsletter';

export interface LeadInput {
  type: LeadType;
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

/** POST the lead to the serverless function. Returns true if the server accepted it. */
export async function submitLead(input: LeadInput): Promise<boolean> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const SUBJECTS: Record<LeadType, string> = {
  coaching: 'Koçluk Başvurusu',
  gym: 'Malta Salon Kaydı',
  newsletter: 'Bülten Aboneliği',
};

/** Last-resort fallback when the API is unreachable (e.g. local dev or offline). */
export function mailtoFallback(input: LeadInput): void {
  const lines = [
    input.service && `Hizmet: ${input.service}`,
    input.date && `Tarih: ${input.date}`,
    input.time && `Saat: ${input.time}`,
    input.name && `İsim: ${input.name}`,
    input.email && `E-posta: ${input.email}`,
    input.phone && `Telefon: ${input.phone}`,
    input.goal && `Hedef: ${input.goal}`,
    input.message && `Mesaj: ${input.message}`,
  ].filter(Boolean);

  const subject = encodeURIComponent(SUBJECTS[input.type]);
  const bodyText = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${bodyText}`;
}
