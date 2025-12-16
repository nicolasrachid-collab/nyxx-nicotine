import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Menu, X, ArrowUpRight, Plus, Twitter, Instagram, Linkedin, ArrowRight, Star, MoreHorizontal, Heart, MessageCircle, Send, Bookmark, Globe } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { MenuToggleButton } from './components/MenuToggleButton';

// Tipos de idioma
type Language = 'pt' | 'en' | 'es';

// Contexto de idioma
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>({
  language: 'pt',
  setLanguage: () => {},
  t: () => '',
});

// Traduções
const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navegação
    home: 'Início',
    studio: 'Studio',
    projects: 'Projetos',
    project27: 'Project 27',
    blog: 'Blog',
    contact: 'Contato',
    about: 'Sobre',
    connect: 'Conectar',
    // Idioma
    language: 'Idioma',
    portuguese: 'Português',
    english: 'Inglês',
    spanish: 'Espanhol',
    // Hero
    nicotine: 'Nicotine',
    brandingIdentity: 'Branding e Identidade',
    socialMediaMarketing: 'Marketing em Redes Sociais',
    webDesignDevelopment: 'Design e Desenvolvimento Web',
    seoOptimization: 'Otimização SEO',
    noGenericWebsites: 'The Smarter Way To Use It',
    justTools: 'A forma mais inteligente de usar, unindo design inteligente, tecnologia avançada e desempenho real em cada detalhe.',
    teamLead: 'Líder de Equipe',
    atNyxx: 'na Nyxx®',
    letsTalk: 'Vamos conversar',
    // Mission
    missionTitle: 'Nossa abordagem é simples:',
    missionText: 'focamos em funcionalidade, velocidade e clareza, garantindo que cada projeto sirva a um propósito claro sem complexidade desnecessária.',
    missionSubtext: 'Não fazemos promessas exageradas ou usamos linguagem de marketing chamativa. Simplesmente construímos sites e estratégias bem projetados e funcionais que ajudam os negócios a ter sucesso.',
    // Proven Results
    whyChooseUs: 'Por que nos escolher',
    provenResults: 'Resultados comprovados para cada projeto,',
    withFocus: 'com foco em design e funcionalidade.',
    // Stats
    adImpressions: 'Impressões de anúncios\ngerenciadas',
    successfulProjects: 'Projetos bem-sucedidos\nlançados',
    clientSatisfaction: 'Taxa de satisfação\ndo cliente',
    monthlyVisitors: 'Visitantes mensais\ndirigidos através de SEO',
    // Case Study
    caseStudy: 'Estudo de caso',
    uxUiRedesign: 'Redesign UX/UI, Otimização Frontend.',
    liveWebsite: 'Site ao vivo',
    fromBranding: 'Do branding ao desenvolvimento web\ne marketing',
    weDoItAll: 'Fazemos tudo.',
    performanceBoost: 'Aumento de Performance:',
    pageSpeed: 'Velocidade da página +48%,\nTaxa de rejeição -23%',
    conversionRate: 'Melhoria da Taxa de Conversão:',
    pagespeedScore: 'Pontuação de velocidade',
    pagespeedDescription: 'Priorizamos o desempenho sem sacrificar o apelo visual ou a funcionalidade.',
    thanksToRedesign: 'Graças ao redesign, vimos um aumento constante de 60% nos leads.',
    quarterlyVisits: 'Visitas trimestrais',
    // Team
    theFaces: 'Os rostos',
    behind: 'por trás',
    theProjects: 'dos projetos.',
    weBelieve: 'Acreditamos que um ótimo trabalho vem',
    fromCollaboration: 'da colaboração.',
    collaborationText: 'É por isso que trabalhamos em estreita colaboração uns com os outros para garantir que cada projeto atenda aos seus objetivos.',
    bePartOfMission: 'Faça parte da nossa missão',
    ifYoureReady: 'Se você está pronto para criar, adoraríamos ouvir de você.',
    applyNow: 'Candidatar-se agora',
    // FAQ
    frequentlyAsked: 'Perguntas',
    questions: 'frequentes',
    gotSomething: 'Tem alguma dúvida? Confira nosso FAQ para respostas e detalhes úteis.',
    faq1Question: 'Quais serviços vocês oferecem?',
    faq1Answer: 'Oferecemos uma suíte completa de serviços digitais, incluindo design web, desenvolvimento full-stack, criação de identidade de marca, otimização SEO e estratégias de marketing em redes sociais adaptadas para fazer sua audiência crescer.',
    faq2Question: 'Com que tipos de negócios vocês trabalham?',
    faq2Answer: 'Trabalhamos com startups, negócios em crescimento e marcas estabelecidas — qualquer pessoa que busque criar experiências digitais cuidadosas.',
    faq3Question: 'Quanto tempo leva um projeto típico?',
    faq3Answer: 'Os prazos variam dependendo do escopo, mas a maioria dos projetos leva de 3 a 4 semanas desde o início até o lançamento. Somos rápidos, mas minuciosos.',
    faq4Question: 'Como é o processo de design e desenvolvimento de vocês?',
    faq4Answer: 'Nosso processo é colaborativo e iterativo. Começamos com uma fase de descoberta para entender seus objetivos, seguida por wireframing, mockups de design e depois desenvolvimento ágil com check-ins regulares para garantir alinhamento.',
    faq5Question: 'Vocês oferecem suporte contínuo após o lançamento?',
    faq5Answer: 'Sim, fornecemos pacotes de suporte flexíveis para garantir que seus produtos digitais permaneçam seguros, atualizados e performáticos conforme seu negócio evolui.',
    faq6Question: 'Como começamos?',
    faq6Answer: 'Começar é simples. Basta preencher nosso formulário de contato ou agendar uma chamada de descoberta. Discutiremos as necessidades do seu projeto e enviaremos uma proposta personalizada.',
    faq7Question: 'Vocês trabalham com marcas existentes ou apenas criam do zero?',
    faq7Answer: 'Fazemos ambos! Se você precisa de um rebrand completo ou apenas quer atualizar sua presença digital existente, adaptamos nossa abordagem para se adequar aos seus requisitos específicos.',
    // Social
    social: 'Social',
    followAlong: 'Acompanhe',
    // Footer
    newsletter: 'Newsletter.',
    emailPlaceholder: 'email@address.com',
    siteMap: 'Mapa do site.',
    socialLinks: 'Social.',
    madeBy: 'Feito por Tom D.',
    lastUpdated: 'Última atualização 8/17/24.',
    copyright: 'Copyright 2025 Nyxx Nicotine. Todos os direitos reservados.',
    termsOfService: 'Termos de serviço.',
    privacyPolicy: 'Política de privacidade.',
    // Menu
    menuHome: 'Home',
    menuStudio: 'Studio',
    menuProjects: 'Projects',
    menuBlog: 'Blog',
    menuContact: 'Contact',
  },
  en: {
    // Navigation
    home: 'Home',
    studio: 'Studio',
    projects: 'Projects',
    project27: 'Project 27',
    blog: 'Blog',
    contact: 'Contact',
    about: 'About',
    connect: 'Connect',
    // Language
    language: 'Language',
    portuguese: 'Portuguese',
    english: 'English',
    spanish: 'Spanish',
    // Hero
    nicotine: 'Nicotine',
    brandingIdentity: 'Branding and Identity',
    socialMediaMarketing: 'Social Media Marketing',
    webDesignDevelopment: 'Web Design and Development',
    seoOptimization: 'SEO Optimization',
    noGenericWebsites: 'No generic websites. No empty marketing promises.',
    justTools: 'Just tools and strategies that help your business grow and your brand shine.',
    teamLead: 'Team Lead',
    atNyxx: 'at Nyxx®',
    letsTalk: "Let's talk",
    // Mission
    missionTitle: 'Our approach is simple:',
    missionText: 'we focus on functionality, speed, and clarity, ensuring that every project serves a clear purpose without unnecessary complexity.',
    missionSubtext: "We don't overpromise or use flashy marketing language. We simply build well-designed, functional websites and strategies that help businesses succeed.",
    // Proven Results
    whyChooseUs: 'Why choose us',
    provenResults: 'Proven results for every project,',
    withFocus: 'with a focus on design and functionality.',
    // Stats
    adImpressions: 'Ad impressions\nmanaged',
    successfulProjects: 'Successful\nprojects launched',
    clientSatisfaction: 'Client\nsatisfaction rate',
    monthlyVisitors: 'Monthly visitors\ndriven through SEO',
    // Case Study
    caseStudy: 'Case study',
    uxUiRedesign: 'UX/UI Redesign, Frontend Optimization.',
    liveWebsite: 'Live website',
    fromBranding: 'From branding to web\ndevelopment and marketing',
    weDoItAll: 'We do it all.',
    performanceBoost: 'Performance Boost:',
    pageSpeed: 'Page speed +48%,\nBounce rate -23%',
    conversionRate: 'Conversion Rate Improvement:',
    pagespeedScore: 'Pagespeed score',
    pagespeedDescription: 'We prioritize performance without sacrificing visual appeal or functionality.',
    thanksToRedesign: "Thanks to the redesign, we've seen a steady 60% increase in leads.",
    quarterlyVisits: 'Quarterly visits',
    // Team
    theFaces: 'The faces',
    behind: 'behind',
    theProjects: 'the projects.',
    weBelieve: 'We believe great work comes',
    fromCollaboration: 'from collaboration.',
    collaborationText: "That's why we work closely with each other to ensure every project meets your goals.",
    bePartOfMission: 'Be part of our mission',
    ifYoureReady: "If you're ready to create, we'd love to hear from you.",
    applyNow: 'Apply now',
    // FAQ
    frequentlyAsked: 'Frequently',
    questions: 'asked questions',
    gotSomething: 'Got something? Check our FAQ for answers and helpful details.',
    faq1Question: 'What services do you offer?',
    faq1Answer: 'We offer a comprehensive suite of digital services including web design, full-stack development, brand identity creation, SEO optimization, and social media marketing strategies tailored to grow your audience.',
    faq2Question: 'What types of businesses do you work with?',
    faq2Answer: 'We work with startups, growing businesses, and established brands — anyone looking to create thoughtful digital experiences.',
    faq3Question: 'How long does a typical project take?',
    faq3Answer: "Timelines vary depending on scope, but most projects take 3-4 weeks from kickoff to launch. We're fast but thorough.",
    faq4Question: "What's your design and development process like?",
    faq4Answer: 'Our process is collaborative and iterative. We start with a discovery phase to understand your goals, followed by wireframing, design mockups, and then agile development with regular check-ins to ensure alignment.',
    faq5Question: 'Do you offer ongoing support after launch?',
    faq5Answer: 'Yes, we provide flexible support packages to ensure your digital products remain secure, up-to-date, and performant as your business evolves.',
    faq6Question: 'How do we get started?',
    faq6Answer: "Getting started is simple. Just fill out our contact form or book a discovery call. We'll discuss your project needs and send over a customized proposal.",
    faq7Question: 'Do you work with existing brands or only create from scratch?',
    faq7Answer: 'We do both! Whether you need a complete rebrand or just want to refresh your existing digital presence, we adapt our approach to fit your specific requirements.',
    // Social
    social: 'Social',
    followAlong: 'Follow along',
    // Footer
    newsletter: 'Newsletter.',
    emailPlaceholder: 'email@address.com',
    siteMap: 'Site map.',
    socialLinks: 'Social.',
    madeBy: 'Made by Tom D.',
    lastUpdated: 'Last updated 8/17/24.',
    copyright: 'Copyright 2025 Nyxx Nicotine. All rights reserved.',
    termsOfService: 'Terms of service.',
    privacyPolicy: 'Privacy policy.',
    // Menu
    menuHome: 'Home',
    menuStudio: 'Studio',
    menuProjects: 'Projects',
    menuBlog: 'Blog',
    menuContact: 'Contact',
  },
  es: {
    // Navegación
    home: 'Inicio',
    studio: 'Studio',
    projects: 'Proyectos',
    project27: 'Project 27',
    blog: 'Blog',
    contact: 'Contacto',
    about: 'Acerca de',
    connect: 'Conectar',
    // Idioma
    language: 'Idioma',
    portuguese: 'Portugués',
    english: 'Inglés',
    spanish: 'Español',
    // Hero
    nicotine: 'Nicotine',
    brandingIdentity: 'Branding e Identidad',
    socialMediaMarketing: 'Marketing en Redes Sociales',
    webDesignDevelopment: 'Diseño y Desarrollo Web',
    seoOptimization: 'Optimización SEO',
    noGenericWebsites: 'Sin sitios genéricos. Sin promesas vacías de marketing.',
    justTools: 'Solo herramientas y estrategias que ayudan a tu negocio a crecer y tu marca a brillar.',
    teamLead: 'Líder de Equipo',
    atNyxx: 'en Nyxx®',
    letsTalk: 'Hablemos',
    // Mission
    missionTitle: 'Nuestro enfoque es simple:',
    missionText: 'nos enfocamos en funcionalidad, velocidad y claridad, asegurando que cada proyecto sirva a un propósito claro sin complejidad innecesaria.',
    missionSubtext: 'No hacemos promesas exageradas ni usamos lenguaje de marketing llamativo. Simplemente construimos sitios web y estrategias bien diseñados y funcionales que ayudan a los negocios a tener éxito.',
    // Proven Results
    whyChooseUs: 'Por qué elegirnos',
    provenResults: 'Resultados comprobados para cada proyecto,',
    withFocus: 'con un enfoque en diseño y funcionalidad.',
    // Stats
    adImpressions: 'Impresiones de anuncios\ngestionadas',
    successfulProjects: 'Proyectos exitosos\nlanzados',
    clientSatisfaction: 'Tasa de satisfacción\ndel cliente',
    monthlyVisitors: 'Visitantes mensuales\nimpulsados a través de SEO',
    // Case Study
    caseStudy: 'Estudio de caso',
    uxUiRedesign: 'Rediseño UX/UI, Optimización Frontend.',
    liveWebsite: 'Sitio web en vivo',
    fromBranding: 'Desde branding hasta desarrollo web\ny marketing',
    weDoItAll: 'Lo hacemos todo.',
    performanceBoost: 'Aumento de Rendimiento:',
    pageSpeed: 'Velocidad de página +48%,\nTasa de rebote -23%',
    conversionRate: 'Mejora de Tasa de Conversión:',
    pagespeedScore: 'Puntuación de velocidad',
    pagespeedDescription: 'Priorizamos el rendimiento sin sacrificar el atractivo visual o la funcionalidad.',
    thanksToRedesign: 'Gracias al rediseño, hemos visto un aumento constante del 60% en los leads.',
    quarterlyVisits: 'Visitas trimestrales',
    // Team
    theFaces: 'Las caras',
    behind: 'detrás',
    theProjects: 'de los proyectos.',
    weBelieve: 'Creemos que un gran trabajo viene',
    fromCollaboration: 'de la colaboración.',
    collaborationText: 'Por eso trabajamos en estrecha colaboración entre nosotros para asegurar que cada proyecto cumpla con sus objetivos.',
    bePartOfMission: 'Sé parte de nuestra misión',
    ifYoureReady: 'Si estás listo para crear, nos encantaría saber de ti.',
    applyNow: 'Aplicar ahora',
    // FAQ
    frequentlyAsked: 'Preguntas',
    questions: 'frecuentes',
    gotSomething: '¿Tienes alguna pregunta? Consulta nuestro FAQ para respuestas y detalles útiles.',
    faq1Question: '¿Qué servicios ofrecen?',
    faq1Answer: 'Ofrecemos una suite completa de servicios digitales, incluido diseño web, desarrollo full-stack, creación de identidad de marca, optimización SEO y estrategias de marketing en redes sociales adaptadas para hacer crecer tu audiencia.',
    faq2Question: '¿Con qué tipos de negocios trabajan?',
    faq2Answer: 'Trabajamos con startups, negocios en crecimiento y marcas establecidas: cualquiera que busque crear experiencias digitales cuidadosas.',
    faq3Question: '¿Cuánto tiempo tarda un proyecto típico?',
    faq3Answer: 'Los plazos varían según el alcance, pero la mayoría de los proyectos tardan de 3 a 4 semanas desde el inicio hasta el lanzamiento. Somos rápidos pero minuciosos.',
    faq4Question: '¿Cómo es su proceso de diseño y desarrollo?',
    faq4Answer: 'Nuestro proceso es colaborativo e iterativo. Comenzamos con una fase de descubrimiento para entender tus objetivos, seguida de wireframing, mockups de diseño y luego desarrollo ágil con check-ins regulares para asegurar la alineación.',
    faq5Question: '¿Ofrecen soporte continuo después del lanzamiento?',
    faq5Answer: 'Sí, proporcionamos paquetes de soporte flexibles para asegurar que tus productos digitales permanezcan seguros, actualizados y con buen rendimiento a medida que tu negocio evoluciona.',
    faq6Question: '¿Cómo empezamos?',
    faq6Answer: 'Empezar es simple. Solo completa nuestro formulario de contacto o reserva una llamada de descubrimiento. Discutiremos las necesidades de tu proyecto y enviaremos una propuesta personalizada.',
    faq7Question: '¿Trabajan con marcas existentes o solo crean desde cero?',
    faq7Answer: '¡Hacemos ambos! Ya sea que necesites un rebrand completo o solo quieras actualizar tu presencia digital existente, adaptamos nuestro enfoque para ajustarse a tus requisitos específicos.',
    // Social
    social: 'Social',
    followAlong: 'Síguenos',
    // Footer
    newsletter: 'Boletín.',
    emailPlaceholder: 'email@address.com',
    siteMap: 'Mapa del sitio.',
    socialLinks: 'Social.',
    madeBy: 'Hecho por Tom D.',
    lastUpdated: 'Última actualización 8/17/24.',
    copyright: 'Copyright 2025 Nyxx Nicotine. Todos los derechos reservados.',
    termsOfService: 'Términos de servicio.',
    privacyPolicy: 'Política de privacidad.',
    // Menu
    menuHome: 'Home',
    menuStudio: 'Studio',
    menuProjects: 'Projects',
    menuBlog: 'Blog',
    menuContact: 'Contact',
  },
};

