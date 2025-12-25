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
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
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

