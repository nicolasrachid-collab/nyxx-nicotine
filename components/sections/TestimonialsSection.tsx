import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

// Função para gerar URL de avatar com IA usando DiceBear Adventurer (estilo mais feliz e expressivo)
const generateAvatarUrl = (name: string, seed?: number): string => {
  const seedValue = seed || name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
      className={`w-full bg-white py-24 lg:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden font-sans transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-32"
        >
          <div className="flex items-center gap-2 mb-6">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group inline-flex items-center rounded-full w-fit gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border border-orange-200/50 bg-gradient-to-r from-orange-50/80 to-orange-100/60 text-orange-900 backdrop-blur-xl shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 hover:border-orange-300/70 hover:from-orange-100/90 hover:to-orange-200/70 hover:scale-105 transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-orange-600 transition-colors duration-300" />
              Como funciona
            </motion.span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[38px] font-bold text-neutral-900 mb-6 tracking-tight">
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
            className="group relative bg-white rounded-2xl p-6 md:p-8 flex flex-col border border-neutral-200/50 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-12 h-12 text-orange-500" strokeWidth={1} />
            </div>

            <div className="mb-6 relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className="fill-orange-400 text-orange-400 group-hover:fill-orange-500 group-hover:text-orange-500 transition-colors" 
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed mb-6 relative">
                <span className="text-2xl font-serif text-orange-400/30 leading-none absolute -left-2 -top-2">"</span>
                {testimonial.text}
                <span className="text-2xl font-serif text-orange-400/30 leading-none">"</span>
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 mt-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md shadow-orange-500/20 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all ring-2 ring-orange-100 group-hover:ring-orange-200">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-xs text-gray-500">{testimonial.location}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}

