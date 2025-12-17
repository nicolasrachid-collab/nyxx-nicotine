import { useEffect, useRef } from 'react';

interface CustomCursorProps {
  size?: number;
}

export function CustomCursor({ size = 24 }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Verifica se é dispositivo touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      return;
    }

    // Esconde cursor nativo
    document.body.style.cursor = 'none';

    const updateMousePosition = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Interpolação suave
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      
      posRef.current.x += dx * 0.15;
      posRef.current.y += dy * 0.15;

      const currentSize = isHoveringRef.current ? size * 2.5 : size;
      
      if (cursor) {
        cursor.style.left = `${posRef.current.x - currentSize / 2}px`;
        cursor.style.top = `${posRef.current.y - currentSize / 2}px`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
    };

    // Interações com elementos clicáveis
    const handleLinkEnter = () => {
      isHoveringRef.current = true;
      if (cursor) {
        cursor.style.width = `${size * 2.5}px`;
        cursor.style.height = `${size * 2.5}px`;
      }
    };

    const handleLinkLeave = () => {
      isHoveringRef.current = false;
      if (cursor) {
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    animate();

    // Adiciona listeners para links e botões
    const addListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkEnter);
        link.addEventListener('mouseleave', handleLinkLeave);
      });
    };

    addListeners();
    
    // Observer para novos elementos
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transition: 'width 0.3s ease-out, height 0.3s ease-out',
      }}
    />
  );
}
