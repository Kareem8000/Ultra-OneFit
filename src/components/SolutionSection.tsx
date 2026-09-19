import React from 'react';
import { Eye, Layers, Palette, Ruler, ShoppingBag, ArrowDown } from 'lucide-react';

interface SolutionSectionProps {
  onScrollToOutfits?: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onScrollToOutfits }) => {
  const solutionBlocks = [
    {
      id: '01',
      icon: Eye,
      title: 'شوف الـLook كامل',
      description: 'ابدأ بالشكل النهائي، مش بقطعة منفصلة.',
    },
    {
      id: '02',
      icon: Layers,
      title: 'اعرف الـ3 قطع',
      description: 'كل Look متكوّن من 3 قطع متناسقة وواضحة قدامك.',
    },
    {
      id: '03',
      icon: Palette,
      title: 'شوف الألوان مع بعض',
      description: 'شوف كل لون في مكانه قبل ما تختار.',
    },
    {
      id: '04',
      icon: Ruler,
      title: 'راجع الـFit والمقاس',
      description: 'بيانات الموديل وجدول المقاسات يساعدوك تختار بشكل أوضح.',
    },
    {
      id: '05',
      icon: ShoppingBag,
      title: 'وبعدها… اطلب',
      description: 'اختار مقاس الـ3 قطع، راجع طلبك، وكمّل.',
    },
  ];

  const handleScrollToLooks = () => {
    if (onScrollToOutfits) {
      onScrollToOutfits();
    } else {
      const el = document.getElementById('concept-cards-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="solution-section"
      className="bg-[#1C1C1C] text-[#FFFFFF] py-20 sm:py-24 lg:py-28 border-b border-[#C8C8C6]/15"
      dir="rtl"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 03 — Centered Badge */}
        <div className="flex justify-center mb-4">
          <div
            id="solution-badge"
            className="inline-flex items-center px-3.5 py-1.5 rounded-[9px] bg-[#FFFFFF]/[0.08] border border-[#C8C8C6]/30 text-[#EAEAEA] text-xs font-bold tracking-wide shadow-none select-none"
          >
            <span>الحل أبسط</span>
          </div>
        </div>

        {/* 04 — Main Dominant Headline */}
        <div className="text-center max-w-[800px] mx-auto mb-12 sm:mb-16">
          <h2
            id="solution-headline"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#FFFFFF] leading-[1.25] sm:leading-[1.2] tracking-tight"
          >
            بلاش تبدأ من القطعة… ابدأ من الـOutfit.
          </h2>
        </div>

        {/* 05 — 5-Block Information Grid (Row 1: 3 blocks | Row 2: 2 centered blocks) */}
        <div className="max-w-[1040px] mx-auto">
          
          {/* Row 1: Blocks 01, 02, 03 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-5 sm:mb-6">
            {solutionBlocks.slice(0, 3).map((block) => {
              const IconComp = block.icon;
              return (
                <div
                  key={block.id}
                  id={`solution-block-${block.id}`}
                  className="p-6 rounded-[16px] bg-[#232323] border border-[#383838] shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 hover:border-[#C8C8C6]/50 transition-all duration-200 group"
                >
                  {/* Small monochrome circular icon */}
                  <div className="w-11 h-11 rounded-full bg-[#2E2E2E] border border-[#484848] flex items-center justify-center mb-4 group-hover:bg-[#FFFFFF] group-hover:text-[#1C1C1C] transition-colors duration-200">
                    <IconComp className="w-5 h-5 text-[#EAEAEA] group-hover:text-[#1C1C1C] transition-colors duration-200" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-[17px] font-bold text-[#FFFFFF] mb-2 leading-snug">
                    {block.title}
                  </h3>

                  {/* Short 1-line description */}
                  <p className="text-xs sm:text-sm text-[#C8C8C6] leading-relaxed font-normal">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Row 2: Blocks 04, 05 (Centered on tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-[690px] mx-auto">
            {solutionBlocks.slice(3, 5).map((block) => {
              const IconComp = block.icon;
              return (
                <div
                  key={block.id}
                  id={`solution-block-${block.id}`}
                  className="p-6 rounded-[16px] bg-[#232323] border border-[#383838] shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 hover:border-[#C8C8C6]/50 transition-all duration-200 group"
                >
                  {/* Small monochrome circular icon */}
                  <div className="w-11 h-11 rounded-full bg-[#2E2E2E] border border-[#484848] flex items-center justify-center mb-4 group-hover:bg-[#FFFFFF] group-hover:text-[#1C1C1C] transition-colors duration-200">
                    <IconComp className="w-5 h-5 text-[#EAEAEA] group-hover:text-[#1C1C1C] transition-colors duration-200" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-[17px] font-bold text-[#FFFFFF] mb-2 leading-snug">
                    {block.title}
                  </h3>

                  {/* Short 1-line description */}
                  <p className="text-xs sm:text-sm text-[#C8C8C6] leading-relaxed font-normal">
                    {block.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* 20 — Section Strategic Transition (Clean, secondary text bridge) */}
        <div className="mt-14 sm:mt-16 text-center">
          <button
            onClick={handleScrollToLooks}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#C8C8C6] hover:text-[#FFFFFF] transition-colors group focus:outline-none"
            id="solution-to-looks-bridge"
          >
            <span>دلوقتي… شوف الـLooks بنفسك</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#AFAFAD] group-hover:translate-y-0.5 group-hover:text-[#FFFFFF] transition-all" />
          </button>
        </div>

      </div>
    </section>
  );
};
