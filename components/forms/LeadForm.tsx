'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle, Loader } from 'lucide-react';

export type LeadField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

const inputCls =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white';

export function LeadForm({
  endpoint,
  fields,
  locale,
  submitLabel,
  successText,
  errorText,
}: {
  endpoint: string;
  fields: LeadField[];
  locale: string;
  submitLabel: string;
  successText: string;
  errorText: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === 'select' ? (f.options?.[0]?.value ?? '') : ''])),
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const set = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
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
    <form onSubmit={submit} className="space-y-4">
      {fields.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
            {f.label}
          </span>
          {f.type === 'textarea' ? (
            <textarea
              required={f.required}
              rows={4}
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              className={inputCls}
            />
          ) : f.type === 'select' ? (
            <select
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              className={inputCls}
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
              required={f.required}
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              className={inputCls}
            />
          )}
        </label>
      ))}

      {status === 'error' && <p className="text-sm text-red-500">{errorText}</p>}

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
