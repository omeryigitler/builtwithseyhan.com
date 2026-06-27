'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Play,
  Flame,
  Dumbbell,
  Clock,
  X,
  GlassWater,
  Egg,
  Coffee,
  Cookie,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { UnderlineTabs } from '@/components/ui/UnderlineTabs';
import { toEmbedUrl } from '@/lib/media';
import { localize, type Recipe, type RecipeCategory } from '@/lib/types';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';

const TAB_ORDER: RecipeCategory[] = ['smoothie', 'highprotein', 'breakfast', 'snack'];

const CATEGORY: Record<RecipeCategory, { icon: LucideIcon; glow: string }> = {
  smoothie: { icon: GlassWater, glow: '-right-8 -top-8' },
  highprotein: { icon: Egg, glow: '-left-8 -top-6' },
  breakfast: { icon: Coffee, glow: '-right-6 -bottom-8' },
  snack: { icon: Cookie, glow: '-left-8 -bottom-8' },
};

export function RecipeIndex({
  recipes,
  locale,
  dict,
}: {
  recipes: Recipe[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [cat, setCat] = useState<RecipeCategory | 'all'>('all');
  const [sel, setSel] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sel]);

  const tabs = [
    { value: 'all' as const, label: dict.nutrition.all },
    ...TAB_ORDER.map((c) => ({ value: c, label: dict.nutrition.categories[c] })),
  ];

  const filtered = cat === 'all' ? recipes : recipes.filter((r) => r.category === cat);

  return (
    <div>
      <UnderlineTabs tabs={tabs} value={cat} onChange={setCat} className="mb-2" />

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-400">{dict.nutrition.empty}</p>
      ) : (
        <div>
          {filtered.map((r, i) => (
            <Reveal key={r.id}>
              <RecipeRow
                recipe={r}
                index={i}
                even={i % 2 === 0}
                locale={locale}
                dict={dict}
                onPlay={setSel}
              />
            </Reveal>
          ))}
        </div>
      )}

      {sel?.youtubeUrl && (
        <VideoLightbox
          title={localize(sel.title, locale)}
          url={sel.youtubeUrl}
          backLabel={dict.post.back}
          onClose={() => setSel(null)}
        />
      )}
    </div>
  );
}

function RecipeRow({
  recipe,
  index,
  even,
  locale,
  dict,
  onPlay,
}: {
  recipe: Recipe;
  index: number;
  even: boolean;
  locale: Locale;
  dict: Dictionary;
  onPlay: (r: Recipe) => void;
}) {
  const title = localize(recipe.title, locale);
  const desc = localize(recipe.description, locale);
  const catLabel = dict.nutrition.categories[recipe.category];
  const nn = String(index + 1).padStart(2, '0');
  const hasVideo = Boolean(recipe.youtubeUrl);
  const { icon: Icon, glow } = CATEGORY[recipe.category];

  return (
    <article className="grid gap-5 border-t border-gray-200 py-8 dark:border-white/10 sm:grid-cols-12 sm:items-center sm:gap-10 sm:py-10">
      {/* Visual — image-over-text */}
      <div className={`sm:col-span-7 ${even ? '' : 'sm:order-2'}`}>
        <button
          type="button"
          onClick={() => hasVideo && onPlay(recipe)}
          aria-label={hasVideo ? `${dict.nutrition.watch}: ${title}` : title}
          className={`group/v relative block aspect-[16/10] w-full overflow-hidden rounded-3xl text-left ${
            hasVideo ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          {recipe.imageUrl ? (
            <Image
              src={recipe.imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 58vw"
              className="object-cover grayscale transition duration-700 group-hover/v:scale-105 group-hover/v:grayscale-0"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
              <div
                className={`absolute h-44 w-44 rounded-full bg-brand/25 blur-[90px] transition-all duration-500 group-hover/v:bg-brand/45 ${glow}`}
              />
              <Icon
                className="absolute bottom-5 right-5 h-28 w-28 text-white/[0.06]"
                strokeWidth={1}
              />
              <div className="absolute inset-0 bg-noise opacity-[0.12]" />
            </div>
          )}

          {/* legibility scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <span className="absolute left-5 top-4 font-display text-2xl leading-none text-white/60">
            {nn}
          </span>
          <h3 className="absolute inset-x-5 bottom-4 font-display text-3xl uppercase leading-[0.9] text-white sm:text-4xl">
            {title}
          </h3>

          {hasVideo && (
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-brand text-black opacity-0 shadow-[0_8px_30px_rgba(204,255,0,0.5)] transition-all duration-300 group-hover/v:scale-100 group-hover/v:opacity-100">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          )}
        </button>
      </div>

      {/* Meta */}
      <div className={`sm:col-span-5 ${even ? '' : 'sm:order-1'}`}>
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          {catLabel}
        </div>
        <p className="mb-5 max-w-md text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
          {desc}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-gray-900 dark:text-white">
          <span className="inline-flex items-center gap-1.5">
            <Flame size={16} className="text-gray-400" /> {recipe.kcal}
            <span className="font-normal text-gray-400">{dict.nutrition.macros.kcal}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Dumbbell size={16} className="text-gray-400" /> {recipe.protein}
            <span className="font-normal text-gray-400">{dict.nutrition.macros.protein}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={16} className="text-gray-400" /> {recipe.timeMin}
            <span className="font-normal text-gray-400">{dict.nutrition.macros.time}</span>
          </span>
        </div>

        {hasVideo && (
          <button
            type="button"
            onClick={() => onPlay(recipe)}
            className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-wider text-gray-900 underline decoration-brand decoration-2 underline-offset-[6px] transition-all hover:decoration-[3px] dark:text-white"
          >
            <Play size={14} fill="currentColor" /> {dict.nutrition.watch}
          </button>
        )}
      </div>
    </article>
  );
}

function VideoLightbox({
  title,
  url,
  backLabel,
  onClose,
}: {
  title: string;
  url: string;
  backLabel: string;
  onClose: () => void;
}) {
  return (
    <div
      className="animate-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button type="button" className="absolute inset-0" aria-label={backLabel} onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={backLabel}
          className="absolute -top-11 right-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        >
          <X size={22} />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={`${toEmbedUrl(url)}&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <h3 className="mt-4 font-display text-2xl uppercase tracking-tight text-white">{title}</h3>
      </div>
    </div>
  );
}
