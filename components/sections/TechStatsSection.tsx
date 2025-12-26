import { motion } from 'motion/react';
import { FlaskConical, Microscope, CheckCircle2 } from 'lucide-react';

const techFeatures = [
  {
    icon: FlaskConical,
    title: 'Ingredientes farmacêuticos',
    description: 'Formulação desenvolvida com ingredientes de grau farmacêutico para máxima pureza e segurança.',
  },
  {
    icon: Microscope,
    title: 'Lab tested',
    description: 'Rigorosamente testado em laboratórios certificados para garantir qualidade e consistência.',
  },
  {
    icon: CheckCircle2,
    title: 'Qualidade garantida',
    description: 'Controle de qualidade em todas as etapas, desde a seleção de ingredientes até o produto final.',
  },
];

const stats = [
  { value: '98%', label: 'Satisfação' },
  { value: '0', label: 'Fumaça' },
  { value: '100%', label: 'Vegano' },
  { value: '24/7', label: 'Disponível' },
];

export function TechStatsSection() {
  return (
    <section className="w-full bg-black text-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden" aria-label="Seção de tecnologia e estatísticas">
      <div className="max-w-7xl mx-auto">
        {/* Cards de Tecnologia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20 lg:mb-24">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-colors duration-300">
                <feature.icon 
                  size={32} 
                  className="text-orange-400"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-base text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 md:mb-20 lg:mb-24" />

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-base md:text-lg text-gray-400 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

