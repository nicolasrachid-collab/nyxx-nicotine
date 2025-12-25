import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { products } from '../../data/products';

export function ProductsSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInView) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      
      const rect = container.getBoundingClientRect();
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(window.innerHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      const isInViewport = visibleHeight > rect.height * 0.4;
      
      if (!isInViewport) return;

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
  }, [isInView]);

  const activeProduct = products[activeIndex];

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-28 pb-12 md:pb-16 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
            <Plus size={14} strokeWidth={3} />
          </div>
          <span className="text-sm font-semibold tracking-wide">{t('productsTitle')}</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl">
          {t('productsSubtitle')}
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[80vh] overflow-hidden"
      >
        <div className="relative h-full flex items-center justify-center">
          {products.map((product, index) => {
            const isActive = index === activeIndex;
            const isPrev = index < activeIndex;
            
            return (
              <div
                key={product.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  isActive 
                    ? 'opacity-100 translate-y-0 scale-100 z-10' 
                    : isPrev 
                      ? 'opacity-0 -translate-y-full scale-90 z-0'
                      : 'opacity-0 translate-y-full scale-90 z-0'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto px-8">
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
                      style={{
                        filter: isActive ? `drop-shadow(0 20px 40px rgba(0,0,0,0.15))` : 'none',
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div 
                    className={`text-center md:text-left transition-all duration-700 delay-200 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                  >
                    <span 
                      className="text-sm font-medium tracking-widest uppercase"
                      style={{ color: product.color }}
                    >
                      Nyxx® Nicotine
                    </span>
                    <h2 
                      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mt-2"
                      style={{ color: product.color }}
                    >
                      {t(product.nameKey as keyof typeof t)}
                    </h2>
                    <p className="text-gray-500 text-lg mt-4 max-w-md">
                      {t(product.descriptionKey as keyof typeof t)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {products.map((product, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'scale-125' : 'opacity-40 hover:opacity-70'
              }`}
              style={{
                background: index === activeIndex ? product.color : '#999',
                boxShadow: index === activeIndex ? `0 0 20px ${product.color}` : 'none',
              }}
              aria-label={`Mostrar produto ${product.name}`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-8 font-mono text-8xl font-bold text-gray-200/30 select-none z-0">
          {String(activeIndex + 1).padStart(2, '0')}
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          activeIndex === products.length - 1 ? 'opacity-0' : 'opacity-60'
        }`}>
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

