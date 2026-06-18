import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseReady } from './firebase';

// Comma-separated allowlist of admin Gmail addresses (client-side UI gate).
// The REAL enforcement is in firestore.rules / storage.rules — keep them in sync.
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((s: string) => s.trim().toLowerCase())
  .filter(Boolean);

export const signInWithGoogle = async (): Promise<User> => {
  if (!auth) throw new Error('Firebase yapılandırılmamış (.env eksik).');
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
};

export const signOutAdmin = async (): Promise<void> => {
  if (!auth) return;
  await signOut(auth);
};

/** True only for an allow-listed, email-verified account. Safe default: false. */
export const isAdminUser = (user: User | null): boolean => {
  if (!user || !user.email || !user.emailVerified) return false;
  if (ADMIN_EMAILS.length === 0) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
};

// Subscribe to auth changes. Returns an unsubscribe fn.
// When Firebase isn't configured, immediately reports "logged out".
export const onAuthChange = (cb: (user: User | null) => void): (() => void) => {
  if (!isFirebaseReady || !auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
};
