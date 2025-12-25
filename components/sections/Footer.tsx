import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#F5F5F5] text-black pt-14 pb-0 overflow-hidden min-h-[60vh] flex flex-col justify-between"
    >
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} aria-hidden="true">
      </div>

      <div className="max-w-[1800px] mx-auto px-7 md:px-14 relative z-20 w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-32">
          <div className="md:col-span-4 lg:col-span-5 pr-0 md:pr-14">
            <p className="text-sm font-medium text-gray-500 mb-4">{t('newsletter')}</p>
            <div className="flex gap-2 max-w-sm">
               <input 
                 type="email" 
                 placeholder={t('emailPlaceholder')}
                 aria-label="Email address for newsletter"
                 className="flex-1 bg-transparent border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
               />
               <button className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors" aria-label="Subscribe to newsletter">
                 <ArrowRight size={18} />
               </button>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
             <h4 className="text-xs text-gray-500 mb-6 font-medium">{t('siteMap')}</h4>
             <ul className="space-y-3">
               {[t('home'), t('products'), t('about'), t('contact'), t('faq')].map(item => (
                 <li key={item}>
                   <a href="#" className="text-lg font-semibold tracking-tight hover:opacity-60 transition-opacity flex items-center gap-1 group">
                     {item}.
                   </a>
                 </li>
               ))}
             </ul>
          </div>

           <div className="md:col-span-2 lg:col-span-2">
             <h4 className="text-xs text-gray-500 mb-6 font-medium">{t('socialLinks')}</h4>
             <ul className="space-y-3">
               {['X', 'IG', 'BE', 'DB'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-lg font-semibold tracking-tight hover:opacity-60 transition-opacity" aria-label={`Visit our ${item} profile`}>
                     {item}.
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-between text-xs text-gray-400 leading-relaxed space-y-6 md:space-y-0 text-right md:text-left lg:items-end lg:text-right">
             <div>
               <p className="mb-2">{t('madeBy')}</p>
               <p className="mb-2">{t('lastUpdated')}</p>
               <p className="mb-4">{t('copyright')}</p>
               <p className="text-red-600 font-medium">{t('ageRestriction')}</p>
             </div>
             <div>
               <a href="#" className="hover:text-black cursor-pointer transition-colors">{t('termsOfService')}</a>
               <br />
               <a href="#" className="hover:text-black cursor-pointer transition-colors">{t('privacyPolicy')}</a>
               <br />
               <a href="#" className="hover:text-black cursor-pointer transition-colors">{t('legalNotice')}</a>
             </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 flex justify-center items-end overflow-hidden pointer-events-none">
         <div 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[600px] h-auto select-none transition-transform duration-700 ease-out origin-bottom translate-y-[20%] ${isHovered ? 'scale-105' : 'scale-100'}`}
            style={{ opacity: 0.2 }}
            aria-hidden="true"
         >
            <img 
               src="/logo_reduzida.svg" 
               alt=""
               className="w-full h-auto"
               style={{ filter: 'grayscale(100%) brightness(0.5)' }}
            />
         </div>
         
         <div 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[600px] h-auto select-none transition-all duration-700 ease-out origin-bottom translate-y-[20%] ${isHovered ? 'scale-105 drop-shadow-2xl' : 'scale-100'}`}
            style={{
              maskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
              opacity: 0.6,
            }}
            aria-hidden="true"
         >
            <img 
               src="/logo_reduzida.svg" 
               alt=""
               className="w-full h-auto"
            />
         </div>
      </div>
    </footer>
  );
}
