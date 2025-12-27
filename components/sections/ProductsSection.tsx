import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Coffee, Zap, Droplets, Snowflake, Circle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { useThrottle } from '../../hooks/useThrottle';
import { products } from '../../data/products';
import { AnimatedLineGradient } from '../AnimatedTextGradient';
import { AnimatedPaperBackground } from '../AnimatedPaperBackground';

// Padrão grego - imagem localizada em /public/greek-pattern.svg
const greekCirclePattern = "/greek-pattern.svg";

// Dados dos passos do HowItWorks
const steps = [
  {
    id: "01",
    title: "Escolha",
    description: "Selecione seu sabor favorito entre nossas opções exclusivas.",
  },
  {
    id: "02",
    title: "Use",
    description: "Posicione sob o lábio superior e deixe agir.",
  },
  {
    id: "03",
    title: "Desfrute",
    description: "Aproveite a liberação gradual de sabor e nicotina.",
  },
];

// Constantes para otimização
const SCROLL_THROTTLE_MS = 16; // ~60fps
const CENTER_THRESHOLD = 150; // Threshold em pixels para trocar seção

// Mapeamento de ícones para cada produto
const productIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  coffee: Coffee,
  energy: Zap,
  mango: Circle, // Mango não existe no lucide-react, usando Circle como alternativa
  watermelon: Droplets,
  menthol: Snowflake,
};

