import type { ReactNode } from 'react';
import { FlipText } from './FlipText';

/**
 * Shared editorial section header — a lime tick + kicker, an oversized
 * left-aligned display title (optionally revealed with the calendar-flip
 * effect) and an optional right-aligned action. Replaces the old centered
 * "title + subtitle" pattern site-wide.
 */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  action,
  flip = false,
  align = 'left',
  className = '',
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  flip?: boolean;
  align?: 'left' | 'center';
  className?: string;
}) {
  const center = align === 'center';
  return (
    <div
      className={`mb-10 flex flex-col gap-5 sm:mb-12 ${
        center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'
      } ${className}`}
    >
      <div className={center ? 'max-w-2xl' : 'max-w-3xl'}>
        {kicker && (
          <div
            className={`mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-gray-400 ${
              center ? 'justify-center' : ''
            }`}
          >
            <span className="h-px w-8 bg-brand" />
            {kicker}
          </div>
        )}
        <h2 className="font-display text-4xl uppercase leading-[0.9] text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          {flip ? <FlipText text={title} /> : title}
        </h2>
        {subtitle && (
          <p
            className={`mt-4 text-lg text-gray-500 dark:text-gray-400 ${
              center ? 'mx-auto max-w-xl' : 'max-w-xl'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
