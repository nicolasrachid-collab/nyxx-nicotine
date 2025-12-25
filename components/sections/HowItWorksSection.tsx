import { motion } from "motion/react";
import { MousePointer2, Zap, Star } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Escolha",
    description: "Selecione seu sabor favorito",
    icon: MousePointer2,
  },
  {
    id: "02",
    title: "Use",
    description: "Quando e onde quiser",
    icon: Zap,
  },
  {
    id: "03",
    title: "Desfrute",
    description: "Experiência premium garantida",
    icon: Star,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-32"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-black text-white p-1 rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-wide uppercase text-neutral-900">
              Como funciona
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Uma nova forma de usar nicotina
          </h2>
          
          <p className="text-xl text-neutral-500 max-w-2xl font-medium">
            Tecnologia avançada para uma experiência mais suave e consciente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="group relative"
            >
              {/* Decorative line */}
              <div className="absolute top-8 left-0 w-full h-px bg-neutral-100 -z-10 hidden md:block" />
              
              <div className="relative flex flex-col pt-8">
                {/* Large Background Number */}
                <span className="text-[10rem] leading-none font-bold text-neutral-100 absolute -top-20 -left-8 z-0 select-none transition-all duration-700 group-hover:text-neutral-200 group-hover:-translate-y-4">
                  {step.id}
                </span>

                <div className="flex flex-col items-start pt-4 relative z-10">
                  <h3 className="text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
