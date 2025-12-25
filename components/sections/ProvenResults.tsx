import { Plus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function ProvenResults() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-28 pb-12 md:pb-16 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
            <Plus size={14} strokeWidth={3} />
          </div>
          <span className="text-sm font-semibold tracking-wide">{t('benefitsTitle')}</span>
        </div>
        
        <div className="max-w-[60%] flex flex-col gap-4 md:gap-5">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            {t('purposeTitle')}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 leading-relaxed">
            {t('purposeSubtitle')}
          </p>
          
          {/* Botão CTA - Saiba Mais */}
          <div className="mt-4 md:mt-6">
            <button
              className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
