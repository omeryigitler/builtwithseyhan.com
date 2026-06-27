import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize, type Post } from '@/lib/types';
import { videoThumb } from '@/lib/media';

export function PostCard({
  post,
  locale,
  dict,
}: {
  post: Post;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = localize(post.title, locale);
  const excerpt = localize(post.excerpt, locale);
  const category = dict.categories[post.category] ?? post.category;
  const typeLabel = dict.types[post.type] ?? post.type;
  const img = post.imageUrl ?? (post.videoUrl ? videoThumb(post.videoUrl) : null);
  const isVideo = post.type === 'video';

  return (
    <article className="group relative flex aspect-[4/5] h-full w-full flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 text-left ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-brand dark:ring-white/10">
      {img ? (
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand/20 blur-[80px]" />
          <div className="absolute inset-0 bg-noise opacity-[0.12]" />
        </div>
      )}

      {/* legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      {/* category — lime underline */}
      <span className="absolute left-4 top-4 text-[11px] font-bold uppercase tracking-widest text-white">
        <span className="border-b-2 border-brand pb-0.5">{category}</span>
      </span>

      {/* play overlay for videos */}
      {isVideo && (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-brand text-black opacity-0 shadow-[0_8px_30px_rgba(204,255,0,0.5)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Play size={22} className="ml-0.5" fill="currentColor" />
        </span>
      )}

      <div className="relative z-10 p-5">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-brand">
          {typeLabel}
        </span>
        <h3 className="font-display text-2xl uppercase leading-[0.95] text-white sm:text-[1.7rem]">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-300">{excerpt}</p>
        )}
      </div>
    </article>
  );
}
