import Link from 'next/link';

/** Branded 404 — rendered inside the site layout (header/footer present). */
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-32 text-center">
      <span className="font-display text-[8rem] leading-none text-brand drop-shadow sm:text-[12rem]">
        404
      </span>
      <h1 className="mt-2 font-display text-3xl uppercase tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Sayfa bulunamadı / Page not found
      </h1>
      <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
        <br />
        The page you’re looking for moved or never existed.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/tr"
          className="rounded-full bg-brand px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:bg-brand-hover"
        >
          Ana sayfa
        </Link>
        <Link
          href="/en"
          className="rounded-full border border-gray-300 px-6 py-3 text-sm font-black uppercase tracking-widest text-gray-900 transition hover:border-brand dark:border-gray-700 dark:text-white"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
