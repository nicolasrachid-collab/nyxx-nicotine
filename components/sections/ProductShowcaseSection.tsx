import { motion } from 'motion/react';
import { Coffee, Zap, Circle, Droplets, Snowflake } from 'lucide-react';
import { AnimatedPaperBackground } from '../AnimatedPaperBackground';

const products = [
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Intensidade, cremosidade e sofisticação. O sabor Coffee entrega notas encorpadas de café premium, com perfil aromático intenso e acabamento suave.',
    color: 'amber',
    icon: Coffee,
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gradientFrom: 'from-amber-200/20',
  },
  {
    id: 'energy',
    name: 'Energy',
    description: 'Energia e vitalidade em cada uso. Sabor refrescante que desperta os sentidos e mantém você ativo durante todo o dia.',
    color: 'yellow',
    icon: Zap,
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    gradientFrom: 'from-yellow-200/20',
  },
  {
    id: 'mango',
    name: 'Mango',
    description: 'Doçura tropical e frescor exótico. O sabor Mango transporta você para um paraíso de sabores tropicais autênticos.',
    color: 'orange',
    icon: Circle,
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    gradientFrom: 'from-orange-200/20',
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    description: 'Frescor e leveza em cada momento. O sabor Watermelon oferece uma experiência refrescante e suave, perfeita para qualquer ocasião.',
    color: 'rose',
    icon: Droplets,
    textColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    gradientFrom: 'from-rose-200/20',
  },
  {
    id: 'menthol',
    name: 'Menthol',
    description: 'Frescor intenso e sensação revigorante. O sabor Menthol proporciona uma experiência limpa e refrescante que perdura.',
    color: 'emerald',
    icon: Snowflake,
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    gradientFrom: 'from-emerald-200/20',
  },
];

export function ProductShowcaseSection() {
  return (
    <section id="products" className="w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden" style={{ position: 'relative' }} aria-label="Seção de produtos">
      <AnimatedPaperBackground intensity={0.2} speed={0.8} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[38px] xl:text-[42px] 2xl:text-[46px] font-bold tracking-tight text-black mb-4">
            Nossos Sabores
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra a linha completa de sabores premium
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {products.map((product, index) => {
            const isEven = index % 2 === 1;
            const ProductIcon = product.icon;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Imagem - alterna lado */}
                <div className={isEven ? 'lg:order-2 order-2' : 'lg:order-1 order-2'}>
                  <div className={`relative aspect-square rounded-3xl ${product.bgColor} ${product.borderColor} border-2 p-12 flex items-center justify-center overflow-hidden`}>
                    {/* Placeholder para imagem do produto */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <ProductIcon 
                        size={120} 
                        className={product.textColor}
                        strokeWidth={1.5}
                      />
                      
                      {/* Efeito de brilho */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradientFrom} to-transparent rounded-3xl`} />
                    </div>
                  </div>
                </div>

                {/* Texto - alterna lado */}
                <div className={`${isEven ? 'lg:order-1 order-1' : 'lg:order-2 order-1'} flex flex-col justify-center`}>
                  <div className={`inline-flex items-center gap-3 mb-6 ${product.textColor}`}>
                    <ProductIcon size={24} strokeWidth={1.5} />
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      {product.name}
                    </span>
                  </div>

                  <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${product.textColor}`}>
                    {product.name}
                  </h3>

                  <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

