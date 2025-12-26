import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider } from './contexts/LanguageContext';
import { 
  Header, 
  MenuOverlay, 
  HeroCard,
  ProductsSection,
  TechnologySection,
  HowItWorksSection,
  TestimonialsSection,
  MissionSection,
  FAQSection,
  Footer
} from './components/sections';
import { NyxxSection } from './components/NyxxSection';
import { MarqueeSeparator } from './components/MarqueeSeparator';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Melhorar comportamento de scroll
  useEffect(() => {
    // Prevenir scroll jump ao carregar
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    // Suavizar scroll programático
    const smoothScrollTo = (element: HTMLElement) => {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    // Adicionar suporte para links de navegação suave
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            smoothScrollTo(targetElement as HTMLElement);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-[#F5F5F5] min-h-screen w-full relative overflow-x-hidden font-sans">
         <CustomCursor size={20} />
         <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
         <MenuOverlay isOpen={isMenuOpen} />
       
       {/* Main Content */}
       <div className={`transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div>
             <HeroCard />
          </div>
          
          {/* Nova estrutura com componentes intercalados */}
          <NyxxSection />
          
          {/* Separador */}
          <div className="w-full py-12 md:py-16 bg-white relative">
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle 700px at 10% 20%, rgba(156, 163, 175, 0.12) 0%, transparent 70%),
                  radial-gradient(circle 600px at 90% 80%, rgba(107, 114, 128, 0.10) 0%, transparent 70%),
                  radial-gradient(circle 800px at 50% 50%, rgba(75, 85, 99, 0.08) 0%, transparent 80%),
                  radial-gradient(circle 500px at 5% 50%, rgba(156, 163, 175, 0.08) 0%, transparent 70%),
                  radial-gradient(circle 500px at 95% 50%, rgba(107, 114, 128, 0.08) 0%, transparent 70%)
                `,
              }}
            />
            <div className="max-w-[1800px] mx-auto px-7 md:px-14 relative z-10">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>
          
          <ProductsSection />
          <TechnologySection />
          <TestimonialsSection />
          <MissionSection />
          <MarqueeSeparator />
          <FAQSection />
          <Footer />
       </div>
      </div>
    </LanguageProvider>
  );
};

export default App;
