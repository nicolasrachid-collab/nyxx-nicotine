import { motion } from "motion/react";
import { Shield, Star, Box, CheckCircle, ArrowRight } from "lucide-react";

// Padrão grego - imagem localizada em /public/greek-pattern.svg
const greekCirclePattern = "/greek-pattern.svg";

export function NyxxSection() {
  const features = [
    {
      icon: Shield,
      title: "Alternativa mais segura",
      description:
        "Tecnologia desenvolvida para reduzir impactos do consumo tradicional. Experiência limpa, sem fumaça e sem combustão.",
    },
    {
      icon: Star,
      title: "Sabor superior",
      description:
        "Sabores precisos e sofisticados, criados com ingredientes selecionados para uma experiência mais pura.",
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
        "Controle rigoroso em todas as etapas para garantir consistência, segurança e alto desempenho.",
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-4 md:px-8 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          
          {/* Left Text - Extended Width */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 text-left"
          >
            <div className="mb-4 text-gray-500 text-sm font-semibold tracking-widest uppercase">
              Por que escolher Nyxx Nicotine?
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-[24px] leading-tight mt-[0px] mr-[-251px] ml-[0px]">
              Uma forma mais <span className="text-gray-500">inteligente</span> de consumir nicotina.
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl w-[140%]">
              Na NYXX desenvolvemos tecnologias inteligentes para oferecer alternativas mais seguras, modernas e equilibradas. Uma experiência sem fumaça, sem combustão e com mais controle.
            </p>
          </motion.div>

          {/* Center Space - Glow Effect Only */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3 flex justify-center relative"
          >
            {/* Glow effect behind phantom content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-black/5 blur-[80px] rounded-full" />
          </motion.div>

          {/* Right Space - Empty for Layout Balance */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="lg:w-1/3 flex flex-col items-start lg:items-end justify-center"
          >
             {/* Empty space intentional */}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Greek Circle Icon Container */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <motion.img 
                  src={greekCirclePattern} 
                  alt="Greek Pattern" 
                  className="absolute inset-0 w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-500 invert"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <feature.icon className="w-8 h-8 text-black relative z-10" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg font-bold text-black mb-3 tracking-wide">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

