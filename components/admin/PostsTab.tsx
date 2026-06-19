'use client';

import { useEffect, useState } from 'react';
import { Loader, Pencil, Plus, Trash2 } from 'lucide-react';
import type { Category, Post, PostType } from '@/lib/types';
import { listAllPosts, savePost, deletePost, type PostInput } from '@/lib/admin';
import type { AdminLabels } from './labels';
import { TextField, TextArea, SelectField, Toggle, ImageField } from './fields';

const EMPTY: PostInput = {
  slug: '',
  type: 'video',
  category: 'fitness',
  title: { tr: '', en: '' },
  excerpt: { tr: '', en: '' },
  body: { tr: '', en: '' },
  imageUrl: null,
  videoUrl: null,
  socialUrl: null,
  featured: false,
  published: true,
  sortOrder: 0,
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function PostsTab({ t }: { t: AdminLabels }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<PostInput>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      setPosts(await listAllPosts());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reload();
  }, []);

  const set = <K extends keyof PostInput>(k: K, v: PostInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (p: Post) =>
    setForm({
      id: p.id,
      slug: p.slug,
      type: p.type,
      category: p.category,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      imageUrl: p.imageUrl,
      videoUrl: p.videoUrl,
      socialUrl: p.socialUrl,
      featured: p.featured,
      published: true,
      sortOrder: 0,
    });

  const onSave = async () => {
    if (!form.slug || (!form.title.tr && !form.title.en)) return;
    setSaving(true);
    try {
      await savePost(form);
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
    await deletePost(id);
    await reload();
  };

  const typeOpts = (['video', 'image', 'blog'] as PostType[]).map((v) => ({
    value: v,
    label: t.types[v],
  }));
  const catOpts = (
    ['fitness', 'health', 'lifestyle', 'nutrition', 'mindset', 'training'] as Category[]
  ).map((v) => ({ value: v, label: t.categories[v] }));

  return (
    <div className="space-y-8">
      {/* Editor */}
      <section className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
          <Plus size={16} className="text-brand" /> {form.id ? t.edit : t.newPost}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SelectField label={t.fields.type} value={form.type} onChange={(v) => set('type', v as PostType)} options={typeOpts} />
          <SelectField label={t.fields.category} value={form.category} onChange={(v) => set('category', v as Category)} options={catOpts} />
          <TextField label={t.fields.order} type="number" value={String(form.sortOrder)} onChange={(v) => set('sortOrder', Number(v) || 0)} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label={t.fields.titleTr}
            value={form.title.tr}
            onChange={(v) => setForm((f) => ({ ...f, title: { ...f.title, tr: v }, slug: f.slug || slugify(v) }))}
          />
          <TextField
            label={t.fields.titleEn}
            value={form.title.en}
            onChange={(v) => setForm((f) => ({ ...f, title: { ...f.title, en: v }, slug: f.slug || slugify(v) }))}
          />
        </div>

        <TextField label={t.fields.slug} value={form.slug} onChange={(v) => set('slug', slugify(v))} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea label={t.fields.excerptTr} value={form.excerpt.tr} onChange={(v) => setForm((f) => ({ ...f, excerpt: { ...f.excerpt, tr: v } }))} />
          <TextArea label={t.fields.excerptEn} value={form.excerpt.en} onChange={(v) => setForm((f) => ({ ...f, excerpt: { ...f.excerpt, en: v } }))} />
        </div>

        {form.type === 'blog' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextArea label={t.fields.bodyTr} rows={6} value={form.body.tr} onChange={(v) => setForm((f) => ({ ...f, body: { ...f.body, tr: v } }))} />
            <TextArea label={t.fields.bodyEn} rows={6} value={form.body.en} onChange={(v) => setForm((f) => ({ ...f, body: { ...f.body, en: v } }))} />
          </div>
        )}

        <ImageField label={t.fields.image} folder="posts" value={form.imageUrl} onChange={(v) => set('imageUrl', v)} uploadLabel={t.fields.pasteUrl} />

        {form.type === 'video' && (
          <TextField label={t.fields.video} value={form.videoUrl ?? ''} onChange={(v) => set('videoUrl', v)} placeholder="https://youtube.com/watch?v=…" />
        )}
        <TextField label={t.fields.social} value={form.socialUrl ?? ''} onChange={(v) => set('socialUrl', v)} placeholder="https://instagram.com/p/…" />

        <div className="flex flex-wrap items-center gap-6">
          <Toggle label={t.fields.featured} checked={form.featured} onChange={(v) => set('featured', v)} />
          <Toggle label={t.fields.published} checked={form.published} onChange={(v) => set('published', v)} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-brand-hover disabled:opacity-40"
          >
            {saving ? <Loader size={16} className="animate-spin" /> : null}
            {saving ? t.saving : t.save}
          </button>
          {form.id && (
            <button onClick={() => setForm(EMPTY)} className="rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-bold text-gray-300 hover:border-gray-500">
              {t.cancel}
            </button>
          )}
        </div>
      </section>

      {/* List */}
      <section>
        {loading ? (
          <div className="flex justify-center py-8"><Loader className="animate-spin text-brand" /></div>
        ) : posts.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">{t.empty}</p>
        ) : (
          <div className="space-y-2">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-3">
                <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">{t.types[p.type]}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-white">{p.title.tr || p.title.en || p.slug}</div>
                  <div className="truncate text-xs text-gray-500">{t.categories[p.category]} · /{p.slug}</div>
                </div>
                <button onClick={() => startEdit(p)} className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"><Pencil size={15} /></button>
                <button onClick={() => onDelete(p.id)} className="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
