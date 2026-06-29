'use client';

import { useEffect, useState } from 'react';
import { Loader, Pencil, Plus, Trash2 } from 'lucide-react';
import type { Recipe, RecipeCategory } from '@/lib/types';
import { listAllRecipes, saveRecipe, deleteRecipe, type RecipeInput } from '@/lib/admin';
import type { AdminLabels } from './labels';
import { TextField, TextArea, SelectField, Toggle, ImageField } from './fields';

const EMPTY: RecipeInput = {
  slug: '',
  category: 'smoothie',
  title: { tr: '', en: '' },
  description: { tr: '', en: '' },
  ingredients: { tr: '', en: '' },
  steps: { tr: '', en: '' },
  kcal: 0,
  protein: 0,
  timeMin: 0,
  imageUrl: null,
  youtubeUrl: null,
  featured: false,
  published: true,
  sortOrder: 0,
};

const CATS: RecipeCategory[] = ['smoothie', 'highprotein', 'breakfast', 'snack'];

export function RecipesTab({ t }: { t: AdminLabels }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [form, setForm] = useState<RecipeInput>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      setRecipes(await listAllRecipes());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reload();
  }, []);

  const set = <K extends keyof RecipeInput>(k: K, v: RecipeInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (r: Recipe) =>
    setForm({
      id: r.id,
      slug: r.slug,
      category: r.category,
      title: r.title,
      description: r.description,
      ingredients: r.ingredients,
      steps: r.steps,
      kcal: r.kcal,
      protein: r.protein,
      timeMin: r.timeMin,
      imageUrl: r.imageUrl,
      youtubeUrl: r.youtubeUrl,
      featured: r.featured,
      published: true,
      sortOrder: 0,
    });

  const onSave = async () => {
    if (!form.title.tr && !form.title.en) return;
    setSaving(true);
    try {
      await saveRecipe(form);
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
    await deleteRecipe(id);
    await reload();
  };

  const catOpts = CATS.map((v) => ({ value: v, label: t.recipeCategories[v] }));

  return (
    <div className="space-y-8">
      {/* Editor */}
      <section className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
          <Plus size={16} className="text-brand" /> {form.id ? t.edit : t.newRecipe}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            label={t.fields.category}
            value={form.category}
            onChange={(v) => set('category', v as RecipeCategory)}
            options={catOpts}
          />
          <TextField
            label={t.fields.order}
            type="number"
            value={String(form.sortOrder)}
            onChange={(v) => set('sortOrder', Number(v) || 0)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label={t.fields.titleTr} value={form.title.tr} onChange={(v) => setForm((f) => ({ ...f, title: { ...f.title, tr: v } }))} />
          <TextField label={t.fields.titleEn} value={form.title.en} onChange={(v) => setForm((f) => ({ ...f, title: { ...f.title, en: v } }))} />
        </div>

        <TextField label={t.fields.slug} value={form.slug} onChange={(v) => set('slug', v)} placeholder="protein-yulaf-kasesi" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea label={t.fields.descriptionTr} value={form.description.tr} onChange={(v) => setForm((f) => ({ ...f, description: { ...f.description, tr: v } }))} />
          <TextArea label={t.fields.descriptionEn} value={form.description.en} onChange={(v) => setForm((f) => ({ ...f, description: { ...f.description, en: v } }))} />
        </div>

        <p className="-mb-2 text-[11px] text-gray-500">{t.fields.lineHint}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea label={t.fields.ingredientsTr} value={form.ingredients.tr} onChange={(v) => setForm((f) => ({ ...f, ingredients: { ...f.ingredients, tr: v } }))} />
          <TextArea label={t.fields.ingredientsEn} value={form.ingredients.en} onChange={(v) => setForm((f) => ({ ...f, ingredients: { ...f.ingredients, en: v } }))} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextArea label={t.fields.stepsTr} value={form.steps.tr} onChange={(v) => setForm((f) => ({ ...f, steps: { ...f.steps, tr: v } }))} />
          <TextArea label={t.fields.stepsEn} value={form.steps.en} onChange={(v) => setForm((f) => ({ ...f, steps: { ...f.steps, en: v } }))} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField label={t.fields.kcal} type="number" value={String(form.kcal)} onChange={(v) => set('kcal', Number(v) || 0)} />
          <TextField label={t.fields.protein} type="number" value={String(form.protein)} onChange={(v) => set('protein', Number(v) || 0)} />
          <TextField label={t.fields.time} type="number" value={String(form.timeMin)} onChange={(v) => set('timeMin', Number(v) || 0)} />
        </div>

        <ImageField label={t.fields.image} folder="recipes" value={form.imageUrl} onChange={(v) => set('imageUrl', v)} uploadLabel={t.fields.pasteUrl} />

        <TextField label={t.fields.video} value={form.youtubeUrl ?? ''} onChange={(v) => set('youtubeUrl', v)} placeholder="https://youtube.com/watch?v=…" />

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
        ) : recipes.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">{t.empty}</p>
        ) : (
          <div className="space-y-2">
            {recipes.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-3">
                <span className="rounded-md bg-gray-800 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">{t.recipeCategories[r.category]}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-white">{r.title.tr || r.title.en}</div>
                  <div className="truncate text-xs text-gray-500">{r.kcal} kcal · {r.protein}g · {r.timeMin} min</div>
                </div>
                <button onClick={() => startEdit(r)} className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"><Pencil size={15} /></button>
                <button onClick={() => onDelete(r.id)} className="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
