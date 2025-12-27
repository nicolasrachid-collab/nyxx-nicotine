import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedPaperBackground } from '../AnimatedPaperBackground';

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      className={`w-full bg-white pt-24 lg:pt-32 xl:pt-40 pb-24 lg:pb-32 xl:pb-40 px-4 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden font-sans transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ position: 'relative' }}
      aria-labelledby="faq-heading"
    >
      <AnimatedPaperBackground intensity={0.2} speed={0.8} />
      <div className="max-w-[1800px] mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Header and Support Box */}
        <div className="lg:col-span-6 space-y-10">
          <div>
            <h1 id="faq-heading" className="text-4xl md:text-5xl lg:text-[38px] font-bold tracking-tight leading-[1.1] text-gray-900 mb-6">
              {t('frequentlyAsked')} <br/>
              {t('questions')}
            </h1>
            <p className="text-base font-medium text-gray-500 max-w-xs leading-relaxed">
              {t('gotSomething')}
            </p>
          </div>

          {/* Support Box */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Ainda tem dúvidas?
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Estamos aqui para ajudar você.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-orange-600 font-medium text-sm hover:text-orange-700 transition-colors group"
              aria-label="Fale com o suporte"
            >
              Fale com o suporte
              <ArrowRight 
                size={16} 
                className="transition-transform group-hover:translate-x-1" 
              />
            </a>
          </div>
        </div>

        {/* Right Column: FAQ Cards */}
        <div className="lg:col-span-6">
          <div className="w-full space-y-4" role="region" aria-labelledby="faq-heading">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <button 
                  onClick={() => handleToggle(index)}
                  className="w-full py-6 px-6 md:px-8 flex justify-between items-center text-left focus:outline-none group"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-base md:text-lg font-medium text-gray-900 pr-8 flex-1 transition-colors duration-300 group-hover:text-orange-600">
                    {faq.question}
                  </h3>
                  
                  <ChevronDown 
                    size={20} 
                    className={`flex-shrink-0 text-gray-400 transition-all duration-300 ${
                      openIndex === index ? 'rotate-180 text-orange-600' : 'rotate-0 group-hover:text-gray-600'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                  hidden={openIndex !== index}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-gray-600 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
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
}
