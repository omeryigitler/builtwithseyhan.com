'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Loader } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';
import { NAV_KEYS, ALL_NAV_VISIBLE } from '@/lib/types';
import { getSettingsAdmin, saveSettings } from '@/lib/admin';
import type { AdminLabels } from './labels';
import { TextField, Toggle } from './fields';

const EMPTY: SiteSettings = {
  whatsappUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
  youtubeUrl: '',
  heroVideoUrl: '',
  nav: { ...ALL_NAV_VISIBLE },
};

export function SettingsTab({ t }: { t: AdminLabels }) {
  const [form, setForm] = useState<SiteSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getSettingsAdmin()
      .then(setForm)
      .finally(() => setLoading(false));
  }, []);

  const onSave = async () => {
    setSaving(true);
    try {
      await saveSettings(form);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch (e) {
      alert(String(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-8"><Loader className="animate-spin text-brand" /></div>;

  return (
    <div className="max-w-lg space-y-4">
      <TextField label={t.fields.whatsapp} value={form.whatsappUrl} onChange={(v) => setForm((f) => ({ ...f, whatsappUrl: v }))} placeholder="https://wa.me/9055…" />
      <TextField label={t.fields.instagram} value={form.instagramUrl} onChange={(v) => setForm((f) => ({ ...f, instagramUrl: v }))} placeholder="https://instagram.com/…" />
      <TextField label={t.fields.tiktok} value={form.tiktokUrl} onChange={(v) => setForm((f) => ({ ...f, tiktokUrl: v }))} placeholder="https://tiktok.com/@…" />
      <TextField label={t.fields.youtube} value={form.youtubeUrl} onChange={(v) => setForm((f) => ({ ...f, youtubeUrl: v }))} placeholder="https://youtube.com/@…" />
      <TextField label={t.fields.heroVideo} value={form.heroVideoUrl} onChange={(v) => setForm((f) => ({ ...f, heroVideoUrl: v }))} placeholder="https://…/hero.mp4" />

      <div className="space-y-3 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">{t.navVisibility.title}</h3>
        <p className="text-xs text-gray-500">{t.navVisibility.hint}</p>
        <div className="grid grid-cols-2 gap-3 pt-1">
          {NAV_KEYS.map((k) => (
            <Toggle
              key={k}
              label={t.navVisibility[k]}
              checked={form.nav[k]}
              onChange={(v) => setForm((f) => ({ ...f, nav: { ...f.nav, [k]: v } }))}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-black uppercase tracking-widest text-black hover:bg-brand-hover disabled:opacity-40"
      >
        {done ? <CheckCircle size={16} /> : saving ? <Loader size={16} className="animate-spin" /> : null}
        {done ? t.saved : saving ? t.saving : t.save}
      </button>
    </div>
  );
}
