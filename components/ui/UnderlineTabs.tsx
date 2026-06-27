'use client';

/**
 * Minimal editorial tabs: plain text with an animated lime underline on the
 * active item — deliberately not pill/chip styled. Scrolls horizontally on
 * small screens.
 */
export function UnderlineTabs<T extends string>({
  tabs,
  value,
  onChange,
  className = '',
}: {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={`no-scrollbar flex gap-6 overflow-x-auto border-b border-gray-200 sm:gap-9 dark:border-white/10 ${className}`}
    >
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={`relative shrink-0 pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              active
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200'
            }`}
          >
            {t.label}
            <span
              className={`absolute -bottom-px left-0 h-[3px] w-full origin-left rounded-full bg-brand transition-transform duration-300 ease-out ${
                active ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
