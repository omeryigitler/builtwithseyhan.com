'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  CalendarDays,
  Dumbbell,
  Flame,
  Loader,
  LogOut,
  Pencil,
  Plus,
  TrendingUp,
  Trash2,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import {
  deleteProgram,
  deleteSession,
  listPrograms,
  listSessions,
  onAuthChange,
  saveProgram,
  saveSession,
  sessionSetCount,
  sessionVolume,
  signOut,
  type ProgramInput,
  type SessionInput,
  type WorkoutProgram,
  type WorkoutSession,
} from '@/lib/workouts';
import { AuthModal } from '@/components/auth/AuthModal';
import { ActiveWorkout } from './ActiveWorkout';
import { ProgramBuilder } from './ProgramBuilder';

type Mode = 'home' | 'active' | 'program';

function withinThisWeek(d: string): boolean {
  const dt = new Date(`${d}T00:00:00`).getTime();
  const diff = (Date.now() - dt) / 86_400_000;
  return diff >= 0 && diff < 7;
}

export function WorkoutTracker({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.track;
  const nextPath = `/${locale}/track`;

  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('home');
  const [activeProgram, setActiveProgram] = useState<WorkoutProgram | null>(null);
  const [editing, setEditing] = useState<WorkoutProgram | null>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => onAuthChange((u) => { setUser(u); setReady(true); }), []);

  const reload = async () => {
    setLoading(true);
    try {
      const [s, p] = await Promise.all([listSessions(), listPrograms()]);
      setSessions(s);
      setPrograms(p);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) reload();
  }, [user]);

  const onFinish = async (s: SessionInput) => {
    try {
      await saveSession(s);
    } catch (e) {
      alert(String(e));
    }
    setActiveProgram(null);
    setMode('home');
    await reload();
  };

  const onSaveProgram = async (input: ProgramInput) => {
    try {
      await saveProgram(input);
    } catch (e) {
      alert(String(e));
      return;
    }
    setEditing(null);
    setMode('home');
    await reload();
  };

  const removeProgram = async (id: string) => {
    if (!confirm(t.deleteConfirm)) return;
    await deleteProgram(id);
    await reload();
  };
  const removeSession = async (id: string) => {
    if (!confirm(t.deleteConfirm)) return;
    await deleteSession(id);
    await reload();
  };

  // ── Gates ──
  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-center text-sm text-gray-400">
        {t.signInSubtitle}
      </div>
    );
  }
  if (!ready) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin text-brand" />
      </div>
    );
  }
  if (!user) {
    return (
      <>
        <div className="mx-auto max-w-md rounded-3xl border border-gray-800 bg-gray-900/60 p-8 text-center">
          <h3 className="font-display text-2xl uppercase tracking-tight text-white">{t.signInTitle}</h3>
          <p className="mt-2 text-sm text-gray-400">{t.signInSubtitle}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => setAuthMode('signin')}
              className="rounded-xl bg-brand px-6 py-3 text-sm font-black uppercase tracking-widest text-black hover:bg-brand-hover"
            >
              {dict.auth.signIn}
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-200 hover:border-gray-500"
            >
              {dict.auth.createAccount}
            </button>
          </div>
        </div>
        {authMode && (
          <AuthModal
            t={dict.auth}
            locale={locale}
            nextPath={nextPath}
            initialMode={authMode}
            onClose={() => setAuthMode(null)}
          />
        )}
      </>
    );
  }

  // ── Active workout ──
  if (mode === 'active') {
    return (
      <ActiveWorkout
        t={t}
        program={activeProgram}
        onFinish={onFinish}
        onCancel={() => {
          setActiveProgram(null);
          setMode('home');
        }}
      />
    );
  }

  // ── Program builder ──
  if (mode === 'program') {
    return (
      <ProgramBuilder
        t={t}
        initial={editing}
        onSave={onSaveProgram}
        onCancel={() => {
          setEditing(null);
          setMode('home');
        }}
      />
    );
  }

  // ── Home ──
  const weekCount = sessions.filter((s) => withinThisWeek(s.performedOn)).length;
  const totalVolume = sessions.reduce((a, s) => a + sessionVolume(s), 0);

  const startProgram = (p: WorkoutProgram | null) => {
    setActiveProgram(p);
    setMode('active');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="truncate text-sm text-gray-500">{user.email}</div>
        <button
          onClick={() => signOut()}
          className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
        >
          <LogOut size={14} /> {t.signOut}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Dumbbell size={16} />} label={t.statWorkouts} value={String(sessions.length)} />
        <Stat icon={<CalendarDays size={16} />} label={t.statWeek} value={String(weekCount)} />
        <Stat icon={<TrendingUp size={16} />} label={t.statVolume} value={totalVolume.toLocaleString()} />
      </div>

      {/* PART 1 — Programs */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-2xl uppercase tracking-tight text-white">{t.programsTitle}</h3>
          <button
            onClick={() => {
              setEditing(null);
              setMode('program');
            }}
            className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-brand-hover"
          >
            <Plus size={14} /> {t.createProgram}
          </button>
        </div>

        {programs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-800 px-4 py-8 text-center text-sm text-gray-500">
            {t.noPrograms}
          </p>
        ) : (
          <div className="space-y-3">
            {programs.map((p) => (
              <div key={p.id} className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="truncate font-display text-lg uppercase tracking-tight text-white">
                        {p.title}
                      </div>
                      {p.coachAssigned && (
                        <span className="shrink-0 rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                          {t.coachProgram}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.exercises.length} {t.exercisesLabel}
                    </div>
                  </div>
                  {!p.coachAssigned && (
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setMode('program');
                        }}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => removeProgram(p.id)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
                {p.exercises.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400">
                    {p.exercises.slice(0, 5).map((e, i) => (
                      <span key={i}>{e.name}</span>
                    ))}
                    {p.exercises.length > 5 && <span className="text-gray-600">+{p.exercises.length - 5}</span>}
                  </div>
                )}
                <button
                  onClick={() => startProgram(p)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-sm font-black uppercase tracking-wider text-black hover:bg-brand-hover"
                >
                  <Flame size={16} /> {t.startProgram}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => startProgram(null)}
          className="mt-3 w-full rounded-xl border border-gray-800 py-3 text-sm font-bold uppercase tracking-wider text-gray-400 hover:border-gray-600 hover:text-gray-200"
        >
          {t.emptyWorkout}
        </button>
      </section>

      {/* PART 2 — History */}
      <section>
        <h3 className="mb-4 font-display text-2xl uppercase tracking-tight text-white">{t.historyTitle}</h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="animate-spin text-brand" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">{t.empty}</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <HistoryCard key={s.id} s={s} t={t} locale={locale} onDelete={() => removeSession(s.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4 text-center">
      <div className="mb-1 flex justify-center text-brand">{icon}</div>
      <div className="font-display text-2xl text-white">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</div>
    </div>
  );
}

function HistoryCard({
  s,
  t,
  locale,
  onDelete,
}: {
  s: WorkoutSession;
  t: Dictionary['track'];
  locale: Locale;
  onDelete: () => void;
}) {
  const date = new Date(`${s.performedOn}T00:00:00`).toLocaleDateString(
    locale === 'tr' ? 'tr-TR' : 'en-US',
    { day: 'numeric', month: 'short', year: 'numeric' }
  );
  const vol = sessionVolume(s);
  const sets = sessionSetCount(s);
  const dur = s.durationSec ? `${Math.round(s.durationSec / 60)} min` : '';

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="truncate font-display text-lg uppercase tracking-tight text-white">
            {s.title || date}
          </div>
          <div className="text-xs text-gray-500">
            {date}
            {dur ? ` · ${dur}` : ''}
          </div>
        </div>
        <button
          onClick={onDelete}
          className="shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {s.exercises.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {s.exercises.map((ex, i) => (
            <span key={i} className="text-gray-300">
              {ex.name} <span className="text-gray-500">×{ex.sets.length}</span>
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-4 border-t border-white/5 pt-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
        <span>{vol.toLocaleString()} kg</span>
        <span>
          {sets} {t.setsLabel}
        </span>
      </div>
    </div>
  );
}
