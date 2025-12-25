import { useState, useRef, useEffect, ReactNode } from 'react';

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: ReactNode;
  textColor?: string;
  labelColor?: string;
  textSize?: string;
  labelSize?: string;
  maxWidth?: string;
}

export function AnimatedStat({ 
  value, 
  suffix, 
  label, 
  textColor = 'text-black',
  labelColor = 'text-gray-500',
  textSize = 'text-5xl md:text-6xl lg:text-7xl',
  labelSize = 'text-xs md:text-sm',
  maxWidth = 'max-w-[200px]'
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(ease * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={elementRef} className="flex flex-col">
      <div className="flex items-baseline">
        <span className={`${textSize} font-bold tracking-tight ${textColor}`}>
          {count}
        </span>
        <span className={`${textSize} font-bold tracking-tight ${textColor}`}>
          {suffix}
        </span>
      </div>
      <div className={`mt-4 ${labelSize} font-medium ${labelColor} ${maxWidth} leading-snug`}>
        {label}
      </div>
    </div>
  );
}
