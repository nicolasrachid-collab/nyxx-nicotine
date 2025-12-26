import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Escolha',
    description: 'Selecione seu sabor favorito entre nossa linha premium',
  },
  {
    number: '02',
    title: 'Use',
    description: 'Quando e onde quiser. Discreto, portátil e prático',
  },
  {
    number: '03',
    title: 'Desfrute',
    description: 'Experiência premium garantida com cada produto',
  },
];

export function ProcessSection() {
  return (
    <section className="w-full bg-black text-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden" aria-label="Seção de processo">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[46px] font-bold tracking-tight mb-4">
            Como funciona
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Três passos simples para uma experiência premium
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Linha conectora - apenas desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Número grande de fundo */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-0">
                <span className="text-[120px] md:text-[150px] lg:text-[180px] font-bold text-white/5 leading-none select-none">
                  {step.number}
                </span>
              </div>

              {/* Conteúdo */}
              <div className="relative z-10 mt-16 md:mt-20">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-8 shadow-lg shadow-orange-500/30">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {step.title}
                </h3>

                <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Seta conectora - apenas desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-8 w-16 h-px bg-white/20">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-white/20 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

