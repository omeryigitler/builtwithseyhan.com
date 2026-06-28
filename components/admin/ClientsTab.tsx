'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Loader, Pencil, Plus, Trash2, User } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import type { ProgramInput, WorkoutProgram } from '@/lib/workouts';
import {
  deleteProgramAdmin,
  listProfiles,
  listProgramsForUser,
  saveCoachProgram,
  type Profile,
} from '@/lib/admin';
import { ProgramBuilder } from '@/components/track/ProgramBuilder';
import type { AdminLabels } from './labels';

export function ClientsTab({ t, locale }: { t: AdminLabels; locale: Locale }) {
  const trackT = getDictionary(locale).track;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [editing, setEditing] = useState<WorkoutProgram | 'new' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProfiles()
      .then(setProfiles)
      .finally(() => setLoading(false));
  }, []);

  const openClient = async (p: Profile) => {
    setSelected(p);
    setEditing(null);
    setPrograms(await listProgramsForUser(p.id));
  };
  const reloadPrograms = async () => {
    if (selected) setPrograms(await listProgramsForUser(selected.id));
  };
  const onSave = async (input: ProgramInput) => {
    if (!selected) return;
    await saveCoachProgram(selected.id, input);
    setEditing(null);
    await reloadPrograms();
  };
  const del = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    await deleteProgramAdmin(id);
    await reloadPrograms();
  };

  // Program editor
  if (selected && editing) {
    return (
      <ProgramBuilder
        t={trackT}
        initial={editing === 'new' ? null : editing}
        onSave={onSave}
        onCancel={() => setEditing(null)}
      />
    );
  }

  // Selected client's programs
  if (selected) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
        >
          <ArrowLeft size={14} /> {t.back}
        </button>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-display text-xl uppercase tracking-tight text-white">
              {selected.fullName || selected.email}
            </div>
            <div className="truncate text-xs text-gray-500">{selected.email}</div>
          </div>
          <button
            onClick={() => setEditing('new')}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-brand-hover"
          >
            <Plus size={14} /> {trackT.createProgram}
          </button>
        </div>

        {programs.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">{t.empty}</p>
        ) : (
          <div className="space-y-2">
            {programs.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 truncate text-sm font-bold text-white">
                    {p.title}
                    {p.coachAssigned && (
                      <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand">
                        coach
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.exercises.length} {trackT.exercisesLabel}
                  </div>
                </div>
                <button
                  onClick={() => setEditing(p)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => del(p.id)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Client list
  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Loader className="animate-spin text-brand" />
      </div>
    );
  if (profiles.length === 0)
    return <p className="py-6 text-center text-sm text-gray-500">{t.empty}</p>;

  return (
    <div className="space-y-2">
      {profiles.map((p) => (
        <button
          key={p.id}
          onClick={() => openClient(p)}
          className="flex w-full items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-3 text-left hover:border-gray-700"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-400">
            <User size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-white">
              {p.fullName || p.email || '—'}
            </div>
            <div className="truncate text-xs text-gray-500">{p.email}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
