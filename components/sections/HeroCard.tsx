import React, { useEffect, useRef } from 'react';
import { DeusaAnimation } from '../DeusaAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function HeroCard() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden text-black hero-card-container bg-white bg-clean-pattern">
      <div 
        ref={containerRef}
        className="absolute inset-0 z-20 w-full max-w-[1800px] mx-auto px-7 md:px-14 flex items-center justify-between"
      >
        <div 
          className="relative flex flex-col gap-4 md:gap-6"
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
              <span className="font-bold text-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap">{t('heroSubtitle')}</span>
              <br />
              <span 
                className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 bg-clip-text text-transparent text-base md:text-base lg:text-xl xl:text-2xl flex justify-start items-start"
                style={{ width: '453px' }}
              >
                {t('heroDescription')}
              </span>
            </p>
          </div>
        </div>

        <div 
          className="relative flex items-center justify-end"
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
