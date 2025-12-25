import { ReactNode, ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  withArrow?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  withArrow = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black active:scale-[0.98]',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-50 focus:ring-black active:scale-[0.98]',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:ring-black active:scale-[0.98]',
  };
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${withArrow ? 'group' : ''}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowRight 
          size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} 
          className="ml-2 transition-transform group-hover:translate-x-1" 
          aria-hidden="true"
        />
      )}
    </button>
  );
}

