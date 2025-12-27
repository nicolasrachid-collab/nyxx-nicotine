import { useEffect, useRef } from 'react';

interface CursorTrailProps {
  pixelSize?: number;
  trailLength?: number;
  color?: string;
  opacity?: number;
  spacing?: number;
}

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export function CursorTrail({ 
  pixelSize = 8, 
  trailLength = 20,
  color = '#000000',
  opacity = 0.5,
  spacing = 3
}: CursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const trailIdRef = useRef(0);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle para melhor performance
      if (now - lastUpdateRef.current < 16) return; // ~60fps
      lastUpdateRef.current = now;

      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Adiciona nova posição à trilha
      trailIdRef.current += 1;
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current,
        timestamp: now
      });

      // Mantém apenas os últimos elementos da trilha
      if (trailRef.current.length > trailLength) {
        trailRef.current.shift();
      }
    };

    // Pool de elementos para reutilização (evita criar/destruir DOM)
    const elementPool: HTMLDivElement[] = [];
    const getPooledElement = (): HTMLDivElement => {
      if (elementPool.length > 0) {
        return elementPool.pop()!;
      }
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.borderRadius = '1px';
      el.style.transition = 'none';
      el.style.imageRendering = 'pixelated';
      el.style.willChange = 'transform, opacity';
      return el;
    };

    let lastFrameTime = performance.now();
    const targetFPS = 30; // Reduzir FPS para melhor performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!container) return;

      // Throttle para controlar FPS
      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      const now = Date.now();
      const maxAge = 500; // Remove pontos mais antigos que 500ms

      // Filtra pontos muito antigos
      trailRef.current = trailRef.current.filter(
        point => now - point.timestamp < maxAge
      );

      // Reutilizar elementos existentes ou criar novos
      const existingElements = Array.from(container.children) as HTMLDivElement[];
      const neededElements = trailRef.current.length;

      // Remover elementos extras
      while (existingElements.length > neededElements) {
        const el = existingElements.pop()!;
        container.removeChild(el);
        elementPool.push(el);
      }

      // Renderiza cada pixel da trilha
      trailRef.current.forEach((point, index) => {
        const progress = index / Math.max(trailRef.current.length - 1, 1);
        const age = (now - point.timestamp) / maxAge;
        const size = pixelSize * (1 - progress * 0.6); // Diminui o tamanho ao longo da trilha
        const currentOpacity = opacity * (1 - progress) * (1 - age * 0.5); // Diminui a opacidade

        // Aplica pixelização (arredonda para múltiplos do pixelSize)
        const pixelatedX = Math.round(point.x / spacing) * spacing;
        const pixelatedY = Math.round(point.y / spacing) * spacing;

        let pixel: HTMLDivElement;
        if (index < existingElements.length) {
          // Reutilizar elemento existente
          pixel = existingElements[index];
        } else {
          // Criar novo elemento (do pool ou novo)
          pixel = getPooledElement();
          container.appendChild(pixel);
        }

        // Atualizar propriedades
        pixel.style.left = `${pixelatedX - size / 2}px`;
        pixel.style.top = `${pixelatedY - size / 2}px`;
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.style.backgroundColor = color;
        pixel.style.opacity = Math.max(0, currentOpacity).toString();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Só ativa em dispositivos com mouse (não touch)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
      animate(performance.now());
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pixelSize, trailLength, color, opacity, spacing]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}

