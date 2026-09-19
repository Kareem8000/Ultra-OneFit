import React from 'react';
import { Outfit } from '../types';
import { OUTFITS } from '../data/outfits';
import { Check, Sparkles, ArrowLeft, Tag } from 'lucide-react';

interface OutfitShowcaseProps {
  onSelectOutfit: (outfit: Outfit) => void;
  onOpenGuide: () => void;
}

export const OutfitShowcase: React.FC<OutfitShowcaseProps> = ({
  onSelectOutfit,
  onOpenGuide,
}) => {
  return (
    <section
      id="outfit-showcase"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-20 md:py-28 border-b border-[#C8C8C6]/20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto mb-16">
          <div
            id="showcase-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1C1C1C]/5 border border-[#C8C8C6] text-[#1C1C1C] text-xs font-bold tracking-wide mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]" />
            <span>المجموعة المنسقة</span>
          </div>

          <h2
            id="showcase-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1C1C] tracking-tight leading-tight mb-4"
          >
            شوف الـOutfits بنفسك.
          </h2>

          <p className="text-base sm:text-lg text-[#1C1C1C]/70 leading-relaxed max-w-[620px] mx-auto">
            كل Outfit متكوّن من 3 قطع متناسقة، عشان تشوف الـLook كامل قبل ما تختار.
          </p>
        </div>

        {/* Editorial Fashion Outfits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 mb-16">
          {OUTFITS.map((outfit) => (
            <article
              key={outfit.id}
              id={`showcase-card-${outfit.id}`}
              className="bg-[#FFFFFF] rounded-3xl border border-[#C8C8C6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Image Wrapper */}
              <div className="relative overflow-hidden bg-[#1C1C1C] aspect-[3/4]">
                <img
                  src={outfit.image}
                  alt={`Ultra One Fit — ${outfit.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Top Badges */}
                <div className="absolute top-4 right-4 left-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-[#1C1C1C]/85 backdrop-blur-md text-[#FFFFFF] text-xs font-mono font-bold border border-[#C8C8C6]/20">
                    {outfit.number}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-[#FFFFFF]/90 backdrop-blur-md text-[#1C1C1C] text-xs font-bold shadow-sm">
                    {outfit.occasionTag}
                  </span>
                </div>

                {/* Bottom Overlay Info inside Image */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/70 to-transparent text-right">
                  <div className="text-xs text-[#EAEAEA] font-medium tracking-wide mb-1">
                    3 قطع • Outfit واحدة
                  </div>
                  <h3 className="text-2xl font-black text-[#FFFFFF] tracking-tight">
                    {outfit.name}
                  </h3>
                  <p className="text-xs text-[#C8C8C6] mt-1 font-medium italic">
                    «{outfit.message}»
                  </p>
                </div>
              </div>

              {/* Card Body & 3 Pieces Breakdown */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-[#FFFFFF] text-right">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C8C8C6]/40">
                    <span className="text-xs font-bold text-[#AFAFAD] uppercase tracking-wider">
                      مكونات الـLook (3 قطع)
                    </span>
                    <span className="text-xs font-semibold text-[#1C1C1C]/70">
                      المناسبة: {outfit.occasion}
                    </span>
                  </div>

                  {/* 3 Pieces List */}
                  <ul className="space-y-3 mb-6">
                    {outfit.pieces.map((piece, idx) => (
                      <li
                        key={piece.id}
                        className="flex items-start justify-between text-xs py-1.5 px-2.5 rounded-xl bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/30"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full border border-[#C8C8C6] shrink-0"
                            style={{ backgroundColor: piece.colorHex }}
                            title={piece.colorName}
                          />
                          <div>
                            <span className="font-bold text-[#1C1C1C] block">
                              {piece.name}
                            </span>
                            <span className="text-[#AFAFAD]">
                              اللون: {piece.colorName}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[#1C1C1C]">
                          {piece.price} ج.م
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Primary CTA */}
                <div className="pt-4 border-t border-[#C8C8C6]/40">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs font-bold text-[#AFAFAD]">
                      إجمالي الـOutfit بالكامل
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[#1C1C1C]">
                        {outfit.totalPrice.toLocaleString('ar-EG')}
                      </span>
                      <span className="text-xs font-bold text-[#1C1C1C]/80">
                        جنيه
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectOutfit(outfit)}
                    id={`showcase-select-btn-${outfit.id}`}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] font-bold text-sm hover:bg-[#2E2E2E] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 focus:outline-none hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>اختار الـOutfit دي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-[#AFAFAD] mt-2 font-medium">
                    شاملة 3 قطع متناسقة جاهزة للارتداء
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Alternative Guide Bridge */}
        <div
          id="showcase-guide-bridge"
          className="rounded-3xl border border-[#C8C8C6] p-8 sm:p-10 text-center bg-[#1C1C1C]/[0.02] max-w-[800px] mx-auto"
        >
          <h4 className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-2">
            مش لاقي الـLook اللي في دماغك؟
          </h4>
          <p className="text-sm sm:text-base text-[#1C1C1C]/75 mb-6 max-w-[550px] mx-auto leading-relaxed">
            ادخل الـOutfit Guide وشوف Looks أكتر، واختار الـ3 قطع اللي تكوّن الـLook المناسبة ليك.
          </p>
          <button
            onClick={onOpenGuide}
            id="showcase-open-guide-btn"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#FFFFFF] bg-[#1C1C1C] rounded-xl hover:bg-[#2E2E2E] transition-all duration-200 shadow-sm hover:-translate-y-0.5 focus:outline-none"
          >
            <Sparkles className="w-4 h-4" />
            <span>شوف الـOutfit Guide</span>
          </button>
        </div>

      </div>
    </section>
  );
};
