import React, { useState, useRef } from 'react';
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
      className="relative bg-black text-white pt-20 pb-8 overflow-hidden"
    >
      {/* Padrão de fundo sutil */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'radial-gradient(rgb(255, 255, 255) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
        aria-hidden="true"
      />

      {/* Gradiente sutil no topo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-7 md:px-14 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 mb-16 md:mb-20">
          {/* Newsletter Section */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400">
                {t('newsletter')}
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">
              Fique por dentro
            </h3>
            <div className="flex gap-3 max-w-md">
              <input 
                type="email" 
                placeholder={t('emailPlaceholder')}
                aria-label="Email address for newsletter"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-5 py-3.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
              <button 
                className="bg-white/10 text-white p-3.5 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0 border border-white/10" 
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 mb-6">
              {t('siteMap')}
            </h4>
            <ul className="space-y-4">
              {[t('home'), t('products'), t('about'), t('contact'), t('faq')].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-base font-medium tracking-tight text-gray-300 hover:text-white transition-colors group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-400 mb-6">
              {t('socialLinks')}
            </h4>
            <ul className="space-y-4">
              {['X', 'IG', 'BE', 'DB'].map(item => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-base font-medium tracking-tight text-gray-300 hover:text-white transition-colors group flex items-center gap-2"
                    aria-label={`Visit our ${item} profile`}
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-2">{t('madeBy')}</p>
              <p className="text-xs text-gray-500 mb-2">{t('lastUpdated')}</p>
              <p className="text-xs text-gray-500 mb-4">{t('copyright')}</p>
              <p className="text-xs text-white/60 font-medium">{t('ageRestriction')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                {t('termsOfService')}
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
                {t('legalNotice')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <img 
                src="/logo_reduzida.svg" 
                alt="Nyxx" 
                className="h-8 md:h-10 w-auto brightness-0 invert"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-xs text-gray-500">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>

      {/* Logo Background Effect */}
      <div className="absolute inset-0 z-0 flex justify-center items-end overflow-hidden pointer-events-none">
        {/* Logo base - muito sutil */}
        <div 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[45vw] max-w-[900px] h-auto select-none transition-transform duration-500 ease-out origin-bottom translate-y-[25%] ${isHovered ? 'scale-105' : 'scale-100'}`}
          style={{ opacity: 0.04 }}
          aria-hidden="true"
        >
          <img 
            src="/logo_reduzida.svg" 
            alt=""
            className="w-full h-auto brightness-0 invert"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        {/* Logo com efeito de máscara interativo */}
        <div 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[45vw] max-w-[900px] h-auto select-none transition-all duration-300 ease-out origin-bottom translate-y-[25%] ${isHovered ? 'scale-105' : 'scale-100'}`}
          style={{
            maskImage: `radial-gradient(circle 700px at ${mousePos.x}px ${mousePos.y}px, black 50%, transparent 85%)`,
            WebkitMaskImage: `radial-gradient(circle 700px at ${mousePos.x}px ${mousePos.y}px, black 50%, transparent 85%)`,
            opacity: 0.12,
          }}
          aria-hidden="true"
        >
          <img 
            src="/logo_reduzida.svg" 
            alt=""
            className="w-full h-auto brightness-0 invert"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </footer>
  );
}
