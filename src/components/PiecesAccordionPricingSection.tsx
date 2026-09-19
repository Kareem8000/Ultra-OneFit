import React, { useState } from 'react';
import { Outfit } from '../types';
import { OUTFITS } from '../data/outfits';
import { Plus, Minus, Check, ArrowLeft, ShieldCheck, Gift, Truck } from 'lucide-react';

interface PiecesAccordionPricingSectionProps {
  onSelectOutfit: (outfit: Outfit) => void;
}

export const PiecesAccordionPricingSection: React.FC<PiecesAccordionPricingSectionProps> = ({
  onSelectOutfit,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const accordionItems = [
    {
      title: '1. التيشيرت (بوليفار أصلي / فاخر — Oversize Fit)',
      content:
        'نسيج بوليفار بملمس ناعم، متانة عالية ومقاومة للتآكل والتجعد مع ثبات ممتاز للشكل بعد الاستخدام والغسيل المتكرر، ياقة متينة تحافظ على شكلها، ومتاح بسادة (450 ج.م) أو بتصميم جرافيك "COURAGEOUS" عالي الدقة (499 ج.م).',
    },
    {
      title: '2. بنطلون الجينز (خامة رباعية 95% قطن و5% ليكرا — ضمان عام)',
      content:
        'جينز رباعية عالية الجودة بنسبة 95% قطن و5% ليكرا لحرية الحركة وراحة طوال اليوم، بتقفيل خياطة 3 إبر قوية وأزرار مستوردة مع ضمان شامل لمدة عام كامل، متوفر بقصة Regular أو Wide Leg.',
    },
    {
      title: '3. كوتشي وسنيكرز (جلد مستورد درجة أولى + نعل فوم بيور)',
      content:
        'جلد مستورد درجة أولى بتلبيس مظبوط، نعل P.V.C فوم بيور خفيف جداً ومرن، بطانة إسفنجية ورباط محكم مع فرش طبي مريح للقدم وسهولة في التنظيف لمشاويرك اليومية.',
    },
    {
      title: '4. هندسة تناسق الألوان والمقاسات',
      content:
        'الألوان متناسقة ومدروسة لتعطيك حضوراً مرتباً وأنيقاً بدون حيرة، ومطابقة دقيقة للمقاسات بناءً على الوزن وجداول السنتيمتر قبل تجهيز الشحنة.',
    },
    {
      title: '5. إرشادات الغسيل وضمان الـ 14 يوم',
      content:
        'غسيل بماء بارد ومقلوب، مع ثبات كامل لألوان البوليفار والدنيم، وإمكانية معاينة واستبدال المقاس خلال 14 يوم طبقاً للسياسة المعتمدة.',
    },
  ];

  return (
    <section
      id="pieces-accordion-pricing-section"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-20 sm:py-24 border-b border-[#C8C8C6]/25"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Badge & Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#1C1C1C]/[0.05] border border-[#C8C8C6]/70 text-xs font-semibold text-[#1C1C1C] mb-4">
            محتوى الـOutfit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1C1C] leading-tight">
            مواصفات وتفاصيل قطع الـLook
          </h2>
        </div>

        {/* Split Grid: Right is Accordion, Left is High-Converting Pricing Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start text-right">
          
          {/* Right Column (7 cols): Accordion Items */}
          <div className="lg:col-span-7 space-y-3">
            {accordionItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-[12px] bg-[#FFFFFF] border border-[#C8C8C6]/70 overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-right font-bold text-sm sm:text-base text-[#1C1C1C] hover:bg-[#1C1C1C]/[0.02] transition-colors focus:outline-none"
                  >
                    <span>{item.title}</span>
                    <div className="w-6 h-6 rounded-full bg-[#1C1C1C]/[0.06] flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#1C1C1C]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#1C1C1C]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed border-t border-[#C8C8C6]/30">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Left Column (5 cols): The Sticky Pricing Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-[18px] bg-[#1C1C1C] text-[#FFFFFF] p-6 sm:p-7 border border-[#C8C8C6]/30 shadow-2xl">
              
              {/* Price Header */}
              <div className="border-b border-[#C8C8C6]/20 pb-5 mb-5">
                <span className="text-xs font-bold text-[#AFAFAD] block mb-1">
                  السعر التجميعي الشفاف
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#FFFFFF]">
                    1,500 ج.م
                  </span>
                  <span className="text-xs text-[#AFAFAD]">
                    تبدأ من 1,500 ج.م حسب اختيار الـLook
                  </span>
                </div>
                <span className="text-[11px] text-[#C8C8C6] block mt-1">
                  شامل الـ3 قطع المنسقة (تيشيرت بوليفار + جينز عالي الجودة + كوتشي)
                </span>
              </div>

              {/* Checklist: What You Get */}
              <div className="mb-6">
                <span className="text-xs font-bold text-[#FFFFFF] block mb-3">
                  إيه اللي هتحصل عليه في شحنتك؟
                </span>
                <div className="space-y-2.5 text-xs text-[#EAEAEA]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFFFFF] shrink-0" />
                    <span>3 قطع متناسقة أصلية بالكامل</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFFFFF] shrink-0" />
                    <span>خامات بوليفار أصلي ودنيم رباعية مع ضمان عام للجينز</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFFFFF] shrink-0" />
                    <span>كوتشي بفرش طبي ونعل فوم بيور خفيف ومريح</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFFFFF] shrink-0" />
                    <span>مطابقة المقاسات بالوزن والسنتيمتر قبل الشحن</span>
                  </div>
                </div>
              </div>

              {/* Extra Perks */}
              <div className="p-3.5 rounded-[10px] bg-[#FFFFFF]/[0.06] border border-[#C8C8C6]/20 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF] mb-2">
                  <Gift className="w-4 h-4 text-[#FFFFFF]" />
                  <span>إضافات ومزايا مع كل طلب:</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-[#C8C8C6]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>استبدال مجاني للمقاسات خلال 14 يوم</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>توصيل سريع للقاهرة والجيزة (3–4 أيام)</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectOutfit(OUTFITS[0])}
                className="w-full h-[48px] rounded-[8px] bg-[#FFFFFF] text-[#1C1C1C] font-extrabold text-xs sm:text-sm hover:bg-[#EAEAEA] transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>اطلب الـOutfit كامل الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
