'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Loader, Lock, LogOut } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { isSupabaseConfigured, isAdminEmail } from '@/lib/supabase/config';
import { onAuthChange, signInWithGoogle, signOutAdmin } from '@/lib/admin';
import { getAdminLabels } from './labels';
import { PostsTab } from './PostsTab';
import { RecipesTab } from './RecipesTab';
import { MembersTab } from './MembersTab';
import { ClientsTab } from './ClientsTab';
import { SocialTab } from './SocialTab';
import { SettingsTab } from './SettingsTab';

type Tab = 'posts' | 'recipes' | 'members' | 'clients' | 'social' | 'settings';

export function AdminPanel({ locale, adminPath }: { locale: Locale; adminPath: string }) {
  const t = getAdminLabels(locale);
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>('posts');

  useEffect(() => onAuthChange((u) => { setUser(u); setReady(true); }), []);

  const authed = !!user && isAdminEmail(user.email);

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-black uppercase tracking-tight">{t.title}</h1>
          {authed && (
            <button
              onClick={() => signOutAdmin()}
              className="flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 text-xs font-bold text-gray-300 hover:border-gray-500 hover:text-white"
            >
              <LogOut size={14} /> {t.signOut}
            </button>
          )}
        </div>

        {!isSupabaseConfigured ? (
          <Notice>{t.notConfigured}</Notice>
        ) : !ready ? (
          <div className="flex justify-center py-16"><Loader className="animate-spin text-brand" /></div>
        ) : !authed ? (
          <div className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900 p-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <Lock size={16} className="text-brand" /> {t.login}
            </div>
            <button
              onClick={() => signInWithGoogle(adminPath)}
              className="w-full rounded-xl bg-white py-3 text-sm font-bold text-gray-900 hover:bg-gray-100"
            >
              {t.google}
            </button>
            {user && !authed && (
              <p className="text-xs text-red-400">
                {t.notAuthorized} <span className="block break-all text-gray-500">{user.email}</span>
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6 flex gap-1 border-b border-gray-800">
              {(['posts', 'recipes', 'members', 'clients', 'social', 'settings'] as Tab[]).map((tb) => (
                <button
                  key={tb}
                  onClick={() => setTab(tb)}
                  className={`-mb-px border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    tab === tb ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t.tabs[tb]}
                </button>
              ))}
            </div>
            {tab === 'posts' && <PostsTab t={t} />}
            {tab === 'recipes' && <RecipesTab t={t} />}
            {tab === 'members' && <MembersTab t={t} />}
            {tab === 'clients' && <ClientsTab t={t} locale={locale} />}
            {tab === 'social' && <SocialTab t={t} />}
            {tab === 'settings' && <SettingsTab t={t} />}
          </>
        )}
      </div>
    </main>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center text-sm text-gray-400">
      {children}
    </div>
  );
}
