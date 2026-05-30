import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  noPadding = false,
  children,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          // Clean white SaaS card panel
          'bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden'
        ),
        className
      )}
      {...props}
    >
      <div className={clsx({ 'p-6': !noPadding })}>{children}</div>
    </div>
  );
};

export default Card;
