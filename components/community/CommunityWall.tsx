'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { User } from '@supabase/supabase-js';
import { CheckCircle, Instagram, Loader, Plus, Upload, X } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import type { MemberPost } from '@/lib/types';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { onAuthChange, signInWithGoogle } from '@/lib/workouts';
import { submitMemberPost, uploadMemberImage } from '@/lib/community';

function igUrl(s: string): string {
  if (!s) return '#';
  if (s.startsWith('http')) return s;
  return `https://instagram.com/${s.replace(/^@/, '').trim()}`;
}

export function CommunityWall({
  posts,
  locale,
  dict,
}: {
  posts: MemberPost[];
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.community;
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => onAuthChange(setUser), []);

  const onShare = () => {
    if (!isSupabaseConfigured) return;
    if (user) setOpen(true);
    else signInWithGoogle(`/${locale}`);
  };

  return (
    <section id="community" className="bg-white px-5 py-20 transition-colors duration-500 dark:bg-gray-950 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
          flip
          action={
            <button
              onClick={onShare}
              className={buttonClasses({ variant: 'primary', size: 'md' })}
            >
              <Plus size={16} /> {t.share}
            </button>
          }
        />

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-200 px-4 py-12 text-center text-sm text-gray-400 dark:border-gray-800">
            {t.empty}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p.id}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 text-left ring-1 ring-black/5 dark:ring-white/10"
              >
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.caption || p.authorName}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="relative z-10 p-5">
                  {p.caption && (
                    <p className="line-clamp-3 text-sm font-semibold leading-relaxed text-white">
                      {p.caption}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="truncate text-[11px] font-bold uppercase tracking-widest text-brand">
                      {p.authorName || 'Member'}
                    </span>
                    {p.instagram && (
                      <a
                        href={igUrl(p.instagram)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t.viewInstagram}
                        className="shrink-0 text-white/80 transition-colors hover:text-white"
                      >
                        <Instagram size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {open && <SubmitModal t={t} onClose={() => setOpen(false)} />}
    </section>
  );
}

function SubmitModal({ t, onClose }: { t: Dictionary['community']; onClose: () => void }) {
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [instagram, setInstagram] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const pick = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    try {
      setImage(await uploadMemberImage(f));
    } catch (e) {
      alert(String(e));
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    if (!caption.trim() && !image) return;
    setStatus('saving');
    try {
      await submitMemberPost({
        authorName: name.trim(),
        instagram: instagram.trim(),
        caption: caption.trim(),
        imageUrl: image,
      });
      setStatus('done');
      setTimeout(onClose, 1800);
    } catch (e) {
      alert(String(e));
      setStatus('idle');
    }
  };

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[90] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <button type="button" className="absolute inset-0" aria-label="close" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl border border-white/10 bg-gray-950 p-6 sm:rounded-3xl sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-2xl uppercase tracking-tight text-white">{t.submitTitle}</h3>
          <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        {status === 'done' ? (
          <div className="flex items-center gap-2 rounded-2xl bg-brand/15 px-4 py-4 text-sm font-bold text-brand">
            <CheckCircle size={18} /> {t.thanks}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-700 bg-gray-800 text-gray-500 hover:border-brand"
              >
                {busy ? (
                  <Loader size={18} className="animate-spin" />
                ) : image ? (
                  <Image src={image} alt="" width={80} height={80} className="h-full w-full object-cover" />
                ) : (
                  <Upload size={18} />
                )}
              </button>
              <span className="text-xs text-gray-500">{t.image}</span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => pick(e.target.files?.[0])}
              />
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={t.captionPlaceholder}
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none"
            />
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder={t.instagramPlaceholder}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none"
            />
            <button
              onClick={submit}
              disabled={status === 'saving' || (!caption.trim() && !image)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-black uppercase tracking-widest text-black hover:bg-brand-hover disabled:opacity-40"
            >
              {status === 'saving' && <Loader size={16} className="animate-spin" />}
              {status === 'saving' ? t.submitting : t.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
