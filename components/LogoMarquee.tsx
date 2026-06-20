import type { Dictionary } from '@/i18n/dictionaries';

// Placeholder partner / "as featured in" wordmarks. Swap these for real
// brand logos (SVG/img) whenever you have them.
const BRANDS = ['NUTREX', 'GYMHOUSE', 'PROFORM', 'VITALITY', 'CORE LAB', 'MALTA FIT', 'PEAK'];

export function LogoMarquee({ dict }: { dict: Dictionary }) {
  const items = [...BRANDS, ...BRANDS]; // duplicated for a seamless loop

  return (
    <section className="border-y border-gray-200 bg-gray-50 py-10 dark:border-gray-900 dark:bg-gray-950">
      <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
        {dict.partners.title}
      </p>
      <div className="group relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-950" />
        <div className="flex w-max animate-logo-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none whitespace-nowrap text-2xl font-black uppercase tracking-tight text-gray-300 transition-colors hover:text-gray-500 dark:text-gray-700 dark:hover:text-gray-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
