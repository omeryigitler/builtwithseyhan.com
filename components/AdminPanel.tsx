import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  CheckCircle,
  Lock,
  LogOut,
  Loader,
  Dumbbell,
} from 'lucide-react';
import type { Language } from '../translations';
import {
  CustomTestimonial,
  SocialPlatformId,
  SiteSettings,
  DEFAULT_SETTINGS,
  saveTestimonial,
  deleteTestimonial,
  saveSettings,
} from '../lib/content';
import type { User } from 'firebase/auth';
import { uploadImage, deleteImage } from '../lib/storage';
import { signInWithGoogle, signOutAdmin, onAuthChange, isAdminUser } from '../lib/auth';
import { isFirebaseReady } from '../lib/firebase';

const GoogleG = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
    <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 015.49 12c0-.73.13-1.45.35-2.11V7.05H2.18A11 11 0 001 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

// Re-export so existing imports keep working.
export type { CustomTestimonial, SocialLink, SocialPlatformId } from '../lib/content';

// ─── Platform meta ─────────────────────────────────────────────────────────────

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PLATFORM_META: Record<
  SocialPlatformId,
  { label: string; icon: React.ReactNode; placeholder: string }
> = {
  instagram: { label: 'Instagram', icon: <Instagram size={18} />, placeholder: 'https://instagram.com/kullaniciadiniz' },
  tiktok: { label: 'TikTok', icon: <TikTokIcon />, placeholder: 'https://tiktok.com/@kullaniciadiniz' },
  youtube: { label: 'YouTube', icon: <Youtube size={18} />, placeholder: 'https://youtube.com/@kullaniciadiniz' },
  twitter: { label: 'X (Twitter)', icon: <Twitter size={18} />, placeholder: 'https://x.com/kullaniciadiniz' },
  linkedin: { label: 'LinkedIn', icon: <Linkedin size={18} />, placeholder: 'https://linkedin.com/in/kullaniciadiniz' },
  facebook: { label: 'Facebook', icon: <Facebook size={18} />, placeholder: 'https://facebook.com/kullaniciadiniz' },
  whatsapp: { label: 'WhatsApp', icon: <WhatsAppIcon />, placeholder: 'https://wa.me/905XXXXXXXXX' },
  email: { label: 'E-posta', icon: <Mail size={18} />, placeholder: 'mailto:contact@builtwithseyhan.com' },
};

// ─── UI strings ───────────────────────────────────────────────────────────────

