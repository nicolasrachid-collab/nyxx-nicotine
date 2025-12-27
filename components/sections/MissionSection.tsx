import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function MissionSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  return (
    <section 
      id="about"
      ref={ref}
      className={`w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans transition-all duration-700 ease-out bg-clean-pattern ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-label="Seção de missão"
    >
      <div className="max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20">
          {/* Left Column: Brand and Tagline */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              {/* Brand Name */}
              <div className="flex items-center">
                <img 
                  src="/logo_reduzida.svg" 
                  alt="Nyxx" 
                  className="h-8 md:h-10 lg:h-12 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Horizontal Line */}
              <div className="w-12 h-px bg-gray-300"></div>
              
              {/* Tagline */}
              <p className="text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 leading-relaxed max-w-[180px]">
                {t('missionSubtitle')}
              </p>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[46px] font-bold tracking-tight leading-[1.1] text-black mt-4">
                {t('missionTitle')}
              </h1>
            </motion.div>
          </div>

          {/* Right Column: Mission Content */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              
              {/* Content Paragraphs */}
              <div className="flex flex-col gap-6 max-w-3xl">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Acreditamos que consumir nicotina não precisa ser complicado ou comprometer a qualidade.
                </p>
                
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Por isso, desenvolvemos produtos que combinam <strong className="font-bold text-gray-900">tecnologia avançada</strong>, <strong className="font-bold text-gray-900">sabores autênticos</strong> e um compromisso genuíno com a segurança e satisfação de nossos clientes.
                </p>
              </div>
              
              {/* Call to Action Link */}
              <a 
                href="#"
                className="group inline-flex items-center gap-2 text-base md:text-lg font-medium text-gray-900 hover:text-orange-600 transition-colors duration-300 w-fit"
                aria-label="Saiba mais sobre nós"
              >
                <span>Saiba mais sobre nós</span>
                <ArrowRight 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