// Hook para usar traduções
const useTranslation = () => {
  const context = useContext(LanguageContext);
  return context;
};

// Hook para animações suaves ao entrar na viewport
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

const Header = ({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean; toggleMenu: () => void }) => {
  const { language, setLanguage, t } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: t('portuguese') },
    { code: 'en', label: t('english') },
    { code: 'es', label: t('spanish') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Verifica a posição inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-7 py-4 md:px-14 md:py-5 transition-all duration-300 bg-transparent text-black">
      <div className="w-full max-w-[1800px] grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo - Aligned Left */}
        <div className="flex justify-start">
          <a href="#" className="cursor-pointer hover:opacity-80 transition-opacity">
            <img 
              src="/logo_nyxx.svg" 
              alt="Nyxx Nicotine Technologies" 
              className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
            />
          </a>
        </div>

        {/* Desktop Navigation - Perfectly Centered */}
        <nav className={`hidden md:flex justify-center items-center gap-10 text-sm font-medium tracking-wide transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center gap-10 group">
            <a href="#" className="relative transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
              {t('studio')}
            </a>
            <a href="#" className="relative transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
              {t('project27')}
            </a>
            <a href="#" className="relative transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
              {t('blog')}
            </a>
            <a href="#" className="relative transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
              {t('contact')}
            </a>
          </div>
        </nav>

        {/* Right Side - Language Selector and Menu Trigger */}
        <div className="flex justify-end items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 shadow-sm"
              aria-label={t('language')}
            >
              <Globe size={14} className="md:w-4 md:h-4 text-gray-600" />
              <span className="hidden sm:inline font-medium">{languages.find(l => l.code === language)?.label}</span>
              <span className="sm:hidden uppercase font-semibold">{language.toUpperCase()}</span>
            </button>
            
            {showLanguageMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowLanguageMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-150 ${
                        language === lang.code
                          ? 'bg-black text-white'
                          : 'text-black hover:bg-gray-50 active:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${language === lang.code ? 'bg-white' : 'bg-gray-300'}`}></span>
                        {lang.label}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Menu Trigger */}
          <MenuToggleButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

