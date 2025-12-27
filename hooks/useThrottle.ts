import { useCallback, useRef } from 'react';

/**
 * Hook para throttling de funções
 * Útil para otimizar eventos que disparam frequentemente (scroll, resize, etc)
 * 
 * @param callback - Função a ser throttled
 * @param delay - Delay em milissegundos entre execuções
 * @returns Função throttled
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;
      
      if (timeSinceLastRun >= delay) {
        // Executar imediatamente se passou o delay
        callback(...args);
        lastRun.current = now;
      } else {
        // Agendar execução para o próximo frame disponível
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
          timeoutRef.current = null;
        }, delay - timeSinceLastRun);
      }
    }) as T,
    [callback, delay]
  );
}

