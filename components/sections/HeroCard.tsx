import { Plus } from 'lucide-react';
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

      <div className="absolute left-0 right-0 top-[55%] flex justify-between px-7 md:px-14 pointer-events-none z-20 opacity-50">
          <Plus size={24} strokeWidth={1} />
          <Plus size={24} strokeWidth={1} />
          <Plus size={24} strokeWidth={1} />
          <Plus size={24} strokeWidth={1} />
      </div>

      <div className="absolute inset-0 z-20 w-full max-w-[1800px] mx-auto px-7 md:px-14 pt-[90px] md:pt-[100px] pb-7 md:pb-14 left-1/2 -translate-x-1/2">
        <div 
          className="absolute top-1/2 right-7 md:right-14 -translate-y-1/2 -mt-[60px] flex items-end"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          <img 
            src="/logo_reduzida.svg" 
            alt="Nyxx" 
            className="h-[20vw] md:h-[14vw] lg:h-[11vw] w-auto brightness-0 invert"
          />
          <span className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ml-1 md:ml-2 text-[10px] md:text-xs font-medium border border-white rounded-full flex items-center justify-center leading-none mb-0.5 md:mb-1">R</span>
        </div>

        <div className="absolute top-1/2 left-7 md:left-14 -translate-y-1/2 max-w-md text-base md:text-lg lg:text-xl leading-relaxed opacity-90">
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
