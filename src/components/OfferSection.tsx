import React from 'react';
import { Outfit } from '../types';
import { OUTFITS } from '../data/outfits';
import { ArrowLeft, Sparkles, Check, ShieldCheck } from 'lucide-react';

interface OfferSectionProps {
  onSelectOutfit: (outfit: Outfit) => void;
  onOpenGuide: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  onSelectOutfit,
  onOpenGuide,
}) => {
  return (
    <section
      id="offer-section"
      className="bg-[#1C1C1C] text-[#FFFFFF] py-20 md:py-28 border-b border-[#C8C8C6]/15 relative"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto mb-16">
          <div
            id="offer-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EAEAEA]/10 border border-[#C8C8C6]/30 text-[#EAEAEA] text-xs font-bold tracking-wide mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
            <span>وحدة الشراء: Outfit كامل</span>
          </div>

          <h2
            id="offer-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFFFFF] tracking-tight leading-tight mb-4"
          >
            اختار الـLook اللي شبه يومك.
          </h2>

          <p className="text-base sm:text-lg text-[#C8C8C6] leading-relaxed max-w-[620px] mx-auto">
            3 Outfits متنسقة من 3 قطع، عشان تختار الـLook كامل بدل ما تبدأ من كل قطعة لوحدها.
          </p>
        </div>

        {/* 3 High-Conversion Offer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {OUTFITS.map((outfit) => (
            <div
              key={outfit.id}
              id={`offer-card-${outfit.id}`}
              className="bg-[#FFFFFF] text-[#1C1C1C] rounded-3xl border border-[#C8C8C6] shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group"
            >
              <div>
                {/* Header of Card */}
                <div className="p-5 bg-[#1C1C1C] text-[#FFFFFF] border-b border-[#C8C8C6]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[#AFAFAD] uppercase tracking-wider block">
                      {outfit.number}
                    </span>
                    <h3 className="text-xl font-black text-[#FFFFFF]">
                      {outfit.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#FFFFFF]/10 text-xs font-bold text-[#EAEAEA] border border-[#C8C8C6]/20">
                    {outfit.occasionTag}
                  </span>
                </div>

                {/* Card Large Look Image */}
                <div className="relative aspect-[4/3] bg-[#1C1C1C] overflow-hidden">
                  <img
                    src={outfit.image}
                    alt={outfit.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-[#1C1C1C]/90 text-xs font-semibold text-[#FFFFFF] border border-[#C8C8C6]/30 backdrop-blur-sm">
                    3 قطع • Complete Outfit
                  </div>
                </div>

                {/* Pieces List with arithmetic exact pricing */}
                <div className="p-6 text-right">
                  <div className="text-xs font-bold text-[#AFAFAD] uppercase mb-3">
                    تفاصيل القطع المنسقة:
                  </div>

                  <div className="space-y-3">
                    {outfit.pieces.map((piece, i) => (
                      <div
                        key={piece.id}
                        className="p-3 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/40 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#C8C8C6] shrink-0"
                            style={{ backgroundColor: piece.colorHex }}
                          />
                          <div>
                            <span className="font-bold text-[#1C1C1C] block">
                              {piece.name}
                            </span>
                            <span className="text-[#AFAFAD] text-[11px]">
                              {piece.colorName}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[#1C1C1C]">
                          {piece.price} ج.م
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Total Price & High-Contrast CTA */}
              <div className="p-6 pt-2 text-right">
                <div className="pt-4 border-t border-[#C8C8C6]/50 mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#AFAFAD]">
                    إجمالي الـOutfit الدقيق
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#1C1C1C] font-mono">
                      {outfit.totalPrice.toLocaleString('ar-EG')}
                    </span>
                    <span className="text-xs font-bold text-[#1C1C1C]/80">
                      جنيه
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectOutfit(outfit)}
                  id={`offer-cta-btn-${outfit.id}`}
                  className="w-full py-4 px-5 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] font-bold text-sm hover:bg-[#2E2E2E] transition-all duration-200 shadow-md flex items-center justify-center gap-2 focus:outline-none hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>اختار الـOutfit دي</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#AFAFAD]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#AFAFAD]" />
                  <span>دفع عند الاستلام أو Vodafone Cash • استبدال 14 يوم</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 18: Final Offer / Guide Bridge */}
        <div
          id="offer-guide-bridge"
          className="text-center p-8 sm:p-10 rounded-3xl bg-[#FFFFFF]/[0.02] border border-[#C8C8C6]/20 max-w-[760px] mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-3">
            مش لاقي الـLook اللي في دماغك؟
          </h3>
          <p className="text-sm sm:text-base text-[#C8C8C6] mb-6 max-w-[560px] mx-auto leading-relaxed">
            ادخل الـOutfit Guide وشوف Looks أكتر، واختار الـ3 قطع اللي تكوّن الـLook المناسبة ليك.
          </p>
          <button
            onClick={onOpenGuide}
            id="offer-open-guide-btn"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#FFFFFF] bg-transparent border border-[#C8C8C6]/40 rounded-xl hover:bg-[#FFFFFF]/10 hover:border-[#C8C8C6] transition-all duration-200 focus:outline-none"
          >
            <Sparkles className="w-4 h-4 text-[#C8C8C6]" />
            <span>شوف الـOutfit Guide</span>
          </button>
        </div>

      </div>
    </section>
  );
};
