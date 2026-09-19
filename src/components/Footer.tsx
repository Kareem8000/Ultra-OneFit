import React from 'react';

interface FooterProps {
  onOpenGuide: () => void;
  onOpenSizeChart: () => void;
  onScrollToOutfits: () => void;
  onScrollToOrderSection: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onNavigateToProducts?: () => void;
  onNavigateToOutfits?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onOpenSizeChart,
  onScrollToOutfits,
  onScrollToOrderSection,
  onOpenTerms,
  onOpenPrivacy,
  onNavigateToProducts,
  onNavigateToOutfits,
}) => {
  const scrollToElement = (elementId: string) => {
    if (onNavigateToOutfits) {
      onNavigateToOutfits();
    }
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const navItems = [
    {
      label: 'الـOutfits',
      action: () => {
        if (onNavigateToOutfits) onNavigateToOutfits();
        scrollToElement('concept-cards-section');
      },
    },
    {
      label: 'المنتجات',
      action: () => {
        if (onNavigateToProducts) onNavigateToProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      label: 'إيه المشكلة؟',
      action: () => scrollToElement('problem-section'),
    },
    {
      label: 'إيه الحل؟',
      action: () => scrollToElement('solution-section'),
    },
    {
      label: 'تفاصيل الـ Look',
      action: () => scrollToElement('pieces-accordion-pricing-section'),
    },
    {
      label: 'بيانات المودل',
      action: () => scrollToElement('editorial-model-section'),
    },
    {
      label: 'الأسئلة الشائعة',
      action: () => scrollToElement('faq-section'),
    },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-[#1C1C1C] text-[#EAEAEA] pt-16 pb-12 border-t border-[#C8C8C6]/15"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#C8C8C6]/15 text-right">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex flex-col mb-4">
              <span className="font-black text-2xl tracking-tight text-[#FFFFFF] uppercase">
                Ultra One Fit
              </span>
              <div
                dir="ltr"
                className="flex items-center gap-1.5 text-[10.5px] tracking-wider text-[#AFAFAD] uppercase mt-0.5 font-medium select-none"
              >
                <span>3 pieces</span>
                <span className="text-[#C8C8C6]/60 font-black">•</span>
                <span>1 outfit</span>
              </div>
            </div>
            <p className="text-sm text-[#C8C8C6] leading-relaxed max-w-[340px] mb-6">
              Outfits متناسقة، عشان اختيار لبسك يبقى أسهل.
            </p>

            {/* Essential Brand Shipping & Policy notes */}
            <div className="space-y-2 text-xs text-[#AFAFAD]">
              <p>شحن القاهرة: 80 جنيه • التوصيل خلال 3–4 أيام عمل</p>
              <p>ضمان لمدة عام كامل على بنطلونات الجينز ضد عيوب الصناعة</p>
              <p>الاستبدال متاح خلال 14 يوم بحالته الأصلية</p>
              <p>الدفع عند الاستلام أو Vodafone Cash (10% مقدماً)</p>
            </div>

            {/* Direct Order CTA in Footer */}
            <div className="mt-6">
              <button
                onClick={onScrollToOrderSection}
                className="h-[38px] px-5 rounded-[8px] bg-[#FFFFFF] text-[#1C1C1C] font-extrabold text-xs hover:bg-[#EAEAEA] transition-all duration-200 shadow-sm flex items-center gap-2 focus:outline-none hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>اطلب الـ Outfit الآن</span>
                <span>←</span>
              </button>
            </div>
          </div>

          {/* Navigation Column (Matching Bar) (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold font-mono text-[#AFAFAD] uppercase tracking-wider mb-4">
              الأقسام الرئيسية
            </h3>
            <ul className="space-y-3 text-sm text-[#C8C8C6]">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={item.action}
                    className="hover:text-[#FFFFFF] transition-colors focus:outline-none"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Services Column (4 cols) */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold font-mono text-[#AFAFAD] uppercase tracking-wider mb-4">
              المساعدة والخدمات
            </h3>
            <ul className="space-y-3 text-sm text-[#C8C8C6]">
              <li>
                <button
                  onClick={onOpenSizeChart}
                  className="hover:text-[#FFFFFF] transition-colors focus:outline-none flex items-center gap-1.5"
                >
                  <span>جدول القياسات الدقيق بالسنتيمتر</span>
                  <span className="text-[10px] text-[#AFAFAD]">(المقاسات)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-[#FFFFFF] transition-colors focus:outline-none flex items-center gap-1.5"
                >
                  <span>دليل تنسيق الـ Outfit Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToElement('faq-section')}
                  className="hover:text-[#FFFFFF] transition-colors focus:outline-none"
                >
                  الشحن والتوصيل (القاهرة 80 جنيه • 3–4 أيام)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#FFFFFF] transition-colors focus:outline-none"
                >
                  سياسة الاستبدال (متاح خلال 14 يوم)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToElement('faq-section')}
                  className="hover:text-[#FFFFFF] transition-colors focus:outline-none"
                >
                  خيارات الدفع (استلام أو Vodafone Cash)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToElement('dedicated-pricing-section')}
                  className="hover:text-[#FFFFFF] transition-colors focus:outline-none"
                >
                  تفاصيل طلب واستلام الـ Outfit
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AFAFAD]">
          <div>
            © Ultra One Fit — All Rights Reserved
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FFFFFF] transition-colors focus:outline-none underline-offset-4 hover:underline"
              id="footer-privacy-btn"
            >
              سياسة الخصوصية
            </button>
            <span className="text-[#C8C8C6]/30">•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-[#FFFFFF] transition-colors focus:outline-none underline-offset-4 hover:underline"
              id="footer-terms-btn"
            >
              الشروط والأحكام وسياسة الاستخدام
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
