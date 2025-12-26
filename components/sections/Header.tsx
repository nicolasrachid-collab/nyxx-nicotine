import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { MenuToggleButton } from '../MenuToggleButton';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../types';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

// Componente de bandeira SVG
function FlagIcon({ country }: { country: 'br' | 'us' | 'es' }) {
  const flags = {
    br: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
        {/* Fundo verde */}
        <rect fill="#009739" width="640" height="480"/>
        {/* Losango amarelo */}
        <path fill="#FEDD00" d="M320 60l140 180-140 180-140-180z"/>
        {/* Círculo azul */}
        <circle cx="320" cy="240" r="70" fill="#002776"/>
        {/* Faixa branca com "ORDEM E PROGRESSO" */}
        <path fill="#FFF" d="M250 240h140l-10 5-10-5-10 5-10-5-10 5-10-5-10 5-10-5-10 5-10-5-10 5-10-5-10 5-10-5z" opacity="0.9"/>
        {/* Estrelas principais */}
        <path fill="#FFF" d="M320 200l-3 9h9l-7 5 3 9-7-5-7 5 3-9-7-5h9z"/>
        <circle cx="300" cy="220" r="2.5" fill="#FFF"/>
        <circle cx="340" cy="220" r="2.5" fill="#FFF"/>
        <circle cx="310" cy="250" r="2.5" fill="#FFF"/>
        <circle cx="330" cy="250" r="2.5" fill="#FFF"/>
        <circle cx="320" cy="270" r="2.5" fill="#FFF"/>
        <circle cx="290" cy="235" r="2" fill="#FFF"/>
        <circle cx="350" cy="235" r="2" fill="#FFF"/>
        <circle cx="305" cy="260" r="2" fill="#FFF"/>
        <circle cx="335" cy="260" r="2" fill="#FFF"/>
      </svg>
    ),
    us: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
        {/* Listras vermelhas e brancas */}
        <rect fill="#b22234" width="640" height="480"/>
        <rect fill="#fff" y="37.9" width="640" height="37.9"/>
        <rect fill="#fff" y="113.7" width="640" height="37.9"/>
        <rect fill="#fff" y="189.5" width="640" height="37.9"/>
        <rect fill="#fff" y="265.3" width="640" height="37.9"/>
        <rect fill="#fff" y="341.1" width="640" height="37.9"/>
        {/* Cantão azul */}
        <rect fill="#3c3b6e" width="256" height="204.8"/>
        {/* Estrelas no cantão - 50 estrelas simplificadas */}
        <g fill="#fff">
          {/* Primeira fileira */}
          <circle cx="20" cy="15" r="2"/>
          <circle cx="40" cy="15" r="2"/>
          <circle cx="60" cy="15" r="2"/>
          <circle cx="80" cy="15" r="2"/>
          <circle cx="100" cy="15" r="2"/>
          <circle cx="120" cy="15" r="2"/>
          {/* Segunda fileira */}
          <circle cx="30" cy="30" r="2"/>
          <circle cx="50" cy="30" r="2"/>
          <circle cx="70" cy="30" r="2"/>
          <circle cx="90" cy="30" r="2"/>
          <circle cx="110" cy="30" r="2"/>
          {/* Terceira fileira */}
          <circle cx="20" cy="45" r="2"/>
          <circle cx="40" cy="45" r="2"/>
          <circle cx="60" cy="45" r="2"/>
          <circle cx="80" cy="45" r="2"/>
          <circle cx="100" cy="45" r="2"/>
          <circle cx="120" cy="45" r="2"/>
          {/* Continuação do padrão */}
          <circle cx="30" cy="60" r="2"/>
          <circle cx="50" cy="60" r="2"/>
          <circle cx="70" cy="60" r="2"/>
          <circle cx="90" cy="60" r="2"/>
          <circle cx="110" cy="60" r="2"/>
        </g>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 640 480" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
        {/* Listras horizontais */}
        <rect fill="#AA151B" width="640" height="160"/>
        <rect fill="#F1BF00" y="160" width="640" height="160"/>
        <rect fill="#AA151B" y="320" width="640" height="160"/>
        {/* Brasão simplificado à esquerda */}
        <g transform="translate(80, 160)">
          <rect fill="#AA151B" x="0" y="0" width="120" height="160" opacity="0.3"/>
          <circle fill="#F1BF00" cx="60" cy="80" r="30"/>
          <path fill="#AA151B" d="M60 50l10 30h-20z"/>
          <path fill="#AA151B" d="M60 110l10-30h-20z"/>
        </g>
      </svg>
    ),
  };
  
  return flags[country];
}

export function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  const { language, setLanguage, t } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages: { code: Language; label: string; flagComponent: 'br' | 'us' | 'es' }[] = [
    { code: 'pt', label: 'PT', flagComponent: 'br' },
    { code: 'en', label: 'EN', flagComponent: 'us' },
    { code: 'es', label: 'ES', flagComponent: 'es' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollPosition > 10);
    };

    // Executar imediatamente para definir estado inicial
    handleScroll();

    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-7 py-4 md:px-14 md:py-5 transition-all duration-300 ${
        isScrolled || isMenuOpen 
          ? 'bg-black border-b border-white/10 text-white shadow-lg shadow-black/20' 
          : 'bg-transparent text-white'
      }`}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
    >
      <div className="w-full max-w-[1800px] flex justify-between items-center">
        <div className="flex justify-start">
          <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity" aria-label="Nyxx Nicotine Home">
            <img 
              src="/logo_nyxx.svg" 
              alt="Nyxx Nicotine Technologies" 
              className={`h-8 md:h-10 w-auto object-contain transition-all duration-300 ${isScrolled || isMenuOpen ? 'brightness-0 invert' : 'brightness-0 invert'}`}
            />
          </a>
        </div>

        {/* Menu de navegação */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
          {[
            { key: 'menuHome', href: '#home' },
            { key: 'menuProducts', href: '#products' },
            { key: 'menuAbout', href: '#about' },
            { key: 'menuContact', href: '#contact' }
          ].map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide transition-all duration-200 hover:opacity-70 relative group"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(item.href);
                if (target) {
                  const headerOffset = 100;
                  const elementPosition = target.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t(item.key as keyof typeof t)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </a>
          ))}
        </nav>

        <div className="flex justify-end items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 text-xs font-bold uppercase tracking-wide focus:outline-none ${isScrolled || isMenuOpen ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}
              aria-label={t('language')}
              aria-expanded={showLanguageMenu}
            >
              {(() => {
                const currentLang = languages.find(l => l.code === language);
                return currentLang ? (
                  <>
                    <FlagIcon country={currentLang.flagComponent} />
                    <span>{language.toUpperCase()}</span>
                  </>
                ) : (
                  <>
                    <Globe size={12} />
                    <span>{language.toUpperCase()}</span>
                  </>
                );
              })()}
            </button>
            
            {showLanguageMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowLanguageMenu(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-44 bg-black/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" role="menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-150 ${
                        language === lang.code
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/10 active:bg-white/20'
                      }`}
                      role="menuitem"
                    >
                      <div className="flex items-center gap-3">
                        <FlagIcon country={lang.flagComponent} />
                        <span className={`w-2 h-2 rounded-full ${language === lang.code ? 'bg-white' : 'bg-white/40'}`} aria-hidden="true"></span>
                        {lang.label}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <MenuToggleButton isMenuOpen={isMenuOpen} onClick={toggleMenu} isDark={false} />
        </div>
      </div>
    </header>
  );
}
