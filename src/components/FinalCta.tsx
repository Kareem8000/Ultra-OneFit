import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalCtaProps {
  onScrollToOutfits: () => void;
  onOpenGuide: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  onScrollToOutfits,
  onOpenGuide,
}) => {
  return (
    <section
      id="final-cta-section"
      className="bg-[#1C1C1C] text-[#FFFFFF] py-24 md:py-32 border-b border-[#C8C8C6]/15 relative overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle geometric framing */}
        <div className="inline-block mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#AFAFAD] border-b border-[#C8C8C6]/20 pb-1">
            ULTRA ONE FIT • COMPLETE LOOK
          </span>
        </div>

        {/* Headline */}
        <h2
          id="final-cta-headline"
          className="text-4xl sm:text-5xl md:text-6xl font-black text-[#FFFFFF] tracking-tight leading-tight mb-5"
        >
          اختار الـLook اللي شبهك.
        </h2>

        {/* Supporting Copy */}
        <p
          id="final-cta-supporting"
          className="text-base sm:text-lg text-[#C8C8C6] leading-relaxed max-w-[620px] mx-auto mb-10"
        >
          3 قطع متناسقة، تفاصيل واضحة، واختيار أسهل. اختار الـOutfit المناسبة ليك وابدأ طلبك.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onScrollToOutfits}
            id="final-cta-primary-btn"
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#FFFFFF] text-[#1C1C1C] font-black text-base hover:bg-[#EAEAEA] transition-all duration-200 shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none flex items-center justify-center gap-2.5"
          >
            <span>اختار الـOutfit بتاعتك</span>
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenGuide}
            id="final-cta-secondary-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-[#C8C8C6]/40 text-[#EAEAEA] font-semibold text-sm hover:bg-[#EAEAEA]/10 hover:border-[#C8C8C6] transition-all duration-200 focus:outline-none flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C8C8C6]" />
            <span>مش لاقي الـLook؟ شوف الـOutfit Guide</span>
          </button>
        </div>

        {/* Information Strip */}
        <div
          id="final-cta-info-strip"
          className="inline-block p-4 rounded-2xl bg-[#FFFFFF]/[0.03] border border-[#C8C8C6]/20 text-xs sm:text-sm font-medium text-[#C8C8C6]"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>3 قطع متكاملة</span>
            <span className="text-[#C8C8C6]/40">•</span>
            <span>الدفع عند الاستلام أو Vodafone Cash</span>
            <span className="text-[#C8C8C6]/40">•</span>
            <span>شحن القاهرة 80 جنيه</span>
            <span className="text-[#C8C8C6]/40">•</span>
            <span>استبدال خلال 14 يوم حسب السياسة</span>
          </div>
        </div>

      </div>
    </section>
  );
};
