'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries';
import type { ProgramExercise, ProgramInput, WorkoutProgram } from '@/lib/workouts';
import { ExercisePicker } from './ExercisePicker';

export function ProgramBuilder({
  t,
  initial,
  onSave,
  onCancel,
}: {
  t: Dictionary['track'];
  initial?: WorkoutProgram | null;
  onSave: (input: ProgramInput) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [exercises, setExercises] = useState<ProgramExercise[]>(initial?.exercises ?? []);
  const [picker, setPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const add = (name: string, muscle: string) => {
    setExercises((e) => [...e, { name, muscle, sets: 3, reps: 10, restSec: 90 }]);
    setPicker(false);
  };
  const remove = (i: number) => setExercises((e) => e.filter((_, k) => k !== i));
  const setNum = (i: number, key: 'sets' | 'reps' | 'restSec', v: string) =>
    setExercises((e) => e.map((x, k) => (k === i ? { ...x, [key]: Math.max(0, Number(v) || 0) } : x)));

  const canSave = title.trim().length > 0 && exercises.length > 0;
  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      await onSave({ id: initial?.id, title: title.trim(), exercises });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white">
          {initial ? t.editProgram : t.newProgram}
        </h2>
        <button
          onClick={onCancel}
          className="rounded-full border border-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:border-gray-500"
        >
          {t.cancel}
        </button>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t.programNamePlaceholder}
        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 font-display text-xl uppercase tracking-tight text-white placeholder:text-gray-600 focus:border-brand focus:outline-none"
      />

      {exercises.map((e, i) => (
        <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <div className="font-bold text-white">{e.name}</div>
              {e.muscle && (
                <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  {t.muscles[e.muscle as keyof typeof t.muscles] ?? ''}
                </div>
              )}
            </div>
            <button
              onClick={() => remove(i)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={15} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <NumField label={t.targetSets} value={e.sets} onChange={(v) => setNum(i, 'sets', v)} />
            <NumField label={t.targetReps} value={e.reps} onChange={(v) => setNum(i, 'reps', v)} />
            <NumField
              label={`${t.restLabel} (${t.sec})`}
              value={e.restSec}
              onChange={(v) => setNum(i, 'restSec', v)}
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => setPicker(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-700 py-4 text-sm font-bold uppercase tracking-wider text-gray-300 hover:border-brand hover:text-brand"
      >
        <Plus size={18} /> {t.addExercise}
      </button>

      <button
        onClick={save}
        disabled={!canSave || saving}
        className="w-full rounded-2xl bg-brand py-4 font-display text-xl uppercase tracking-wide text-black transition-colors hover:bg-brand-hover disabled:opacity-40"
      >
        {t.saveProgram}
      </button>

      {picker && <ExercisePicker t={t} onPick={add} onClose={() => setPicker(false)} />}
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <input
        inputMode="numeric"
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-center text-sm text-white focus:border-brand focus:outline-none"
      />
    </label>
  );
}
