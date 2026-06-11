import React, { useState, useRef } from 'react';
import { X, Plus, Trash2, Upload, Eye, EyeOff, Instagram, Youtube, Twitter, Linkedin, Facebook, Mail, ExternalLink, CheckCircle, AlertCircle, Send } from 'lucide-react';
import type { Language } from '../translations';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CustomTestimonial {
  id: string;
  name: string;
  result: string;
  timeframe: string;
  quote: string;
  imageBefore: string;
  imageAfter: string;
}

export interface SocialLink {
  id: SocialPlatformId;
  url: string;
  enabled: boolean;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  ebookUrl: string;
}

export type SocialPlatformId = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'facebook' | 'whatsapp' | 'email';

// ─── Storage ──────────────────────────────────────────────────────────────────

const TESTIMONIALS_KEY = 'ms_coaching_testimonials';
const SOCIALS_KEY = 'ms_coaching_socials';
const EMAILJS_KEY = 'ms_coaching_emailjs';

export const loadCustomTestimonials = (): CustomTestimonial[] => {
  try { return JSON.parse(localStorage.getItem(TESTIMONIALS_KEY) || '[]'); } catch { return []; }
};

const saveTestimonials = (items: CustomTestimonial[]) =>
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(items));

const DEFAULT_SOCIALS: SocialLink[] = [
  { id: 'instagram', url: '', enabled: false },
  { id: 'tiktok',   url: '', enabled: false },
  { id: 'youtube',  url: '', enabled: false },
  { id: 'twitter',  url: '', enabled: false },
  { id: 'linkedin', url: '', enabled: false },
  { id: 'facebook', url: '', enabled: false },
  { id: 'whatsapp', url: '', enabled: false },
  { id: 'email',    url: '', enabled: false },
];

export const loadSocialLinks = (): SocialLink[] => {
  try {
    const raw = localStorage.getItem(SOCIALS_KEY);
    if (!raw) return DEFAULT_SOCIALS;
    const saved: SocialLink[] = JSON.parse(raw);
    // Merge with defaults to handle new platforms added later
    return DEFAULT_SOCIALS.map(d => saved.find(s => s.id === d.id) ?? d);
  } catch { return DEFAULT_SOCIALS; }
};

const saveSocialLinks = (links: SocialLink[]) =>
  localStorage.setItem(SOCIALS_KEY, JSON.stringify(links));

export const loadEmailJSConfig = (): EmailJSConfig => {
  try { return JSON.parse(localStorage.getItem(EMAILJS_KEY) || '{}'); } catch { return { serviceId: '', templateId: '', publicKey: '', ebookUrl: '' }; }
};

const saveEmailJSConfig = (cfg: EmailJSConfig) =>
  localStorage.setItem(EMAILJS_KEY, JSON.stringify(cfg));

// ─── Platform meta ─────────────────────────────────────────────────────────────

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PLATFORM_META: Record<SocialPlatformId, { label: string; icon: React.ReactNode; placeholder: string; color: string }> = {
  instagram: { label: 'Instagram',   icon: <Instagram size={18} />,  placeholder: 'https://instagram.com/kullaniciadiniz', color: '#E1306C' },
  tiktok:    { label: 'TikTok',      icon: <TikTokIcon />,           placeholder: 'https://tiktok.com/@kullaniciadiniz',  color: '#010101' },
  youtube:   { label: 'YouTube',     icon: <Youtube size={18} />,    placeholder: 'https://youtube.com/@kullaniciadiniz', color: '#FF0000' },
  twitter:   { label: 'X (Twitter)', icon: <Twitter size={18} />,   placeholder: 'https://x.com/kullaniciadiniz',        color: '#1DA1F2' },
  linkedin:  { label: 'LinkedIn',    icon: <Linkedin size={18} />,   placeholder: 'https://linkedin.com/in/kullaniciadiniz', color: '#0A66C2' },
  facebook:  { label: 'Facebook',    icon: <Facebook size={18} />,   placeholder: 'https://facebook.com/kullaniciadiniz', color: '#1877F2' },
  whatsapp:  { label: 'WhatsApp',    icon: <WhatsAppIcon />,         placeholder: 'https://wa.me/905XXXXXXXXX',           color: '#25D366' },
  email:     { label: 'E-posta',     icon: <Mail size={18} />,       placeholder: 'mailto:info@orneksite.com',            color: '#6B7280' },
};

