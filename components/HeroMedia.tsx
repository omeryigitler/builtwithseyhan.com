'use client';

import { useEffect, useRef, useState } from 'react';

const POSTER = '/images/hero.jpg';
const CLIPS = ['/hero/clip1.mp4', '/hero/clip2.mp4', '/hero/clip3.mp4', '/hero/clip4.mp4'];
const PHOTO_MS = 4000;

type Phase = 'photo' | number; // 'photo' or a clip index

/**
 * Full-screen hero background collage: the photo holds for ~4s, then the
 * clips play back-to-back, then it loops. All muted/looping for autoplay.
 */
export function HeroMedia() {
  const [phase, setPhase] = useState<Phase>('photo');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hold on the photo, then start the clips.
  useEffect(() => {
    if (phase !== 'photo') return;
    const t = setTimeout(() => setPhase(0), PHOTO_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Autoplay each clip when it becomes active.
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
      {/* Photo */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          phase === 'photo' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url('${POSTER}')` }}
        aria-hidden="true"
      />

      {/* Active clip (remounts per index so it loads + autoplays) */}
      {typeof phase === 'number' && (
        <video
          ref={videoRef}
          key={phase}
          className="absolute inset-0 h-full w-full object-cover"
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
