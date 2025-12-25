import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedStat } from './AnimatedStat';

export function StatsSection() {
  const { t } = useTranslation();
  const supportText = t('statsSupport').split('\n');
  
  return (
    <section className="px-7 md:px-14 pb-20 max-w-[1800px] mx-auto bg-[#F5F5F5]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10">
        <AnimatedStat 
          value={5} 
          suffix="" 
          label={t('statsUniqueFlavors')} 
        />
        <AnimatedStat 
          value={98} 
          suffix="%" 
          label={t('statsSatisfaction')} 
        />
        <AnimatedStat 
          value={100} 
          suffix="%" 
          label={t('statsTested')} 
        />
        <div className="flex flex-col">
          <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
            {supportText[0]}
          </span>
          <div className="mt-4 text-xs md:text-sm font-medium text-gray-500 max-w-[200px] leading-snug">
            {supportText[1]}
          </div>
        </div>
      </div>
    </section>
  );
}
