import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { buttonClasses } from '@/components/ui/Button';

const THUMBS = ['/images/mustafa-1.jpg', '/images/mustafa-3.jpg', '/images/mustafa-5.jpg'];

/** A frameless device screen rendered in 3D perspective, with floating depth
 * cards. CSS-only (tilts toward the viewer on hover). */
export function Showcase3D({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="overflow-hidden bg-gray-50 px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-8">
        {/* Copy */}
        <div>
          <div className="mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            <span className="h-px w-8 bg-brand" /> {dict.showcase.eyebrow}
          </div>
          <h2 className="font-display text-4xl uppercase leading-[0.9] text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            {dict.showcase.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-gray-500 dark:text-gray-400">
            {dict.showcase.subtitle}
          </p>
          <Link
            href={`/${locale}#feed`}
            className={buttonClasses({ variant: 'primary', size: 'lg', className: 'mt-8' })}
          >
            {dict.showcase.cta} <ArrowRight size={18} />
          </Link>
        </div>

        {/* 3D frameless screen */}
        <div className="flex justify-center [perspective:1600px]">
          <div className="group relative transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateY(-22deg)_rotateX(8deg)] hover:[transform:rotateY(-10deg)_rotateX(4deg)]">
            {/* glow */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-brand/25 blur-[90px]" />

            {/* floating depth card — macros */}
            <div className="absolute -left-12 top-10 hidden w-40 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl [transform:translateZ(70px)] dark:border-white/10 dark:bg-gray-900 sm:block">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">kcal</div>
              <div className="font-display text-3xl text-gray-900 dark:text-white">320</div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full w-2/3 bg-brand" />
              </div>
            </div>

            {/* the frameless screen */}
            <div className="relative w-[280px] overflow-hidden rounded-[2.4rem] bg-gray-950 shadow-2xl ring-1 ring-black/10 sm:w-[300px]">
              {/* brand bar */}
              <div className="flex items-center gap-2 px-5 pt-5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand text-xs font-black text-black">
                  B
                </span>
                <span className="text-[11px] font-black uppercase tracking-tight text-white">
                  Built With Seyhan
                </span>
              </div>

              {/* hero tile */}
              <div className="relative mx-4 mt-4 aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src="/images/hero.png" alt="" fill sizes="300px" className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute left-3 top-3 text-[10px] font-bold uppercase tracking-widest text-white">
                  <span className="border-b-2 border-brand pb-0.5">{dict.categories.training}</span>
                </span>
                <span className="absolute bottom-3 left-3 right-3 font-display text-xl uppercase leading-none text-white">
                  {dict.videos.title}
                </span>
                <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-black">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </span>
              </div>

              {/* thumb row */}
              <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
                {THUMBS.map((s) => (
                  <div key={s} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image src={s} alt="" fill sizes="100px" className="object-cover grayscale" />
                  </div>
                ))}
              </div>

              {/* text card */}
              <div className="m-4 rounded-2xl bg-white/5 p-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand">
                  {dict.categories.nutrition}
                </div>
                <div className="mt-1 font-display text-lg uppercase leading-none text-white">
                  {dict.nutrition.title}
                </div>
              </div>
            </div>

            {/* floating depth card — protein */}
            <div className="absolute -right-10 bottom-12 hidden rounded-2xl bg-brand px-4 py-3 shadow-xl [transform:translateZ(90px)] sm:block">
              <div className="text-[10px] font-black uppercase tracking-widest text-black/70">protein</div>
              <div className="font-display text-2xl text-black">46g</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
