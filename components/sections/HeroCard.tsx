import { DeusaAnimation } from '../DeusaAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function HeroCard() {
  const { t } = useTranslation();
  
  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden text-white hero-card-container">
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 0,
        }}
      >
         <DeusaAnimation duration={5} />
      </div>

      <div className="absolute inset-0 z-20 w-full max-w-[1800px] mx-auto px-7 md:px-14 pt-[90px] md:pt-[100px] pb-7 md:pb-14 left-1/2 -translate-x-1/2">
        <div 
          className="absolute top-1/2 right-7 md:right-14 -translate-y-1/2 -mt-[40px] flex items-end"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          <img 
            src="/logo_reduzida.svg" 
            alt="Nyxx" 
            className="h-[18vw] md:h-[12.6vw] lg:h-[9.9vw] w-auto brightness-0 invert"
          />
        </div>

        <div 
          className="absolute top-1/2 left-7 md:left-14 -translate-y-1/2 -mt-[80px] max-w-md text-base md:text-lg lg:text-xl leading-relaxed opacity-90"
          style={{
            animation: 'float 7s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        >
          <p>
            <span className="font-bold text-white">{t('heroSubtitle')}</span>{' '}
            <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">{t('heroDescription')}</span>
          </p>
        </div>

        <div className="absolute bottom-7 md:bottom-14 right-7 md:right-14">
          <span className="text-xs font-medium text-gray-400 tracking-wide">© 2025 Nyxx® Nicotine</span>
        </div>
      </div>
    </div>
  );
}
