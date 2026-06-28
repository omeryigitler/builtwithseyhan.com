import { createBrowserSupabase } from './supabase/client';
import type { User } from '@supabase/supabase-js';

function db() {
  const s = createBrowserSupabase();
  if (!s) throw new Error('Supabase is not configured.');
  return s;
}

// ─── Auth (any visitor) ──────────────────────────────────────────────────────

export async function signInWithGoogle(nextPath: string) {
  const s = db();
  await s.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
    },
  });
}

export async function signInWithEmail(email: string, nextPath: string) {
  const s = db();
  const { error } = await s.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
    },
  });
  if (error) throw error;
}

export async function signInWithPassword(email: string, password: string) {
  const s = db();
  const { error } = await s.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

/** Returns { needsConfirm } — true when Supabase requires email confirmation. */
export async function signUpWithPassword(email: string, password: string, name: string) {
  const s = db();
  const { data, error } = await s.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) throw error;
  return { needsConfirm: !data.session };
}

export async function signOut() {
  const s = createBrowserSupabase();
  if (s) await s.auth.signOut();
}

export function onAuthChange(cb: (user: User | null) => void): () => void {
  const s = createBrowserSupabase();
  if (!s) {
    cb(null);
    return () => {};
  }
  s.auth.getUser().then(({ data }) => cb(data.user ?? null));
  const {
    data: { subscription },
  } = s.auth.onAuthStateChange((_e, session) => cb(session?.user ?? null));
  return () => subscription.unsubscribe();
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WorkoutSet {
  weight: number;
  reps: number;
}

export interface WorkoutExercise {
  name: string;
  muscle: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  performedOn: string; // YYYY-MM-DD
  title: string;
  notes: string;
  durationSec: number;
  exercises: WorkoutExercise[];
  createdAt: string;
}

export interface SessionInput {
  id?: string;
  performedOn: string;
  title: string;
  notes: string;
  durationSec: number;
  exercises: WorkoutExercise[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(r: any): WorkoutSession {
  return {
    id: String(r.id),
    performedOn: r.performed_on,
    title: r.title ?? '',
    notes: r.notes ?? '',
    durationSec: Number(r.duration_sec ?? 0),
    exercises: Array.isArray(r.exercises) ? r.exercises : [],
    createdAt: r.created_at ?? '',
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ─── CRUD ────────────────────────────────────────────────────────────────────

export async function listSessions(): Promise<WorkoutSession[]> {
  const s = db();
  const { data, error } = await s
    .from('workout_sessions')
    .select('*')
    .order('performed_on', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export async function saveSession(input: SessionInput): Promise<void> {
  const s = db();
  const { data: auth } = await s.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Not signed in.');

  const row = {
    user_id: uid,
    performed_on: input.performedOn,
    title: input.title,
    notes: input.notes,
    duration_sec: input.durationSec,
    exercises: input.exercises,
  };
  const { error } = input.id
    ? await s.from('workout_sessions').update(row).eq('id', input.id)
    : await s.from('workout_sessions').insert(row);
  if (error) throw error;
}

export async function deleteSession(id: string): Promise<void> {
  const s = db();
  const { error } = await s.from('workout_sessions').delete().eq('id', id);
  if (error) throw error;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function sessionVolume(s: WorkoutSession | SessionInput): number {
  return s.exercises.reduce(
    (tot, ex) => tot + ex.sets.reduce((t, set) => t + (set.weight || 0) * (set.reps || 0), 0),
    0
  );
}

export function sessionSetCount(s: WorkoutSession | SessionInput): number {
  return s.exercises.reduce((tot, ex) => tot + ex.sets.length, 0);
}

// ─── Programs (reusable routines: target sets / reps / rest per exercise) ──────

export interface ProgramExercise {
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  restSec: number;
}

export interface WorkoutProgram {
  id: string;
  title: string;
  exercises: ProgramExercise[];
  createdAt: string;
}

export interface ProgramInput {
  id?: string;
  title: string;
  exercises: ProgramExercise[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromProgramRow(r: any): WorkoutProgram {
  return {
    id: String(r.id),
    title: r.title ?? '',
    exercises: Array.isArray(r.exercises) ? r.exercises : [],
    createdAt: r.created_at ?? '',
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function listPrograms(): Promise<WorkoutProgram[]> {
  const s = db();
  const { data, error } = await s
    .from('workout_programs')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(fromProgramRow);
}

export async function saveProgram(input: ProgramInput): Promise<void> {
  const s = db();
  const { data: auth } = await s.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error('Not signed in.');
  const row = { user_id: uid, title: input.title, exercises: input.exercises };
  const { error } = input.id
    ? await s.from('workout_programs').update(row).eq('id', input.id)
    : await s.from('workout_programs').insert(row);
  if (error) throw error;
}

export async function deleteProgram(id: string): Promise<void> {
  const s = db();
  const { error } = await s.from('workout_programs').delete().eq('id', id);
  if (error) throw error;
}
