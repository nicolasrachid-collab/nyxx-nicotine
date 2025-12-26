import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { MenuToggleButton } from '../MenuToggleButton';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../types';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  const { language, setLanguage, t } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
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

        <div className="flex justify-end items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-200 text-xs font-bold uppercase tracking-wide focus:outline-none ${isScrolled || isMenuOpen ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}
              aria-label={t('language')}
              aria-expanded={showLanguageMenu}
            >
              <Globe size={12} />
              <span>{language.toUpperCase()}</span>
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
                        <span className="text-lg leading-none" aria-hidden="true">{lang.flag}</span>
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
