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

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_40px_-20px_rgba(204,255,0,0.45)] dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {img ? (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 dark:text-gray-600">
            {typeLabel}
          </div>
        )}

        {post.type === 'video' && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-black shadow-lg transition-transform group-hover:scale-110">
              <Play size={24} className="ml-0.5 fill-black" />
            </span>
          </span>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-900 backdrop-blur dark:bg-black/70 dark:text-white">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          {typeLabel}
        </span>
        <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900 dark:text-white">{title}</h3>
        {excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