export function ProductsSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  

  // Estado para controlar o movimento Y da imagem
  const [productY, setProductY] = useState(0);

  // Handler de scroll com useCallback para memoização
  const handleScroll = useCallback(() => {
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:57',message:'handleScroll called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (!containerRef.current || !scrollContainerRef.current) {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:60',message:'Early return - refs missing',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      return;
    }

    const scrollContainer = scrollContainerRef.current;
    const windowHeight = window.innerHeight;
    const windowCenter = windowHeight / 2;
    
    // Buscar seções para cálculo de activeIndex
    const sections = scrollContainer.querySelectorAll('.product-section');
    
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:67',message:'Sections found',data:{sectionsCount:sections.length,windowHeight,windowCenter},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Determinar qual seção está visível e mais próxima do centro
    let closestIndex = 0;
    let closestDistance = Infinity;
    let activeSection: HTMLElement | null = null;
    
    sections.forEach((section, index) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const distanceFromCenter = Math.abs(windowCenter - sectionCenter);
      
      if (sectionRect.bottom > 0 && sectionRect.top < windowHeight && distanceFromCenter < CENTER_THRESHOLD) {
        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestIndex = index;
          activeSection = section as HTMLElement;
        }
      }
    });
    
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:86',message:'Section detection result',data:{closestIndex,closestDistance,hasActiveSection:!!activeSection},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    if (closestDistance !== Infinity && activeSection) {
      setActiveIndex(closestIndex);
      
      const sectionRect = activeSection.getBoundingClientRect();
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      
      // Verificar se a seção já passou pelo centro da tela
      const hasReachedCenter = sectionCenter <= windowCenter;
      
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:93',message:'Center check',data:{sectionCenter,windowCenter,hasReachedCenter,sectionTop:sectionRect.top,sectionHeight:sectionRect.height},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      if (hasReachedCenter) {
        // Calcular quanto a seção se moveu desde que chegou ao centro
        // Quando sectionCenter == windowCenter: offset = 0
        // Conforme a seção desce, offset aumenta proporcionalmente
        const offsetFromCenter = windowCenter - sectionCenter;
        
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:100',message:'Setting productY - reached center',data:{offsetFromCenter,productY:offsetFromCenter},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        
        // Aplicar o mesmo offset ao produto (mesma velocidade de scroll)
        setProductY(offsetFromCenter);
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:107',message:'Setting productY - not reached center',data:{productY:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        
        // Seção ainda não chegou ao centro: produto fica fixo
        setProductY(0);
      }
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ProductsSection.tsx:111',message:'No active section - setting productY to 0',data:{productY:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      // Nenhuma seção ativa: produto fica fixo
      setProductY(0);
    }
  }, []);

  // Aplicar throttle ao handler
  const throttledHandleScroll = useThrottle(handleScroll, SCROLL_THROTTLE_MS);

  // Calcular progresso do scroll e atualizar activeIndex e productY
  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Executar uma vez no mount
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll, handleScroll]);


  const activeProduct = products[activeIndex] || products[0];

  if (!activeProduct) return null;

  return (
    <section 
      id="products"
      ref={ref}
      className="w-full bg-white py-24 lg:py-32 xl:py-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans products-section"
      style={{ position: 'relative' }}
      aria-label="Seção de produtos"
    >
      <AnimatedPaperBackground intensity={0.2} speed={0.8} />
      {/* Cabeçalho */}
      <div className="mb-16 md:mb-24 lg:mb-32 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.2em] uppercase text-gray-600"
          >
            <AnimatedLineGradient />
            {t('productsTitle')}
            <AnimatedLineGradient />
          </motion.span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto text-gray-900 mb-6">
          {t('productsSubtitle')}
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t('productsDescription')}
        </p>
      </div>

        {/* Container principal com layout grid */}
        <div 
          ref={containerRef}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto"
          style={{ minHeight: `${products.length * 70}vh` }}
        >
        {/* Lado esquerdo: Seções scrolláveis */}
        <div 
          ref={scrollContainerRef}
          className="space-y-0"
        >
          {products.map((product, index) => {
            const ProductIcon = productIcons[product.id] || Coffee;
            const description = t(product.descriptionKey as keyof typeof t);
            const subtitle = description.split('\n\n')[0];
            const bodyText = description.split('\n\n').slice(1).join('\n\n');
            const paragraphs = bodyText.split('\n\n').filter(p => p.trim());
            
            return (
              <motion.div
                key={product.id}
                data-index={index}
                className="product-section min-h-[70vh] flex items-center justify-center py-20"
              >
                <div className="w-full max-w-xl">
                  {/* Number */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <span 
                      className="text-sm font-medium tracking-widest"
                      style={{ color: product.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                        style={{ color: product.color }}
                      >
                        {t(product.nameKey as keyof typeof t).replace(/[☕⚡🥭🍉❄️]/g, '').trim()}
                      </h1>
                      <ProductIcon className="w-8 h-8 flex-shrink-0" style={{ color: product.color }} />
                    </div>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-lg font-medium mb-8 text-gray-600"
                  >
                    {subtitle}
                  </motion.h2>

                  {/* Body Text */}
                  <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                    {paragraphs.map((paragraph, pIndex) => (
                      <motion.p
                        key={pIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 + pIndex * 0.05 }}
                      >
                        {paragraph.trim()}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lado direito: Conteúdo sticky que acompanha o scroll */}
        <div className="w-full lg:sticky lg:top-20 lg:h-screen lg:flex lg:items-center lg:justify-center lg:self-start">
          <motion.div
            className="relative w-full max-w-md mx-auto lg:mt-20"
            animate={{
              y: productY
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30
            }}
            style={{
              boxShadow: 'none',
              filter: 'none'
            }}
          >
            {/* Conteúdo do produto ativo - apenas imagem */}
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
              style={{ 
                background: 'transparent',
                boxShadow: 'none',
                filter: 'none'
              }}
            >
              <img
                src={activeProduct.imageSide}
                alt={activeProduct.name}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
                style={{ 
                  objectFit: 'contain',
                  filter: 'none !important', 
                  boxShadow: 'none !important',
                  textShadow: 'none !important',
                  WebkitFilter: 'none !important',
                  MozFilter: 'none !important',
                  msFilter: 'none !important',
                  OFilter: 'none !important'
                }}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Separador */}
      <div className="w-full py-12 md:py-16 bg-white relative z-10">
        <div className="max-w-[1800px] mx-auto px-7 md:px-14">
          <div className="w-full h-px bg-gray-300"></div>
        </div>
      </div>

      {/* HowItWorks Section - Clean */}
      <div className="container mx-auto max-w-6xl mt-24 md:mt-32 lg:mt-40 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
          {/* Linha conectora - apenas desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gray-300" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center space-y-4"
            >
              {/* Círculo com borda fina */}
              <div className="w-24 h-24 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center relative z-10 mb-2 group hover:border-gray-400 transition-all duration-300">
                <span className="text-3xl font-light text-gray-600 font-mono">
                  {step.id}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {step.title}
              </h3>
              
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-[280px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

