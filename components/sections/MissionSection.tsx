import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function MissionSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  return (
    <section 
      ref={ref}
      className={`w-full bg-white py-24 lg:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden font-sans transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto">
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
           <h1 className="text-4xl md:text-5xl lg:text-[38px] font-bold tracking-tight leading-[1.1]">
             {t('missionTitle')}
           </h1>
           
           <p className="text-gray-500 text-base font-medium leading-relaxed max-w-3xl">
             {t('missionText')}
           </p>
        </div>
      </div>
      </div>
    </section>
  );
}
