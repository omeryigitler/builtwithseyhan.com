import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { sendAccountWelcome } from '@/lib/welcome';

/** Sends the one-time localized account-welcome email to the signed-in user.
 * Called from the sign-up modal after a successful password sign-up (the OAuth
 * flow is handled in /auth/callback). Idempotent via user metadata. */
export async function POST(request: Request) {
  let locale: 'tr' | 'en' = 'en';
  try {
    const body = await request.json();
    locale = body.locale === 'tr' ? 'tr' : 'en';
  } catch {
    /* ignore */
  }

  const supabase = await createServerSupabase();
  if (supabase) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    await sendAccountWelcome(supabase, { locale, siteUrl });
  }

  return NextResponse.json({ ok: true });
}
