import React from 'react';
import { Outfit } from '../types';
import { OUTFITS } from '../data/outfits';
import { ArrowLeft, Sparkles, Check, Shirt, Layers, Footprints } from 'lucide-react';

interface OutfitsPageProps {
  onSelectOutfit: (outfit: Outfit) => void;
  onNavigateToHome?: () => void;
  onNavigateToProducts?: () => void;
}

export const OutfitsPage: React.FC<OutfitsPageProps> = ({
  onSelectOutfit,
}) => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1C1C1C] pt-24 pb-20 selection:bg-[#1C1C1C] selection:text-[#FFFFFF]">
      {/* 01. Hero Section */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-12 sm:pb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[8px] bg-[#1C1C1C]/[0.05] border border-[#C8C8C6] text-xs font-semibold text-[#1C1C1C] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#1C1C1C]" />
          <span>Ultra One Fit</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1C1C1C] tracking-tight leading-tight mb-4">
          اختار الـLook اللي تناسب يومك.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#555555] max-w-[760px] mx-auto leading-relaxed">
          3 قطع متناسقة في Look واحدة — شوفها كاملة، واعرف كل قطعة فيها قبل ما تختار.
        </p>
      </section>

      {/* 02. The Three Curated Looks List */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16">
          {OUTFITS.map((outfit) => {
            return (
              <article
                key={outfit.id}
                id={`outfit-card-${outfit.slug || outfit.id}`}
                className="bg-[#FFFFFF] border border-[#C8C8C6] rounded-[22px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Visual Side: Large Complete Look Image */}
                <div className="lg:col-span-7 relative bg-[#F4F4F4] min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] overflow-hidden flex items-center justify-center group">
                  <img
                    src={outfit.image}
                    alt={`${outfit.name} - ${outfit.headline}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-[10px] bg-[#1C1C1C]/80 backdrop-blur-md text-xs font-mono font-bold text-[#FFFFFF] border border-[#FFFFFF]/20 shadow-sm">
                      LOOK {outfit.number}
                    </span>
                    <span className="px-3 py-1.5 rounded-[10px] bg-[#FFFFFF]/90 backdrop-blur-md text-xs font-semibold text-[#1C1C1C] border border-[#C8C8C6] shadow-sm">
                      {outfit.context}
                    </span>
                  </div>
                </div>

                {/* Editorial & Information Side */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-[#C8C8C6]">
                  <div>
                    {/* Look Identity */}
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="font-mono text-xs text-[#AFAFAD] tracking-wider uppercase">
                        LOOK {outfit.number}
                      </span>
                      <span className="text-xs text-[#555555] font-medium">
                        {outfit.context}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] tracking-tight mb-2">
                      {outfit.name}
                    </h2>

                    <p className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-3">
                      “{outfit.headline || outfit.message}”
                    </p>

                    <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6">
                      {outfit.description || outfit.descriptionText}
                    </p>

                    {/* Three Pieces Compact Breakdown */}
                    <div className="border-t border-b border-[#C8C8C6]/50 py-4 mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-wider">
                          مكونات الـLook (3 قطع):
                        </span>
                        <span className="text-[11px] text-[#AFAFAD] font-mono">
                          3 PIECES COORDINATED
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {outfit.pieces.map((piece, idx) => (
                          <div
                            key={piece.id || idx}
                            className="flex items-center justify-between text-xs bg-[#FBFBFB] border border-[#C8C8C6]/40 px-3 py-2 rounded-[12px]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[#AFAFAD] font-mono text-[11px]">
                                0{idx + 1}
                              </span>
                              <span className="font-semibold text-[#1C1C1C]">
                                {piece.name}
                              </span>
                              <span className="text-[#555555]">
                                — {piece.colorName}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-[#1C1C1C]">
                              {piece.price} ج.م
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Primary CTA */}
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-[#555555] block">إجمالي الـLook (3 قطع كاملة)</span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-black text-[#1C1C1C] font-mono">
                            {outfit.totalPrice.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-[#555555]">جنيه</span>
                        </div>
                      </div>

                      <div className="text-left text-[11px] text-[#555555]">
                        <span className="inline-block px-2 py-0.5 rounded-[6px] bg-[#F4F4F4] text-[#1C1C1C] font-medium border border-[#C8C8C6]/40">
                          شحن القاهرة: 80 ج.م
                        </span>
                      </div>
                    </div>

                    <button
                      id={`cta-look-${outfit.slug || outfit.id}`}
                      onClick={() => onSelectOutfit(outfit)}
                      className="w-full py-3.5 px-6 rounded-[11px] bg-[#1C1C1C] text-[#FFFFFF] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm hover:bg-[#000000] hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1C1C1C] focus:ring-offset-2"
                    >
                      <span>شوف الـLook</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 03. Bottom Assurance Footer */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-[#C8C8C6]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-right">
          <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#C8C8C6]/50">
            <h4 className="text-xs font-bold text-[#1C1C1C] mb-1">
              اختار الـLook بدل ما تحتار في كل قطعة
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              3 قطع متناسقة خامة ولون وقصة، تلبيس مدروس ومظهر أنيق دون مجهود.
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#C8C8C6]/50">
            <h4 className="text-xs font-bold text-[#1C1C1C] mb-1">
              شحن سريع وتوصيل موثوق
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              شحن القاهرة 80 جنيه، التوصيل خلال 3–4 أيام عمل مع متابعة الشحنة.
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#C8C8C6]/50">
            <h4 className="text-xs font-bold text-[#1C1C1C] mb-1">
              طرق دفع مؤكدة
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              الدفع عند الاستلام، أو Vodafone Cash (10% مقدم من قيمة الطلب).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
