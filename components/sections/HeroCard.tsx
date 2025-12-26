import { DeusaAnimation } from '../DeusaAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function HeroCard() {
  const { t } = useTranslation();
  
  // Função para adicionar quebra de linha após "Tecnologia" ou "Technology"
  const formatDescription = (text: string) => {
    const techIndex = text.indexOf('Tecnologia');
    const technologyIndex = text.indexOf('Technology');
    const tecnologiaIndex = text.indexOf('Tecnología');
    
    if (techIndex !== -1) {
      return (
        <>
          {text.substring(0, techIndex)}
          <br />
          {text.substring(techIndex)}
        </>
      );
    } else if (technologyIndex !== -1) {
      return (
        <>
          {text.substring(0, technologyIndex)}
          <br />
          {text.substring(technologyIndex)}
        </>
      );
    } else if (tecnologiaIndex !== -1) {
      return (
        <>
          {text.substring(0, tecnologiaIndex)}
          <br />
          {text.substring(tecnologiaIndex)}
        </>
      );
    }
    return text;
  };
  
  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden text-white hero-card-container">
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 0,
        }}
      >
         <DeusaAnimation duration={5} />
      </div>

      <div className="absolute inset-0 z-20 w-full max-w-[1800px] mx-auto px-7 md:px-14 pt-[90px] md:pt-[100px] pb-7 md:pb-14 left-1/2 -translate-x-1/2">
        <div 
          className="absolute top-1/2 left-7 md:left-14 -translate-y-1/2 flex flex-col gap-4 md:gap-6"
          style={{
            animation: 'float 7s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        >
          <div
            style={{
              animation: 'float 6s ease-in-out infinite',
            }}
          >
            <img 
              src="/logo_reduzida.svg" 
              alt="Nyxx" 
              className="h-[15vw] md:h-[10vw] lg:h-[8vw] w-auto brightness-0 invert"
            />
          </div>

          <div className="max-w-md text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed opacity-90">
            <p>
              <span className="font-bold text-white whitespace-nowrap">{t('heroSubtitle')}</span>{' '}
              <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
                {formatDescription(t('heroDescription'))}
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
