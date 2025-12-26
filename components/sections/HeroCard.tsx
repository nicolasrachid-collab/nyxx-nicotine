import React, { useEffect, useRef } from 'react';
import { DeusaAnimation } from '../DeusaAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function HeroCard() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden text-black hero-card-container">
      {/* Fundo branco */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: '#FFFFFF',
          zIndex: 0,
        }}
      />
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
          zIndex: 1,
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
              className="h-[15vw] md:h-[10vw] lg:h-[8vw] w-auto"
            />
          </div>

          <div className="max-w-md text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90">
            <p className="line-height-1.6">
              <span className="font-bold text-black text-xl md:text-[22px] lg:text-2xl xl:text-[28px]">{t('heroSubtitle')}</span>{' '}
              <span className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 bg-clip-text text-transparent text-base md:text-base lg:text-xl xl:text-2xl">
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
