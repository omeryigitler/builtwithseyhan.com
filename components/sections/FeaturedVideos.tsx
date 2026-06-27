'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize, type Post } from '@/lib/types';
import { videoThumb } from '@/lib/media';
import { VideoModal } from '@/components/VideoModal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FeaturedVideos({
  videos,
  locale,
  dict,
}: {
  videos: Post[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState<Post | null>(null);
  if (videos.length === 0) return null;

  const [main, ...rest] = videos;
  const thumb = (p: Post) => p.imageUrl ?? (p.videoUrl ? videoThumb(p.videoUrl) : null);

  return (
    <section
      id="videos"
      className="bg-white px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={dict.videos.eyebrow}
          title={dict.videos.title}
          subtitle={dict.videos.subtitle}
          flip
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Main featured video */}
          <button
            type="button"
            onClick={() => main.videoUrl && setActive(main)}
            className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-gray-900 text-left shadow-lg"
          >
            {thumb(main) && (
              <Image
                src={thumb(main)!}
                alt={localize(main.title, locale)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                priority
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <span className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-black shadow-[0_8px_30px_rgba(204,255,0,0.5)] transition-transform group-hover:scale-110">
              <Play size={28} className="ml-1" fill="currentColor" />
            </span>
            <span className="absolute bottom-6 left-6 right-6">
              <span className="font-display text-3xl uppercase leading-[0.95] text-white md:text-4xl">
                {localize(main.title, locale)}
              </span>
            </span>
          </button>

          {/* Smaller videos */}
          <div className="grid grid-cols-2 gap-6">
            {rest.slice(0, 4).map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => v.videoUrl && setActive(v)}
                className="group relative aspect-video overflow-hidden rounded-2xl bg-gray-900 text-left"
              >
                {thumb(v) && (
                  <Image
                    src={thumb(v)!}
                    alt={localize(v.title, locale)}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-black transition-transform group-hover:scale-110">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </span>
                <span className="absolute bottom-3 left-3 right-3 line-clamp-2 font-display text-lg uppercase leading-tight text-white">
                  {localize(v.title, locale)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {active?.videoUrl && (
        <VideoModal
          url={active.videoUrl}
          title={localize(active.title, locale)}
          closeLabel={dict.post.back}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
