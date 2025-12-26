import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Coffee, Zap, Droplets, Snowflake, Circle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { useThrottle } from '../../hooks/useThrottle';
import { products } from '../../data/products';

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
const MAX_Y_PERCENTAGE = 0.5; // 50% da altura disponível para movimento
const HEADER_OFFSET = 80; // Margem superior do sticky container

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
    if (!containerRef.current || !scrollContainerRef.current) {
      return;
    }

    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerTop = containerRect.top;
    const containerHeight = container.offsetHeight;
    const containerBottom = containerRect.bottom;
    
    // Buscar seções para cálculo de activeIndex e progresso
    const sections = scrollContainer.querySelectorAll('.product-section');
    
    // Calcular progresso baseado em quanto o container foi rolado
    // Progresso vai de 0 (container entrando na viewport pelo topo) a 1 (container saindo pelo fundo)
    let progress = 0;
    
    // Calcular progresso de forma contínua baseado na posição do container
    // Progresso começa quando qualquer parte do container entra na viewport
    // Quando containerTop = windowHeight (topo do container no topo da viewport): progress = 0
    // Quando containerBottom = 0 (fundo do container no topo da viewport): progress = 1
    
    // Ponto de início: quando containerTop = windowHeight (progress = 0)
    // Ponto de fim: quando containerBottom = 0, ou seja, containerTop = -containerHeight (progress = 1)
    const startPoint = windowHeight; // Quando containerTop = windowHeight
    const endPoint = -containerHeight; // Quando containerTop = -containerHeight (containerBottom = 0)
    const totalRange = startPoint - endPoint; // windowHeight + containerHeight
    
    if (containerBottom <= 0) {
      // Container já saiu completamente da viewport
      progress = 1;
    } else if (containerTop >= windowHeight) {
      // Container ainda não entrou na viewport (ou está exatamente no ponto de entrada)
      progress = 0;
    } else {
      // Container está parcial ou completamente visível - calcular progresso contínuo
      const currentPosition = containerTop;
      const distanceFromStart = startPoint - currentPosition; // Quanto já foi rolado desde o início
      
      progress = Math.min(1, Math.max(0, distanceFromStart / totalRange));
    }
    
    // Calcular productY baseado no progresso
    const availableHeight = windowHeight - HEADER_OFFSET;
    const maxY = availableHeight * MAX_Y_PERCENTAGE;
    const newY = progress * maxY;
    
    setProductY(newY);
    
    // Determinar qual seção está visível
    const windowCenter = windowHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    sections.forEach((section, index) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const distanceFromCenter = Math.abs(windowCenter - sectionCenter);
      
      if (sectionRect.bottom > 0 && sectionRect.top < windowHeight && distanceFromCenter < CENTER_THRESHOLD) {
        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestIndex = index;
        }
      }
    });
    
    if (closestDistance !== Infinity) {
      setActiveIndex(closestIndex);
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
      ref={ref}
      className="w-full bg-white py-24 lg:py-32 xl:py-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans"
      aria-label="Seção de produtos"
    >
      {/* Efeito de luz sutil - múltiplos pontos suaves */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 700px at 10% 20%, rgba(156, 163, 175, 0.12) 0%, transparent 70%),
            radial-gradient(circle 600px at 90% 80%, rgba(107, 114, 128, 0.10) 0%, transparent 70%),
            radial-gradient(circle 800px at 50% 50%, rgba(75, 85, 99, 0.08) 0%, transparent 80%),
            radial-gradient(circle 500px at 5% 50%, rgba(156, 163, 175, 0.08) 0%, transparent 70%),
            radial-gradient(circle 500px at 95% 50%, rgba(107, 114, 128, 0.08) 0%, transparent 70%)
          `,
        }}
      />
      {/* Cabeçalho */}
      <div className="mb-16 md:mb-24 lg:mb-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            className="group relative inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-orange-600 border border-orange-200 bg-gradient-to-r from-orange-50/80 to-orange-100/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 overflow-hidden"
          >
            {/* Efeito de brilho animado no hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            {/* Ponto decorativo animado */}
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <span className="relative z-10">{t('productsTitle')}</span>
          </motion.span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto text-gray-900 mb-6">
          {t('productsSubtitle')}
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t('productsDescription')}
        </p>
      </div>

        {/* Container principal com layout flex */}
        <div 
          ref={containerRef}
          className="relative flex flex-col lg:flex-row gap-8 md:gap-12 max-w-7xl mx-auto"
          style={{ minHeight: `${products.length * 70}vh` }}
        >
        {/* Lado esquerdo: Seções scrolláveis */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 space-y-0 w-full lg:w-1/2"
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
        <div className="w-full lg:w-1/2 lg:sticky lg:top-20 lg:h-screen lg:flex lg:items-center lg:justify-center lg:self-start">
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
          >
            {/* Conteúdo do produto ativo - apenas imagem */}
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
              style={{ background: 'transparent' }}
            >
              <img
                src={activeProduct.imageSide}
                alt={activeProduct.name}
                className="w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Separador */}
      <div className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-[1800px] mx-auto px-7 md:px-14">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      {/* HowItWorks Section - Clean */}
      <div className="container mx-auto max-w-6xl mt-24 md:mt-32 lg:mt-40">
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