const UI = {
  en: {
    title: 'Admin Panel',
    tabs: { transformations: 'Transformations', social: 'Social Media', gym: 'Malta Gym' },
    addSection: 'Add New Before / After',
    beforeLabel: 'BEFORE', afterLabel: 'AFTER', changePhoto: 'Change',
    namePlaceholder: 'Name (e.g. Emre K.)', resultPlaceholder: 'Result (e.g. -12kg)',
    timePlaceholder: 'Duration (e.g. 12 Weeks)', quotePlaceholder: 'Quote (optional)',
    addBtn: 'Add', uploading: 'Uploading…', savedSection: 'Saved', clearAll: 'Clear All',
    emptyHint: 'No images yet. Add your first transformation above.',
    socialTitle: 'Social Media Links',
    socialHint: 'Enable the platforms you use and enter your profile link. Active ones appear in the footer.',
    gymTitle: 'Malta Gym (Referral)',
    gymHint: 'Shown in the gym lead section. Leads earn you a referral commission.',
    gymName: 'Gym name', gymLocation: 'Location', gymOffer: 'Offer / trial details',
    save: 'Save', saved: 'Saved!',
    login: 'Admin Login', loginGoogle: 'Sign in with Google',
    loginError: 'Sign-in failed. Try again.',
    notAuthorized: 'This Google account is not authorized for admin.',
    notConfigured: 'Firebase is not configured. Add the VITE_FIREBASE_* keys to .env.',
    logout: 'Sign out',
  },
  tr: {
    title: 'Admin Panel',
    tabs: { transformations: 'Dönüşümler', social: 'Sosyal Medya', gym: 'Malta Salonu' },
    addSection: 'Yeni Before / After Ekle',
    beforeLabel: 'ÖNCE', afterLabel: 'SONRA', changePhoto: 'Değiştir',
    namePlaceholder: 'İsim (ör. Emre K.)', resultPlaceholder: 'Sonuç (ör. -12kg)',
    timePlaceholder: 'Süre (ör. 12 Hafta)', quotePlaceholder: 'Yorum (opsiyonel)',
    addBtn: 'Ekle', uploading: 'Yükleniyor…', savedSection: 'Kaydedilenler', clearAll: 'Tümünü Sil',
    emptyHint: 'Henüz görsel yok. Yukarıdan ilk dönüşümünü ekle.',
    socialTitle: 'Sosyal Medya Linkleri',
    socialHint: 'Kullandığın platformları aktif et ve profil linkini gir. Aktif olanlar footer\'da görünür.',
    gymTitle: 'Malta Salonu (Prim)',
    gymHint: 'Salon lead bölümünde gösterilir. Gelen kayıtlar sana prim kazandırır.',
    gymName: 'Salon adı', gymLocation: 'Konum', gymOffer: 'Teklif / deneme detayı',
    save: 'Kaydet', saved: 'Kaydedildi!',
    login: 'Admin Girişi', loginGoogle: 'Google ile giriş yap',
    loginError: 'Giriş başarısız. Tekrar dene.',
    notAuthorized: 'Bu Google hesabı admin için yetkili değil.',
    notConfigured: 'Firebase yapılandırılmamış. .env\'e VITE_FIREBASE_* anahtarlarını ekle.',
    logout: 'Çıkış',
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  testimonials: CustomTestimonial[];
  settings: SiteSettings;
  lang: Language;
}

const EMPTY_FORM = { name: '', result: '', timeframe: '', quote: '' };

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminPanel: React.FC<Props> = ({ isOpen, onClose, testimonials, settings, lang }) => {
  const u = UI[lang];
  const [tab, setTab] = useState<'transformations' | 'social' | 'gym'>('transformations');

  // Auth
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const authed = isAdminUser(user);
  const signedInNotAdmin = !!user && !authed;

  useEffect(() => {
    return onAuthChange((u) => {
      setUser(u);
      setAuthReady(true);
    });
  }, []);

  // Transformations
  const [form, setForm] = useState(EMPTY_FORM);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [previewBefore, setPreviewBefore] = useState('');
  const [previewAfter, setPreviewAfter] = useState('');
  const [showPreviews, setShowPreviews] = useState(true);
  const [uploading, setUploading] = useState(false);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  // Settings draft (socials + gym) — synced from props, persisted on Save
  const [draft, setDraft] = useState<SiteSettings>(settings ?? DEFAULT_SETTINGS);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  useEffect(() => {
    setDraft(settings ?? DEFAULT_SETTINGS);
  }, [settings]);

  if (!isOpen) return null;

  // ── Auth handlers ─────────────────────────────────────────────────────────

  const handleGoogleLogin = async () => {
    setLoginError(false);
    setLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch {
      setLoginError(true);
    } finally {
      setLoggingIn(false);
    }
  };

  // ── Transformation handlers ─────────────────────────────────────────────────

  const pickImage = (field: 'before' | 'after', file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (field === 'before') {
      setBeforeFile(file);
      setPreviewBefore(url);
    } else {
      setAfterFile(file);
      setPreviewAfter(url);
    }
  };

  const handleAdd = async () => {
    if (!beforeFile || !afterFile || !form.name || uploading) return;
    setUploading(true);
    try {
      const id = Date.now().toString();
      const [imageBefore, imageAfter] = await Promise.all([
        uploadImage(beforeFile, `testimonials/${id}/before.jpg`),
        uploadImage(afterFile, `testimonials/${id}/after.jpg`),
      ]);
      await saveTestimonial({ id, ...form, imageBefore, imageAfter, order: Date.now() });
      setForm(EMPTY_FORM);
      setBeforeFile(null);
      setAfterFile(null);
      setPreviewBefore('');
      setPreviewAfter('');
    } catch (err) {
      alert((lang === 'tr' ? 'Yükleme hatası: ' : 'Upload error: ') + String(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id);
    await Promise.all([
      deleteImage(`testimonials/${id}/before.jpg`),
      deleteImage(`testimonials/${id}/after.jpg`),
    ]);
  };

  const handleClearAll = async () => {
    if (!confirm(lang === 'tr' ? 'Tüm dönüşümler silinsin mi?' : 'Delete all transformations?')) return;
    await Promise.all(testimonials.map((t) => handleDelete(t.id)));
  };

  // ── Settings handlers ───────────────────────────────────────────────────────

  const toggleSocial = (id: SocialPlatformId) =>
    setDraft((d) => ({ ...d, socials: d.socials.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)) }));

  const setSocialUrl = (id: SocialPlatformId, url: string) =>
    setDraft((d) => ({ ...d, socials: d.socials.map((p) => (p.id === id ? { ...p, url } : p)) }));

  const setGymField = (field: keyof SiteSettings['gym'], value: string) =>
    setDraft((d) => ({ ...d, gym: { ...d.gym, [field]: value } }));

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await saveSettings(draft);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2000);
    } catch (err) {
      alert(String(err));
    } finally {
      setSavingSettings(false);
    }
  };

  // ── Render: shell ───────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-[2rem] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-white font-black text-xl uppercase tracking-tight">{u.title}</h2>
          <div className="flex items-center gap-2">
            {authed && (
              <button
                onClick={() => signOutAdmin()}
                title={u.logout}
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
              >
                <LogOut size={16} />
              </button>
            )}
            <button onClick={onClose} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Not configured */}
        {!isFirebaseReady ? (
          <div className="p-10 text-center text-gray-400 text-sm">{u.notConfigured}</div>
        ) : !authReady ? (
          <div className="p-10 flex justify-center"><Loader className="animate-spin text-brand" /></div>
        ) : !authed ? (
          /* ── Login / not authorized ── */
          <div className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest mb-2">
              <Lock size={16} className="text-brand" /> {u.login}
            </div>
            <button
              onClick={handleGoogleLogin} disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors disabled:opacity-40 flex items-center justify-center gap-3"
            >
              {loggingIn ? <Loader size={16} className="animate-spin" /> : <GoogleG />}
              {u.loginGoogle}
            </button>
            {loginError && <p className="text-red-400 text-xs">{u.loginError}</p>}
            {signedInNotAdmin && (
              <div className="space-y-3 pt-2">
                <p className="text-red-400 text-xs">{u.notAuthorized}</p>
                <p className="text-gray-500 text-xs break-all">{user?.email}</p>
                <button
                  onClick={() => signOutAdmin()}
                  className="w-full py-2.5 rounded-xl border border-gray-700 text-gray-300 font-bold text-xs hover:border-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={14} /> {u.logout}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-800 px-8">
              {(['transformations', 'social', 'gym'] as const).map((tb) => (
                <button
                  key={tb}
                  onClick={() => setTab(tb)}
                  className={`py-4 px-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors -mb-px ${
                    tab === tb ? 'border-brand text-brand' : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {u.tabs[tb]}
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
                          <>
                            <Upload size={24} className="text-gray-600 group-hover:text-brand transition-colors" />
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{u.beforeLabel}</span>
                          </>
                        )}
                        {previewBefore && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{u.changePhoto}</span>
                          </div>
                        )}
                        <input ref={beforeRef} type="file" accept="image/*" className="hidden"
                          onChange={(e) => pickImage('before', e.target.files?.[0])} />
                      </div>

                      {/* After */}
                      <div
                        onClick={() => afterRef.current?.click()}
                        className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-700 hover:border-brand cursor-pointer transition-colors overflow-hidden bg-gray-800 flex flex-col items-center justify-center gap-2 group"
                      >
                        {previewAfter ? (
                          <img src={previewAfter} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload size={24} className="text-gray-600 group-hover:text-brand transition-colors" />
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{u.afterLabel}</span>
                          </>
                        )}
                        {previewAfter && (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{u.changePhoto}</span>
                          </div>
                        )}
                        <input ref={afterRef} type="file" accept="image/*" className="hidden"
                          onChange={(e) => pickImage('after', e.target.files?.[0])} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder={u.namePlaceholder} value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                        <input type="text" placeholder={u.resultPlaceholder} value={form.result}
                          onChange={(e) => setForm((f) => ({ ...f, result: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder={u.timePlaceholder} value={form.timeframe}
                          onChange={(e) => setForm((f) => ({ ...f, timeframe: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                        <input type="text" placeholder={u.quotePlaceholder} value={form.quote}
                          onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand" />
                      </div>
                    </div>

                    <button
                      onClick={handleAdd}
                      disabled={!beforeFile || !afterFile || !form.name || uploading}
                      className="mt-4 w-full py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {uploading ? <><Loader size={16} className="animate-spin" /> {u.uploading}</> : u.addBtn}
                    </button>
                  </section>

                  {testimonials.length > 0 ? (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                          <button onClick={() => setShowPreviews((p) => !p)} className="text-gray-500 hover:text-white transition-colors">
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
                    {draft.socials.map((social) => {
                      const meta = PLATFORM_META[social.id];
                      return (
                        <div key={social.id} className={`flex items-center gap-3 p-4 rounded-2xl border transition-colors ${social.enabled ? 'bg-gray-800 border-gray-600' : 'bg-gray-800/50 border-gray-800'}`}>
                          <button
                            onClick={() => toggleSocial(social.id)}
                            className={`w-10 h-6 rounded-full flex-shrink-0 relative overflow-hidden transition-colors ${social.enabled ? 'bg-brand' : 'bg-gray-700'}`}
                          >
                            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${social.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                          <span className={`flex-shrink-0 transition-colors ${social.enabled ? 'text-white' : 'text-gray-600'}`}>{meta.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${social.enabled ? 'text-white' : 'text-gray-600'}`}>{meta.label}</div>
                            <input
                              type="url" placeholder={meta.placeholder} value={social.url}
                              onChange={(e) => setSocialUrl(social.id, e.target.value)} disabled={!social.enabled}
                              className="w-full px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder:text-gray-700 text-xs focus:outline-none focus:border-brand disabled:opacity-30 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleSaveSettings} disabled={savingSettings}
                    className="mt-6 w-full py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {settingsSaved ? <><CheckCircle size={16} /> {u.saved}</> : savingSettings ? <Loader size={16} className="animate-spin" /> : u.save}
                  </button>
                </section>
              )}

              {/* ── Malta Gym Tab ── */}
              {tab === 'gym' && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Dumbbell size={16} className="text-brand" />
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest">{u.gymTitle}</h3>
                  </div>
                  <p className="text-gray-500 text-xs mb-4">{u.gymHint}</p>

                  <div>
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1">{u.gymName}</label>
                    <input type="text" value={draft.gym.name} onChange={(e) => setGymField('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-brand" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1">{u.gymLocation}</label>
                    <input type="text" value={draft.gym.location} onChange={(e) => setGymField('location', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-brand" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-[11px] font-bold uppercase tracking-wider block mb-1">{u.gymOffer}</label>
                    <textarea value={draft.gym.offer} onChange={(e) => setGymField('offer', e.target.value)} rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-brand resize-none" />
                  </div>

                  <button
                    onClick={handleSaveSettings} disabled={savingSettings}
                    className="mt-2 w-full py-3 rounded-xl bg-brand text-black font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {settingsSaved ? <><CheckCircle size={16} /> {u.saved}</> : savingSettings ? <Loader size={16} className="animate-spin" /> : u.save}
                  </button>
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
