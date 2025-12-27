import React, { useRef, useState } from 'react';

interface ProductCard3DProps {
  name: string;
  image: string;
  isHighlighted?: boolean;
  className?: string;
}

// Cores e gradientes premium por sabor - versão clara
const flavorThemes: Record<string, { 
  gradient: string; 
  glow: string;
  accent: string;
  particle: string;
  textColor: string;
}> = {
  Coffee: { 
    gradient: 'linear-gradient(145deg, #F5EDE6 0%, #E8D9CC 50%, #DCC4B3 100%)',
    glow: 'rgba(109, 74, 48, 0.5)',
    accent: '#6D4A30',
    particle: '#9D7A5A',
    textColor: '#4A2F1F'
  },
  Energy: { 
    gradient: 'linear-gradient(145deg, #FFFEF5 0%, #FFF9E6 50%, #FFF4CC 100%)',
    glow: 'rgba(255, 216, 103, 0.5)',
    accent: '#FFD867',
    particle: '#FFE699',
    textColor: '#B89A3C'
  },
  Mango: { 
    gradient: 'linear-gradient(145deg, #FDF0E8 0%, #F8DCC8 50%, #F3C8A8 100%)',
    glow: 'rgba(225, 114, 55, 0.5)',
    accent: '#E17237',
    particle: '#F09A5F',
    textColor: '#9D4E1F'
  },
  Watermelon: { 
    gradient: 'linear-gradient(145deg, #FDF5F6 0%, #F8E8EA 50%, #F3DBDD 100%)',
    glow: 'rgba(229, 152, 155, 0.5)',
    accent: '#E5989B',
    particle: '#F0B8BB',
    textColor: '#A06B6E'
  },
  Menthol: { 
    gradient: 'linear-gradient(145deg, #F0F7FA 0%, #E0EFF5 50%, #C8E3ED 100%)',
    glow: 'rgba(148, 193, 213, 0.5)',
    accent: '#94C1D5',
    particle: '#B8D9E8',
    textColor: '#5A7A87'
  },
};

export function ProductCard3D({ name, image, isHighlighted = false, className = '' }: ProductCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const theme = flavorThemes[name] || { 
    gradient: 'linear-gradient(145deg, #FAFAFA 0%, #F0F0F0 50%, #E8E8E8 100%)',
    glow: 'rgba(150, 150, 150, 0.5)',
    accent: '#888888',
    particle: '#AAAAAA',
    textColor: '#333333'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${className}`}
      style={{
        transform: transform,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Background gradiente escuro premium */}
      <div 
        className="absolute inset-0"
        style={{ background: theme.gradient }}
      />

      {/* Efeito de luz que segue o mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${theme.glow} 0%, transparent 50%)`,
        }}
      />

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
            style={{
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: theme.particle,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float${i % 3} ${3 + i}s ease-in-out infinite`,
              boxShadow: `0 0 ${10 + i * 5}px ${theme.glow}`,
            }}
          />
        ))}
      </div>

      {/* Linhas de brilho nos cantos */}
      <div 
        className="absolute top-0 left-0 w-20 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-32"
        style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }}
      />
      <div 
        className="absolute top-0 left-0 w-[1px] h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-32"
        style={{ background: `linear-gradient(180deg, ${theme.accent}, transparent)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-20 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-32"
        style={{ background: `linear-gradient(270deg, ${theme.accent}, transparent)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[1px] h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-32"
        style={{ background: `linear-gradient(0deg, ${theme.accent}, transparent)` }}
      />

      {/* Produto com efeito de levitação */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-6"
        style={{
          transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0) scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
          style={{
            filter: isHovered 
              ? `drop-shadow(0 30px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 30px ${theme.glow})`
              : 'drop-shadow(0 15px 25px rgba(0,0,0,0.3))',
            transition: 'filter 0.4s ease-out',
          }}
        />
      </div>

      {/* Reflexo no chão */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-500 blur-xl"
        style={{ background: theme.glow }}
      />

      {/* Nome com efeito de reveal */}
      <div 
        className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)',
        }}
      >
        <div className="overflow-hidden">
          <h4 
            className={`font-bold tracking-wide transform transition-transform duration-500 ${
              isHighlighted ? 'text-xl md:text-2xl' : 'text-sm md:text-base'
            } ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}
            style={{
              color: theme.textColor,
              textShadow: isHovered ? `0 0 20px ${theme.glow}` : 'none',
            }}
          >
            {name}
          </h4>
        </div>
        
        {isHighlighted && (
          <div 
            className="px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transform transition-all duration-500"
            style={{ 
              background: theme.accent,
              color: 'white',
              boxShadow: `0 0 15px ${theme.glow}`,
              opacity: isHovered ? 1 : 0.85,
            }}
          >
            Destaque
          </div>
        )}
      </div>

      {/* CSS para animações das partículas */}
      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-15px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}
