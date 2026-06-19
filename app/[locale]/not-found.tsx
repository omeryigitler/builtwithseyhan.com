import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-7xl font-black text-brand">404</span>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Page not found</p>
      <Link
        href="/"
        className="rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white dark:bg-brand dark:text-black"
      >
        Back home
      </Link>
    </main>
  );
}
