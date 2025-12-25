import { useState } from 'react';
import { Globe, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../types';

interface MenuOverlayProps {
  isOpen: boolean;
}

export function MenuOverlay({ isOpen }: MenuOverlayProps) {
  const { language, setLanguage, t } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  if (!isOpen) return null;

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: t('portuguese') },
    { code: 'en', label: t('english') },
    { code: 'es', label: t('spanish') },
  ];

  return (
    <div className={`fixed inset-0 bg-[#F5F5F5] z-40 flex flex-col justify-between pt-28 pb-10 px-7 md:px-14 text-black transition-all duration-500 ease-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="flex flex-col md:flex-row justify-between h-full">
        <div className={`hidden md:block pt-4 transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <a href="mailto:hello@nyxx.com" className="text-xl font-medium hover:underline transition-opacity hover:opacity-70">hello@nyxx.com</a>
        </div>

        <nav className="flex flex-col justify-center items-center md:items-center w-full gap-4 md:gap-2" aria-label="Main navigation">
          {[t('menuHome'), t('menuProducts'), t('menuAbout'), t('menuContact')].map((item, index) => (
            <a 
              key={item} 
              href="#" 
              className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center transition-all duration-500 hover:text-gray-400 group relative ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" aria-hidden="true"></span>
            </a>
          ))}
        </nav>
      </div>

      <div className="absolute top-7 md:top-8 right-7 md:right-14 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
            aria-label={t('language')}
            aria-expanded={showLanguageMenu}
          >
            <Globe size={16} />
            <span>{languages.find(l => l.code === language)?.label}</span>
          </button>
          
          {showLanguageMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowLanguageMenu(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden" role="menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      language === lang.code
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-gray-100'
                    }`}
                    role="menuitem"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500 mt-10 md:mt-0 border-t border-gray-200 pt-6 md:border-none md:pt-0 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="md:hidden mb-4">
          <a href="mailto:hello@nyxx.com" className="hover:underline transition-opacity hover:opacity-70">hello@nyxx.com</a>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-black transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors duration-300">Terms of Service</a>
        </div>
        <div className="md:hidden mt-4 flex gap-4">
           <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Twitter">
             <Twitter className="w-5 h-5" />
           </a>
           <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
             <Instagram className="w-5 h-5" />
           </a>
        </div>
        <div className="hidden md:block">
           Siga a Nyxx
        </div>
      </div>
    </div>
  );
}
