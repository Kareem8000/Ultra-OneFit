import React from 'react';
import { ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

interface GuaranteeBannerSectionProps {
  onScrollToOutfits: () => void;
  onOpenGuide: () => void;
}

export const GuaranteeBannerSection: React.FC<GuaranteeBannerSectionProps> = ({
  onScrollToOutfits,
  onOpenGuide,
}) => {
  return (
    <section
      id="guarantee-section"
      className="bg-[#1C1C1C] text-[#FFFFFF] py-16 sm:py-20 border-b border-[#C8C8C6]/15 text-center relative overflow-hidden"
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFFFFF]/[0.06] border border-[#C8C8C6]/30 text-xs font-semibold text-[#EAEAEA] mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FFFFFF]" />
          <span>إحنا في ضهرك</span>
        </div>

        {/* Big Bold Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-[#FFFFFF] leading-tight mb-5">
          مش متأكد من مقاس البنطلون أو السنيكرز؟
          <br />
          <span className="text-[#EAEAEA]">
            مستعدين نستبدل أي قطعة خلال 14 يوم بكل سهولة.
          </span>
        </h2>

        {/* Supporting Explanation */}
        <p className="text-xs sm:text-sm md:text-base text-[#C8C8C6] leading-relaxed mb-8 max-w-[720px] mx-auto">
          عارفين إن شراء اللبس أونلاين محتاج راحة بال، عشان كده لو جربت الـLook ولقيت أي قطعة محتاجة مقاس أكبر أو أصغر، فريقنا بيوصلك القطعة البديلة لحد عندك.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onScrollToOutfits}
            className="w-full sm:w-auto h-[48px] px-6 rounded-[8px] bg-[#FFFFFF] text-[#1C1C1C] font-extrabold text-xs sm:text-sm hover:bg-[#EAEAEA] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>اختار الـOutfit وانت مطمن</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenGuide}
            className="w-full sm:w-auto h-[48px] px-5 rounded-[8px] border border-[#C8C8C6]/35 text-[#EAEAEA] font-semibold text-xs hover:bg-[#FFFFFF]/10 transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#C8C8C6]" />
            <span>شوف الـOutfit Guide</span>
          </button>
        </div>

      </div>
    </section>
  );
};
