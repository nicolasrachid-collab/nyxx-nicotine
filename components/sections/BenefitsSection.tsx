import { motion } from 'motion/react';
import { Shield, Leaf, Snowflake, Award } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Segurança',
    description: 'Tecnologia desenvolvida para reduzir impactos. Experiência clara, sem fumaça e combustão.',
    color: 'text-blue-600',
  },
  {
    icon: Leaf,
    title: '100% Vegano',
    description: 'Ingredientes naturais e veganos, sem componentes de origem animal.',
    color: 'text-green-600',
  },
  {
    icon: Snowflake,
    title: 'Frescor',
    description: 'Sensação refrescante e limpa que perdura. Experiência premium a cada uso.',
    color: 'text-cyan-600',
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Controle preciso em todas as etapas para garantir consistência e desempenho.',
    color: 'text-orange-600',
  },
];

export function BenefitsSection() {
  return (
    <section className="w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden bg-light-pattern" aria-label="Seção de benefícios">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[46px] font-bold tracking-tight text-black mb-4">
            Por que escolher NYXX?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Compromisso com excelência em cada detalhe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${benefit.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <benefit.icon 
                  size={32} 
                  className={benefit.color}
                  strokeWidth={1.5}
                />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-base text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
