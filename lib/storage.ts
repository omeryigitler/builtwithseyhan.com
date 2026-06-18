import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

/** Downscale + compress an image in the browser before upload (keeps Storage small & fast). */
const compressImage = (file: File, maxSize = 1280, quality = 0.82): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas desteklenmiyor.'));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Görsel işlenemedi.'))),
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Görsel okunamadı.'));
    };
    img.src = url;
  });

/** Compress `file`, upload to `path` in Storage, return its public download URL. */
export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!storage) throw new Error('Firebase yapılandırılmamış.');
  const blob = await compressImage(file);
  const objectRef = ref(storage, path);
  await uploadBytes(objectRef, blob, { contentType: 'image/jpeg' });
  return getDownloadURL(objectRef);
};

/** Best-effort delete; ignores "not found". */
export const deleteImage = async (path: string): Promise<void> => {
  if (!storage) return;
  try {
    await deleteObject(ref(storage, path));
  } catch {
    /* already gone — ignore */
  }
};
