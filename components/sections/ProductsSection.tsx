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
  

  // Estado para controlar o movimento Y da imagem
  const [productY, setProductY] = useState(0);

  // Calcular progresso do scroll e atualizar activeIndex e productY
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollContainerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight / 2; // Centro da viewport
      const containerTop = containerRect.top;
      const containerHeight = container.offsetHeight;
      const containerCenter = containerTop + containerHeight / 2; // Centro do container
      const containerBottom = containerRect.bottom;
      
      // Calcular progresso baseado na posição do centro do container (para movimento Y da imagem)
      // Progresso = 0 quando o centro do container está no centro da viewport (containerCenter = windowCenter)
      // Progresso = 1 quando o fundo do container está no topo da viewport (containerBottom = 0)
      
      let progress = 0;
      if (containerCenter <= windowCenter && containerBottom > 0) {
        // Centro do container passou do centro da viewport, começar movimento
        // Quando containerCenter = windowCenter, progress = 0
        // Quando containerBottom = 0, containerCenter = -containerHeight/2, então progress = 1
        const scrollDistance = windowCenter + containerHeight / 2;
        const scrolled = windowCenter - containerCenter;
        progress = Math.min(1, Math.max(0, scrolled / scrollDistance));
      } else if (containerBottom <= 0) {
        // Container já saiu completamente da viewport
        progress = 1;
      }
      
      // Calcular productY baseado no progresso - movimento mais rápido e responsivo
      const maxY = (products.length - 1) * windowHeight * 0.6; // 60% da altura da viewport por produto
      const newY = progress * maxY;
      setProductY(newY);
      
      // Determinar qual seção está visível baseado na posição de cada seção individual
      // Encontrar a seção mais próxima do centro da viewport
      const sections = scrollContainerRef.current.querySelectorAll('.product-section');
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      sections.forEach((section, index) => {
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const distanceFromCenter = Math.abs(windowCenter - sectionCenter);
        
        // Só considerar seções que estão visíveis na viewport
        if (sectionRect.bottom > 0 && sectionRect.top < windowHeight) {
          if (distanceFromCenter < closestDistance) {
            closestDistance = distanceFromCenter;
            closestIndex = index;
          }
        }
      });
      
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Executar uma vez no mount
    
    return () => window.removeEventListener('scroll', handleScroll);
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
        style={{ minHeight: `${products.length * 70}vh` }}
      >
        {/* Lado esquerdo: Seções scrolláveis */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 space-y-0 w-full lg:w-1/2"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              data-index={index}
              className="product-section min-h-[70vh] flex items-center justify-center py-20"
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
            </motion.div>
          ))}
        </div>

        {/* Lado direito: Conteúdo sticky que acompanha o scroll */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-20 lg:h-screen lg:flex lg:items-start lg:self-start">
          <div
            className="relative w-full max-w-md mx-auto lg:mt-20"
            style={{
              transform: `translateY(${productY}px)`
            }}
          >
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

