"use client"

import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ShaderPlane } from './ShaderPlane';

interface AnimatedPaperBackgroundProps {
  className?: string;
  intensity?: number;
  speed?: number;
}

/**
 * Versão com shader Three.js para efeitos avançados
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
      <Suspense fallback={
        <div 
          className="w-full h-full bg-gradient-to-br from-orange-50 to-white opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 165, 0, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 140, 0, 0.12) 0%, transparent 50%),
              linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.99) 50%, rgba(255, 255, 255, 0.98) 100%)
            `
          }}
        />
      }>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          style={{ 
            width: '100%', 
            height: '100%',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          gl={{ 
            alpha: true, 
            antialias: true,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor('#ffffff', 0);
          }}
        >
          <ShaderPlane 
            position={[0, 0, 0]} 
            color1="#ffa500"
            color2="#ffffff"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
