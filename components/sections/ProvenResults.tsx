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
        <div className="max-w-[60%]">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] md:leading-[1.05]">
              {t('purposeTitle')} <span className="text-gray-400">{t('purposeSubtitle')}</span>
           </h2>
        </div>
      </div>
    </section>
  );
}
