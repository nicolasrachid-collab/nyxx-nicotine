import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedStat } from './AnimatedStat';

export function StatsSection() {
  const { t } = useTranslation();
  
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
        <AnimatedStat 
          value={24} 
          suffix="/7" 
          label={t('statsSupport')} 
        />
      </div>
    </section>
  );
}
