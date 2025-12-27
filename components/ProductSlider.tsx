import { useState, useRef, useEffect } from 'react';

interface Product {
  name: string;
  image: string;
}

interface ProductSliderProps {
  products: Product[];
}

// Cores por sabor
const flavorThemes: Record<string, { 
  gradient: string; 
  glow: string;
  accent: string;
  textColor: string;
}> = {
  Coffee: { 
    gradient: 'linear-gradient(135deg, #1a0f0a 0%, #2d1f15 100%)',
    glow: 'rgba(109, 74, 48, 0.8)',
    accent: '#6D4A30',
    textColor: '#9D7A5A'
  },
  Energy: { 
    gradient: 'linear-gradient(135deg, #1a1700 0%, #3d3500 100%)',
    glow: 'rgba(255, 216, 103, 0.8)',
    accent: '#FFD867',
    textColor: '#FFE699'
  },
  Mango: { 
    gradient: 'linear-gradient(135deg, #1a0f00 0%, #3d1f00 100%)',
    glow: 'rgba(225, 114, 55, 0.8)',
    accent: '#E17237',
    textColor: '#F09A5F'
  },
  Watermelon: { 
    gradient: 'linear-gradient(135deg, #1a0508 0%, #3d0f14 100%)',
    glow: 'rgba(229, 152, 155, 0.8)',
    accent: '#E5989B',
    textColor: '#F0B8BB'
  },
  Menthol: { 
    gradient: 'linear-gradient(135deg, #001a1f 0%, #003d4a 100%)',
    glow: 'rgba(148, 193, 213, 0.8)',
    accent: '#94C1D5',
    textColor: '#B8D9E8'
  },
};

export function ProductSlider({ products }: ProductSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const activeProduct = products[activeIndex];
  const theme = flavorThemes[activeProduct?.name] || {
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    glow: 'rgba(150, 150, 150, 0.8)',
    accent: '#888888',
    textColor: '#888888'
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % products.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + products.length) % products.length);
  };

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [activeIndex]);

  // Pause on hover
  const handleMouseEnter = () => clearInterval(autoPlayRef.current);
  const handleMouseLeave = () => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <div 
      ref={sliderRef}
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden rounded-3xl"
      style={{ background: theme.gradient }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: theme.accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: `0 0 ${10 + Math.random() * 20}px ${theme.glow}`,
            }}
          />
        ))}
      </div>

      {/* Glow central */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl transition-all duration-1000"
        style={{ background: theme.glow }}
      />

      {/* Produtos nas laterais (blur) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Produto anterior */}
        <div 
          className="absolute left-0 md:left-[5%] w-[200px] md:w-[280px] h-[300px] md:h-[400px] transition-all duration-700 ease-out opacity-30 blur-sm"
          style={{
            transform: 'translateX(-30%) scale(0.7)',
          }}
        >
          <img
            src={products[(activeIndex - 1 + products.length) % products.length].image}
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(0.5)' }}
          />
        </div>

        {/* Produto seguinte */}
        <div 
          className="absolute right-0 md:right-[5%] w-[200px] md:w-[280px] h-[300px] md:h-[400px] transition-all duration-700 ease-out opacity-30 blur-sm"
          style={{
            transform: 'translateX(30%) scale(0.7)',
          }}
        >
          <img
            src={products[(activeIndex + 1) % products.length].image}
            alt=""
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(0.5)' }}
          />
        </div>
      </div>

      {/* Produto principal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[300px] md:w-[400px] lg:w-[500px] h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 ease-out"
          style={{
            transform: isAnimating ? 'scale(0.9) rotateY(10deg)' : 'scale(1) rotateY(0deg)',
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.name}
              className="absolute inset-0 flex items-center justify-center transition-all duration-700"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                transform: index === activeIndex 
                  ? 'translateX(0) scale(1)' 
                  : index < activeIndex 
                    ? 'translateX(-100%) scale(0.8)' 
                    : 'translateX(100%) scale(0.8)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                loading="lazy"
                decoding="async"
                style={{
                  filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px ${theme.glow})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nome do produto */}
      <div className="absolute bottom-20 md:bottom-28 left-0 right-0 text-center">
        <div className="overflow-hidden">
          <h1 
            className="text-4xl md:text-5xl lg:text-[38px] font-bold tracking-tight transition-all duration-500"
            style={{
              color: theme.textColor,
              textShadow: `0 0 60px ${theme.glow}`,
              transform: isAnimating ? 'translateY(100%)' : 'translateY(0)',
            }}
          >
            {activeProduct?.name}
          </h1>
        </div>
        <p 
          className="text-white/60 text-sm md:text-base mt-2 transition-all duration-500"
          style={{
            opacity: isAnimating ? 0 : 1,
          }}
        >
          Nyxx® Nicotine
        </p>
      </div>

      {/* Navegação por pontos */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
            style={{
              background: index === activeIndex ? theme.accent : 'rgba(255,255,255,0.3)',
              boxShadow: index === activeIndex ? `0 0 15px ${theme.glow}` : 'none',
            }}
          >
            <span 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: theme.accent,
                opacity: index === activeIndex ? 0.4 : 0,
              }}
            />
          </button>
        ))}
      </div>

      {/* Setas de navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255,255,255,0.2)`,
        }}
      >
        <svg 
          className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-x-0.5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255,255,255,0.2)`,
        }}
      >
        <svg 
          className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Número do slide */}
      <div className="absolute top-8 right-8 text-white/40 font-mono text-sm">
        <span style={{ color: theme.accent }}>{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(products.length).padStart(2, '0')}</span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) translateX(20px); 
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
