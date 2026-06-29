'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle, Loader, AlertCircle } from 'lucide-react';

export type LeadField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const base =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:bg-gray-900 dark:text-white';
const ok = 'border-gray-300 focus:border-brand dark:border-gray-700';
const bad = 'border-red-400 focus:border-red-500 dark:border-red-500/70';

export function LeadForm({
  endpoint,
  fields,
  locale,
  submitLabel,
  successText,
  errorText,
  messages,
}: {
  endpoint: string;
  fields: LeadField[];
  locale: string;
  submitLabel: string;
  successText: string;
  errorText: string;
  messages: { required: string; invalidEmail: string };
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((f) => [f.name, f.type === 'select' ? (f.options?.[0]?.value ?? '') : '']),
    ),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const set = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }));
    setErrors((e) => (e[name] ? { ...e, [name]: '' } : e));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? '').trim();
      if (f.required && !v) next[f.name] = messages.required;
      else if (f.type === 'email' && v && !EMAIL_RE.test(v)) next[f.name] = messages.invalidEmail;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-brand/15 px-5 py-5 text-sm font-bold text-gray-900 dark:text-brand">
        <CheckCircle size={20} className="text-brand" /> {successText}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {fields.map((f) => {
        const err = errors[f.name];
        const cls = `${base} ${err ? bad : ok}`;
        return (
          <label key={f.name} className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
              {f.label}
            </span>
            {f.type === 'textarea' ? (
              <textarea
                rows={4}
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                aria-invalid={!!err}
                className={cls}
              />
            ) : f.type === 'select' ? (
              <select
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                className={`${base} ${ok}`}
              >
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type ?? 'text'}
                value={values[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                aria-invalid={!!err}
                className={cls}
              />
            )}
            {err && (
              <span className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                <AlertCircle size={13} /> {err}
              </span>
            )}
          </label>
        );
      })}

      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
          <AlertCircle size={15} /> {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-black uppercase tracking-widest text-black transition hover:bg-brand-hover disabled:opacity-50"
      >
        {status === 'loading' && <Loader size={16} className="animate-spin" />}
        {submitLabel}
      </button>
    </form>
  );
}
