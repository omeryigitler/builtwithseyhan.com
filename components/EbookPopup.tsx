'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Lock, X, Mail, CheckCircle, Loader } from 'lucide-react';
import { subscribeEmail, EBOOK_OPEN_EVENT } from '@/lib/subscribe';
import type { Dictionary } from '@/i18n/dictionaries';

type PopupLabels = Dictionary['nutrition']['ebook']['popup'];

const KEY = 'bws_ebook_popup';
const DELAY = 10_000; // show after 10s on site

export function EbookPopup({ t }: { t: PopupLabels }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  // Auto-open once after the delay (unless already dismissed/subscribed),
  // plus open immediately when the e-book card asks for it.
  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(KEY);
    } catch {
      /* ignore */
    }
    const timer = seen ? undefined : window.setTimeout(() => setOpen(true), DELAY);
    const onOpen = () => setOpen(true);
    window.addEventListener(EBOOK_OPEN_EVENT, onOpen);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener(EBOOK_OPEN_EVENT, onOpen);
    };
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, 'dismissed');
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await subscribeEmail(email);
      try {
        localStorage.setItem(KEY, 'subscribed');
      } catch {
        /* ignore */
      }
      setStatus('done');
      window.setTimeout(() => setOpen(false), 2400);
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <button
        type="button"
        aria-label={t.dismiss}
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-gray-950/90 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
        <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-brand/40 blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-20" />

        <button
          type="button"
          onClick={close}
          aria-label={t.dismiss}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20"
        >
          <X size={18} />
        </button>

        <div className="relative">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
            <Lock className="text-brand" size={28} />
          </div>

          <h3 className="font-display text-3xl uppercase leading-[0.95] text-white">{t.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">{t.subtitle}</p>

          {status === 'done' ? (
            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-brand/15 px-4 py-3 text-sm font-bold text-brand">
              <CheckCircle size={18} /> {t.success}
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 transition-colors focus-within:border-brand">
                <Mail size={18} className="shrink-0 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:bg-brand-hover disabled:opacity-50"
              >
                {status === 'loading' && <Loader size={16} className="animate-spin" />}
                {t.submit}
              </button>
              {status === 'error' && <p className="mt-2 text-xs text-red-400">{t.error}</p>}
              <p className="mt-3 text-center text-[11px] text-gray-500">{t.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
