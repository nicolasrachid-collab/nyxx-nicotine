import { motion } from "motion/react";
import { Shield, Star, Box, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

// Padrão grego - imagem localizada em /public/greek-pattern.svg
const greekCirclePattern = "/greek-pattern.svg";

export function NyxxSection() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Shield,
      title: "Alternativa mais segura",
      description:
        "Tecnologia desenvolvida para reduzir impactos. Experiência clara, sem fumaça e combustão",
    },
    {
      icon: Star,
      title: "Sabor superior",
      description: (
        <>
          Sabores precisos e finos criados<br />
          com ingredientes selecionados<br />
          para experiência pura já.
        </>
      ),
    },
    {
      icon: Box,
      title: "Conveniência inteligente",
      description:
        "Uso discreto, portátil e prático para qualquer momento e lugar. Sem odores e sem fumaça.",
    },
    {
      icon: CheckCircle,
      title: "Qualidade garantida",
      description:
        "Controle preciso em todas as etapas para garantir consistência segurança e desempenho!",
    },
  ];

  return (
    <section className="w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans" aria-label="Seção NYXX">
      {/* Efeito de luz sutil - múltiplos pontos suaves */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 700px at 10% 20%, rgba(156, 163, 175, 0.12) 0%, transparent 70%),
            radial-gradient(circle 600px at 90% 80%, rgba(107, 114, 128, 0.10) 0%, transparent 70%),
            radial-gradient(circle 800px at 50% 50%, rgba(75, 85, 99, 0.08) 0%, transparent 80%),
            radial-gradient(circle 500px at 5% 50%, rgba(156, 163, 175, 0.08) 0%, transparent 70%),
            radial-gradient(circle 500px at 95% 50%, rgba(107, 114, 128, 0.08) 0%, transparent 70%)
          `,
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-12 lg:gap-16 mb-16 md:mb-20 lg:mb-24">
          
          {/* Centered Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group inline-flex items-center rounded-full w-fit gap-2.5 px-6 py-3 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase border border-black/10 bg-white/90 text-black backdrop-blur-sm shadow-sm hover:shadow-md hover:border-black/20 hover:bg-white transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-125 transition-transform duration-300" />
                Propósito NYXX
              </motion.span>
            </div>
            <h1 className="text-4xl lg:text-[38px] font-bold text-black mb-6 lg:mb-8 leading-tight line-clamp-2 break-words">
              Uma forma mais <span className="text-black">inteligente</span><br />
              de consumir nicotina.
            </h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
              Na NYXX, tecnologia inteligente se traduz em alternativas mais seguras e modernas, com uma experiência sem fumaça, sem combustão e total controle.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-x-8 lg:gap-x-12 xl:gap-x-16 gap-y-12 lg:gap-y-16 xl:gap-y-20 items-start">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center group h-full hover:scale-105 transition-transform duration-300"
            >
              {/* Greek Circle Icon Container */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <motion.img 
                  src={greekCirclePattern} 
                  alt="Greek Pattern" 
                  className="absolute inset-0 w-full h-full object-contain invert"
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  loading="lazy"
                  decoding="async"
                />
                <feature.icon 
                  className="w-8 h-8 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-black" 
                  strokeWidth={1.5} 
                  style={{ color: '#C8CBCA' }} 
                />
              </div>
              
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3 lg:mb-4 tracking-wide">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed max-w-[250px] lg:max-w-[280px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

