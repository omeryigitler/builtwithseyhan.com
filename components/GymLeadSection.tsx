import React, { useState } from 'react';
import { MapPin, Check, Loader, Dumbbell } from 'lucide-react';
import { Button } from './Button';
import { Reveal } from './Reveal';
import type { Language } from '../translations';
import type { GymInfo } from '../lib/content';
import { submitLead, mailtoFallback } from '../lib/lead';

interface Props {
  lang: Language;
  gym: GymInfo;
}

const UI = {
  en: {
    badge: 'Train in Malta',
    title: 'Start at the Gym in Malta',
    subtitle: 'In Malta? Let’s train together in person. Leave your details and I’ll reach out about membership and a trial session.',
    namePlaceholder: 'Full name',
    emailPlaceholder: 'E-mail',
    phonePlaceholder: 'Phone (WhatsApp)',
    messagePlaceholder: 'Message (optional)',
    button: 'Request info',
    success: 'Got it! I’ll get back to you shortly.',
  },
  tr: {
    badge: 'Malta’da Antrenman',
    title: 'Malta’da Salonda Başla',
    subtitle: 'Malta’daysan birebir birlikte çalışalım. Bilgilerini bırak; üyelik ve deneme seansı için seninle iletişime geçeyim.',
    namePlaceholder: 'Ad Soyad',
    emailPlaceholder: 'E-posta',
    phonePlaceholder: 'Telefon (WhatsApp)',
    messagePlaceholder: 'Mesaj (opsiyonel)',
    button: 'Bilgi İste',
    success: 'Aldım! En kısa sürede döneceğim.',
  },
};

export const GymLeadSection: React.FC<Props> = ({ lang, gym }) => {
  const u = UI[lang];
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const set = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || (!form.email && !form.phone)) return;
    setStatus('loading');
    const payload = {
      type: 'gym' as const,
      ...form,
      service: gym.name ? `${gym.name}${gym.location ? ` — ${gym.location}` : ''}` : 'Malta',
      lang,
    };
    const ok = await submitLead(payload);
    if (!ok) mailtoFallback(payload);
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  const inputCls =
    'w-full px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-gray-900 dark:focus:border-brand focus:ring-1 focus:ring-gray-900 dark:focus:ring-brand transition-all bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600';

  return (
    <section id="gym" className="py-24 px-6 text-gray-900 dark:text-white transition-colors duration-300">
      <Reveal>
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl p-8 md:p-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            {/* Left: pitch */}
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-6">
                <Dumbbell size={14} className="text-brand" />
                {u.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold dark:font-black uppercase tracking-tight mb-4">{u.title}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-medium">{u.subtitle}</p>

              {(gym.name || gym.location) && (
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200">
                  <MapPin size={16} className="text-brand" />
                  <span>{[gym.name, gym.location].filter(Boolean).join(' · ')}</span>
                </div>
              )}
              {gym.offer && (
                <p className="mt-3 text-sm text-brand dark:text-brand font-semibold">{gym.offer}</p>
              )}
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-3">
              <input type="text" required placeholder={u.namePlaceholder} value={form.name}
                onChange={(e) => set('name', e.target.value)} disabled={status !== 'idle'} className={inputCls} />
              <input type="email" placeholder={u.emailPlaceholder} value={form.email}
                onChange={(e) => set('email', e.target.value)} disabled={status !== 'idle'} className={inputCls} />
              <input type="tel" placeholder={u.phonePlaceholder} value={form.phone}
                onChange={(e) => set('phone', e.target.value)} disabled={status !== 'idle'} className={inputCls} />
              <textarea rows={3} placeholder={u.messagePlaceholder} value={form.message}
                onChange={(e) => set('message', e.target.value)} disabled={status !== 'idle'}
                className={`${inputCls} !rounded-3xl resize-none`} />
              <Button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full bg-gray-900 dark:bg-brand text-white dark:text-black hover:bg-black dark:hover:bg-brand-hover border-transparent shadow-none"
              >
                {status === 'success' ? <Check size={20} /> : status === 'loading' ? <Loader size={20} className="animate-spin" /> : u.button}
              </Button>
              {status === 'success' && (
                <p className="text-green-600 dark:text-brand text-sm mt-1 font-medium animate-fade-in">{u.success}</p>
              )}
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
