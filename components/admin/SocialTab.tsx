'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader, Plus, Trash2 } from 'lucide-react';
import type { SocialItem } from '@/lib/types';
import { listSocial, saveSocial, deleteSocial, type SocialInput } from '@/lib/admin';
import type { AdminLabels } from './labels';
import { TextField, ImageField } from './fields';

const EMPTY: SocialInput = {
  imageUrl: '',
  socialUrl: '',
  platform: 'instagram',
  caption: { tr: '', en: '' },
  sortOrder: 0,
};

export function SocialTab({ t }: { t: AdminLabels }) {
  const [items, setItems] = useState<SocialItem[]>([]);
  const [form, setForm] = useState<SocialInput>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      setItems(await listSocial());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reload();
  }, []);

  const onSave = async () => {
    if (!form.imageUrl) return;
    setSaving(true);
    try {
      await saveSocial(form);
      setForm(EMPTY);
      await reload();
    } catch (e) {
      alert(String(e));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    await deleteSocial(id);
    await reload();
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
          <Plus size={16} className="text-brand" /> {t.add}
        </h3>
        <ImageField label={t.fields.image} folder="social" value={form.imageUrl} onChange={(v) => setForm((f) => ({ ...f, imageUrl: v }))} uploadLabel={t.fields.pasteUrl} />
        <TextField label={t.fields.social} value={form.socialUrl} onChange={(v) => setForm((f) => ({ ...f, socialUrl: v }))} placeholder="https://instagram.com/p/…" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField label={t.fields.platform} value={form.platform} onChange={(v) => setForm((f) => ({ ...f, platform: v }))} />
          <TextField label={t.fields.caption + ' (TR)'} value={form.caption.tr} onChange={(v) => setForm((f) => ({ ...f, caption: { ...f.caption, tr: v } }))} />
          <TextField label={t.fields.caption + ' (EN)'} value={form.caption.en} onChange={(v) => setForm((f) => ({ ...f, caption: { ...f.caption, en: v } }))} />
        </div>
        <TextField label={t.fields.order} type="number" value={String(form.sortOrder)} onChange={(v) => setForm((f) => ({ ...f, sortOrder: Number(v) || 0 }))} />
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-black uppercase tracking-widest text-black hover:bg-brand-hover disabled:opacity-40"
        >
          {saving ? <Loader size={16} className="animate-spin" /> : null}
          {saving ? t.saving : t.save}
        </button>
      </section>

      <section>
        {loading ? (
          <div className="flex justify-center py-8"><Loader className="animate-spin text-brand" /></div>
        ) : items.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.map((it) => (
              <div key={it.id} className="group relative aspect-square overflow-hidden rounded-xl border border-gray-800 bg-gray-800">
                {it.imageUrl && <Image src={it.imageUrl} alt="" fill sizes="200px" className="object-cover" />}
                <button
                  onClick={() => onDelete(it.id)}
                  className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
