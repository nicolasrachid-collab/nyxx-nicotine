import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedLineGradient } from '../AnimatedTextGradient';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

// Função para gerar URL de avatar com IA usando DiceBear Adventurer (estilo mais feliz e expressivo)
const generateAvatarUrl = (name: string, seed?: number): string => {
  const seedValue = seed !== undefined ? seed : name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Usando adventurer que gera avatares mais alegres e expressivos por padrão
  // Cores de fundo mais vibrantes e alegres
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seedValue}&backgroundColor=ffd5dc,ffdfbf,b6e3f4,c0aede&radius=50`;
};

const testimonials: Testimonial[] = [
  {
    name: 'João Silva',
    location: 'São Paulo, SP',
    rating: 5,
    text: 'Melhor experiência que já tive com produtos de nicotina. O sabor é incrível e a qualidade é excepcional!',
    image: generateAvatarUrl('João Silva', 1),
  },
  {
    name: 'Maria Santos',
    location: 'Rio de Janeiro, RJ',
    rating: 5,
    text: 'A conveniência mudou completamente minha rotina. Produtos premium que valem cada centavo.',
    image: generateAvatarUrl('Maria Santos', 2),
  },
  {
    name: 'Carlos Oliveira',
    location: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Qualidade superior em todos os aspectos. Recomendo sem hesitar para quem busca alternativas melhores.',
    image: generateAvatarUrl('Carlos Oliveira', 3),
  },
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();

  return (
    <section 
      ref={ref}
      className={`w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans transition-all duration-700 ease-out bg-clean-pattern ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16 md:mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-2 mb-6">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.2em] uppercase text-gray-600"
            >
              <AnimatedLineGradient />
              Como funciona
              <AnimatedLineGradient />
            </motion.span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[46px] font-bold text-neutral-900 mb-6 tracking-tight">
            Uma nova forma de usar nicotina
          </h1>
          
          <p className="text-base text-neutral-500 max-w-2xl font-medium">
            Tecnologia avançada para uma experiência mais suave e consciente.
          </p>
        </motion.div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl p-8 md:p-10 flex flex-col border border-orange-100/50 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-200/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-100/0 group-hover:from-orange-50/50 group-hover:to-orange-100/30 transition-all duration-500 rounded-3xl" />
            
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 z-0">
              <Quote className="w-16 h-16 text-orange-400" strokeWidth={1.5} />
            </div>

            <div className="mb-8 relative z-10">
              {/* Rating */}
              <div className="flex gap-1.5 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className="fill-orange-400 text-orange-400 group-hover:fill-orange-500 group-hover:text-orange-500 transition-all duration-300 drop-shadow-sm" 
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-base md:text-lg font-medium text-gray-800 leading-relaxed mb-0 relative z-10">
                <span className="text-4xl font-serif text-orange-300/40 leading-none absolute -left-3 -top-3 group-hover:text-orange-400/50 transition-colors duration-300">"</span>
                <span className="relative z-10">{testimonial.text}</span>
                <span className="text-4xl font-serif text-orange-300/40 leading-none group-hover:text-orange-400/50 transition-colors duration-300">"</span>
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-orange-100/50 group-hover:border-orange-200/70 mt-auto transition-colors duration-300 relative z-10">
              <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-orange-500/20 group-hover:shadow-xl group-hover:shadow-orange-500/30 transition-all duration-300 ring-2 ring-orange-100/50 group-hover:ring-orange-200/70 group-hover:scale-105">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 truncate">{testimonial.name}</div>
                <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 truncate">{testimonial.location}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}

