import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Headphones,
  BookOpen,
} from 'lucide-react';
import { HERO_IMAGE } from '../data/outfits';

interface HeroProps {
  onScrollToOutfits: () => void;
  onOpenGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToOutfits, onOpenGuide }) => {
  const handleOutfitGuideClick = () => {
    // Scroll down to the 3 Outfits section as specified
    const element = document.getElementById('concept-cards-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenGuide();
    }
  };

  return (
    <section
      id="hero-section"
      className="relative bg-[#1C1C1C] text-[#FFFFFF] pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden border-b border-[#C8C8C6]/15"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Announcement Badge: Optical clearance below floating bar */}
        <div
          id="hero-announcement-badge"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/[0.06] border border-[#C8C8C6]/30 text-[#EAEAEA] text-xs font-semibold mb-3.5 sm:mb-4 shadow-sm"
        >
          <span className="px-2 py-0.5 rounded-full bg-[#FFFFFF] text-[#1C1C1C] text-[10px] sm:text-[11px] font-extrabold tracking-wide">
            3 قطع One Outfit
          </span>
          <span className="text-xs text-[#EAEAEA] font-medium">
            الطلب متاح الآن
          </span>
        </div>

        {/* 5. Main Headline: Scaled down, reduced bold, 2 lines */}
        <h1
          id="hero-headline"
          className="max-w-[720px] mx-auto text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold text-[#FFFFFF] tracking-tight leading-snug sm:leading-tight mb-3 sm:mb-3.5"
        >
          <span className="block">بدل ما تحتار في انك تجمع كل قطعة</span>
          <span className="block text-[#EAEAEA]">اختار الـLook كامل</span>
        </h1>

        {/* 6. Sub-headline: ~20-25 words, ~1.5 lines, centered, clean RTL formatting */}
        <p
          id="hero-description"
          dir="rtl"
          className="max-w-[640px] mx-auto text-xs sm:text-sm md:text-[15px] font-normal text-[#C8C8C6] leading-relaxed mb-5 sm:mb-6 text-center"
        >
          لوك كامل منسق علشانك علشان يوفر وقتك ويضمن شكلك في الخروجات والكافيهات والجامعة
        </p>

        {/* 8. Main Buttons: Compact, prominent, take less space */}
        <div
          id="hero-cta-group"
          className="flex flex-row items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-7 w-full sm:w-auto"
        >
          {/* Primary CTA: "اطلب الأوتفيت" */}
          <button
            onClick={onScrollToOutfits}
            id="hero-primary-cta"
            className="h-[42px] sm:h-[44px] px-5 sm:px-6 rounded-[8px] bg-[#FFFFFF] text-[#1C1C1C] font-extrabold text-xs sm:text-sm hover:bg-[#EAEAEA] transition-all duration-200 shadow-md flex items-center justify-center gap-2 focus:outline-none hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>اطلب الأوتفيت</span>
            <ArrowLeft className="w-4 h-4 text-[#1C1C1C]" />
          </button>

          {/* Secondary CTA: "شوف الـOutfit Guide" (Scrolls to the 3 Outfits section, ready for PDF link) */}
          <button
            onClick={handleOutfitGuideClick}
            id="hero-secondary-cta"
            className="h-[42px] sm:h-[44px] px-4 sm:px-5 rounded-[8px] bg-transparent border border-[#C8C8C6]/35 text-[#EAEAEA] font-semibold text-xs sm:text-sm hover:bg-[#FFFFFF]/10 hover:border-[#C8C8C6]/70 transition-all duration-200 focus:outline-none flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C8C8C6]" />
            <span>شوف الـOutfit Guide</span>
          </button>
        </div>

        {/* 7. 4 Benefit Texts: Shortened, compact, space-efficient */}
        <div
          id="hero-benefit-row"
          className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2 text-[11px] sm:text-xs text-[#C8C8C6] font-medium mb-8 sm:mb-10"
        >
          {/* 1 */}
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EAEAEA] shrink-0" />
            <span>استبدال خلال 14 يوم</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#EAEAEA] shrink-0" />
            <span>مصاريف الشحن 80 جنيه للقاهرة فقط</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EAEAEA] shrink-0" />
            <span>3 قطع أكتر من لوك</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-[#EAEAEA] shrink-0" />
            <span>المتابعة مستمرة حتى الاستلام</span>
          </div>
        </div>

      </div>
    </section>
  );
};