const MenuOverlay = ({ isOpen }: { isOpen: boolean }) => {
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
        {/* Mobile/Menu Left Info */}
        <div className={`hidden md:block pt-4 transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <a href="mailto:hello@nyxx.com" className="text-xl font-medium hover:underline transition-opacity hover:opacity-70">hello@nyxx.com</a>
        </div>

        {/* Main Menu Links */}
        <nav className="flex flex-col justify-center items-center md:items-center w-full gap-4 md:gap-2">
          {[t('menuHome'), t('menuStudio'), t('menuProjects'), t('menuBlog'), t('menuContact')].map((item, index) => (
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
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Socials / Extra */}
        <div className={`hidden md:flex flex-col justify-end items-end gap-4 transition-all duration-700 delay-200 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
           <div className="flex gap-4">
              <a href="#" className="hover:opacity-60 transition-opacity duration-300 hover:scale-110 transform">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity duration-300 hover:scale-110 transform">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity duration-300 hover:scale-110 transform">
                <Linkedin className="w-6 h-6" />
              </a>
           </div>
        </div>
      </div>

      {/* Language Selector */}
      <div className="absolute top-7 md:top-8 right-7 md:right-14 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Globe size={16} />
            <span>{languages.find(l => l.code === language)?.label}</span>
          </button>
          
          {showLanguageMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowLanguageMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
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
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Links in Menu */}
      <div className={`flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500 mt-10 md:mt-0 border-t border-gray-200 pt-6 md:border-none md:pt-0 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="md:hidden mb-4">
          <a href="mailto:hello@nyxx.com" className="hover:underline transition-opacity hover:opacity-70">hello@nyxx.com</a>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-black transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors duration-300">Terms of Service</a>
        </div>
        <div className="md:hidden mt-4 flex gap-4">
           <a href="#" className="hover:opacity-60 transition-opacity">
             <Twitter className="w-5 h-5" />
           </a>
           <a href="#" className="hover:opacity-60 transition-opacity">
             <Instagram className="w-5 h-5" />
           </a>
        </div>
        <div className="hidden md:block">
           © 2025 Nyxx® Nicotine
        </div>
      </div>
    </div>
  );
};

const HeroCard = () => {
  const { t } = useTranslation();
  // #region agent log
  useEffect(() => {
    const heroCard = document.querySelector('.hero-card-container');
    // BackgroundAnimation agora é o terceiro filho (depois do overlay)
    const allChildren = Array.from(heroCard?.children || []);
    const overlayDiv = allChildren.find((el: Element) => {
      const style = window.getComputedStyle(el);
      return style.position === 'absolute' && (style.zIndex === '0' || style.zIndex === 'auto');
    }) as HTMLElement | undefined;
    const bgAnimation = allChildren.find((el: Element) => {
      const style = window.getComputedStyle(el);
      return style.position === 'absolute' && (style.zIndex === '2' || style.zIndex === '1' || style.zIndex === 'auto');
    }) as HTMLElement | undefined;
    const darkOverlay = overlayDiv?.querySelector('div[class*="bg-\\[\\#0a0a0a\\]"]') || overlayDiv?.querySelector('div[style*="0a0a0a"]');
    const gradientDiv = overlayDiv?.querySelector('div[class*="bg-gradient"]');
    const contentDivs = allChildren.filter((el: Element) => {
      const style = window.getComputedStyle(el);
      return style.zIndex === '20';
    });
    const contentDivsBgColors = contentDivs.map((el: Element) => {
      const style = window.getComputedStyle(el);
      return {zIndex: style.zIndex, bgColor: style.backgroundColor, opacity: style.opacity, position: style.position};
    });
    fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:643',message:'HeroCard rendered - checking BackgroundAnimation visibility',data:{heroCardExists:!!heroCard,bgAnimationExists:!!bgAnimation,bgAnimationZIndex:bgAnimation?window.getComputedStyle(bgAnimation as Element).zIndex:null,bgAnimationOpacity:bgAnimation?window.getComputedStyle(bgAnimation as Element).opacity:null,overlayDivExists:!!overlayDiv,overlayDivZIndex:overlayDiv?window.getComputedStyle(overlayDiv).zIndex:null,gradientDivExists:!!gradientDiv,gradientDivOpacity:gradientDiv?window.getComputedStyle(gradientDiv as Element).opacity:null,darkOverlayExists:!!darkOverlay,darkOverlayOpacity:darkOverlay?window.getComputedStyle(darkOverlay as Element).opacity:null,heroCardChildrenCount:heroCard?.children.length||0,allChildrenZIndexes:allChildren.map((el:Element)=>window.getComputedStyle(el).zIndex),contentDivsCount:contentDivs.length,contentDivsBgColors:contentDivsBgColors},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion
  return (
    <div className="relative w-full min-h-[88vh] md:min-h-[92vh] bg-[#0a0a0a] overflow-hidden text-white p-7 md:p-14 flex flex-col justify-between mt-[70px] md:mt-[80px] hero-card-container">
      
      {/* Background with texture/image overlay - Primeiro, com z-index mais baixo */}
      <div 
        className="absolute"
        style={{ 
          zIndex: 0,
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100vh',
        }}
        // #region agent log
        ref={(el) => {
          if (el) {
            const style = window.getComputedStyle(el);
            const gradientDiv = el.querySelector('div[class*="bg-gradient"]');
            const gradientBgColor = gradientDiv ? window.getComputedStyle(gradientDiv as Element).backgroundColor : null;
            const gradientBgImage = gradientDiv ? window.getComputedStyle(gradientDiv as Element).backgroundImage : null;
            fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:661',message:'Overlay div z-index verification',data:{zIndex:style.zIndex,computedZIndex:style.zIndex,position:style.position,classes:el.className,gradientDivExists:!!gradientDiv,gradientDivOpacity:gradientDiv?window.getComputedStyle(gradientDiv as Element).opacity:null,gradientDivBgColor:gradientBgColor,gradientDivBgImage:gradientBgImage,gradientDivVisibility:gradientDiv?window.getComputedStyle(gradientDiv as Element).visibility:null},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-2',hypothesisId:'A'})}).catch(()=>{});
          }
        }}
        // #endregion
      >
         {/* Imagem de fundo - Deusa Banner - Ocupa 100% da largura da tela e começa do topo */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: 'url(/deusa_banner.svg)',
             backgroundColor: '#050505',
             opacity: 1,
           }}
         ></div>
      </div>

      {/* Grid Plus Markers - Absolute Positioning based on visual grid */}
      <div className="absolute left-0 right-0 top-[55%] flex justify-between px-7 md:px-14 pointer-events-none z-20 opacity-50">
          <Plus size={24} strokeWidth={1} />
          <Plus size={24} strokeWidth={1} />
          <Plus size={24} strokeWidth={1} />
          <Plus size={24} strokeWidth={1} />
      </div>

      {/* Content Container for Grid Alignment */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto h-full flex flex-col justify-between">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Huge Text Area */}
          <div className="lg:col-span-8 flex flex-col pt-12 md:pt-24">
            <div className="flex items-start leading-[0.8]">
              <h1 className="text-[18vw] lg:text-[13vw] font-bold tracking-tightest">Nyxx</h1>
              <span className="text-[4vw] lg:text-[3vw] mt-[2vw] ml-2 lg:ml-4 font-medium border-[0.1em] border-white rounded-full w-[1.5em] h-[1.5em] flex items-center justify-center leading-none">R</span>
            </div>
            <div className="flex justify-end pr-5 md:pr-24 -mt-2 md:-mt-6">
               <h2 className="text-[10vw] lg:text-[6vw] font-semibold tracking-tighter">{t('nicotine')}</h2>
            </div>
          </div>

          {/* Services List - Desktop */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-center items-start pt-36 pl-14 gap-4">
            <ul className="text-lg xl:text-xl font-medium space-y-3">
              <li>Smart</li>
              <li>Powerful</li>
              <li>Reliable</li>
              <li>Premium</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-end mt-auto pt-14 md:pt-0">
          
          {/* Mission Statement */}
          <div className="lg:col-span-4 text-lg md:text-xl leading-relaxed opacity-90">
            <p>
              <span className="font-bold text-white">{t('noGenericWebsites')}</span> <span className="text-gray-300">{t('justTools')}</span>
            </p>
          </div>

          {/* Copyright - Centerish */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-end pb-1">
            <span className="text-xs font-medium text-gray-400 tracking-wide">© 2025 Nyxx® Nicotine</span>
          </div>


          {/* Mobile Copyright */}
          <div className="lg:hidden flex justify-between items-end w-full mt-8 border-t border-white/10 pt-4">
               <span className="text-xs font-medium text-gray-400">© 2025 Nyxx® Nicotine</span>
          </div>
        </div>
      </div>
      
       {/* Badge */}
       <div className="absolute bottom-4 right-6 text-[10px] opacity-30 hidden md:block font-medium uppercase tracking-widest">
         Made with React
       </div>
    </div>
  );
};

const MissionSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Divider */}
      <div className="w-full h-px bg-gray-200 mb-12 md:mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column */}
        <div className="md:col-span-3 flex flex-col gap-4">
           <div className="flex items-center">
             <span className="font-bold text-sm tracking-tight text-black">Nyxx®</span>
           </div>
           <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[160px]">
             Every project we take on is designed for long-term success.
           </p>
        </div>

        {/* Right Column */}
        <div className="md:col-span-9 flex flex-col gap-8 md:gap-10">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
             <span className="text-gray-400">{t('missionTitle')} </span> 
             {t('missionText')}
           </h2>
           
           <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
             {t('missionSubtext')}
           </p>
        </div>
      </div>
    </section>
  );
};

const ProvenResults = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  
  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pt-20 md:pt-28 pb-36 md:pb-60 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Label */}
        <div className="md:col-span-3 flex items-center gap-3">
             <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
                <Plus size={14} strokeWidth={3} />
             </div>
             <span className="text-sm font-semibold tracking-wide">{t('whyChooseUs')}</span>
        </div>
        
        {/* Content */}
        <div className="md:col-span-9">
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] md:leading-[1.05]">
              {t('provenResults')} <span className="text-gray-400">{t('withFocus')}</span>
           </h2>
        </div>
      </div>
    </section>
  );
};

const AnimatedStat = ({ value, suffix, label }: { value: number; suffix: string; label: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000; // 2 seconds animation
          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            // Easing function (easeOutQuart) for smooth slowdown
            const ease = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(ease * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={elementRef} className="flex flex-col">
      <div className="flex items-baseline">
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
          {count}
        </span>
        <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
          {suffix}
        </span>
      </div>
      <div className="mt-4 text-xs md:text-sm font-medium text-gray-500 max-w-[200px] leading-snug">
        {label}
      </div>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="px-7 md:px-14 pb-20 max-w-[1800px] mx-auto bg-[#F5F5F5]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10">
        <AnimatedStat 
          value={3} 
          suffix="m+" 
          label={<>{t('adImpressions').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</>} 
        />
        <AnimatedStat 
          value={27} 
          suffix="+" 
          label={<>{t('successfulProjects').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</>} 
        />
        <AnimatedStat 
          value={98} 
          suffix="%" 
          label={<>{t('clientSatisfaction').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</>} 
        />
        <AnimatedStat 
          value={50} 
          suffix="k+" 
          label={<>{t('monthlyVisitors').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</>} 
        />
      </div>
    </section>
  );
};

const CaseStudySection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const { t } = useTranslation();
  
  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 pb-28 max-w-[1800px] mx-auto bg-[#F5F5F5] transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Left Card - Dark */}
        <div className="lg:col-span-7 relative bg-black rounded-[2rem] text-white overflow-hidden min-h-[500px] flex flex-col justify-between group cursor-pointer">
          {/* Top Content */}
          <div className="relative z-20 p-8 md:p-10 flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">{t('caseStudy')}</h3>
              <p className="text-sm text-gray-400">{t('uxUiRedesign')}</p>
            </div>
            <Plus className="text-white/50" />
          </div>

          {/* Center Brand */}
          <div className="relative z-20 px-8 md:px-10 mt-10 mb-20">
             <div className="flex items-start">
               <span className="text-6xl md:text-8xl font-bold tracking-tighter">Nyxx</span>
               <span className="text-2xl mt-2 ml-1 font-medium border-2 border-white rounded-full w-8 h-8 flex items-center justify-center leading-none">R</span>
             </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-20 p-8 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex items-center gap-2 text-sm font-medium hover:underline cursor-pointer group/link">
              {t('liveWebsite')} <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </div>
            <div className="text-right">
              <p className="text-xl md:text-2xl font-medium leading-tight text-white mb-1">{t('fromBranding').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</p>
              <p className="text-gray-500 font-medium">{t('weDoItAll')}</p>
            </div>
          </div>

          {/* Background Image - Absolute Right */}
          <div className="absolute right-0 top-0 bottom-0 w-[60%] z-10 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
               alt="Case Study Subject" 
               className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
             />
          </div>
        </div>

        {/* Right Grid - 4 Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
          
          {/* Card 1: Performance Text */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between min-h-[240px] hover:shadow-lg transition-shadow">
            <div className="space-y-6">
               <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2">{t('performanceBoost')}</div>
                  <div className="text-2xl font-bold leading-tight">{t('pageSpeed').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</div>
               </div>
               <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2">{t('conversionRate')}</div>
                  <div className="text-3xl font-bold">4.2% → 5.9%</div>
               </div>
            </div>
          </div>

          {/* Card 2: Pagespeed Score */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow min-h-[240px]">
             <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                {/* Simple SVG Circle Gauge */}
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                   <circle cx="48" cy="48" r="40" stroke="black" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" />
                </svg>
                <span className="absolute text-xl font-bold">100</span>
             </div>
             <div>
                <div className="font-bold text-lg mb-2">{t('pagespeedScore')}</div>
                <p className="text-xs text-gray-500 leading-relaxed px-2">{t('pagespeedDescription')}</p>
             </div>
          </div>

          {/* Card 3: Testimonial */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-shadow min-h-[240px]">
             <div className="flex gap-1 mb-4">
               {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-orange-400 text-orange-400" />)}
             </div>
             <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
               {t('thanksToRedesign')}
             </p>
             <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" className="w-8 h-8 rounded-full object-cover" alt="Avatar" />
                <span className="text-xs font-bold">Angela Smith</span>
             </div>
          </div>

          {/* Card 4: Stats Graph */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-shadow min-h-[240px]">
             <div className="flex items-start justify-between mb-8">
                <div>
                   <div className="text-4xl font-bold tracking-tight">38K</div>
                   <div className="text-xs text-gray-500 mt-1">{t('quarterlyVisits')}</div>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-full text-[10px] font-bold">+30%</div>
             </div>
             
             {/* Simple CSS Bar Chart */}
             <div className="flex items-end justify-between gap-2 h-24">
                <div className="w-full bg-gray-100 rounded-t-md h-[30%] relative group">
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400">Dec</div>
                </div>
                <div className="w-full bg-gray-100 rounded-t-md h-[45%] relative">
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400">Jan</div>
                </div>
                <div className="w-full bg-gray-100 rounded-t-md h-[35%] relative">
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400">Feb</div>
                </div>
                <div className="w-full bg-gray-100 rounded-t-md h-[55%] relative">
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400">Feb</div>
                </div>
                <div className="w-full bg-gray-100 rounded-t-md h-[70%] relative">
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400">Feb</div>
                </div>
                <div className="w-full bg-black rounded-t-md h-[100%] relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold">+5.9k</span>
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-400">Mar</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const TeamSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const { t } = useTranslation();
  const team: TeamMember[] = [
    {
      name: "Lauren Thompson",
      role: "Team Lead",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000"
    },
    {
      name: "Michael Wilson",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=1000"
    },
    {
      name: "Christopher Miller",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section 
      ref={ref}
      className={`relative w-full bg-[#F5F5F5] rounded-none p-7 md:p-14 mb-4 text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      
      {/* Visual Grid Markers for this section - Absolute positioning relative to container */}
      <div className="absolute left-[41.666%] top-[20%] hidden xl:block text-gray-400">
        <Plus size={24} strokeWidth={1} />
      </div>
       <div className="absolute left-[41.666%] bottom-[45%] hidden xl:block text-gray-400">
        <Plus size={24} strokeWidth={1} />
      </div>
      
      {/* Container for content restriction */}
      <div className="max-w-[1800px] mx-auto relative">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Content */}
          <div className="xl:col-span-5 flex flex-col relative pr-0 xl:pr-14">
            
            {/* Top: Header */}
            <div className="space-y-6 pt-2">
               <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Nyxx®</span>
               </div>
               
               <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
                  <span className="text-black block">{t('theFaces')}</span>
                  <span className="text-gray-400 font-semibold">{t('behind')}</span>
                  <span className="text-gray-400 font-semibold block">{t('theProjects')}</span>
               </h2>
            </div>

            {/* Bottom: Info & CTA - Reorganized */}
            <div className="flex flex-col gap-10 mt-12">
               {/* Text block */}
               <div className="max-w-lg">
                  <p className="text-xl md:text-2xl leading-tight text-gray-800 font-medium">
                     {t('weBelieve')} <span className="text-gray-400">{t('fromCollaboration')}</span> {t('collaborationText')}
                  </p>
               </div>
               
               {/* CTA Section */}
               <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-8 border-t border-gray-300/50">
                  <div className="space-y-1">
                     <h3 className="font-semibold text-lg">{t('bePartOfMission')}</h3>
                     <p className="text-sm text-gray-500">
                        {t('ifYoureReady')}
                     </p>
                  </div>
                  <button className="bg-black text-white text-[10px] uppercase tracking-wider font-bold py-3 px-6 rounded-full flex items-center gap-4 hover:bg-gray-800 transition-colors shrink-0">
                    {t('applyNow')}
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </button>
               </div>
            </div>

          </div>

          {/* Right Column: Team Grid */}
          <div className="xl:col-span-7">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {team.map((member, idx) => (
                   <div key={idx} className="group relative w-full aspect-[4/5] md:aspect-square xl:aspect-[5/4] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Dark gradient overlay at bottom for legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Card Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                         <div className="flex justify-between items-start">
                            <Plus size={14} className="opacity-90 mt-1" />
                            <div className="text-right">
                               <span className="text-xs font-bold block leading-tight">{member.role}</span>
                               <span className="text-[10px] opacity-80">at Nyxx®</span>
                            </div>
                         </div>
                         
                         <div className="pb-2">
                            <h4 className="text-2xl font-bold leading-[1.1] tracking-tight">
                              {member.name.split(' ')[0]}<br/>
                              {member.name.split(' ')[1]}
                            </h4>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default to first item open

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer')
    },
    {
      question: t('faq5Question'),
      answer: t('faq5Answer')
    },
    {
      question: t('faq6Question'),
      answer: t('faq6Answer')
    },
    {
      question: t('faq7Question'),
      answer: t('faq7Answer')
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 py-40 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Col: Header */}
        <div className="lg:col-span-4 space-y-10">
           <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
             {t('frequentlyAsked')} <br/>
             {t('questions')}
           </h2>
           <p className="text-lg font-medium text-gray-500 max-w-xs leading-relaxed">
             {t('gotSomething')}
           </p>
        </div>

        {/* Right Col: Accordion */}
        <div className="lg:col-span-8">
          {/* List Container */}
          <div className="w-full">
            {faqs.map((faq, index) => (
              <div key={index} className="border-t border-gray-300 last:border-b">
                <button 
                  onClick={() => handleToggle(index)}
                  className="w-full py-10 flex justify-between items-start text-left focus:outline-none group"
                >
                  <h3 className={`text-2xl md:text-3xl font-medium tracking-tight pr-8 transition-opacity duration-300 ${openIndex === index ? 'opacity-100' : 'group-hover:opacity-60'}`}>
                    {faq.question}
                  </h3>
                  
                  {/* Rotating Plus Icon */}
                  <span className={`relative flex-shrink-0 w-6 h-6 ml-4 mt-1 transition-transform duration-500 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                     <Plus size={28} strokeWidth={1.5} />
                  </span>
                </button>
                
                {/* Smooth Grid Rows Animation */}
                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mb-10' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface InstagramCardProps {
  username: string;
  location: string;
  avatar: string;
  image: string;
  likes: string;
  caption: string;
  comments: string;
  date: string;
}

const InstagramCard: React.FC<InstagramCardProps> = ({ 
  username, 
  location, 
  avatar, 
  image, 
  likes, 
  caption, 
  comments, 
  date 
}) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
             <img src={avatar} alt={username} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
             <span className="text-xs font-bold text-black">{username}</span>
             <span className="text-[10px] text-gray-500">{location}</span>
          </div>
        </div>
        <MoreHorizontal size={16} className="text-gray-600" />
      </div>

      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mt-1">
         <img src={image} alt="Post" className="object-cover w-full h-full" />
         <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full font-medium">1/2</div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-1">
         <div className="flex gap-4">
            <Heart size={22} className="text-black hover:text-gray-600 cursor-pointer" />
            <MessageCircle size={22} className="text-black hover:text-gray-600 cursor-pointer" />
            <Send size={22} className="text-black hover:text-gray-600 cursor-pointer" />
         </div>
         <Bookmark size={22} className="text-black hover:text-gray-600 cursor-pointer" />
      </div>

      {/* Content */}
      <div className="space-y-1.5 px-0.5">
         <div className="text-xs font-semibold">
            Liked by <span className="text-black">craig_love</span> and <span className="text-black">{likes} others</span>
         </div>
         <div className="text-xs leading-relaxed">
            <span className="font-bold mr-1.5">{username}</span>
            <span className="text-gray-900">{caption}</span>
         </div>
         <div className="text-[10px] text-gray-500 font-medium cursor-pointer hover:text-gray-800">
            View all {comments} comments
         </div>
         <div className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">
            {date}
         </div>
      </div>
    </div>
  );
};

const SocialSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  const posts = [
    { 
      id: 1, 
      username: "nyxx_nicotine", 
      location: "Tokyo, Japan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800", 
      likes: "12,486", 
      caption: "Minimalist architecture at its finest. 🏢",
      comments: "42",
      date: "September 19" 
    },
    { 
      id: 2, 
      username: "nyxx_nicotine", 
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", 
      likes: "8,392", 
      caption: "Abstract forms creating new perspectives.",
      comments: "28",
      date: "September 18" 
    },
    { 
      id: 3, 
      username: "nyxx_nicotine", 
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", 
      likes: "15,201", 
      caption: "Interior design that speaks volumes. ✨",
      comments: "56",
      date: "September 16" 
    },
    { 
      id: 4, 
      username: "nyxx_nicotine", 
      location: "Berlin, Germany",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&q=80&w=800", 
      likes: "9,943", 
      caption: "Geometry in nature and structure.",
      comments: "31",
      date: "September 15" 
    },
  ];

  return (
    <section 
      ref={ref}
      className={`px-7 md:px-14 py-24 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-black"></div>
             <span className="text-sm font-semibold tracking-wide uppercase">{t('social')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t('followAlong')}
          </h2>
        </div>
        
        <a href="#" className="group flex items-center gap-2 text-lg font-medium border-b border-black pb-1 hover:opacity-60 transition-opacity">
          @nyxx_nicotine
          <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <InstagramCard 
            key={post.id} 
            username={post.username}
            location={post.location}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            caption={post.caption}
            comments={post.comments}
            date={post.date}
          />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
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
      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-[1800px] mx-auto px-7 md:px-14 relative z-20 w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-32">
          
          {/* Col 1: Newsletter */}
          <div className="md:col-span-4 lg:col-span-5 pr-0 md:pr-14">
            <p className="text-sm font-medium text-gray-500 mb-4">{t('newsletter')}</p>
            <div className="flex gap-2 max-w-sm">
               <input 
                 type="email" 
                 placeholder={t('emailPlaceholder')} 
                 className="flex-1 bg-transparent border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
               />
               <button className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors">
                 <ArrowRight size={18} />
               </button>
            </div>
          </div>

          {/* Col 2: Site Map */}
          <div className="md:col-span-2 lg:col-span-2">
             <h4 className="text-xs text-gray-500 mb-6 font-medium">{t('siteMap')}</h4>
             <ul className="space-y-3">
               {[t('home'), t('projects'), t('about'), t('blog'), t('connect')].map(item => (
                 <li key={item}>
                   <a href="#" className="text-lg font-semibold tracking-tight hover:opacity-60 transition-opacity flex items-center gap-1 group">
                     {item}.
                   </a>
                 </li>
               ))}
             </ul>
          </div>

           {/* Col 3: Social */}
           <div className="md:col-span-2 lg:col-span-2">
             <h4 className="text-xs text-gray-500 mb-6 font-medium">{t('socialLinks')}</h4>
             <ul className="space-y-3">
               {['X', 'IG', 'BE', 'DB'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-lg font-semibold tracking-tight hover:opacity-60 transition-opacity">
                     {item}.
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-between text-xs text-gray-400 leading-relaxed space-y-6 md:space-y-0 text-right md:text-left lg:items-end lg:text-right">
             <div>
               <p className="mb-2">{t('madeBy')}</p>
               <p className="mb-2">{t('lastUpdated')}</p>
               <p>{t('copyright')}</p>
             </div>
             <div>
               <p className="hover:text-black cursor-pointer transition-colors">{t('termsOfService')}</p>
               <p className="hover:text-black cursor-pointer transition-colors">{t('privacyPolicy')}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Big Background Logo with Spotlight Effect */}
      <div className="absolute inset-0 z-0 flex justify-center items-end overflow-hidden pointer-events-none">
         {/* Base Faded Layer */}
         <div 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[600px] h-auto select-none transition-transform duration-700 ease-out origin-bottom translate-y-[20%] ${isHovered ? 'scale-105' : 'scale-100'}`}
            style={{ opacity: 0.2 }}
         >
            <img 
               src="/logo_reduzida.svg" 
               alt="Nyxx Nicotine Technologies"
               className="w-full h-auto"
               style={{ filter: 'grayscale(100%) brightness(0.5)' }}
            />
         </div>
         
         {/* Spotlight Reveal Layer */}
         <div 
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[25vw] max-w-[600px] h-auto select-none transition-all duration-700 ease-out origin-bottom translate-y-[20%] ${isHovered ? 'scale-105 drop-shadow-2xl' : 'scale-100'}`}
            style={{
              maskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 70%)`,
              opacity: 0.6,
            }}
         >
            <img 
               src="/logo_reduzida.svg" 
               alt="Nyxx Nicotine Technologies"
               className="w-full h-auto"
            />
         </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguageState] = useState<Language>(() => {
    // Carregar idioma salvo do localStorage ou usar padrão
    const saved = localStorage.getItem('language') as Language;
    return saved && ['pt', 'en', 'es'].includes(saved) ? saved : 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="bg-[#F5F5F5] min-h-screen w-full relative overflow-x-hidden font-sans">
         <CustomCursor size={20} color="rgba(0, 0, 0, 0.1)" borderColor="#000000" borderWidth={2} />
         <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
         <MenuOverlay isOpen={isMenuOpen} />
       
       {/* Main Content */}
       <div className={`transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="pb-4">
             <HeroCard />
          </div>
          <CaseStudySection />
          <MissionSection />
          <ProvenResults />
          <StatsSection />
          <TeamSection />
          <FAQSection />
          <SocialSection />
          <Footer />
       </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
