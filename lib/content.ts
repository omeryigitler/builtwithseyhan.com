import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseReady } from './firebase';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CustomTestimonial {
  id: string;
  name: string;
  result: string;
  timeframe: string;
  quote: string;
  imageBefore: string; // Firebase Storage download URL
  imageAfter: string; // Firebase Storage download URL
  order?: number;
}

export type SocialPlatformId =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitter'
  | 'linkedin'
  | 'facebook'
  | 'whatsapp'
  | 'email';

export interface SocialLink {
  id: SocialPlatformId;
  url: string;
  enabled: boolean;
}

export interface GymInfo {
  name: string;
  location: string;
  offer: string;
}

export interface SiteSettings {
  socials: SocialLink[];
  gym: GymInfo;
}

// ─── Defaults ───────────────────────────────────────────────────────────────

export const DEFAULT_SOCIALS: SocialLink[] = [
  { id: 'instagram', url: '', enabled: false },
  { id: 'tiktok', url: '', enabled: false },
  { id: 'youtube', url: '', enabled: false },
  { id: 'twitter', url: '', enabled: false },
  { id: 'linkedin', url: '', enabled: false },
  { id: 'facebook', url: '', enabled: false },
  { id: 'whatsapp', url: '', enabled: false },
  { id: 'email', url: '', enabled: false },
];

export const DEFAULT_GYM: GymInfo = { name: '', location: 'Malta', offer: '' };

export const DEFAULT_SETTINGS: SiteSettings = {
  socials: DEFAULT_SOCIALS,
  gym: DEFAULT_GYM,
};

// ─── Testimonials ───────────────────────────────────────────────────────────

const TESTIMONIALS = 'testimonials';

/** Live subscription. Calls back with [] when Firebase isn't configured. */
export const subscribeTestimonials = (
  cb: (items: CustomTestimonial[]) => void
): (() => void) => {
  if (!isFirebaseReady || !db) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    collection(db, TESTIMONIALS),
    (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<CustomTestimonial, 'id'>),
      }));
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      cb(items);
    },
    () => cb([])
  );
};

export const saveTestimonial = async (t: CustomTestimonial): Promise<void> => {
  if (!db) throw new Error('Firebase yapılandırılmamış.');
  const { id, ...data } = t;
  await setDoc(
    doc(db, TESTIMONIALS, id),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  if (!db) return;
  await deleteDoc(doc(db, TESTIMONIALS, id));
};

// ─── Site settings (single doc: settings/site) ──────────────────────────────

const SETTINGS_COLLECTION = 'settings';
const SETTINGS_DOC = 'site';

const mergeSettings = (data?: Partial<SiteSettings>): SiteSettings => ({
  socials: DEFAULT_SOCIALS.map(
    (d) => data?.socials?.find((s) => s.id === d.id) ?? d
  ),
  gym: { ...DEFAULT_GYM, ...(data?.gym ?? {}) },
});

export const subscribeSettings = (
  cb: (settings: SiteSettings) => void
): (() => void) => {
  if (!isFirebaseReady || !db) {
    cb(DEFAULT_SETTINGS);
    return () => {};
  }
  return onSnapshot(
    doc(db, SETTINGS_COLLECTION, SETTINGS_DOC),
    (snap) => cb(mergeSettings(snap.data() as Partial<SiteSettings> | undefined)),
    () => cb(DEFAULT_SETTINGS)
  );
};

export const saveSettings = async (settings: SiteSettings): Promise<void> => {
  if (!db) throw new Error('Firebase yapılandırılmamış.');
  await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC), settings, {
    merge: true,
  });
};
