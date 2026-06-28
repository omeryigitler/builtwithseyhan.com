'use client';

import { useId } from 'react';
import { Play } from 'lucide-react';

/**
 * A play button with circular text that rotates around it on hover.
 * Place inside a `group` element; the rotating ring fades in on group-hover.
 */
export function RotatingPlay({
  label = 'PLAY',
  size = 92,
}: {
  label?: string;
  size?: number;
}) {
  const id = useId().replace(/:/g, '');
  const ring = `${label} • ${label} • ${label} • ${label} • `;

  return (
    <span
      className="pointer-events-none relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-white opacity-0 transition-opacity duration-300 [animation:spin_9s_linear_infinite] group-hover:opacity-100"
        aria-hidden="true"
      >
        <defs>
          <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
        </defs>
        <text className="fill-current text-[8.5px] font-bold uppercase tracking-[0.25em]">
          <textPath href={`#${id}`} startOffset="0">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="flex items-center justify-center rounded-full bg-brand text-black shadow-[0_8px_30px_rgba(204,255,0,0.5)] transition-transform duration-300 group-hover:scale-110"
        style={{ width: size * 0.46, height: size * 0.46 }}
      >
        <Play size={size * 0.2} className="ml-0.5" fill="currentColor" />
      </span>
    </span>
  );
}
