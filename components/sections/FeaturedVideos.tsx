'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize, type Post } from '@/lib/types';
import { videoThumb } from '@/lib/media';
import { VideoModal } from '@/components/VideoModal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RotatingPlay } from '@/components/ui/RotatingPlay';

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

        <div className="grid gap-6 sm:grid-cols-2">
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => v.videoUrl && setActive(v)}
              className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-gray-900 text-left shadow-lg"
            >
              {thumb(v) && (
                <Image
                  src={thumb(v)!}
                  alt={localize(v.title, locale)}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <RotatingPlay label={dict.videos.watch} />
              </span>

              <span className="absolute bottom-5 left-5 right-5 font-display text-2xl uppercase leading-[0.95] text-white md:text-3xl">
                {localize(v.title, locale)}
              </span>
            </button>
          ))}
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
