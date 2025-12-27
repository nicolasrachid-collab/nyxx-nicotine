"use client"

import React, { useEffect, useRef } from 'react';

interface AnimatedPaperBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

/**
 * Background animado usando CSS puro
 * Canvas Three.js desabilitado devido à incompatibilidade com React 19
 * Esta versão CSS oferece performance similar sem dependências problemáticas
 */
export function AnimatedPaperBackground({ 
  className = '', 
  intensity = 0.3,
  speed = 1.0 
}: AnimatedPaperBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Garantir que o elemento pai tenha position: relative
    const checkElement = () => {
      if (!containerRef.current) {
        requestAnimationFrame(checkElement);
        return;
      }

      const element = containerRef.current;
      const parent = element.parentElement;
      
      if (parent) {
        const parentComputedStyle = window.getComputedStyle(parent);
        if (parentComputedStyle.position !== 'relative' && 
            parentComputedStyle.position !== 'absolute' && 
            parentComputedStyle.position !== 'fixed') {
          parent.style.setProperty('position', 'relative', 'important');
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(checkElement);
    });
  }, []);

  // Calcular opacidades baseadas na intensidade
  // Usa intensidade como multiplicador, mantendo valores base mínimos visíveis
  const baseOpacity1 = 0.15;
  const baseOpacity2 = 0.12;
  const opacity1 = Math.max(0.05, baseOpacity1 * intensity);
  const opacity2 = Math.max(0.04, baseOpacity2 * intensity);
  
  // Calcular duração da animação baseada na velocidade
  // speed = 1.0 = 8s, speed = 0.8 = 10s (mais lento), speed = 2.0 = 4s (mais rápido)
  // Garantir que speed seja sempre > 0 para evitar divisão por zero ou Infinity
  const safeSpeed = Math.max(0.1, Math.abs(speed));
  const animationDuration = Math.max(2, 8 / safeSpeed);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <div 
        className="w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 165, 0, ${opacity1}) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 140, 0, ${opacity2}) 0%, transparent 50%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.99) 50%, rgba(255, 255, 255, 0.98) 100%)
          `,
          animation: `shimmer ${animationDuration}s ease-in-out infinite`,
        }}
      />
    </div>
  );
}
