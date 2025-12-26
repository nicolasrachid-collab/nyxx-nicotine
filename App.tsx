import React, { useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider } from './contexts/LanguageContext';
import { 
  Header, 
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
import { TubelightNavbar } from './components/ui/TubelightNavbar';
import { Home, Package, Info, Mail } from 'lucide-react';
import { useTranslation } from './hooks/useTranslation';

const AppContent = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Header />
      <div className="md:hidden">
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
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-6"
        />
      </div>
      
      {/* Main Content */}
      <div>
        <div id="home">
           <HeroCard />
        </div>
        
        {/* Nova estrutura com componentes intercalados */}
        <NyxxSection />
        
        <ProductsSection />
        <TechnologySection />
        <TestimonialsSection />
        <MissionSection />
        <MarqueeSeparator />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
};

const App = () => {
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
         <AppContent />
      </div>
    </LanguageProvider>
  );
};

export default App;
