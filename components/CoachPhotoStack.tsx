import React, { useState } from 'react';
import { LazyImage } from './LazyImage';

interface CoachPhotoStackProps {
  photos: string[];
  name: string;
  badgeLabel: string;
}

export const CoachPhotoStack: React.FC<CoachPhotoStackProps> = ({
  photos,
  name,
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

        {/* Top badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-brand/90 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-black text-[10px] font-black uppercase tracking-widest">{badgeLabel}</span>
        </div>
      </div>

      {/* Accent photo — bottom-right corner */}
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
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Photo dots indicator */}
      <div className="absolute -bottom-12 left-0 right-[42%] flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'bg-brand w-6' : 'w-2 bg-gray-300 dark:bg-gray-700'
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
