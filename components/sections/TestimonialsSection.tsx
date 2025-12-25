import { Star } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'João Silva',
    location: 'São Paulo, SP',
    rating: 5,
    text: 'Melhor experiência que já tive com produtos de nicotina. O sabor é incrível e a qualidade é excepcional!',
  },
  {
    name: 'Maria Santos',
    location: 'Rio de Janeiro, RJ',
    rating: 5,
    text: 'A conveniência mudou completamente minha rotina. Produtos premium que valem cada centavo.',
  },
  {
    name: 'Carlos Oliveira',
    location: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Qualidade superior em todos os aspectos. Recomendo sem hesitar para quem busca alternativas melhores.',
  },
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center rounded-full w-fit gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase border border-black/20 bg-black/10 text-black backdrop-blur-xl shadow-lg shadow-black/20 hover:bg-black/15 hover:border-black/30 transition-all duration-300">
            {t('testimonialsTitle')}
          </span>
          <span className="text-sm font-semibold tracking-wide">{t('testimonialsSubtitle')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-shadow min-h-[240px]"
          >
            <div className="mb-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold">{testimonial.name}</div>
                <div className="text-xs text-gray-500">{testimonial.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

