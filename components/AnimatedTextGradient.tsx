import { useEffect, useState } from 'react';

// Função para converter hex para RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

// Função para converter RGB para hex
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

// Função de interpolação linear de cores
function lerpColor(color1: string, color2: string, t: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const r = rgb1[0] + (rgb2[0] - rgb1[0]) * t;
  const g = rgb1[1] + (rgb2[1] - rgb1[1]) * t;
  const b = rgb1[2] + (rgb2[2] - rgb1[2]) * t;
  return rgbToHex(r, g, b);
}

// Função de easing suave (ease-in-out)
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface AnimatedLineGradientProps {
  className?: string;
}

export function AnimatedLineGradient({ className = '' }: AnimatedLineGradientProps) {
  const colors = ["#6D4A30", "#FFD867", "#E17237", "#E5989B", "#94C1D5"];
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId: number | null = null;
    
    const animateColors = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const cycleTime = 3; // 3 segundos para um ciclo completo (5x mais rápido)
      
      // Progresso normalizado de 0 a 1 (loop contínuo imediato)
      const rawProgress = (elapsed % cycleTime) / cycleTime;
      
      // Calcular posição no array de cores (com interpolação)
      const colorPosition = rawProgress * colors.length;
      const colorIndex = Math.floor(colorPosition) % colors.length;
      // Quando está na última cor, próxima é a primeira (loop imediato)
      const nextIndex = colorIndex === colors.length - 1 ? 0 : (colorIndex + 1) % colors.length;
      const t = colorPosition - Math.floor(colorPosition);
      
      // Interpolar entre as cores para transição suave
      const newColor = lerpColor(colors[colorIndex], colors[nextIndex], t);
      
      setCurrentColor(newColor);
      
      animationFrameId = requestAnimationFrame(animateColors);
    };
    
    animateColors();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <span
      className={`block w-12 h-0.5 bg-gradient-to-r from-transparent via-[${currentColor}] to-transparent group-hover:w-20 transition-all duration-500 ease-out ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, transparent, ${currentColor}, transparent)`,
      }}
    />
  );
}

