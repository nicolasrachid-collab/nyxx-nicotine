import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

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
      className={`px-7 md:px-14 py-40 max-w-[1800px] mx-auto bg-[#F5F5F5] text-black transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      aria-labelledby="faq-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 space-y-10">
           <h2 id="faq-heading" className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
             {t('frequentlyAsked')} <br/>
             {t('questions')}
           </h2>
           <p className="text-lg font-medium text-gray-500 max-w-xs leading-relaxed">
             {t('gotSomething')}
           </p>
        </div>

        <div className="lg:col-span-8">
          <div className="w-full" role="region" aria-labelledby="faq-heading">
            {faqs.map((faq, index) => (
              <div key={index} className="border-t border-gray-300 last:border-b">
                <button 
                  onClick={() => handleToggle(index)}
                  className="w-full py-10 flex justify-between items-start text-left focus:outline-none group"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className={`text-2xl md:text-3xl font-medium tracking-tight pr-8 transition-opacity duration-300 ${openIndex === index ? 'opacity-100' : 'group-hover:opacity-60'}`}>
                    {faq.question}
                  </h3>
                  
                  <span className={`relative flex-shrink-0 w-6 h-6 ml-4 mt-1 transition-transform duration-500 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`} aria-hidden="true">
                     <Plus size={28} strokeWidth={1.5} />
                  </span>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mb-10' : 'grid-rows-[0fr] opacity-0 mb-0'}`}
                  hidden={openIndex !== index}
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
}
