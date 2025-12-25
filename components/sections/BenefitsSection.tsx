import { Shield, Star, Package, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: Shield,
      titleKey: 'benefitSaferTitle' as const,
      descKey: 'benefitSaferDesc' as const,
    },
    {
      icon: Star,
      titleKey: 'benefitSuperiorTasteTitle' as const,
      descKey: 'benefitSuperiorTasteDesc' as const,
    },
    {
      icon: Package,
      titleKey: 'benefitConvenienceTitle' as const,
      descKey: 'benefitConvenienceDesc' as const,
    },
    {
      icon: CheckCircle,
      titleKey: 'benefitQualityTitle' as const,
      descKey: 'benefitQualityDesc' as const,
    },
  ];

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon className="text-blue-400" size={24} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-gray-800">
                {t(benefit.titleKey)}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {t(benefit.descKey)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

