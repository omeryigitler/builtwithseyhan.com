'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { EXERCISES, MUSCLE_ORDER } from '@/lib/exercises';
import type { Dictionary } from '@/i18n/dictionaries';

export function ExercisePicker({
  t,
  onPick,
  onClose,
}: {
  t: Dictionary['track'];
  onPick: (name: string, muscle: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState('');
  const [custom, setCustom] = useState('');

  const groups = useMemo(() => {
    const query = q.trim().toLowerCase();
    return MUSCLE_ORDER.map((m) => ({
      muscle: m,
      items: EXERCISES.filter((e) => e.muscle === m && e.name.toLowerCase().includes(query)),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[90] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <button type="button" className="absolute inset-0" aria-label={t.cancel} onClick={onClose} />
      <div className="relative z-10 flex h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-gray-950 sm:h-[80vh] sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="font-display text-xl uppercase tracking-tight text-white">{t.pickerTitle}</h3>
          <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 focus-within:border-brand">
            <Search size={16} className="shrink-0 text-gray-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.search}
              className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto p-4">
          {groups.map((g) => (
            <div key={g.muscle} className="mb-5">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-brand">
                {t.muscles[g.muscle]}
              </div>
              <div className="space-y-1">
                {g.items.map((e) => (
                  <button
                    key={e.name}
                    onClick={() => onPick(e.name, e.muscle)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-gray-200 transition-colors hover:bg-white/5"
                  >
                    {e.name}
                    <Plus size={15} className="text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder={t.customPlaceholder}
              className="w-full rounded-full border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none"
            />
            <button
              disabled={!custom.trim()}
              onClick={() => {
                onPick(custom.trim(), '');
                setCustom('');
              }}
              className="shrink-0 rounded-full bg-brand px-5 text-sm font-black uppercase text-black disabled:opacity-40"
            >
              {t.add}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
