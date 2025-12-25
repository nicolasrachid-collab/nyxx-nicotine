import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'outline' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const variantClasses = variant === 'outline' 
    ? 'border bg-transparent' 
    : 'bg-primary text-primary-foreground';
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  );
}

