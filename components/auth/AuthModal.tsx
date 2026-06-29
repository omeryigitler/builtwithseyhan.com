'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle, Loader, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { signInWithGoogle, signInWithPassword, signUpWithPassword } from '@/lib/workouts';

const inputCls =
  'w-full rounded-xl border border-gray-700 bg-gray-800/80 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none';

type Mode = 'signin' | 'signup';

export function AuthModal({
  t,
  locale,
  nextPath,
  initialMode = 'signin',
  onClose,
}: {
  t: Dictionary['auth'];
  locale: Locale;
  nextPath?: string;
  initialMode?: Mode;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [confirm, setConfirm] = useState(false);

  const next = nextPath ?? `/${locale}`;
  const toggle = () => {
    setMode((m) => (m === 'signin' ? 'signup' : 'signin'));
    setErr('');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      if (mode === 'signin') {
        await signInWithPassword(email.trim(), password);
        onClose();
      } else {
        const { needsConfirm } = await signUpWithPassword(email.trim(), password, name.trim());
        // Fire the localized welcome email. When confirmation is required there
        // is no session yet, so the no-op here is covered by /auth/callback.
        fetch('/api/account-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale }),
        }).catch(() => {});
        if (needsConfirm) setConfirm(true);
        else onClose();
      }
    } catch (e2: unknown) {
      const msg = e2 instanceof Error ? e2.message : String(e2);
      setErr(/rate limit/i.test(msg) ? t.rateLimitHint : msg);
    } finally {
      setBusy(false);
    }
  };

  const google = () => {
    try {
      signInWithGoogle(next);
    } catch (e2) {
      setErr(String(e2));
    }
  };

  const form = (m: Mode) => (
    <form onSubmit={submit} className="w-full max-w-xs space-y-3">
      <h3 className="mb-2 font-display text-3xl uppercase tracking-tight text-white">
        {m === 'signin' ? t.signInTitle : t.signUpTitle}
      </h3>
      <button
        type="button"
        onClick={google}
        className="w-full rounded-xl bg-white py-3 text-sm font-bold text-gray-900 hover:bg-gray-100"
      >
        {t.google}
      </button>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-600">
        <span className="h-px flex-1 bg-gray-800" /> {t.or} <span className="h-px flex-1 bg-gray-800" />
      </div>
      {m === 'signup' && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className={inputCls}
        />
      )}
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.emailPlaceholder}
        className={inputCls}
      />
      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t.passwordPlaceholder}
        className={inputCls}
      />
      {err && <p className="text-xs text-red-400">{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-black uppercase tracking-widest text-black hover:bg-brand-hover disabled:opacity-40"
      >
        {busy && <Loader size={16} className="animate-spin" />}
        {m === 'signin' ? t.signIn : t.createAccount}
      </button>
    </form>
  );

  const overlay = (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center text-black">
      <span className="font-display text-3xl uppercase leading-none tracking-tight">
        Built With Seyhan
      </span>
      <p className="max-w-xs text-sm font-semibold text-black/75">
        {mode === 'signin' ? t.welcomeBackText : t.joinText}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-widest text-black/60">
        {mode === 'signin' ? t.noAccount : t.haveAccount}
      </p>
      <button
        onClick={toggle}
        className="rounded-full border-2 border-black px-6 py-2.5 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-brand"
      >
        {mode === 'signin' ? t.signUp : t.signIn}
      </button>
    </div>
  );

  const closeBtn = (
    <button
      onClick={onClose}
      aria-label={t.close}
      className="absolute right-4 top-4 z-30 rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20"
    >
      <X size={18} />
    </button>
  );

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[95] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <button type="button" className="absolute inset-0" aria-label={t.close} onClick={onClose} />

      {confirm ? (
        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-gray-950 p-8 text-center">
          {closeBtn}
          <CheckCircle size={36} className="mx-auto mb-4 text-brand" />
          <p className="text-sm font-semibold text-gray-200">{t.confirmEmail}</p>
        </div>
      ) : (
        <>
          {/* Desktop split */}
          <div className="relative z-10 hidden h-[560px] w-full max-w-4xl overflow-hidden rounded-3xl bg-gray-950 shadow-2xl md:flex">
            {closeBtn}
            <div className="flex w-1/2 items-center justify-center p-10">
              {mode === 'signup' ? form('signup') : <div />}
            </div>
            <div className="flex w-1/2 items-center justify-center p-10">
              {mode === 'signin' ? form('signin') : <div />}
            </div>
            <div
              className={`absolute left-0 top-0 h-full w-1/2 bg-gradient-to-br from-brand to-brand-hover transition-transform duration-500 ease-in-out ${
                mode === 'signin' ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {overlay}
            </div>
          </div>

          {/* Mobile */}
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-gray-950 p-7 md:hidden">
            {closeBtn}
            {form(mode)}
            <div className="mt-5 text-center text-xs text-gray-400">
              {mode === 'signin' ? t.noAccount : t.haveAccount}{' '}
              <button onClick={toggle} className="font-bold text-brand">
                {mode === 'signin' ? t.signUp : t.signIn}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
