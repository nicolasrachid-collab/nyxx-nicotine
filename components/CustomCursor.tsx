import { useEffect, useRef } from 'react';

interface CustomCursorProps {
  size?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

export function CustomCursor({
  size = 20,
  color = 'rgba(0, 0, 0, 0.1)',
  borderColor = '#000000',
  borderWidth = 2
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const followerPosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Verifica se é dispositivo touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Atualiza posição do cursor principal imediatamente
      cursor.style.left = `${e.clientX - size / 2}px`;
      cursor.style.top = `${e.clientY - size / 2}px`;
    };

    const animate = () => {
      if (!follower) return;

      // Interpolação suave para o follower
      const dx = mousePosRef.current.x - followerPosRef.current.x;
      const dy = mousePosRef.current.y - followerPosRef.current.y;
      
      followerPosRef.current.x += dx * 0.15;
      followerPosRef.current.y += dy * 0.15;

      follower.style.left = `${followerPosRef.current.x - size / 2}px`;
      follower.style.top = `${followerPosRef.current.y - size / 2}px`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    };

    // Inicializa posição do follower
    followerPosRef.current = { x: mousePosRef.current.x, y: mousePosRef.current.y };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    animate();

    // Interações com elementos
    const handleLinkEnter = () => {
      if (cursor) {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
      }
      if (follower) {
        follower.style.transform = 'scale(1.2)';
      }
    };

    const handleLinkLeave = () => {
      if (cursor) {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = color;
      }
      if (follower) {
        follower.style.transform = 'scale(1)';
      }
    };

    // Adiciona listeners para links e botões
    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size, color]);

  return (
    <>
      {/* Cursor principal (bolinha pequena) */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: color,
          border: `${borderWidth}px solid ${borderColor}`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.2s ease-out, background-color 0.2s ease-out',
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Cursor follower (bolinha maior que segue) */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          width: `${size * 2}px`,
          height: `${size * 2}px`,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: `${borderWidth}px solid ${borderColor}`,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'transform 0.3s ease-out',
          opacity: 0.5,
        }}
      />
    </>
  );
}

