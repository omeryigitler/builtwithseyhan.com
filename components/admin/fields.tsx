'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Loader, Upload } from 'lucide-react';
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
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
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
