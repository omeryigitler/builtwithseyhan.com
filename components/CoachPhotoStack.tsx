import React, { useState } from 'react';
import { LazyImage } from './LazyImage';

interface CoachPhotoStackProps {
  photos: string[];
  name: string;
  statNumber: string;
  statLabel: string;
  badgeLabel: string;
}

export const CoachPhotoStack: React.FC<CoachPhotoStackProps> = ({
  photos,
  name,
  statNumber,
  statLabel,
  badgeLabel,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const main = photos[activeIdx] ?? photos[0];
  const accent = photos[(activeIdx + 1) % photos.length];

  return (
    <div className="relative w-full select-none">
      {/* Main photo */}
      <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] shadow-2xl bg-gray-900 group">
        <LazyImage
          src={main}
          alt={name}
          className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
          loading="lazy"
          decoding="async"
        />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating stat badge */}
        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-white">
          <div className="text-3xl font-black leading-none">{statNumber}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/70 mt-0.5">{statLabel}</div>
        </div>

        {/* Top badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-brand/90 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-black text-[10px] font-black uppercase tracking-widest">{badgeLabel}</span>
        </div>
      </div>

      {/* Accent photo stack — bottom-right corner */}
      <div
        className="absolute -bottom-6 -right-6 w-[42%] aspect-[3/4] rounded-[1.5rem] overflow-hidden border-4 border-white dark:border-gray-950 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer bg-gray-900 z-10"
        onClick={() => setActiveIdx((activeIdx + 1) % photos.length)}
        title="Next photo"
      >
        <LazyImage
          src={accent}
          alt={`${name} alt`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
        {/* Click hint */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 hover:opacity-100 text-white text-xs font-bold uppercase tracking-wider transition-opacity duration-300">
            Next →
          </span>
        </div>
      </div>

      {/* Photo dots indicator */}
      <div className="absolute -bottom-12 left-0 right-[42%] flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'bg-brand w-6' : 'bg-gray-300 dark:bg-gray-700'
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
