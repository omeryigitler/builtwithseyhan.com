'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Lock, X, Mail, CheckCircle, Loader, Check, Sparkles } from 'lucide-react';
import { subscribeEmail, EBOOK_OPEN_EVENT } from '@/lib/subscribe';
import type { Dictionary } from '@/i18n/dictionaries';

type PopupLabels = Dictionary['nutrition']['ebook']['popup'];

const KEY = 'bws_ebook_popup';
const DELAY = 10_000; // show after 10s on site

export function EbookPopup({ t, locale = 'en' }: { t: PopupLabels; locale?: string }) {
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      await subscribeEmail(email, locale);
      try {
        localStorage.setItem(KEY, 'subscribed');
      } catch {
        /* ignore */
      }
      setStatus('done');
      window.setTimeout(() => setOpen(false), 2600);
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
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
      />

      <div className="animate-fade-in-up relative z-10 grid w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-gray-950 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] md:grid-cols-[0.85fr_1fr]">
        {/* ── Visual panel: tilted e-book cover ───────────────────── */}
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 md:flex [perspective:1200px]">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-brand/20 blur-[80px]" />
          <div className="pointer-events-none absolute inset-0 bg-noise opacity-20" />

          {/* the book */}
          <div className="relative [transform:rotateY(18deg)_rotateX(6deg)] [transform-style:preserve-3d]">
            {/* spine shadow */}
            <div className="absolute -left-2 top-1 h-full w-3 rounded-l-md bg-black/60 blur-[2px] [transform:translateZ(-12px)]" />
            <div className="relative aspect-[3/4] w-44 overflow-hidden rounded-r-lg rounded-l-sm bg-gray-900 shadow-2xl ring-1 ring-white/10">
              {/* glossy sheen */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
              <div className="flex h-full flex-col justify-between p-4">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-brand text-[10px] font-black text-black">
                    B
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/70">
                    Built With Seyhan
                  </span>
                </div>
                <div>
                  <div className="h-1 w-8 bg-brand" />
                  <div className="mt-2 font-display text-2xl uppercase leading-[0.85] text-white">
                    The Nutrition Playbook
                  </div>
                </div>
                <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-brand">
                  E-book · 2026
                </div>
              </div>
            </div>
            {/* floating badge on the cover */}
            <div className="absolute -bottom-3 -right-4 flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black shadow-xl [transform:translateZ(40px)]">
              <Sparkles size={12} /> Free
            </div>
          </div>
        </div>

        {/* ── Form panel ──────────────────────────────────────────── */}
        <div className="relative p-7 sm:p-9">
          {/* mobile glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/25 blur-[80px] md:hidden" />

          <button
            type="button"
            onClick={close}
            aria-label={t.dismiss}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-brand">
              <Lock size={12} /> {t.badge}
            </span>

            <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] text-white sm:text-4xl">
              {t.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{t.subtitle}</p>

            {status === 'done' ? (
              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-brand/15 px-4 py-4 text-sm font-bold text-brand">
                <CheckCircle size={18} /> {t.success}
              </div>
            ) : (
              <>
                <ul className="mt-5 space-y-2.5">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <form onSubmit={submit} className="mt-6">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-4 transition-colors focus-within:border-brand">
                    <Mail size={18} className="shrink-0 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.placeholder}
                      className="w-full bg-transparent py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-black uppercase tracking-widest text-black shadow-[0_8px_30px_rgba(204,255,0,0.35)] transition hover:bg-brand-hover disabled:opacity-50"
                  >
                    {status === 'loading' && <Loader size={16} className="animate-spin" />}
                    {t.submit}
                  </button>
                  {status === 'error' && <p className="mt-2 text-xs text-red-400">{t.error}</p>}
                  <p className="mt-3 text-center text-[11px] text-gray-500">{t.privacy}</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
