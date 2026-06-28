'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Instagram, Loader, Trash2 } from 'lucide-react';
import type { MemberPost } from '@/lib/types';
import { listAllMemberPosts, setMemberApproved, deleteMemberPost } from '@/lib/admin';
import type { AdminLabels } from './labels';

export function MembersTab({ t }: { t: AdminLabels }) {
  const [items, setItems] = useState<MemberPost[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      setItems(await listAllMemberPosts());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    reload();
  }, []);

  const toggle = async (p: MemberPost) => {
    await setMemberApproved(p.id, !p.approved);
    await reload();
  };
  const del = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    await deleteMemberPost(id);
    await reload();
  };

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Loader className="animate-spin text-brand" />
      </div>
    );
  if (items.length === 0)
    return <p className="py-6 text-center text-sm text-gray-500">{t.empty}</p>;

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div key={p.id} className="flex gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-3">
          {p.imageUrl ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-800">
              <Image src={p.imageUrl} alt="" fill sizes="64px" className="object-cover" />
            </div>
          ) : (
            <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-800" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm font-bold text-white">{p.authorName || '—'}</span>
              {!p.approved && (
                <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                  {t.pending}
                </span>
              )}
              {p.instagram && (
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                  <Instagram size={12} /> {p.instagram}
                </span>
              )}
            </div>
            {p.caption && <p className="mt-0.5 line-clamp-2 text-xs text-gray-400">{p.caption}</p>}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <button
              onClick={() => toggle(p)}
              className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                p.approved ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-brand text-black'
              }`}
            >
              {p.approved ? t.unapprove : t.approve}
            </button>
            <button
              onClick={() => del(p.id)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
