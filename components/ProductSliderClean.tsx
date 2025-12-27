import { useState, useRef, useEffect } from 'react';

interface Product {
  name: string;
  image: string;
}

interface ProductSliderCleanProps {
  products: Product[];
}

// Cores por sabor
const flavorColors: Record<string, string> = {
  Coffee: '#6D4A30',
  Energy: '#FFD867',
  Mango: '#E17237',
  Watermelon: '#E5989B',
  Menthol: '#94C1D5',
};

export function ProductSliderClean({ products }: ProductSliderCleanProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  
  // Manter ref sincronizado com state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Detectar quando a seção entra na view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Controle de scroll por wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      
      const rect = container.getBoundingClientRect();
      // Mais permissivo: a seção está visível se pelo menos 50% está na viewport
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      const isInViewport = visibleHeight > rect.height * 0.4;
      
      if (!isInViewport) return;

      // Prevenir scroll apenas se não estiver no primeiro/último item
      const currentIdx = activeIndexRef.current;
      if (
        (e.deltaY > 0 && currentIdx < products.length - 1) ||
        (e.deltaY < 0 && currentIdx > 0)
      ) {
        e.preventDefault();
        isScrolling.current = true;

        if (e.deltaY > 0 && currentIdx < products.length - 1) {
          setActiveIndex(currentIdx + 1);
        } else if (e.deltaY < 0 && currentIdx > 0) {
          setActiveIndex(currentIdx - 1);
        }

        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isInView, products.length]);

  const activeProduct = products[activeIndex];
  const activeColor = flavorColors[activeProduct?.name] || '#888888';

  return (
    <div 
      ref={containerRef}
      className="relative h-[80vh] overflow-hidden"
    >

      {/* Container dos produtos */}
      <div className="relative h-full flex items-center justify-center">
        {products.map((product, index) => {
          const color = flavorColors[product.name] || '#888888';
          const isActive = index === activeIndex;
          const isPrev = index < activeIndex;
          const isNext = index > activeIndex;
          
          return (
            <div
              key={product.name}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                isActive 
                  ? 'opacity-100 translate-y-0 scale-100 z-10' 
                  : isPrev 
                    ? 'opacity-0 -translate-y-full scale-90 z-0'
                    : 'opacity-0 translate-y-full scale-90 z-0'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto px-8">
                {/* Imagem do produto com animação floating */}
                <div 
                  className={`relative w-64 md:w-80 lg:w-96 transition-all duration-1000 ease-out ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
                  }`}
                  style={{
                    animation: isActive ? 'float 4s ease-in-out infinite' : 'none',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-auto object-contain transition-all duration-700 ${
                      isActive ? 'drop-shadow-2xl' : ''
                    }`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      filter: isActive ? `drop-shadow(0 20px 40px rgba(0,0,0,0.15))` : 'none',
                    }}
                  />
                </div>

                {/* Info */}
                <div 
                  className={`text-center md:text-left transition-all duration-700 delay-200 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                >
                  <span 
                    className="text-sm font-medium tracking-widest uppercase"
                    style={{ color }}
                  >
                    Nyxx® Nicotine
                  </span>
                  <h1 
                    className="text-4xl md:text-5xl lg:text-[38px] font-bold tracking-tight mt-2"
                    style={{ color }}
                  >
                    {product.name}
                  </h1>
                  <p className="text-gray-500 text-lg mt-4 max-w-md">
                    Experimente o sabor premium com tecnologia de ponta.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicador de navegação lateral */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {products.map((product, index) => {
          const color = flavorColors[product.name] || '#888888';
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'scale-125' : 'opacity-40 hover:opacity-70'
              }`}
              style={{
                background: index === activeIndex ? color : '#999',
                boxShadow: index === activeIndex ? `0 0 20px ${color}` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Contador */}
      <div className="absolute bottom-8 left-8 font-mono text-8xl font-bold text-gray-200/30 select-none z-0">
        {String(activeIndex + 1).padStart(2, '0')}
      </div>

      {/* Instrução de scroll */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
        activeIndex === products.length - 1 ? 'opacity-0' : 'opacity-60'
      }`}>
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
