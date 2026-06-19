'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { localize, type Post } from '@/lib/types';
import { toEmbedUrl } from '@/lib/media';

export function PostModal({
  post,
  locale,
  dict,
  onClose,
}: {
  post: Post;
  locale: Locale;
  dict: Dictionary;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const title = localize(post.title, locale);
  const body = localize(post.body, locale) || localize(post.excerpt, locale);
  const category = dict.categories[post.category] ?? post.category;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button type="button" className="absolute inset-0" aria-label={dict.post.back} onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.post.back}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
        >
          <X size={20} />
        </button>

        {/* Media */}
        {post.type === 'video' && post.videoUrl ? (
          <div className="aspect-video w-full overflow-hidden rounded-t-3xl bg-black">
            <iframe
              className="h-full w-full"
              src={toEmbedUrl(post.videoUrl)}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : post.imageUrl ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-gray-100 dark:bg-gray-800">
            <Image src={post.imageUrl} alt={title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        ) : null}

        <div className="p-6 sm:p-8">
          <span className="mb-3 inline-block rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-brand">
            {category}
          </span>
          <h2 className="mb-4 text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          {body && (
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {body}
            </p>
          )}

          {post.socialUrl && (
            <a
              href={post.socialUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gray-900 underline-offset-4 hover:underline dark:text-brand"
            >
              <ExternalLink size={16} /> {dict.post.viewOriginal}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
