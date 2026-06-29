'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize, type Post, type Category } from '@/lib/types';
import { videoThumb } from '@/lib/media';
import { VideoModal } from '@/components/VideoModal';
import { RotatingPlay } from '@/components/ui/RotatingPlay';
import { UnderlineTabs } from '@/components/ui/UnderlineTabs';

export function VideoGallery({
  videos,
  locale,
  dict,
}: {
  videos: Post[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [active, setActive] = useState<Post | null>(null);

  const cats = useMemo(() => {
    const set = Array.from(new Set(videos.map((v) => v.category)));
    return [
      { value: 'all' as const, label: dict.videosPage.all },
      ...set.map((c) => ({ value: c, label: dict.categories[c] ?? c })),
    ];
  }, [videos, dict]);

  const filtered = cat === 'all' ? videos : videos.filter((v) => v.category === cat);
  const thumb = (p: Post) => p.imageUrl ?? (p.videoUrl ? videoThumb(p.videoUrl) : null);

  if (videos.length === 0) {
    return <p className="py-20 text-center text-sm text-gray-400">{dict.videosPage.empty}</p>;
  }

  return (
    <div>
      {cats.length > 2 && <UnderlineTabs tabs={cats} value={cat} onChange={setCat} className="mb-8" />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <RotatingPlay label={dict.videos.watch} size={84} />
            </span>
            <span className="absolute bottom-4 left-4 right-4 font-display text-xl uppercase leading-[0.95] text-white">
              {localize(v.title, locale)}
            </span>
          </button>
        ))}
      </div>

      {active?.videoUrl && (
        <VideoModal
          url={active.videoUrl}
          title={localize(active.title, locale)}
          closeLabel={dict.post.back}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
