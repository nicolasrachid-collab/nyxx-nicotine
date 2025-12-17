import { useEffect, useRef } from 'react';

interface DeusaAnimationProps {
  className?: string;
  duration?: number;
}

export function DeusaAnimation({ className = '', duration = 4 }: DeusaAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAndAnimateSvg = async () => {
      try {
        const response = await fetch('/deusa_banner.svg');
        const svgText = await response.text();
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svgText;
          
          const svg = containerRef.current.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.position = 'absolute';
            svg.style.inset = '0';
            
            const paths = svg.querySelectorAll('path');
            
            // Preparar paths para animação
            paths.forEach((path) => {
              const length = path.getTotalLength?.() || 1000;
              const computedStyle = window.getComputedStyle(path);
              const currentFill = computedStyle.fill;
              
              // Salvar fill original
              path.setAttribute('data-original-fill', currentFill);
              
              // Forçar stroke visível usando a cor do fill
              const strokeColor = currentFill !== 'none' && currentFill !== 'rgba(0, 0, 0, 0)' ? currentFill : '#4D4D4D';
              path.setAttribute('stroke', strokeColor);
              path.setAttribute('stroke-width', '2');
              path.setAttribute('stroke-linecap', 'round');
              path.setAttribute('stroke-linejoin', 'round');
              
              // Esconder fill inicialmente
              path.style.fill = 'transparent';
              path.style.strokeDasharray = `${length}`;
              path.style.strokeDashoffset = `${length}`;
            });

            // Animar cada path
            const pathDuration = duration * 0.6;
            
            paths.forEach((path, index) => {
              const delay = (index / paths.length) * (duration * 0.5);
              
              // Animação do stroke
              path.style.transition = `stroke-dashoffset ${pathDuration}s ease-out ${delay}s, fill ${pathDuration * 0.3}s ease-in-out ${delay + pathDuration * 0.7}s`;
              
              // Trigger animation
              requestAnimationFrame(() => {
                path.style.strokeDashoffset = '0';
                path.style.fill = path.getAttribute('data-original-fill') || '#4D4D4D';
              });
            });
          }
        }
      } catch (error) {
        console.error('Failed to load SVG:', error);
      }
    };

    loadAndAnimateSvg();
  }, [duration]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor: '#050505',
      }}
    />
  );
}
