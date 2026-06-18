import React, { useState } from 'react';
import { Zap, BookOpen, Check, Loader } from 'lucide-react';
import { Button } from './Button';
import { Reveal } from './Reveal';
import { content, Language } from '../translations';
import { submitLead, mailtoFallback } from '../lib/lead';

interface Props {
  lang: Language;
}

export const NewsletterSection: React.FC<Props> = ({ lang }) => {
  const t = content[lang].newsletter;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const ok = await submitLead({ type: 'newsletter', email, lang });
    if (!ok) mailtoFallback({ type: 'newsletter', email });
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setEmail('');
    }, 4000);
  };

  return (
    <section className="py-24 px-6 text-gray-900 dark:text-white transition-colors duration-300">
      <Reveal>
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10">
            <div className="relative w-64 h-80 bg-gray-900 dark:bg-white rounded-r-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform rotate-3 hover:rotate-0 transition-transform duration-500 border-l-4 border-gray-700 dark:border-gray-200 flex flex-col justify-between p-6">
              <div className="text-white dark:text-gray-900">
                <p className="text-xs font-bold tracking-widest uppercase opacity-50 mb-2">Mustafa Seyhan</p>
                <h3 className="text-3xl font-black leading-tight italic whitespace-pre-line">{t.coverTitle}</h3>
              </div>
              <div className="mt-auto">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <BookOpen className="text-gray-900 dark:text-white" size={20} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} className="fill-brand text-black dark:text-brand" />
              {t.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold dark:font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t.title}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto md:mx-0 font-medium">{t.subtitle}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-gray-900 dark:focus:border-brand focus:ring-1 focus:ring-gray-900 dark:focus:ring-brand transition-all bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 disabled:opacity-60"
              />
              <Button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-gray-900 dark:bg-brand text-white dark:text-black hover:bg-black dark:hover:bg-brand-hover border-transparent shadow-none min-w-[48px]"
              >
                {status === 'success' ? <Check size={20} /> : status === 'loading' ? <Loader size={20} className="animate-spin" /> : t.button}
              </Button>
            </form>
            {status === 'success' && (
              <p className="text-green-600 dark:text-brand text-sm mt-3 font-medium animate-fade-in">{t.success}</p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
