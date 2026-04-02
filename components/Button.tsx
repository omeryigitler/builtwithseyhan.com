import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-full";
  
  const variants = {
    // Primary: Volt Green with Black Text (Works in both modes)
    primary: "bg-brand text-black hover:bg-brand-hover hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_rgba(204,255,0,0.4)] border border-transparent",
    
    // Secondary: Dark text on light, or White on dark
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm dark:bg-white dark:text-gray-900",
    
    // Outline: Adaptive border color
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white backdrop-blur-sm",
    
    // Ghost: Adaptive text color
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};