import React, { useState, useRef } from 'react';
import { X, Plus, Trash2, Upload, Eye, EyeOff } from 'lucide-react';
import type { Language } from '../translations';

const UI: Record<Language, {
  title: string; count: string; addSection: string; beforeLabel: string; afterLabel: string;
  changePhoto: string; namePlaceholder: string; resultPlaceholder: string;
  timePlaceholder: string; quotePlaceholder: string; addBtn: string;
  savedSection: string; clearAll: string; deleteAll: string;
}> = {
  en: {
    title: 'Admin Panel', count: 'saved', addSection: 'Add New Before / After',
    beforeLabel: 'BEFORE', afterLabel: 'AFTER', changePhoto: 'Change',
    namePlaceholder: 'Name (e.g. Emre K.)', resultPlaceholder: 'Result (e.g. -12kg / Muscle Gain)',
    timePlaceholder: 'Duration (e.g. 12 Weeks)', quotePlaceholder: 'Quote (optional)',
    addBtn: 'Add', savedSection: 'Saved Images', clearAll: 'Clear All', deleteAll: 'Delete All',
  },
  tr: {
    title: 'Admin Panel', count: 'görsel kayıtlı', addSection: 'Yeni Before / After Ekle',
    beforeLabel: 'ÖNCE', afterLabel: 'SONRA', changePhoto: 'Değiştir',
    namePlaceholder: 'İsim (ör. Emre K.)', resultPlaceholder: 'Sonuç (ör. -12kg / Kas Kazanımı)',
    timePlaceholder: 'Süre (ör. 12 Hafta)', quotePlaceholder: 'Yorum (opsiyonel)',
    addBtn: 'Ekle', savedSection: 'Kayıtlı Görseller', clearAll: 'Tümünü Sil', deleteAll: 'Tümünü Sil',
  },
};

export interface CustomTestimonial {
  id: string;
  name: string;
  result: string;
  timeframe: string;
  quote: string;
  imageBefore: string;
  imageAfter: string;
}

const STORAGE_KEY = 'ms_coaching_testimonials';

export const loadCustomTestimonials = (): CustomTestimonial[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCustomTestimonials = (items: CustomTestimonial[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testimonials: CustomTestimonial[];
  onChange: (items: CustomTestimonial[]) => void;
  lang: Language;
}

const EMPTY_FORM = { name: '', result: '', timeframe: '', quote: '', imageBefore: '', imageAfter: '' };

export const AdminPanel: React.FC<Props> = ({ isOpen, onClose, testimonials, onChange, lang }) => {
  const u = UI[lang];
  const [form, setForm] = useState(EMPTY_FORM);
  const [previewBefore, setPreviewBefore] = useState('');
  const [previewAfter, setPreviewAfter] = useState('');
  const [showPreviews, setShowPreviews] = useState(true);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (field: 'imageBefore' | 'imageAfter', file: File | undefined) => {
    if (!file) return;
    const b64 = await readFile(file);
    setForm(f => ({ ...f, [field]: b64 }));
    if (field === 'imageBefore') setPreviewBefore(b64);
    else setPreviewAfter(b64);
  };

  const handleAdd = () => {
    if (!form.imageBefore || !form.imageAfter || !form.name) return;
    const next = [...testimonials, { ...form, id: Date.now().toString() }];
    saveCustomTestimonials(next);
    onChange(next);
    setForm(EMPTY_FORM);
    setPreviewBefore('');
    setPreviewAfter('');
  };

  const handleDelete = (id: string) => {
    const next = testimonials.filter(t => t.id !== id);
    saveCustomTestimonials(next);
    onChange(next);
  };

  const handleClearAll = () => {
    saveCustomTestimonials([]);
    onChange([]);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-[2rem] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <div>
            <h2 className="text-white font-black text-xl uppercase tracking-tight">{u.title}</h2>
            <p className="text-gray-500 text-xs mt-0.5">{testimonials.length} {u.count}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Add new pair */}
          <section>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <Plus size={16} className="text-brand" />
              {u.addSection}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-5">
              {/* Before upload */}
              <div
                onClick={() => beforeRef.current?.click()}
                className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-700 hover:border-brand cursor-pointer transition-colors overflow-hidden bg-gray-800 flex flex-col items-center justify-center gap-2 group"
              >
                {previewBefore ? (
                  <img src={previewBefore} alt="Before preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload size={24} className="text-gray-600 group-hover:text-brand transition-colors" />
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{u.beforeLabel}</span>
                  </>
                )}
                {previewBefore && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{u.changePhoto}</span>
                  </div>
                )}
                <input ref={beforeRef} type="file" accept="image/*" className="hidden"
                  onChange={e => handleImageChange('imageBefore', e.target.files?.[0])} />
              </div>

              {/* After upload */}
              <div
                onClick={() => afterRef.current?.click()}
                className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-700 hover:border-brand cursor-pointer transition-colors overflow-hidden bg-gray-800 flex flex-col items-center justify-center gap-2 group"
              >
                {previewAfter ? (
                  <img src={previewAfter} alt="After preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload size={24} className="text-gray-600 group-hover:text-brand transition-colors" />
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{u.afterLabel}</span>
                  </>
                )}
                {previewAfter && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{u.changePhoto}</span>
                  </div>
                )}
                <input ref={afterRef} type="file" accept="image/*" className="hidden"
                  onChange={e => handleImageChange('imageAfter', e.target.files?.[0])} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={u.namePlaceholder}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand"
                />
                <input
                  type="text"
                  placeholder={u.resultPlaceholder}
                  value={form.result}
                  onChange={e => setForm(f => ({ ...f, result: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={u.timePlaceholder}
                  value={form.timeframe}
                  onChange={e => setForm(f => ({ ...f, timeframe: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand"
                />
                <input
                  type="text"
                  placeholder={u.quotePlaceholder}
                  value={form.quote}
                  onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!form.imageBefore || !form.imageAfter || !form.name}
              className="mt-4 w-full py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {u.addBtn}
            </button>
          </section>

          {/* Existing list */}
          {testimonials.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <button onClick={() => setShowPreviews(p => !p)} className="text-gray-500 hover:text-white transition-colors">
                    {showPreviews ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  {u.savedSection}
                </h3>
                <button onClick={handleClearAll} className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-wider transition-colors">
                  {u.clearAll}
                </button>
              </div>

              <div className="space-y-3">
                {testimonials.map((t, i) => (
                  <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800 border border-gray-700">
                    {showPreviews && (
                      <div className="flex gap-2 flex-shrink-0">
                        <img src={t.imageBefore} alt="before" className="w-12 h-16 object-cover rounded-lg" />
                        <img src={t.imageAfter} alt="after" className="w-12 h-16 object-cover rounded-lg" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm truncate">{t.name || `${lang === 'tr' ? 'Görsel' : 'Image'} ${i + 1}`}</div>
                      {t.result && <div className="text-brand text-xs font-bold mt-0.5 truncate">{t.result}</div>}
                      {t.timeframe && <div className="text-gray-500 text-xs mt-0.5">{t.timeframe}</div>}
                    </div>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
