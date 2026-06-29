'use client';

import { Printer } from 'lucide-react';

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-gray-900 transition hover:border-brand dark:border-gray-700 dark:text-white print:hidden"
    >
      <Printer size={16} /> {label}
    </button>
  );
}
