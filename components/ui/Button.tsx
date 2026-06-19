import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const base =
  'inline-flex items-center justify-center gap-2 font-bold tracking-tight rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-black hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(204,255,0,0.4)] border border-transparent',
  secondary:
    'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm dark:bg-white dark:text-gray-900',
  outline:
    'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black backdrop-blur-sm',
  ghost:
    'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

export function buttonClasses(opts?: {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}): string {
  const { variant = 'primary', size = 'md', fullWidth = false, className = '' } = opts ?? {};
  return `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => (
  <button className={buttonClasses({ variant, size, fullWidth, className })} {...props}>
    {icon}
    {children}
  </button>
);
