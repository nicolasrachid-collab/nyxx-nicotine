import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider } from './contexts/LanguageContext';
import { 
  Header, 
  MenuOverlay, 
  HeroCard, 
  ProvenResults,
  ProductsSection,
  TechnologySection,
  BenefitsSection,
  StatsSection,
  HowItWorksSection,
  TestimonialsSection,
  MissionSection,
  FAQSection,
  SocialSection,
  Footer
} from './components/sections';

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
          <ProvenResults />
          <BenefitsSection />
          <ProductsSection />
          <TechnologySection />
          <StatsSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <MissionSection />
          <FAQSection />
          <SocialSection />
          <Footer />
       </div>
      </div>
    </LanguageProvider>
  );
};

export default App;
