'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Calendar leaf" reveal — each glyph folds down from its top edge with a
 * stagger, like the page of a flip calendar dropping into place. Animates
 * the first time it scrolls into view. The visible text is exposed to
 * assistive tech via aria-label; the per-glyph spans are hidden.
 */
export function FlipText({
  text,
  className = '',
  charClassName = '',
  stagger = 45,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  let i = 0;

  return (
    <span ref={ref} aria-label={text} className={`inline-block [perspective:900px] ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap align-top">
          {Array.from(word).map((ch) => {
            const delay = i++ * stagger;
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`inline-block origin-top transition-all duration-[600ms] ease-out will-change-transform motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:transition-none ${charClassName} ${
                  shown
                    ? 'opacity-100 [transform:rotateX(0deg)]'
                    : 'opacity-0 [transform:rotateX(-92deg)]'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
