import { useEffect, useRef, type RefObject } from 'react';

interface AnimatedGradientProps {
  gradientId: string;
  stop1Ref: RefObject<SVGStopElement>;
  stop2Ref: RefObject<SVGStopElement>;
}

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

export function AnimatedGradient({ gradientId, stop1Ref, stop2Ref }: AnimatedGradientProps) {
  const colors = ["#6D4A30", "#FFD867", "#E17237", "#E5989B", "#94C1D5"];
  const colorsShifted = [...colors.slice(1), colors[0]];

  useEffect(() => {
    if (!stop1Ref.current || !stop2Ref.current) {
      return;
    }

    let startTime = Date.now();
    let animationFrameId: number | null = null;
    
    const animateStops = () => {
      if (!stop1Ref.current || !stop2Ref.current) {
        animationFrameId = requestAnimationFrame(animateStops);
        return;
      }
      
      const elapsed = (Date.now() - startTime) / 1000;
      const cycleTime = 15; // 15 segundos para um ciclo completo (mais lento e suave)
      const totalCycleTime = cycleTime * 2; // ida e volta
      
      // Progresso normalizado de 0 a 1 (com reversão)
      const rawProgress = (elapsed % totalCycleTime) / totalCycleTime;
      const isReversing = rawProgress > 0.5;
      const normalizedProgress = isReversing 
        ? 1 - (rawProgress - 0.5) * 2 
        : rawProgress * 2;
      
      // Aplicar easing para transição mais suave
      const easedProgress = easeInOutCubic(normalizedProgress);
      
      // Calcular posição no array de cores (com interpolação)
      const colorPosition1 = easedProgress * colors.length;
      const colorIndex1 = Math.floor(colorPosition1) % colors.length;
      const nextIndex1 = (colorIndex1 + 1) % colors.length;
      const t1 = colorPosition1 - Math.floor(colorPosition1);
      
      // Segundo stop com offset para criar efeito de "onda"
      const colorPosition2 = (easedProgress * colorsShifted.length + 0.3) % colorsShifted.length;
      const colorIndex2 = Math.floor(colorPosition2) % colorsShifted.length;
      const nextIndex2 = (colorIndex2 + 1) % colorsShifted.length;
      const t2 = colorPosition2 - Math.floor(colorPosition2);
      
      // Interpolar entre as cores para transição suave
      const newColor1 = lerpColor(colors[colorIndex1], colors[nextIndex1], t1);
      const newColor2 = lerpColor(colorsShifted[colorIndex2], colorsShifted[nextIndex2], t2);
      
      // Aplicar cores diretamente nos atributos SVG
      if (stop1Ref.current) {
        stop1Ref.current.setAttribute('stop-color', newColor1);
      }
      if (stop2Ref.current) {
        stop2Ref.current.setAttribute('stop-color', newColor2);
      }
      
      animationFrameId = requestAnimationFrame(animateStops);
    };
    
    animateStops();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [stop1Ref, stop2Ref, colors, colorsShifted, gradientId]);

  return null;
}

