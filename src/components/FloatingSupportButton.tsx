import React, { useState } from 'react';
import { MessageCircle, ArrowLeft, X } from 'lucide-react';

interface FloatingSupportButtonProps {
  onScrollToFaq: () => void;
}

export const FloatingSupportButton: React.FC<FloatingSupportButtonProps> = ({
  onScrollToFaq,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('مرحباً، أود الاستفسار عن أطقم Ultra One Fit ومقاساتها.');
    window.open(`https://wa.me/201000000000?text=${message}`, '_blank');
  };

  return (
    <div
      id="floating-support-action"
      className="fixed bottom-[76px] sm:bottom-[16px] left-3 sm:left-6 z-40"
    >
      {/* Mini Tooltip on Hover/Tap */}
      {tooltipOpen && (
        <div className="absolute bottom-[66px] left-0 w-[240px] p-3 rounded-[12px] bg-[#1C1C1C] border border-[#C8C8C6]/30 text-[#FFFFFF] shadow-2xl text-right animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-1 pb-1 border-b border-[#C8C8C6]/20">
            <span className="text-[11px] font-bold text-[#EAEAEA]">خدمة العملاء (واتساب)</span>
            <button
              onClick={() => setTooltipOpen(false)}
              className="text-[#AFAFAD] hover:text-[#FFFFFF]"
              aria-label="إغلاق"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-[#C8C8C6] mb-2 leading-relaxed">
            تواصل معانا مباشرة على واتساب لأي استفسار عن المقاسات أو تأكيد الطلب.
          </p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-1.5 px-2 rounded-[6px] bg-[#FFFFFF] text-[#1C1C1C] font-bold text-[10px] flex items-center justify-center gap-1.5 hover:bg-[#EAEAEA]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>محادثة واتساب فورية</span>
            </button>
            <button
              onClick={() => {
                setTooltipOpen(false);
                onScrollToFaq();
              }}
              className="w-full py-1 px-2 rounded-[6px] text-[#C8C8C6] hover:text-[#FFFFFF] text-[10px] text-center"
            >
              أو شوف الأسئلة الشائعة
            </button>
          </div>
        </div>
      )}

      {/* Floating Black WhatsApp Button */}
      <button
        onClick={() => setTooltipOpen(!tooltipOpen)}
        className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#1C1C1C] text-[#FFFFFF] border border-[#C8C8C6]/40 shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center justify-center hover:bg-[#2A2A2A] hover:border-[#FFFFFF]/60 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none group"
        aria-label="تواصل معنا واتساب"
        title="تواصل معنا واتساب"
        id="support-fab-btn"
      >
        <MessageCircle className="w-6 h-6 text-[#FFFFFF] group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
