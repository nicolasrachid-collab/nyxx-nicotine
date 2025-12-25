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
    <section className="w-full bg-white py-24 lg:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden font-sans">
      {/* Efeito de luz sutil - múltiplos pontos suaves */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle 400px at 20% 30%, rgba(251, 146, 60, 0.12) 0%, transparent 70%),
            radial-gradient(circle 400px at 80% 70%, rgba(249, 115, 22, 0.10) 0%, transparent 70%),
            radial-gradient(circle 500px at 50% 50%, rgba(234, 88, 12, 0.08) 0%, transparent 80%)
          `,
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-12 lg:gap-16 mb-24 lg:mb-32">
          
          {/* Centered Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
            style={{ lineHeight: '16px' }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group inline-flex items-center rounded-full w-fit gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border border-orange-200/50 bg-gradient-to-r from-orange-50/80 to-orange-100/60 text-orange-900 backdrop-blur-xl shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 hover:border-orange-300/70 hover:from-orange-100/90 hover:to-orange-200/70 hover:scale-105 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-orange-600 transition-colors duration-300" />
                Propósito NYXX
              </motion.span>
            </div>
            <h1 className="text-4xl lg:text-[38px] font-bold text-black mb-6 lg:mb-8 leading-tight line-clamp-2 break-words">
              Uma forma mais <span className="text-black">inteligente</span><br />
              de consumir nicotina.
            </h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl lg:max-w-3xl mx-auto" style={{ width: '468px' }}>
              Na NYXX, tecnologia inteligente se traduz em alternativas mais seguras e modernas, com uma experiência sem fumaça, sem combustão e total controle.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-16 items-start">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center group h-full"
            >
              {/* Greek Circle Icon Container */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <motion.img 
                  src={greekCirclePattern} 
                  alt="Greek Pattern" 
                  className="absolute inset-0 w-full h-full object-contain invert"
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
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