// ─── UI strings ───────────────────────────────────────────────────────────────

const UI = {
  en: {
    title: 'Admin Panel',
    tabs: { transformations: 'Transformations', social: 'Social Media', email: 'E-mail Setup' },
    // transformations tab
    count: 'saved', addSection: 'Add New Before / After',
    beforeLabel: 'BEFORE', afterLabel: 'AFTER', changePhoto: 'Change',
    namePlaceholder: 'Name (e.g. Emre K.)', resultPlaceholder: 'Result (e.g. -12kg)',
    timePlaceholder: 'Duration (e.g. 12 Weeks)', quotePlaceholder: 'Quote (optional)',
    addBtn: 'Add', savedSection: 'Saved', clearAll: 'Clear All',
    emptyHint: 'No images yet. Add your first transformation above.',
    // social tab
    socialTitle: 'Social Media Links',
    socialHint: 'Enable the platforms you use and enter your profile link. Active ones appear in the footer.',
    socialSave: 'Save Links',
    socialSaved: 'Saved!',
    // email tab
    emailTitle: 'EmailJS Setup',
    emailHint: 'Connect EmailJS so newsletter subscribers receive the free guide automatically.',
    serviceId: 'Service ID', templateId: 'Template ID', publicKey: 'Public Key',
    ebookUrl: 'E-book / Guide URL (optional)',
    emailSave: 'Save', emailSaved: 'Saved!',
    emailTest: 'Send Test',
    emailTestSent: 'Test sent!',
    howTitle: 'How to set up (free)',
    howSteps: [
      'Create a free account at emailjs.com',
      'Add an Email Service (Gmail, Outlook, etc.)',
      'Create a Template — use {{user_email}} for the subscriber\'s address',
      'Copy your Service ID, Template ID, and Public Key here',
    ],
    templateVars: 'Available template variables: {{user_email}}, {{ebook_url}}',
  },
  tr: {
    title: 'Admin Panel',
    tabs: { transformations: 'Dönüşümler', social: 'Sosyal Medya', email: 'E-posta Kurulumu' },
    count: 'görsel kayıtlı', addSection: 'Yeni Before / After Ekle',
    beforeLabel: 'ÖNCE', afterLabel: 'SONRA', changePhoto: 'Değiştir',
    namePlaceholder: 'İsim (ör. Emre K.)', resultPlaceholder: 'Sonuç (ör. -12kg)',
    timePlaceholder: 'Süre (ör. 12 Hafta)', quotePlaceholder: 'Yorum (opsiyonel)',
    addBtn: 'Ekle', savedSection: 'Kaydedilenler', clearAll: 'Tümünü Sil',
    emptyHint: 'Henüz görsel yok. Yukarıdan ilk dönüşümünü ekle.',
    socialTitle: 'Sosyal Medya Linkleri',
    socialHint: 'Kullandığın platformları aktif et ve profil linkini gir. Aktif olanlar footer\'da görünür.',
    socialSave: 'Kaydet', socialSaved: 'Kaydedildi!',
    emailTitle: 'EmailJS Kurulumu',
    emailHint: 'EmailJS bağla — e-kitap isteyen abonelere otomatik e-posta gitsin.',
    serviceId: 'Service ID', templateId: 'Template ID', publicKey: 'Public Key',
    ebookUrl: 'E-kitap / Rehber URL\'si (opsiyonel)',
    emailSave: 'Kaydet', emailSaved: 'Kaydedildi!',
    emailTest: 'Test Gönder',
    emailTestSent: 'Test gönderildi!',
    howTitle: 'Nasıl kurulur (ücretsiz)',
    howSteps: [
      'emailjs.com\'da ücretsiz hesap oluştur',
      'Email Service ekle (Gmail, Outlook vb.)',
      'Template oluştur — abone e-postası için {{user_email}} kullan',
      'Service ID, Template ID ve Public Key\'i buraya yapıştır',
    ],
    templateVars: 'Kullanılabilir template değişkenleri: {{user_email}}, {{ebook_url}}',
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testimonials: CustomTestimonial[];
  onChange: (items: CustomTestimonial[]) => void;
  socialLinks: SocialLink[];
  onSocialChange: (links: SocialLink[]) => void;
  lang: Language;
}

const EMPTY_FORM = { name: '', result: '', timeframe: '', quote: '', imageBefore: '', imageAfter: '' };

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminPanel: React.FC<Props> = ({
  isOpen, onClose, testimonials, onChange, socialLinks, onSocialChange, lang,
}) => {
  const u = UI[lang];
  const [tab, setTab] = useState<'transformations' | 'social' | 'email'>('transformations');

  // Transformations state
  const [form, setForm] = useState(EMPTY_FORM);
  const [previewBefore, setPreviewBefore] = useState('');
  const [previewAfter, setPreviewAfter] = useState('');
  const [showPreviews, setShowPreviews] = useState(true);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  // Social state
  const [socials, setSocials] = useState<SocialLink[]>(socialLinks);
  const [socialSaved, setSocialSaved] = useState(false);

  // Email state
  const [emailCfg, setEmailCfg] = useState<EmailJSConfig>(loadEmailJSConfig);
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailTestSent, setEmailTestSent] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);

  if (!isOpen) return null;

  // ── Transformations helpers ──────────────────────────────────────────────────

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (field: 'imageBefore' | 'imageAfter', file: File | undefined) => {
    if (!file) return;
    const b64 = await readFile(file);
    setForm(f => ({ ...f, [field]: b64 }));
    if (field === 'imageBefore') setPreviewBefore(b64);
    else setPreviewAfter(b64);
  };

  const handleAdd = () => {
    if (!form.imageBefore || !form.imageAfter || !form.name) return;
    const next = [...testimonials, { ...form, id: Date.now().toString() }];
    saveTestimonials(next);
    onChange(next);
    setForm(EMPTY_FORM);
    setPreviewBefore('');
    setPreviewAfter('');
  };

  const handleDelete = (id: string) => {
    const next = testimonials.filter(t => t.id !== id);
    saveTestimonials(next);
    onChange(next);
  };

  const handleClearAll = () => { saveTestimonials([]); onChange([]); };

  // ── Social helpers ───────────────────────────────────────────────────────────

  const toggleSocial = (id: SocialPlatformId) =>
    setSocials(s => s.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));

  const setSocialUrl = (id: SocialPlatformId, url: string) =>
    setSocials(s => s.map(p => p.id === id ? { ...p, url } : p));

  const handleSaveSocials = () => {
    saveSocialLinks(socials);
    onSocialChange(socials);
    setSocialSaved(true);
    setTimeout(() => setSocialSaved(false), 2000);
  };

  // ── Email helpers ────────────────────────────────────────────────────────────

  const handleSaveEmail = () => {
    saveEmailJSConfig(emailCfg);
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 2000);
  };

  const handleTestEmail = async () => {
    if (!emailCfg.serviceId || !emailCfg.templateId || !emailCfg.publicKey) return;
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(emailCfg.serviceId, emailCfg.templateId, {
        user_email: 'test@test.com',
        ebook_url: emailCfg.ebookUrl || '',
      }, emailCfg.publicKey);
      setEmailTestSent(true);
      setTimeout(() => setEmailTestSent(false), 3000);
    } catch (err) {
      alert('EmailJS error: ' + String(err));
    }
  };

  const emailConfigured = !!(emailCfg.serviceId && emailCfg.templateId && emailCfg.publicKey);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-[2rem] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-white font-black text-xl uppercase tracking-tight">{u.title}</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 px-8">
          {(['transformations', 'social', 'email'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-4 px-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors -mb-px ${
                tab === t ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {u.tabs[t]}
            </button>
          ))}
        </div>

        <div className="p-8 space-y-8">

          {/* ── Transformations Tab ── */}
          {tab === 'transformations' && (
            <>
              <section>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Plus size={16} className="text-brand" /> {u.addSection}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  {/* Before */}
                  <div
                    onClick={() => beforeRef.current?.click()}
                    className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-700 hover:border-brand cursor-pointer transition-colors overflow-hidden bg-gray-800 flex flex-col items-center justify-center gap-2 group"
                  >
                    {previewBefore ? (
                      <img src={previewBefore} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <><Upload size={24} className="text-gray-600 group-hover:text-brand transition-colors" /><span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{u.beforeLabel}</span></>
                    )}
                    {previewBefore && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{u.changePhoto}</span>
                      </div>
                    )}
                    <input ref={beforeRef} type="file" accept="image/*" className="hidden"
                      onChange={e => handleImageChange('imageBefore', e.target.files?.[0])} />
                  </div>

                  {/* After */}
                  <div
                    onClick={() => afterRef.current?.click()}
                    className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-700 hover:border-brand cursor-pointer transition-colors overflow-hidden bg-gray-800 flex flex-col items-center justify-center gap-2 group"
                  >
                    {previewAfter ? (
                      <img src={previewAfter} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <><Upload size={24} className="text-gray-600 group-hover:text-brand transition-colors" /><span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{u.afterLabel}</span></>
                    )}
                    {previewAfter && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{u.changePhoto}</span>
                      </div>
                    )}
                    <input ref={afterRef} type="file" accept="image/*" className="hidden"
                      onChange={e => handleImageChange('imageAfter', e.target.files?.[0])} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder={u.namePlaceholder} value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                    <input type="text" placeholder={u.resultPlaceholder} value={form.result}
                      onChange={e => setForm(f => ({ ...f, result: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder={u.timePlaceholder} value={form.timeframe}
                      onChange={e => setForm(f => ({ ...f, timeframe: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                    <input type="text" placeholder={u.quotePlaceholder} value={form.quote}
                      onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={!form.imageBefore || !form.imageAfter || !form.name}
                  className="mt-4 w-full py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {u.addBtn}
                </button>
              </section>

              {testimonials.length > 0 ? (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <button onClick={() => setShowPreviews(p => !p)} className="text-gray-500 hover:text-white transition-colors">
                        {showPreviews ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      {u.savedSection} ({testimonials.length})
                    </h3>
                    <button onClick={handleClearAll} className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-wider transition-colors">
                      {u.clearAll}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {testimonials.map((t, i) => (
                      <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800 border border-gray-700">
                        {showPreviews && (
                          <div className="flex gap-2 flex-shrink-0">
                            <img src={t.imageBefore} alt="" className="w-12 h-16 object-cover rounded-lg" />
                            <img src={t.imageAfter} alt="" className="w-12 h-16 object-cover rounded-lg" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-bold text-sm truncate">{t.name || `${lang === 'tr' ? 'Görsel' : 'Image'} ${i + 1}`}</div>
                          {t.result && <div className="text-brand text-xs font-bold mt-0.5 truncate">{t.result}</div>}
                          {t.timeframe && <div className="text-gray-500 text-xs mt-0.5">{t.timeframe}</div>}
                        </div>
                        <button onClick={() => handleDelete(t.id)} className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <p className="text-gray-600 text-sm text-center py-4">{u.emptyHint}</p>
              )}
            </>
          )}

          {/* ── Social Media Tab ── */}
          {tab === 'social' && (
            <section>
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{u.socialTitle}</h3>
              <p className="text-gray-500 text-xs mb-6">{u.socialHint}</p>

              <div className="space-y-3">
                {socials.map(social => {
                  const meta = PLATFORM_META[social.id];
                  return (
                    <div key={social.id} className={`flex items-center gap-3 p-4 rounded-2xl border transition-colors ${social.enabled ? 'bg-gray-800 border-gray-600' : 'bg-gray-800/50 border-gray-800'}`}>
                      {/* Toggle */}
                      <button
                        onClick={() => toggleSocial(social.id)}
                        className={`w-10 h-6 rounded-full flex-shrink-0 relative overflow-hidden transition-colors ${social.enabled ? 'bg-brand' : 'bg-gray-700'}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${social.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>

                      {/* Icon */}
                      <span className={`flex-shrink-0 transition-colors ${social.enabled ? 'text-white' : 'text-gray-600'}`}>
                        {meta.icon}
                      </span>

                      {/* Label + URL */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${social.enabled ? 'text-white' : 'text-gray-600'}`}>
                          {meta.label}
                        </div>
                        <input
                          type="url"
                          placeholder={meta.placeholder}
                          value={social.url}
                          onChange={e => setSocialUrl(social.id, e.target.value)}
                          disabled={!social.enabled}
                          className="w-full px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-700 text-xs focus:outline-none focus:border-brand disabled:opacity-30 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleSaveSocials}
                className="mt-6 w-full py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors flex items-center justify-center gap-2"
              >
                {socialSaved ? <><CheckCircle size={16} /> {u.socialSaved}</> : u.socialSave}
              </button>
            </section>
          )}

          {/* ── Email Tab ── */}
          {tab === 'email' && (
            <section className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">{u.emailTitle}</h3>
                  {emailConfigured
                    ? <CheckCircle size={14} className="text-brand" />
                    : <AlertCircle size={14} className="text-gray-600" />
                  }
                </div>
                <p className="text-gray-500 text-xs">{u.emailHint}</p>
              </div>

              {/* How-to accordion */}
              <div className="rounded-2xl border border-gray-800 overflow-hidden">
                <button
                  onClick={() => setShowHowTo(h => !h)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{u.howTitle}</span>
                  <ExternalLink size={14} className="text-gray-600 flex-shrink-0" />
                </button>
                {showHowTo && (
                  <div className="px-5 pb-5 space-y-2 border-t border-gray-800">
                    <ol className="space-y-2 mt-3">
                      {u.howSteps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-xs text-gray-400">
                          <span className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-brand font-bold flex-shrink-0 text-[10px]">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className="text-[11px] text-gray-600 mt-4 font-mono">{u.templateVars}</p>
                  </div>
                )}
              </div>

              {/* Config inputs */}
              <div className="space-y-3">
                {(['serviceId', 'templateId', 'publicKey'] as const).map(field => (
                  <div key={field}>
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1">{u[field]}</label>
                    <input
                      type="text"
                      value={emailCfg[field]}
                      onChange={e => setEmailCfg(c => ({ ...c, [field]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm font-mono focus:outline-none focus:border-brand"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1">{u.ebookUrl}</label>
                  <input
                    type="url"
                    value={emailCfg.ebookUrl}
                    onChange={e => setEmailCfg(c => ({ ...c, ebookUrl: e.target.value }))}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveEmail}
                  className="flex-1 py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors flex items-center justify-center gap-2"
                >
                  {emailSaved ? <><CheckCircle size={16} /> {u.emailSaved}</> : u.emailSave}
                </button>
                <button
                  onClick={handleTestEmail}
                  disabled={!emailConfigured}
                  className="px-5 py-3 rounded-xl border border-gray-700 text-gray-300 font-bold text-sm hover:border-gray-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {emailTestSent ? <CheckCircle size={16} className="text-brand" /> : <Send size={16} />}
                  {emailTestSent ? u.emailTestSent : u.emailTest}
                </button>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};
