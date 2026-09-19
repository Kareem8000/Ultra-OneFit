import React, { useState } from 'react';
import { Plus, Minus, ArrowLeft, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/outfits';

interface FaqSectionProps {
  onScrollToOutfits: () => void;
  onOpenGuide: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onScrollToOutfits,
  onOpenGuide,
}) => {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenItem((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq-section"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-20 sm:py-24 border-b border-[#C8C8C6]/30 text-center"
    >
      <div className="max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#1C1C1C]/[0.05] border border-[#C8C8C6]/70 text-xs font-bold text-[#1C1C1C] mb-4">
            الأسئلة الشائعة
          </div>

          <h2
            id="faq-headline"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#1C1C1C] tracking-tight leading-tight mb-3 max-w-[700px] mx-auto"
          >
            قبل ما تختار… في حاجة لسه مش واضحة؟
          </h2>

          <p className="text-sm sm:text-base text-[#1C1C1C]/75 leading-relaxed max-w-[620px] mx-auto mb-6">
            جمعنالك الأسئلة اللي ممكن توقفك قبل الطلب، وإجاباتها ببساطة.
          </p>

          {/* Dual CTAs directly below headline */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={onScrollToOutfits}
              className="h-[42px] px-4 rounded-[8px] bg-[#1C1C1C] text-[#FFFFFF] font-bold text-xs hover:bg-[#2E2E2E] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>اختار الـOutfit</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenGuide}
              className="h-[42px] px-4 rounded-[8px] border border-[#C8C8C6] text-[#1C1C1C] font-semibold text-xs hover:bg-[#1C1C1C]/5 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Outfit Guide</span>
            </button>
          </div>
        </div>

        {/* Accordion List (Single item open at a time) */}
        <div className="space-y-3 text-right">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="rounded-[12px] border border-[#C8C8C6]/70 bg-[#FFFFFF] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1C1C1C] hover:bg-[#1C1C1C]/[0.02] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-black text-[#AFAFAD] shrink-0">
                      {item.num || (item.id < 10 ? `0${item.id}` : item.id)}
                    </span>
                    <span className="text-[#1C1C1C]">{item.question}</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#1C1C1C]/5 flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#1C1C1C]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#1C1C1C]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed border-t border-[#C8C8C6]/40 pr-11 sm:pr-12">
                    {Array.isArray(item.answer) ? item.answer.join(' ') : item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
