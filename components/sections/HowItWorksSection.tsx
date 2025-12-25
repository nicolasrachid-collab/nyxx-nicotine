import { Plus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  const steps = [
    {
      number: '01',
      titleKey: 'howStep1' as const,
      descKey: 'howStep1Desc' as const,
    },
    {
      number: '02',
      titleKey: 'howStep2' as const,
      descKey: 'howStep2Desc' as const,
    },
    {
      number: '03',
      titleKey: 'howStep3' as const,
      descKey: 'howStep3Desc' as const,
    },
  ];

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-px bg-gray-200 mb-12 md:mb-16"></div>

      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
            <Plus size={14} strokeWidth={3} />
          </div>
          <span className="text-sm font-semibold tracking-wide">{t('howItWorksTitle')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col gap-4"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-6xl md:text-7xl font-bold text-gray-200 leading-none">
                {step.number}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {t(step.titleKey)}
              </h3>
            </div>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              {t(step.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

