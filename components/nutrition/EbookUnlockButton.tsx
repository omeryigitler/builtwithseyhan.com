'use client';

import { Lock } from 'lucide-react';
import { EBOOK_OPEN_EVENT } from '@/lib/subscribe';

/** Opens the e-book capture popup on demand from the nutrition page card. */
export function EbookUnlockButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EBOOK_OPEN_EVENT))}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-black uppercase tracking-widest text-black shadow-[0_4px_14px_rgba(204,255,0,0.4)] transition hover:bg-brand-hover"
    >
      <Lock size={15} /> {label}
    </button>
  );
}
