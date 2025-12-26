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
    <section className="w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans" aria-label="Seção como funciona">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 justify-items-center items-center">
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
                <span className="text-[10rem] leading-none font-bold text-neutral-100 absolute -top-20 -left-8 z-0 select-none transition-all duration-700 group-hover:text-black group-hover:-translate-y-4">
                  {step.id}
                </span>

                <div className="flex flex-col items-start pt-4 relative z-10">
                  <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-base text-neutral-500 leading-relaxed font-medium">
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
