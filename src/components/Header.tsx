import React, { useState } from 'react';
import { Menu, X, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentView: 'home' | 'outfits' | 'look-detail' | 'products' | 'product-detail';
  onNavigateToOutfits: () => void;
  onNavigateToProducts: () => void;
  onScrollToSection: (sectionId: string) => void;
  onScrollToOrderSection: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateToOutfits,
  onNavigateToProducts,
  onScrollToSection,
  onScrollToOrderSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setCartDrawerOpen } = useCart();

  // Navigation Items:
  // 1. الـOutfits
  // 2. إيه المشكلة؟
  // 3. إيه الحل؟
  // 4. تفاصيل الـ Look
  // 5. بيانات المودل
  // 6. الأسئلة الشائعة
  // 7. المنتجات
  const navItems = [
    {
      id: 'nav-outfits',
      label: 'الـOutfits',
      action: () => {
        setMobileMenuOpen(false);
        onNavigateToOutfits();
      },
      isActive: currentView === 'outfits' || currentView === 'look-detail',
    },
    {
      id: 'nav-problem',
      label: 'إيه المشكلة؟',
      action: () => {
        setMobileMenuOpen(false);
        onScrollToSection('problem-section');
      },
      isActive: false,
    },
    {
      id: 'nav-solution',
      label: 'إيه الحل؟',
      action: () => {
        setMobileMenuOpen(false);
        onScrollToSection('solution-section');
      },
      isActive: false,
    },
    {
      id: 'nav-look-details',
      label: 'تفاصيل الـ Look',
      action: () => {
        setMobileMenuOpen(false);
        onScrollToSection('dedicated-pricing-section');
      },
      isActive: false,
    },
    {
      id: 'nav-model',
      label: 'بيانات المودل',
      action: () => {
        setMobileMenuOpen(false);
        onScrollToSection('editorial-model-section');
      },
      isActive: false,
    },
    {
      id: 'nav-faq',
      label: 'الأسئلة الشائعة',
      action: () => {
        setMobileMenuOpen(false);
        onScrollToSection('faq-section');
      },
      isActive: false,
    },
    {
      id: 'nav-products',
      label: 'المنتجات',
      action: () => {
        setMobileMenuOpen(false);
        onNavigateToProducts();
      },
      isActive: currentView === 'products' || currentView === 'product-detail',
    },
  ];

  return (
    <header
      id="main-header"
      className="fixed top-2.5 sm:top-3.5 inset-x-0 z-50 px-3 sm:px-4 pointer-events-none transition-all duration-200"
    >
      {/* Floating Island Navigation Bar */}
      <div className="max-w-[1240px] mx-auto rounded-[14px] bg-[#1C1C1C]/92 backdrop-blur-md border border-[#C8C8C6]/30 shadow-xl px-3.5 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-200">
        
        {/* Right (RTL): Logo with tagline */}
        <button
          onClick={onNavigateToOutfits}
          className="flex items-center gap-2 group focus:outline-none shrink-0 text-right"
          id="header-logo-link"
        >
          <div className="flex flex-col text-right">
            <span className="font-black text-base sm:text-lg tracking-tight text-[#FFFFFF] uppercase leading-tight">
              Ultra One Fit
            </span>
            <div
              dir="ltr"
              className="flex items-center gap-1 text-[9.5px] sm:text-[10px] tracking-wider text-[#AFAFAD] uppercase mt-0.5 font-medium select-none"
            >
              <span>3 pieces</span>
              <span className="text-[#C8C8C6]/60 font-black">•</span>
              <span>1 outfit</span>
            </div>
          </div>
        </button>

        {/* Center: The Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 text-xs xl:text-[13px] font-semibold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`transition-colors focus:outline-none py-1 whitespace-nowrap ${
                item.isActive
                  ? 'text-[#FFFFFF] font-bold'
                  : 'text-[#C8C8C6] hover:text-[#FFFFFF]'
              }`}
              id={`${item.id}-btn`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Left (RTL): Cart Button + Order Outfit CTA + Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* 01. Cart Button: Visible on Mobile, Tablet & Desktop */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="h-[36px] sm:h-[38px] px-2.5 sm:px-3 rounded-[8px] bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#FFFFFF] border border-[#C8C8C6]/30 flex items-center gap-1.5 transition-all duration-200 focus:outline-none relative active:scale-95"
            aria-label={`سلة المشتريات (${totalItems} قطعة)`}
            id="header-cart-btn"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
              {totalItems > 0 && (
                <span className="sm:hidden absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#FFFFFF] text-[#1C1C1C] text-[9px] font-mono font-black flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-[#FFFFFF]">السلة</span>
            {totalItems > 0 ? (
              <span className="hidden sm:flex min-w-[18px] h-[18px] px-1 rounded-full bg-[#FFFFFF] text-[#1C1C1C] text-[10px] font-mono font-black items-center justify-center">
                {totalItems}
              </span>
            ) : (
              <span className="hidden sm:inline text-[11px] font-mono text-[#AFAFAD]">(0)</span>
            )}
          </button>

          {/* 02. Action Button: اطلب الـ Outfit */}
          <button
            onClick={onScrollToOrderSection}
            className="h-[36px] sm:h-[38px] px-3 sm:px-4 rounded-[8px] bg-[#FFFFFF] text-[#1C1C1C] font-black text-xs sm:text-xs hover:bg-[#EAEAEA] transition-all duration-200 shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 focus:outline-none hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            id="header-cta-btn"
          >
            <span>اطلب الـ Outfit</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#1C1C1C]" />
          </button>

          {/* 03. Mobile / Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#EAEAEA] hover:text-[#FFFFFF] focus:outline-none rounded-[6px] hover:bg-[#FFFFFF]/5"
            aria-label="القائمة"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-[1240px] mx-auto mt-1.5 rounded-[14px] bg-[#1C1C1C]/98 backdrop-blur-md border border-[#C8C8C6]/25 px-4 py-3 shadow-2xl lg:hidden animate-in fade-in duration-200 text-right pointer-events-auto">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#EAEAEA]">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`py-2.5 px-3 rounded-[8px] text-right transition-colors ${
                  idx === navItems.length - 1 ? 'col-span-2' : ''
                } ${
                  item.isActive
                    ? 'bg-[#FFFFFF]/15 text-[#FFFFFF] font-bold'
                    : 'bg-[#FFFFFF]/[0.04] text-[#EAEAEA] hover:bg-[#FFFFFF]/10'
                }`}
                id={`mobile-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Cart Shortcut in Menu */}
          <div className="mt-2.5 pt-2.5 border-t border-[#C8C8C6]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartDrawerOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-[8px] bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/15 text-xs font-bold text-[#FFFFFF] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
                <span>فتح سلة المشتريات</span>
              </div>
              <span className="font-mono text-xs text-[#EAEAEA]">
                {totalItems} {totalItems === 1 ? 'قطعة' : 'قطع'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
