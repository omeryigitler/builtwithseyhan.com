import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { sendAccountWelcome } from '@/lib/welcome';

/** OAuth (Google) / magic-link redirect target — exchanges the code for a
 * session cookie, then sends the one-time welcome email for new accounts. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/';

  if (code) {
    const supabase = await createServerSupabase();
    if (supabase) {
      await supabase.auth.exchangeCodeForSession(code);
      const locale = next.startsWith('/tr') ? 'tr' : 'en';
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
      await sendAccountWelcome(supabase, { locale, siteUrl });
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
