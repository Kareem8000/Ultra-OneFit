import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface StickyBottomCtaProps {
  onScrollToOrderSection: () => void;
  onOpenGuide?: () => void;
}

export const StickyBottomCta: React.FC<StickyBottomCtaProps> = ({
  onScrollToOrderSection,
}) => {
  return (
    <div
      id="sticky-bottom-cta-bar"
      className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-50 pointer-events-none flex items-center justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center justify-center p-1 sm:p-1.5 rounded-full bg-[#1C1C1C]/90 backdrop-blur-md border border-[#C8C8C6]/30 shadow-[0_12px_32px_rgba(0,0,0,0.65)]">
        <button
          onClick={onScrollToOrderSection}
          id="sticky-bar-action-btn"
          className="h-[44px] sm:h-[46px] px-6 sm:px-8 rounded-full bg-[#FFFFFF] text-[#1C1C1C] font-extrabold text-xs sm:text-sm hover:bg-[#EAEAEA] transition-all duration-200 shadow-md flex items-center justify-center gap-2 focus:outline-none active:scale-95"
        >
          <span>اطلب الـ Outfit</span>
          <ArrowLeft className="w-4 h-4 text-[#1C1C1C]" />
        </button>
      </div>
    </div>
  );
};
