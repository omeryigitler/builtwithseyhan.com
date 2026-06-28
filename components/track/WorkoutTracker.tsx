'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  CalendarDays,
  Dumbbell,
  Flame,
  Loader,
  LogOut,
  TrendingUp,
  Trash2,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import {
  deleteSession,
  listSessions,
  onAuthChange,
  saveSession,
  sessionSetCount,
  sessionVolume,
  signInWithEmail,
  signInWithGoogle,
  signOut,
  type SessionInput,
  type WorkoutSession,
} from '@/lib/workouts';
import { ActiveWorkout } from './ActiveWorkout';

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
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => onAuthChange((u) => { setUser(u); setReady(true); }), []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    listSessions()
      .then(setSessions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const reload = async () => {
    setLoading(true);
    try {
      setSessions(await listSessions());
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (s: SessionInput) => {
    try {
      await saveSession(s);
    } catch (e) {
      alert(String(e));
    }
    setActive(false);
    await reload();
  };

  const onDelete = async (id: string) => {
    if (!confirm(t.deleteConfirm)) return;
    await deleteSession(id);
    await reload();
  };

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
      <div className="mx-auto max-w-md rounded-3xl border border-gray-800 bg-gray-900/60 p-8">
        <h3 className="font-display text-2xl uppercase tracking-tight text-white">{t.signInTitle}</h3>
        <p className="mt-2 text-sm text-gray-400">{t.signInSubtitle}</p>
        <button
          onClick={() => signInWithGoogle(nextPath)}
          className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-bold text-gray-900 hover:bg-gray-100"
        >
          {t.google}
        </button>
        <div className="my-4 flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-600">
          <span className="h-px flex-1 bg-gray-800" /> or <span className="h-px flex-1 bg-gray-800" />
        </div>
        {sent ? (
          <p className="rounded-xl bg-brand/15 px-4 py-3 text-sm font-bold text-brand">{t.emailSent}</p>
        ) : (
          <div className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none"
            />
            <button
              onClick={async () => {
                try {
                  await signInWithEmail(email, nextPath);
                  setSent(true);
                } catch (e) {
                  alert(String(e));
                }
              }}
              disabled={!email.trim()}
              className="w-full rounded-xl border border-gray-700 py-3 text-sm font-bold text-gray-200 hover:border-gray-500 disabled:opacity-40"
            >
              {t.emailButton}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (active) {
    return <ActiveWorkout t={t} onFinish={onFinish} onCancel={() => setActive(false)} />;
  }

  const weekCount = sessions.filter((s) => withinThisWeek(s.performedOn)).length;
  const totalVolume = sessions.reduce((a, s) => a + sessionVolume(s), 0);

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

      <button
        onClick={() => setActive(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 font-display text-xl uppercase tracking-wide text-black shadow-[0_8px_30px_rgba(204,255,0,0.35)] transition-colors hover:bg-brand-hover"
      >
        <Flame size={20} /> {t.start}
      </button>

      <div>
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
              <HistoryCard key={s.id} s={s} t={t} locale={locale} onDelete={() => onDelete(s.id)} />
            ))}
          </div>
        )}
      </div>
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
