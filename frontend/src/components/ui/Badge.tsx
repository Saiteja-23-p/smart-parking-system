import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'info' | 'warning' | 'error' | 'default';
  showPip?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'success',
  showPip = false,
  children,
  ...props
}) => {
  return (
    <span
      className={twMerge(
        clsx(
          // Clean SaaS badge
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none',
          
          {
            // Success (Vibrant Green)
            'bg-emerald-50 text-emerald-700 border border-emerald-200': variant === 'success',
            // Info (Blue)
            'bg-blue-50 text-blue-700 border border-blue-200': variant === 'info',
            // Warning (Amber)
            'bg-amber-50 text-amber-700 border border-amber-200': variant === 'warning',
            // Error (Red)
            'bg-red-50 text-red-700 border border-red-200': variant === 'error',
            // Default
            'bg-slate-50 text-slate-700 border border-slate-200': variant === 'default',
          }
        ),
        className
      )}
      {...props}
    >
      {showPip && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={clsx('relative inline-flex rounded-full h-1.5 w-1.5', {
              'bg-emerald-500': variant === 'success',
              'bg-blue-500': variant === 'info',
              'bg-amber-500': variant === 'warning',
              'bg-red-500': variant === 'error',
              'bg-slate-500': variant === 'default',
            })}
          />
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
