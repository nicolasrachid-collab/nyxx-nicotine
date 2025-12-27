import { motion } from 'motion/react';
import { Atom, ShieldCheck, ClipboardCheck, FlaskConical } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AnimatedStat } from './AnimatedStat';
import { AnimatedLineGradient } from '../AnimatedTextGradient';

export function TechnologySection() {
  const { t } = useTranslation();
  
  const features = [
    {
      title: t('techSelectedIngredients'),
      description: t('techSelectedIngredientsDesc'),
      icon: FlaskConical,
    },
    {
      title: t('techAdvancedTech'),
      description: t('techAdvancedTechDesc'),
      icon: Atom,
    },
    {
      title: t('techPremiumQuality'),
      description: t('techPremiumQualityDesc'),
      icon: ShieldCheck,
    },
    {
      title: t('techRigorousTesting'),
      description: t('techRigorousTestingDesc'),
      icon: ClipboardCheck,
    },
  ];

  const supportText = t('statsSupport').split('\n');

  return (
    <section className="pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 bg-black text-white overflow-hidden px-4 md:px-8 lg:px-12 xl:px-16" aria-label="Seção de tecnologia">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6 items-center text-center mb-16 md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.2em] uppercase text-gray-300"
              >
                <AnimatedLineGradient />
                {t('technologyTitle')}
                <AnimatedLineGradient />
              </motion.span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[46px] font-bold tracking-tight text-white leading-[1.1] max-w-2xl xl:max-w-3xl mx-auto">
              {t('technologySubtitle')}
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed max-w-md mt-2 mx-auto">
              {t('technologyDescription')}
            </p>
          </motion.div>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 md:mb-20 lg:mb-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-zinc-900 text-white">
                  <CardContent className="p-8 flex flex-col gap-6 h-full">
                    <div className="p-3.5 bg-zinc-800/50 border border-zinc-700/50 w-fit rounded-2xl backdrop-blur-sm shadow-inner">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400 text-base md:text-lg lg:text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>

        {/* Bottom Section: Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10 border-t border-zinc-800 pt-16 justify-items-center">
          <AnimatedStat 
            value={5} 
            suffix="" 
            label={t('statsUniqueFlavors')}
            textColor="text-white"
            labelColor="text-zinc-400"
            textSize="text-5xl md:text-6xl lg:text-7xl"
            labelSize="text-xs md:text-sm"
            maxWidth="max-w-[200px]"
          />
          <AnimatedStat 
            value={98} 
            suffix="%" 
            label={t('statsSatisfaction')}
            textColor="text-white"
            labelColor="text-zinc-400"
            textSize="text-5xl md:text-6xl lg:text-7xl"
            labelSize="text-xs md:text-sm"
            maxWidth="max-w-[200px]"
          />
          <AnimatedStat 
            value={100} 
            suffix="%" 
            label={t('statsTested')}
            textColor="text-white"
            labelColor="text-zinc-400"
            textSize="text-5xl md:text-6xl lg:text-7xl"
            labelSize="text-xs md:text-sm"
            maxWidth="max-w-[200px]"
          />
          <div className="flex flex-col">
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              {supportText[0]}
            </span>
            <div className="mt-4 text-xs md:text-sm font-medium text-zinc-400 max-w-[200px] leading-snug">
              {supportText[1]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
