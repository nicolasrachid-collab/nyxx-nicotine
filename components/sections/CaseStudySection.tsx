import React from 'react';
import { Plus, ArrowUpRight, Star } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from '../../hooks/useTranslation';

export function CaseStudySection() {
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
        <div className="lg:col-span-7 relative bg-black rounded-[2rem] text-white overflow-hidden min-h-[500px] flex flex-col justify-between group cursor-pointer">
          <div className="relative z-20 p-8 md:p-10 flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">{t('caseStudy')}</h3>
              <p className="text-sm text-gray-400">{t('uxUiRedesign')}</p>
            </div>
            <Plus className="text-white/50" />
          </div>

          <div className="relative z-20 px-8 md:px-10 mt-10 mb-20">
             <div className="flex items-start">
               <span className="text-6xl md:text-8xl font-bold tracking-tighter">Nyxx</span>
               <span className="text-2xl mt-2 ml-1 font-medium border-2 border-white rounded-full w-8 h-8 flex items-center justify-center leading-none">R</span>
             </div>
          </div>

          <div className="relative z-20 p-8 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex items-center gap-2 text-sm font-medium hover:underline cursor-pointer group/link">
              {t('liveWebsite')} <ArrowUpRight size={16} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </div>
            <div className="text-right">
              <p className="text-xl md:text-2xl font-medium leading-tight text-white mb-1">{t('fromBranding').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br/>}</React.Fragment>)}</p>
              <p className="text-gray-500 font-medium">{t('weDoItAll')}</p>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-[60%] z-10 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
               alt="Case Study Subject" 
               className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
             />
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
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

          <div className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow min-h-[240px]">
             <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
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

          <div className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-shadow min-h-[240px]">
             <div className="flex items-start justify-between mb-8">
                <div>
                   <div className="text-4xl font-bold tracking-tight">38K</div>
                   <div className="text-xs text-gray-500 mt-1">{t('quarterlyVisits')}</div>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-full text-[10px] font-bold">+30%</div>
             </div>
             <div className="flex items-end justify-between gap-2 h-24">
                <div className="w-full bg-gray-100 rounded-t-md h-[30%] relative">
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
}
