import { useState, useEffect } from 'react';
import { Globe, Home, Package, Info, Mail } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { TubelightNavbar } from '../ui/TubelightNavbar';
import { BrazilFlag, SpainFlag, USAFlag } from '../CountryFlags';
import type { Language } from '../../types';

// Componente de bandeira SVG
function FlagIcon({ country }: { country: 'br' | 'us' | 'es' }) {
  const flags = {
    br: <BrazilFlag className="w-5 h-5 flex-shrink-0" />,
    us: <USAFlag className="w-5 h-5 flex-shrink-0" />,
    es: <SpainFlag className="w-5 h-5 flex-shrink-0" />,
  };
  
  return flags[country];
}

export function Header() {
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
        isScrolled 
          ? 'bg-transparent text-white' 
          : 'bg-transparent text-white'
      }`}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
    >
      <div className="w-full flex justify-center items-center">
        <TubelightNavbar 
          items={[
            { 
              name: 'home', 
              url: '#home', 
              icon: Home,
              label: t('menuHome')
            },
            { 
              name: 'products', 
              url: '#products', 
              icon: Package,
              label: t('menuProducts')
            },
            { 
              name: 'about', 
              url: '#about', 
              icon: Info,
              label: t('menuAbout')
            },
            { 
              name: 'contact', 
              url: '#contact', 
              icon: Mail,
              label: t('menuContact')
            },
          ]}
          className="hidden md:block"
          rightElement={
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 text-xs font-bold uppercase tracking-wide focus:outline-none bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
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
          }
        />
      </div>
    </header>
  );
}
