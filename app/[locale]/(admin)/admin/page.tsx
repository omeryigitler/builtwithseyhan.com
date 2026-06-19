import { isLocale, defaultLocale, type Locale } from '@/i18n/config';
import { AdminPanel } from '@/components/admin/AdminPanel';

export const metadata = { robots: { index: false, follow: false }, title: 'Admin' };

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  return <AdminPanel locale={locale} adminPath={`/${locale}/admin`} />;
}
