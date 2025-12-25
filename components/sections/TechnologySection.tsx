import { Plus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function TechnologySection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  const techPoints = [
    { key: 'techSelectedIngredients' as const },
    { key: 'techAdvancedTech' as const },
    { key: 'techPremiumQuality' as const },
    { key: 'techRigorousTesting' as const },
  ];

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-px bg-gray-200 mb-12 md:mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
              <Plus size={14} strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold tracking-wide">{t('technologyTitle')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            {t('technologySubtitle')}
          </h2>
          
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
            {t('technologyDescription')}
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {techPoints.map((point) => (
              <div
                key={point.key}
                className="bg-white rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                  {t(point.key)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

