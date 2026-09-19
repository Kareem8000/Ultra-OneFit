import React from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Shirt, Scissors, Layers, ShieldCheck, Compass } from 'lucide-react';

interface SplitValueSectionProps {
  onOpenGuide: () => void;
  onScrollToOutfits: () => void;
}

export const SplitValueSection: React.FC<SplitValueSectionProps> = ({
  onOpenGuide,
  onScrollToOutfits,
}) => {
  const valueCards = [
    {
      id: '01',
      icon: Shirt,
      title: 'إزاي تلاقي الـLook المناسب ليومك من غير حيرة؟',
      description:
        'بدل ما تقف محتار قدام الدولاب تختار كل قطعة لوحدها وتكتشف إن الألوان مش راكبة، بنقدملك 3 قطع منسقة هندسياً لتناسب الجامعة، الكافيه، أو السهرة.',
    },
    {
      id: '02',
      icon: Scissors,
      title: 'خامات متوافقة ومتوازنة مش مجرد مظهر خارجي',
      description:
        'التيشيرت قطن مصري ممشط 240 GSM مريح مع بنطلون جينز كلاسيك 12 أونصة بتفصيل مريح، وسنيكرز خفيف مبطن للتحرك اليومي بدون إجهاد.',
    },
    {
      id: '03',
      icon: Layers,
      title: 'Fit مضبوط على مقاسات الشباب الحقيقية',
      description:
        'كل قطعة مقصوصة بنسب مدروسة؛ التيشيرت Regular Relaxed، البنطلون Straight Leg نظيف بدون كرمشة مبالغ فيها، ومقاس السنيكرز متطابق مع المقاسات القياسية.',
    },
    {
      id: '04',
      icon: ShieldCheck,
      title: 'سعر تجميعي شفاف بدون أي إضافات خفية',
      description:
        'سعر الـLook الكامل محسوب من مجموع أسعار القطع الثلاث الأصلية بدون أي رسوم تنسيق أو أسعار مصطنعة، مع إمكانية الدفع عند الاستلام.',
    },
    {
      id: '05',
      icon: Compass,
      title: 'حرية استكشاف الـOutfit Guide في أي وقت',
      description:
        'لو حابب تبدل لون التيشيرت أو تختار قصة جينز تانية، الـOutfit Guide بيمكّنك من تكوين الـ3 قطع المتناسقة الخاصة بيك بكل سهولة.',
    },
  ];

  return (
    <section
      id="split-value-section"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-20 sm:py-24 border-b border-[#C8C8C6]/20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Right Column: Sticky Title & Core Value Proposition (5 Cols Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 text-right flex flex-col items-start">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1C1C1C]/5 border border-[#C8C8C6] text-[11px] font-bold text-[#1C1C1C] mb-4">
              فلسفة التنسيق المتكامل
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1C1C] leading-[1.2] mb-6">
              بلاش تبدأ من القطعة...
              <span className="block mt-1">ابدأ من الـOutfit.</span>
            </h2>

            <div className="space-y-3 mb-8 text-sm font-medium text-[#1C1C1C]/75">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1C1C]" />
                <span>3 قطع أصلية مدروسة ومتناسقة هندسياً</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1C1C]" />
                <span>خامات طبيعية مريحة لليوم الطويل في الجامعة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1C1C]" />
                <span>استبدال مجاني للمقاسات خلال 14 يوم</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onScrollToOutfits}
                className="h-[46px] px-5 rounded-[8px] bg-[#1C1C1C] text-[#FFFFFF] font-bold text-xs hover:bg-[#2E2E2E] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>اختار الـOutfit</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenGuide}
                className="h-[46px] px-4 rounded-[8px] border border-[#C8C8C6] text-[#1C1C1C] font-semibold text-xs hover:bg-[#1C1C1C]/5 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Outfit Guide</span>
              </button>
            </div>
          </div>

          {/* Left Column: Stack of 5 Structured Value Cards (7 Cols Desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-right">
            {valueCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  className="p-6 rounded-[14px] bg-[#FFFFFF] border border-[#C8C8C6]/50 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-[#1C1C1C]/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Highlighted Icon Box on the Right */}
                    <div className="w-10 h-10 rounded-[10px] bg-[#1C1C1C] text-[#FFFFFF] flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5 text-[#FFFFFF]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#1C1C1C]/70 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
