import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function MissionSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-full h-px bg-gray-200 mb-12 md:mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-3 flex flex-col gap-4">
           <div className="flex items-center">
             <span className="font-bold text-sm tracking-tight text-black">Nyxx®</span>
           </div>
           <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[160px]">
             {t('missionSubtitle')}
           </p>
        </div>

        <div className="md:col-span-9 flex flex-col gap-8 md:gap-10">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
             {t('missionTitle')}
           </h2>
           
           <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
             {t('missionText')}
           </p>
        </div>
      </div>
    </section>
  );
}
