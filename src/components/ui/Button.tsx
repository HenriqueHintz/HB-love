import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            'bg-rose-500 text-white hover:bg-rose-600 shadow-md': variant === 'primary',
            'bg-white/50 dark:bg-gray-700/50 text-rose-900 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-rose-200 dark:border-gray-600': variant === 'secondary',
            'hover:bg-rose-100/50 dark:hover:bg-gray-700/50 text-rose-800 dark:text-gray-300': variant === 'ghost',
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
