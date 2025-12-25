import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Coffee, Zap, Droplets, Snowflake, Circle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { products } from '../../data/products';

// Dados dos passos do HowItWorks
const steps = [
  {
    id: "01",
    title: "Escolha",
    description: "Selecione seu sabor favorito",
  },
  {
    id: "02",
    title: "Use",
    description: "Quando e onde quiser",
  },
  {
    id: "03",
    title: "Desfrute",
    description: "Experiência premium garantida",
  },
];

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

  // Calcular progresso do scroll e atualizar activeIndex e productY
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollContainerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = containerRect.top;
      const containerHeight = container.offsetHeight;
      const containerBottom = containerRect.bottom;
      
      // Calcular progresso baseado na posição do centro do container em relação ao centro da viewport
      // Progresso = 0 quando o centro do container está no centro da viewport
      // Progresso = 1 quando o fundo do container está no topo da viewport (containerBottom = 0)
      const windowCenter = windowHeight / 2;
      const containerCenter = containerTop + containerHeight / 2;
      let progress = 0;
      
      if (containerBottom > 0 && containerTop < windowHeight) {
        // Container está visível na viewport
        // Calcular progresso baseado na posição do centro do container
        // Quando containerCenter = windowCenter (centros alinhados), progress = 0
        // Quando containerBottom = 0 (container saiu), progress = 1
        const distanceFromAlignment = windowCenter - containerCenter; // Positivo quando containerCenter está acima de windowCenter
        // Quando containerCenter = windowCenter, distanceFromAlignment = 0, então progress = 0
        // Quando containerBottom = 0, containerCenter = containerHeight/2 (negativo), então precisamos calcular o progresso
        // A distância total que o centro precisa percorrer é: de windowCenter até containerHeight/2 (quando containerBottom = 0)
        const maxCenterDistance = windowCenter + containerHeight / 2; // Distância máxima do centro até o alinhamento
        // Quando containerCenter está abaixo de windowCenter (distanceFromAlignment negativo), o progresso aumenta
        // progress = (maxCenterDistance - distanceFromAlignment) / maxCenterDistance quando distanceFromAlignment < 0
        if (containerCenter <= windowCenter) {
          // Centro do container passou ou está no centro da viewport
          const distanceTraveled = windowCenter - containerCenter; // Distância percorrida desde o alinhamento (0 quando alinhados)
          const totalDistance = windowCenter + containerHeight / 2; // Distância total até containerBottom = 0
          progress = Math.min(1, Math.max(0, distanceTraveled / totalDistance));
        } else {
          // Centro do container ainda está acima do centro da viewport
          progress = 0;
        }
      } else if (containerTop >= windowHeight) {
        // Container ainda não entrou na viewport (está abaixo)
        progress = 0;
      } else if (containerBottom <= 0) {
        // Container já saiu completamente da viewport (está acima)
        progress = 1;
      }
      
      // Buscar seções para cálculo de activeIndex
      const sections = scrollContainerRef.current.querySelectorAll('.product-section');
      
      // Calcular productY baseado no progresso - movimento mais rápido e responsivo
      // O container sticky tem lg:h-screen e lg:mt-20 (80px de margem superior)
      // A imagem começa em lg:mt-20, então temos windowHeight - 80px de altura disponível
      // Queremos que a imagem desça suavemente mas sempre permaneça visível
      // Calcular maxY para permitir movimento suficiente para todos os produtos
      const availableHeight = windowHeight - 80; // Altura disponível (windowHeight - mt-20)
      // Usar 50% da altura disponível para permitir movimento suficiente
      // Isso garante que mesmo no último produto, a imagem ainda esteja visível
      const maxY = availableHeight * 0.5; // 50% da altura disponível
      const newY = progress * maxY;
      setProductY(newY);
      
      // Determinar qual seção está visível baseado na posição de cada seção individual
      // Encontrar a seção cujo centro está mais próximo do centro da viewport
      // Usar um threshold mais restritivo (150px) para garantir que a seção está realmente no centro antes de trocar
      let closestIndex = 0;
      let closestDistance = Infinity;
      const centerThreshold = 150; // Threshold em pixels - só trocar se a seção estiver dentro de 150px do centro
      
      sections.forEach((section, index) => {
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top + sectionRect.height / 2;
        const distanceFromCenter = Math.abs(windowCenter - sectionCenter);
        
        // Só considerar seções que estão visíveis na viewport e cujo centro está muito próximo do centro da viewport
        // Isso garante que a imagem só muda quando a seção está realmente no centro
        if (sectionRect.bottom > 0 && sectionRect.top < windowHeight && distanceFromCenter < centerThreshold) {
          if (distanceFromCenter < closestDistance) {
            closestDistance = distanceFromCenter;
            closestIndex = index;
          }
        }
      });
      
      // Se encontramos uma seção próxima o suficiente do centro, atualizar o índice
      // Caso contrário, manter o índice atual (não mudar prematuramente)
      if (closestDistance !== Infinity) {
        setActiveIndex(closestIndex);
      }
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
      className="w-full bg-white py-24 lg:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden font-sans"
    >
      <div className="mb-16 md:mb-24 lg:mb-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center rounded-full w-fit gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase border border-black/20 bg-black/10 text-black backdrop-blur-xl shadow-lg shadow-black/20 hover:bg-black/15 hover:border-black/30 transition-all duration-300">
            {t('productsTitle')}
          </span>
        </div>
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl mx-auto"
          style={{ width: '623px', marginLeft: '38px' }}
        >
          {t('productsSubtitle')}
        </h1>
        <p className="mt-6 text-base text-gray-600 max-w-2xl mx-auto">
          {t('productsDescription')}
        </p>
      </div>

      {/* HowItWorks Section */}
      <div className="container mx-auto max-w-7xl mb-16 md:mb-24 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 justify-items-center items-center h-auto overflow-visible">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="group relative w-full h-auto flex flex-col items-center text-center"
            >
              {/* Decorative line */}
              <div className="absolute top-8 left-0 w-full h-px bg-neutral-100 -z-10 hidden md:block" />
              
              <div className="relative flex flex-col items-center pt-8 pb-6">
                {/* Large Background Number */}
                <span className="text-[6rem] md:text-[7rem] leading-none font-bold text-neutral-100 absolute -top-12 left-1/2 -translate-x-1/2 z-0 select-none transition-all duration-700 group-hover:text-black group-hover:-translate-y-4 pointer-events-none">
                  {step.id}
                </span>

                <div className="flex flex-col items-center pt-4 relative z-10">
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-neutral-500 leading-relaxed font-medium max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
                <div className="w-full max-w-xl p-8 md:p-12 bg-white">
                  {/* Number and Line */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span 
                      className="font-medium text-sm tracking-widest"
                      style={{ color: product.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <motion.div 
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className="h-px bg-gray-200 flex-1"
                    ></motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center gap-4 mb-4"
                  >
                    <h1 
                      className="text-4xl font-bold tracking-tight line-clamp-2 break-words"
                      style={{ color: product.color }}
                    >
                      {t(product.nameKey as keyof typeof t).replace(/[☕⚡🥭🍉❄️]/g, '').trim()}
                    </h1>
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <ProductIcon className="w-8 h-8" style={{ color: product.color }} />
                    </div>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-base font-medium mb-8"
                    style={{ color: `${product.color}DD` }}
                  >
                    {subtitle}
                  </motion.h2>

                  {/* Body Text */}
                  <div className="space-y-6 text-gray-600 leading-relaxed text-base">
                    {paragraphs.map((paragraph, pIndex) => (
                      <motion.p
                        key={pIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 + pIndex * 0.1 }}
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
                  src={activeProduct.imageSide}
                  alt={activeProduct.name}
                  className="w-full h-full object-contain"
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

