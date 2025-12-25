import { Plus, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ProductSliderClean } from '../ProductSliderClean';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export function TeamSection() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  
  const team: TeamMember[] = [
    {
      name: "Coffee",
      role: "Sabor",
      image: "/Coffee_lado.png"
    },
    {
      name: "Energy",
      role: "Sabor",
      image: "/Energy_lado.png"
    },
    {
      name: "Mango",
      role: "Sabor",
      image: "/Mango_lado.png"
    },
    {
      name: "Watermelon",
      role: "Sabor",
      image: "/Watermelon_lado.png"
    },
    {
      name: "Menthol",
      role: "Sabor",
      image: "/Menthol_lado.png"
    }
  ];

  return (
    <section 
      ref={ref}
      className={`relative w-full bg-[#F5F5F5] py-20 md:py-32 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-7 md:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
                  <Plus size={14} strokeWidth={3} />
               </div>
               <span className="text-sm font-semibold tracking-wide">Nossos Sabores</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]">
               <span className="text-black">Descubra </span>
               <span className="text-gray-400">seu sabor</span>
            </h2>
          </div>
          <button className="bg-black text-white text-[10px] uppercase tracking-wider font-bold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors w-fit group" aria-label="Ver todos os sabores">
            Ver todos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <ProductSliderClean products={team} />
      </div>
    </section>
  );
}
