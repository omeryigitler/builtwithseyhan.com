'use client';

import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { sessionVolume, type WorkoutSession } from '@/lib/workouts';

export function ProgressPanel({
  sessions,
  t,
  locale,
}: {
  sessions: WorkoutSession[];
  t: Dictionary['track'];
  locale: Locale;
}) {
  // Last 10 workouts, oldest → newest for the chart.
  const recent = [...sessions].slice(0, 10).reverse();
  const maxVol = Math.max(1, ...recent.map(sessionVolume));

  // Personal records: heaviest set per exercise.
  const prs: Record<string, { weight: number; reps: number }> = {};
  for (const s of sessions) {
    for (const ex of s.exercises) {
      for (const set of ex.sets) {
        const cur = prs[ex.name];
        if (set.weight > 0 && (!cur || set.weight > cur.weight)) {
          prs[ex.name] = { weight: set.weight, reps: set.reps };
        }
      }
    }
  }
  const prList = Object.entries(prs)
    .sort((a, b) => b[1].weight - a[1].weight)
    .slice(0, 6);

  const dayFmt = (d: string) =>
    new Date(`${d}T00:00:00`).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      day: 'numeric',
      month: 'numeric',
    });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
        <h3 className="font-display text-xl uppercase tracking-tight text-white">{t.progressTitle}</h3>
        <p className="mb-4 mt-1 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          {t.volumePerWorkout}
        </p>
        <div className="flex h-32 items-end gap-1.5">
          {recent.map((s) => {
            const v = sessionVolume(s);
            const h = Math.max(4, Math.round((v / maxVol) * 100));
            return (
              <div key={s.id} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-brand/40 to-brand"
                    style={{ height: `${h}%` }}
                    title={`${v.toLocaleString()} kg`}
                  />
                </div>
                <span className="text-[9px] text-gray-500">{dayFmt(s.performedOn)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {prList.length > 0 && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5">
          <h3 className="mb-4 font-display text-xl uppercase tracking-tight text-white">
            {t.recordsTitle}
          </h3>
          <div className="space-y-1.5">
            {prList.map(([name, v]) => (
              <div
                key={name}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-800 px-3 py-2 text-sm"
              >
                <span className="truncate text-gray-200">{name}</span>
                <span className="shrink-0 font-bold text-brand">
                  {v.weight} kg × {v.reps}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
