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
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A574]/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            'bg-gradient-to-r from-[#D4A574] to-[#C97B8B] text-[#0A0A0C] font-semibold hover:shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:scale-[1.02]': variant === 'primary',
            'bg-white/6 text-[#F0EDE8]/80 hover:bg-white/10 border border-white/8': variant === 'secondary',
            'hover:bg-white/6 text-[#9A9590]': variant === 'ghost',
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
