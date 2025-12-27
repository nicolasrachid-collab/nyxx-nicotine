import React, { useEffect, lazy, Suspense } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Header } from './components/sections';
import { HeroCard } from './components/sections';
import { NyxxSection } from './components/NyxxSection';
import { MarqueeSeparator } from './components/MarqueeSeparator';
import { TubelightNavbar } from './components/ui/TubelightNavbar';
import { Home, Package, Info, Mail } from 'lucide-react';
import { useTranslation } from './hooks/useTranslation';
import { useAnalytics } from './hooks/useAnalytics';

// Lazy load components for code splitting
const ProductsSection = lazy(() => import('./components/sections/ProductsSection').then(m => ({ default: m.ProductsSection })));
const TechnologySection = lazy(() => import('./components/sections/TechnologySection').then(m => ({ default: m.TechnologySection })));
const TestimonialsSection = lazy(() => import('./components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const MissionSection = lazy(() => import('./components/sections/MissionSection').then(m => ({ default: m.MissionSection })));
const FAQSection = lazy(() => import('./components/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const Footer = lazy(() => import('./components/sections/Footer').then(m => ({ default: m.Footer })));

// Loading skeleton component
const SectionSkeleton = () => (
  <div className="w-full min-h-[400px] bg-white animate-pulse">
    <div className="max-w-7xl mx-auto px-7 md:px-14 py-24">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const AppContent = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Update HTML lang attribute based on selected language
  useEffect(() => {
    const langMap: Record<string, string> = {
      'pt': 'pt-BR',
      'en': 'en-US',
      'es': 'es-ES'
    };
    document.documentElement.lang = langMap[language] || 'pt-BR';
  }, [language]);
  
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-md focus:shadow-lg transition-all"
        aria-label="Pular para conteúdo principal"
      >
        Pular para conteúdo principal
      </a>
      
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
      <main id="main-content">
        <div id="home">
           <HeroCard />
        </div>
        
        {/* Nova estrutura com componentes intercalados */}
        <NyxxSection />
        
        <Suspense fallback={<SectionSkeleton />}>
          <ProductsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <TechnologySection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <MissionSection />
        </Suspense>
        
        <MarqueeSeparator />
        
        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

const App = () => {
  // Inicializar analytics
  useAnalytics();
  
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
