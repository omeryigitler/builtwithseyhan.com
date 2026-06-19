import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, turkishLocale, isLocale, LOCALE_COOKIE } from './i18n/config';

/**
 * Decide the locale for a request with no locale prefix:
 *   1. A previously saved manual choice (cookie) wins — handles VPNs and
 *      e.g. a Turkish visitor living in Malta.
 *   2. Otherwise country from Vercel's geo header: TR -> Turkish, else English.
 */
function resolveLocale(req: NextRequest) {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const country = (
    req.headers.get('x-vercel-ip-country') ?? ''
  ).toUpperCase();
  if (country === 'TR') return turkishLocale;

  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already locale-prefixed? Let it through.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = resolveLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (assets).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
