import { useState, useRef, useEffect, ReactNode } from 'react';

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: ReactNode;
}

export function AnimatedStat({ value, suffix, label }: AnimatedStatProps) {
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
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
          {count}
        </span>
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
          {suffix}
        </span>
      </div>
      <div className="mt-4 text-xs md:text-sm font-medium text-gray-500 max-w-[200px] leading-snug">
        {label}
      </div>
    </div>
  );
}
