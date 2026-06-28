'use client';

import { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { UnderlineTabs } from '@/components/ui/UnderlineTabs';
import type { Dictionary } from '@/i18n/dictionaries';

type MuscleKey = keyof Dictionary['training']['muscles'];
const ORDER: MuscleKey[] = ['shoulders', 'chest', 'arms', 'core', 'legs'];

export function MuscleMap({ t }: { t: Dictionary['training'] }) {
  const [active, setActive] = useState<MuscleKey>('chest');
  const [hover, setHover] = useState<MuscleKey | null>(null);

  const fill = (g: MuscleKey) =>
    active === g ? '#CCFF00' : hover === g ? 'rgba(204,255,0,0.5)' : 'currentColor';

  const groupProps = (g: MuscleKey) => ({
    onClick: () => setActive(g),
    onMouseEnter: () => setHover(g),
    onMouseLeave: () => setHover((h) => (h === g ? null : h)),
    style: { cursor: 'pointer', fill: fill(g), transition: 'fill 0.25s ease' },
    role: 'button' as const,
    'aria-label': t.muscles[g].name,
  });

  const sel = t.muscles[active];
  const tabs = ORDER.map((k) => ({ value: k, label: t.muscles[k].name }));

  return (
    <div>
      <UnderlineTabs tabs={tabs} value={active} onChange={setActive} className="mb-10" />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Interactive figure */}
        <div className="relative flex justify-center">
          <div className="pointer-events-none absolute inset-0 -z-10 m-auto h-72 w-72 rounded-full bg-brand/15 blur-[110px]" />
          <svg
            viewBox="0 0 240 470"
            className="h-[440px] max-h-[68vh] w-auto text-gray-200 dark:text-gray-800"
            role="img"
            aria-label={t.title}
          >
            {/* structural (non-interactive) */}
            <g fill="currentColor">
              <circle cx="120" cy="36" r="22" />
              <rect x="111" y="55" width="18" height="15" rx="5" />
              <rect x="100" y="205" width="40" height="26" rx="10" />
              <circle cx="47" cy="233" r="8" />
              <circle cx="193" cy="233" r="8" />
              <ellipse cx="104" cy="450" rx="13" ry="8" />
              <ellipse cx="136" cy="450" rx="13" ry="8" />
            </g>

            {/* shoulders */}
            <g {...groupProps('shoulders')}>
              <ellipse cx="80" cy="90" rx="22" ry="16" />
              <ellipse cx="160" cy="90" rx="22" ry="16" />
            </g>

            {/* chest */}
            <g {...groupProps('chest')}>
              <ellipse cx="102" cy="116" rx="20" ry="15" />
              <ellipse cx="138" cy="116" rx="20" ry="15" />
            </g>

            {/* arms */}
            <g {...groupProps('arms')}>
              <ellipse cx="60" cy="138" rx="13" ry="34" />
              <ellipse cx="180" cy="138" rx="13" ry="34" />
              <ellipse cx="50" cy="196" rx="11" ry="32" />
              <ellipse cx="190" cy="196" rx="11" ry="32" />
            </g>

            {/* core */}
            <g {...groupProps('core')}>
              <rect x="102" y="135" width="36" height="66" rx="12" />
            </g>

            {/* legs */}
            <g {...groupProps('legs')}>
              <ellipse cx="106" cy="290" rx="18" ry="58" />
              <ellipse cx="134" cy="290" rx="18" ry="58" />
              <ellipse cx="104" cy="394" rx="14" ry="44" />
              <ellipse cx="136" cy="394" rx="14" ry="44" />
            </g>
          </svg>
        </div>

        {/* Info panel */}
        <div className="rounded-3xl border border-gray-200 bg-white p-7 dark:border-white/10 dark:bg-gray-900 sm:p-9">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            <span className="h-px w-6 bg-brand" /> {t.eyebrow}
          </div>
          <h3 className="font-display text-4xl uppercase leading-[0.95] text-gray-900 dark:text-white sm:text-5xl">
            {sel.name}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
            {sel.desc}
          </p>

          <div className="mt-7">
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              {t.exercisesLabel}
            </div>
            <ul>
              {sel.exercises.map((ex) => (
                <li
                  key={ex}
                  className="flex items-center gap-3 border-b border-gray-100 py-2.5 text-sm font-semibold text-gray-900 last:border-0 dark:border-white/5 dark:text-white"
                >
                  <Dumbbell size={16} className="text-gray-400" /> {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
