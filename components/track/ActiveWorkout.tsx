'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Plus, Timer, Trash2 } from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries';
import type { SessionInput, WorkoutExercise, WorkoutProgram } from '@/lib/workouts';
import { ExercisePicker } from './ExercisePicker';

interface ActiveSet {
  weight: string;
  reps: string;
  done: boolean;
}
interface ActiveExercise {
  name: string;
  muscle: string;
  restSec: number;
  sets: ActiveSet[];
}

const REST_DEFAULT = 90; // seconds

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

function initFromProgram(p?: WorkoutProgram | null): { title: string; exercises: ActiveExercise[] } {
  if (!p) return { title: '', exercises: [] };
  return {
    title: p.title,
    exercises: p.exercises.map((pe) => ({
      name: pe.name,
      muscle: pe.muscle,
      restSec: pe.restSec || REST_DEFAULT,
      sets: Array.from({ length: Math.max(1, pe.sets || 1) }, () => ({
        weight: '',
        reps: pe.reps ? String(pe.reps) : '',
        done: false,
      })),
    })),
  };
}

export function ActiveWorkout({
  t,
  program,
  onFinish,
  onCancel,
}: {
  t: Dictionary['track'];
  program?: WorkoutProgram | null;
  onFinish: (s: SessionInput) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(() => initFromProgram(program).title);
  const [exercises, setExercises] = useState<ActiveExercise[]>(
    () => initFromProgram(program).exercises
  );
  const [picker, setPicker] = useState(false);
  const startedAt = useRef(Date.now());
  const [now, setNow] = useState(Date.now());
  const [restEndsAt, setRestEndsAt] = useState<number | null>(null);

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const elapsed = Math.floor((now - startedAt.current) / 1000);
  const restLeft = restEndsAt ? Math.max(0, Math.round((restEndsAt - now) / 1000)) : 0;
  useEffect(() => {
    if (restEndsAt && restEndsAt - now <= 0) setRestEndsAt(null);
  }, [restEndsAt, now]);

  const addExercise = (name: string, muscle: string) => {
    setExercises((ex) => [
      ...ex,
      { name, muscle, restSec: REST_DEFAULT, sets: [{ weight: '', reps: '', done: false }] },
    ]);
    setPicker(false);
  };
  const removeExercise = (i: number) => setExercises((ex) => ex.filter((_, k) => k !== i));
  const addSet = (i: number) =>
    setExercises((ex) =>
      ex.map((e, k) =>
        k === i
          ? { ...e, sets: [...e.sets, { weight: e.sets.at(-1)?.weight ?? '', reps: '', done: false }] }
          : e
      )
    );
  const setVal = (i: number, j: number, key: 'weight' | 'reps', v: string) =>
    setExercises((ex) =>
      ex.map((e, k) =>
        k === i ? { ...e, sets: e.sets.map((s, m) => (m === j ? { ...s, [key]: v } : s)) } : e
      )
    );
  const onToggle = (i: number, j: number) => {
    const wasDone = exercises[i].sets[j].done;
    setExercises((ex) =>
      ex.map((e, k) =>
        k === i ? { ...e, sets: e.sets.map((s, m) => (m === j ? { ...s, done: !s.done } : s)) } : e
      )
    );
    if (!wasDone) setRestEndsAt(Date.now() + (exercises[i].restSec || REST_DEFAULT) * 1000);
  };

  const finish = () => {
    const clean: WorkoutExercise[] = exercises
      .map((e) => ({
        name: e.name,
        muscle: e.muscle,
        sets: e.sets
          .map((s) => ({ weight: Number(s.weight) || 0, reps: Number(s.reps) || 0 }))
          .filter((s) => s.weight > 0 || s.reps > 0),
      }))
      .filter((e) => e.sets.length > 0);
    onFinish({
      performedOn: new Date().toISOString().slice(0, 10),
      title: title.trim(),
      notes: '',
      durationSec: elapsed,
      exercises: clean,
    });
  };

  const cancel = () => {
    if (exercises.length === 0 || confirm(t.discardConfirm)) onCancel();
  };

  return (
    <div className="space-y-5">
      {/* Sticky control bar */}
      <div className="sticky top-16 z-20 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gray-900/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 font-display text-2xl text-white">
          <Timer size={18} className="text-brand" /> {fmt(elapsed)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={cancel}
            className="rounded-full border border-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:border-gray-500"
          >
            {t.cancel}
          </button>
          <button
            onClick={finish}
            className="rounded-full bg-brand px-5 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-brand-hover"
          >
            {t.finish}
          </button>
        </div>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t.titlePlaceholder}
        className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 font-display text-xl uppercase tracking-tight text-white placeholder:text-gray-600 focus:border-brand focus:outline-none"
      />

      {exercises.map((e, i) => (
        <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <div className="font-bold text-white">{e.name}</div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {e.muscle && <span>{t.muscles[e.muscle as keyof typeof t.muscles] ?? ''}</span>}
                <span className="flex items-center gap-1 text-gray-600">
                  <Timer size={11} /> {t.restLabel} {e.restSec}
                  {t.sec}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeExercise(i)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-[1.75rem_1fr_1fr_2.25rem] gap-2 px-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <span className="text-center">#</span>
            <span className="text-center">KG</span>
            <span className="text-center">REPS</span>
            <span />
          </div>

          <div className="space-y-1.5">
            {e.sets.map((s, j) => (
              <div
                key={j}
                className={`grid grid-cols-[1.75rem_1fr_1fr_2.25rem] items-center gap-2 rounded-lg px-1 py-1 transition-colors ${
                  s.done ? 'bg-brand/10' : ''
                }`}
              >
                <span className="text-center text-sm font-bold text-gray-400">{j + 1}</span>
                <input
                  inputMode="decimal"
                  value={s.weight}
                  placeholder={t.weightPlaceholder}
                  onChange={(ev) => setVal(i, j, 'weight', ev.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-center text-sm text-white placeholder:text-gray-600 focus:border-brand focus:outline-none"
                />
                <input
                  inputMode="numeric"
                  value={s.reps}
                  placeholder={t.repsPlaceholder}
                  onChange={(ev) => setVal(i, j, 'reps', ev.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-2 py-1.5 text-center text-sm text-white placeholder:text-gray-600 focus:border-brand focus:outline-none"
                />
                <button
                  onClick={() => onToggle(i, j)}
                  className={`flex h-7 w-7 items-center justify-center justify-self-center rounded-md transition-colors ${
                    s.done ? 'bg-brand text-black' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <Check size={15} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => addSet(i)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-700 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:border-brand hover:text-brand"
          >
            <Plus size={14} /> {t.addSet}
          </button>
        </div>
      ))}

      <button
        onClick={() => setPicker(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-700 py-4 text-sm font-bold uppercase tracking-wider text-gray-300 hover:border-brand hover:text-brand"
      >
        <Plus size={18} /> {t.addExercise}
      </button>

      {picker && <ExercisePicker t={t} onPick={addExercise} onClose={() => setPicker(false)} />}

      {/* Rest timer */}
      {restEndsAt && (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-gray-900 px-4 py-3">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Timer size={16} className="text-brand" /> {t.restLabel}
              <span className="font-display text-2xl">{fmt(restLeft)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRestEndsAt((r) => (r ?? Date.now()) + 15000)}
                className="rounded-full border border-gray-700 px-3 py-1.5 text-xs font-bold text-gray-300 hover:border-gray-500"
              >
                +15s
              </button>
              <button
                onClick={() => setRestEndsAt(null)}
                className="rounded-full bg-brand px-4 py-1.5 text-xs font-black uppercase text-black"
              >
                {t.skip}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
