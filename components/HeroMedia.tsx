'use client';

import { useEffect, useRef, useState } from 'react';

const POSTER = '/images/hero.jpg';
const CLIPS = ['/hero/clip1.mp4', '/hero/clip2.mp4', '/hero/clip3.mp4', '/hero/clip4.mp4'];
const PHOTO_MS = 4000;

type Phase = 'photo' | number; // 'photo' or a clip index

/**
 * Full-screen hero background collage: the photo holds for ~4s, then the
 * clips play back-to-back, then it loops. Media is shown fully (contain) so
 * the subject isn't cropped/zoomed; a blurred copy fills the screen behind it.
 */
export function HeroMedia() {
  const [phase, setPhase] = useState<Phase>('photo');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (phase !== 'photo') return;
    const t = setTimeout(() => setPhase(0), PHOTO_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (typeof phase === 'number' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [phase]);

  const next = () =>
    setPhase((p) => {
      if (typeof p !== 'number') return 0;
      return p + 1 >= CLIPS.length ? 'photo' : p + 1;
    });

  return (
    <div className="absolute inset-0 -z-20 bg-gray-950">
      {/* Blurred backdrop fills the screen (no empty bars) */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-35 blur-2xl"
        style={{ backgroundImage: `url('${POSTER}')` }}
        aria-hidden="true"
      />

      {/* Foreground photo — fully visible (contained), not zoomed/cropped */}
      <div
        className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-700 ${
          phase === 'photo' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url('${POSTER}')` }}
        aria-hidden="true"
      />

      {/* Active clip — fully visible (contained) */}
      {typeof phase === 'number' && (
        <video
          ref={videoRef}
          key={phase}
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={POSTER}
          onEnded={next}
          onError={next}
          aria-hidden="true"
        >
          <source src={CLIPS[phase]} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
