import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            // Modern clean SaaS button
            'font-medium rounded-lg text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 flex items-center justify-center gap-2',
            
            // Width
            {
              'w-full': fullWidth,
            },

            // Sizes
            {
              'px-3.5 py-2 text-xs': size === 'sm',
              'px-5 py-2.5 text-sm': size === 'md',
              'px-6 py-3.5 text-base': size === 'lg',
            },
            
            // Variants
            {
              // Primary (Royal Blue)
              'bg-[#2563EB] text-white hover:bg-[#1d4ed8] focus:ring-[#2563EB] border border-transparent shadow-sm': variant === 'primary',
              // Secondary (Deep Slate)
              'bg-[#0F172A] text-white hover:bg-[#1e293b] focus:ring-[#0F172A] border border-transparent shadow-sm': variant === 'secondary',
              // Ghost
              'bg-transparent text-gray-600 hover:bg-gray-50 border border-transparent': variant === 'ghost',
              // Danger
              'bg-[#EF4444] text-white hover:bg-[#dc2626] focus:ring-[#EF4444] border border-transparent shadow-sm': variant === 'danger',
              // Success
              'bg-[#22C55E] text-white hover:bg-[#16a34a] focus:ring-[#22C55E] border border-transparent shadow-sm': variant === 'success',
            }
          ),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
