import { useEffect } from 'react';

/**
 * Hook para inicializar analytics
 * Configure sua chave de medição do Google Analytics aqui
 */
export function useAnalytics() {
  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === 'undefined') return;

    // Google Analytics 4
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (GA_MEASUREMENT_ID) {
      // Carregar script do Google Analytics
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(script2);
    }

    // Função para rastrear eventos (pode ser exportada se necessário)
    (window as any).trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
      if ((window as any).gtag && GA_MEASUREMENT_ID) {
        (window as any).gtag('event', eventName, eventParams);
      }
    };
  }, []);
}

/**
 * Função helper para rastrear eventos de página
 */
export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}

/**
 * Função helper para rastrear eventos customizados
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
}

