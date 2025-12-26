import React, { useEffect, useRef } from 'react';
import { DeusaAnimation } from '../DeusaAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function HeroCard() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleContainerRef = useRef<HTMLDivElement | null>(null);
  

  // Animação de partículas flutuantes no container principal
  useEffect(() => {
    if (!containerRef.current) return;

    // Criar container de partículas
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    `;
    containerRef.current.appendChild(particleContainer);
    particleContainerRef.current = particleContainer;

    // Criar animação CSS para as partículas (apenas se não existir)
    let styleElement = document.getElementById('hero-particles-animation');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'hero-particles-animation';
      styleElement.textContent = `
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styleElement);
    }

    const createParticle = () => {
      if (!particleContainerRef.current) return;
      
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: 0;
        animation: floatUp 4s ease-out forwards;
      `;
      particleContainerRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentElement) {
          particle.remove();
        }
      }, 4000);
    };

    // Criar múltiplas partículas por ciclo
    const createMultipleParticles = () => {
      const particleCount = 2 + Math.floor(Math.random() * 2); // 2-3 partículas por ciclo
      for (let i = 0; i < particleCount; i++) {
        createParticle();
      }
    };

    // Criar partículas periodicamente
    particleIntervalRef.current = setInterval(() => {
      if (containerRef.current && particleContainerRef.current?.parentElement) {
        createMultipleParticles();
      } else {
        if (particleIntervalRef.current) {
          clearInterval(particleIntervalRef.current);
          particleIntervalRef.current = null;
        }
      }
    }, 350);

    // Limpeza
    return () => {
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
        particleIntervalRef.current = null;
      }
      if (particleContainerRef.current?.parentElement) {
        particleContainerRef.current.remove();
        particleContainerRef.current = null;
      }
    };
  }, []);
  
  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden text-white hero-card-container">
      {/* Fundo escuro */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: '#050505',
          zIndex: 0,
        }}
      />

      <div 
        ref={containerRef}
        className="absolute inset-0 z-20 w-full max-w-[1800px] mx-auto px-7 md:px-14 left-1/2 -translate-x-1/2 flex items-center justify-between"
      >
        <div 
          className="relative left-0 md:left-7 flex flex-col gap-4 md:gap-6"
          style={{
            animation: 'float 7s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        >
          <div
            style={{
              animation: 'float 6s ease-in-out infinite',
            }}
          >
            <img 
              src="/logo_reduzida.svg" 
              alt="Nyxx" 
              className="h-[15vw] md:h-[10vw] lg:h-[8vw] w-auto brightness-0 invert"
            />
          </div>

          <div className="max-w-md text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90">
            <p className="line-height-1.6">
              <span className="font-bold text-white text-xl md:text-[22px] lg:text-2xl xl:text-[28px]">{t('heroSubtitle')}</span>{' '}
              <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent text-base md:text-base lg:text-xl xl:text-2xl">
                {t('heroDescription')}
              </span>
            </p>
          </div>
        </div>

        <div 
          className="relative right-0 md:right-7 flex items-center justify-end"
          style={{ 
            zIndex: 30,
            width: '50%',
            height: '100%',
            minHeight: '100vh',
          }}
        >
          <DeusaAnimation duration={3} />
        </div>
      </div>
    </div>
  );
}
