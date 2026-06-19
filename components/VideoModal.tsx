'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { toEmbedUrl } from '@/lib/media';

export function VideoModal({
  url,
  title,
  closeLabel,
  onClose,
}: {
  url: string;
  title: string;
  closeLabel: string;
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

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button type="button" className="absolute inset-0" aria-label={closeLabel} onClick={onClose} />
      <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white/80 transition-all hover:bg-black/70 hover:text-white"
        >
          <X size={22} />
        </button>
        <iframe
          className="h-full w-full"
          src={toEmbedUrl(url)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
