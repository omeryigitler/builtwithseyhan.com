'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check, ChevronDown, Loader, Upload } from 'lucide-react';
import { uploadMedia } from '@/lib/admin';

const inputCls =
  'w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-brand focus:outline-none';

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} resize-none`}
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`${inputCls} flex items-center justify-between text-left`}
        >
          <span className="truncate">{current?.label ?? ''}</span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 z-30 mt-1 max-h-60 overflow-auto rounded-xl border border-gray-700 bg-gray-800 p-1 shadow-2xl">
            {options.map((o) => {
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active ? 'bg-brand/15 font-bold text-brand' : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {active && <Check size={15} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className={`relative h-6 w-10 flex-shrink-0 rounded-full transition-colors ${
          checked ? 'bg-brand' : 'bg-gray-700'
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4' : ''
          }`}
        />
      </span>
      <span className="text-sm font-semibold text-gray-200">{label}</span>
    </button>
  );
}

export function ImageField({
  label,
  value,
  folder,
  onChange,
  uploadLabel,
}: {
  label: string;
  value: string | null;
  folder: string;
  onChange: (url: string) => void;
  uploadLabel: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const onPick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setErr('');
    try {
      const url = await uploadMedia(file, folder);
      onChange(url);
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-700 bg-gray-800 text-gray-500 hover:border-brand"
        >
          {busy ? (
            <Loader size={18} className="animate-spin" />
          ) : value ? (
            <Image src={value} alt="" width={80} height={80} className="h-full w-full object-cover" />
          ) : (
            <Upload size={18} />
          )}
        </button>
        <div className="flex-1">
          <input
            value={value ?? ''}
            placeholder={uploadLabel}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
          {err && <p className="mt-1 text-xs text-red-400">{err}</p>}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
