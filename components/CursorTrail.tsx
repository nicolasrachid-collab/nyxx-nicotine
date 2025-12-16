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

    const animate = () => {
      if (!container) return;

      // Limpa o container
      container.innerHTML = '';

      const now = Date.now();
      const maxAge = 500; // Remove pontos mais antigos que 500ms

      // Filtra pontos muito antigos
      trailRef.current = trailRef.current.filter(
        point => now - point.timestamp < maxAge
      );

      // Renderiza cada pixel da trilha
      trailRef.current.forEach((point, index) => {
        const progress = index / Math.max(trailRef.current.length - 1, 1);
        const age = (now - point.timestamp) / maxAge;
        const size = pixelSize * (1 - progress * 0.6); // Diminui o tamanho ao longo da trilha
        const currentOpacity = opacity * (1 - progress) * (1 - age * 0.5); // Diminui a opacidade

        // Aplica pixelização (arredonda para múltiplos do pixelSize)
        const pixelatedX = Math.round(point.x / spacing) * spacing;
        const pixelatedY = Math.round(point.y / spacing) * spacing;

        const pixel = document.createElement('div');
        pixel.style.position = 'fixed';
        pixel.style.left = `${pixelatedX - size / 2}px`;
        pixel.style.top = `${pixelatedY - size / 2}px`;
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.style.backgroundColor = color;
        pixel.style.opacity = Math.max(0, currentOpacity).toString();
        pixel.style.pointerEvents = 'none';
        pixel.style.zIndex = '9999';
        pixel.style.borderRadius = '1px';
        pixel.style.transition = 'none';
        pixel.style.imageRendering = 'pixelated';
        pixel.style.willChange = 'transform, opacity';

        container.appendChild(pixel);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Só ativa em dispositivos com mouse (não touch)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
      animate();
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

