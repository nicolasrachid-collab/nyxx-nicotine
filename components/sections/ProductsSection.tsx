import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { products } from '../../data/products';

export function ProductsSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Criar seções para cada produto com Intersection Observer
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const sections = scrollContainerRef.current.querySelectorAll('.product-section');
    if (sections.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIndex(sectionIndex);
          }
        });
      },
      observerOptions
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Garantir que a primeira seção seja ativa inicialmente
    if (sections[0]) {
      const firstIndex = parseInt(sections[0].getAttribute('data-index') || '0');
      setActiveIndex(firstIndex);
    }

    return () => {
      observer.disconnect();
    };
  }, [products.length]);

  const activeProduct = products[activeIndex] || products[0];

  if (!activeProduct) return null;

  return (
    <section 
      ref={ref}
      className="px-7 md:px-14 pt-20 md:pt-28 pb-12 md:pb-16 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black"
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

      {/* Container principal com layout flex */}
      <div 
        ref={containerRef}
        className="relative flex flex-col lg:flex-row gap-8 md:gap-12"
      >
        {/* Lado esquerdo: Seções scrolláveis */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 space-y-0 w-full lg:w-1/2"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              data-index={index}
              className="product-section min-h-screen flex items-center justify-center py-20"
            >
              <div className="w-full max-w-2xl px-8">
                <div className="flex items-center gap-3 mb-6">
                  <span 
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: product.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>
                <h3 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  style={{ color: product.color }}
                >
                  {t(product.nameKey as keyof typeof t)}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t(product.descriptionKey as keyof typeof t)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lado direito: Conteúdo sticky que muda - apenas imagem */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-20 lg:h-screen lg:flex lg:items-center">
          <div className="relative w-full max-w-md mx-auto">
            {/* Conteúdo do produto ativo - apenas imagem */}
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div 
                className="relative w-full aspect-square"
                style={{
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: `drop-shadow(0 20px 40px ${activeProduct.color}20)`,
                  }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

