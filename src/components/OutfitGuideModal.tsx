import React, { useState } from 'react';
import { AVAILABLE_PIECES, OUTFITS } from '../data/outfits';
import { Outfit, ProductPiece } from '../types';
import { X, Sparkles, Check, ArrowLeft, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface OutfitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCustomOutfit: (outfit: Outfit) => void;
}

export const OutfitGuideModal: React.FC<OutfitGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectCustomOutfit,
}) => {
  if (!isOpen) return null;

  const [selectedTshirt, setSelectedTshirt] = useState<ProductPiece>(AVAILABLE_PIECES.tshirts[0]);
  const [selectedJeans, setSelectedJeans] = useState<ProductPiece>(AVAILABLE_PIECES.jeans[0]);
  const [selectedShoes, setSelectedShoes] = useState<ProductPiece>(AVAILABLE_PIECES.shoes[0]);
  const [selectedOccasion, setSelectedOccasion] = useState('خروجة وكافيه');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { addToCart, setCartDrawerOpen } = useCart();

  const occasionOptions = [
    { label: 'خروجة وكافيه', vibe: 'Casual & Relaxed' },
    { label: 'يوم جامعة عادي', vibe: 'Fresh & Clean' },
    { label: 'سهرة ويوم طويل', vibe: 'Dark & Sharp' },
  ];

  const totalPrice = selectedTshirt.price + selectedJeans.price + selectedShoes.price;

  const buildCustomOutfit = (): Outfit => {
    return {
      id: `custom-guide-${Date.now()}`,
      number: 'CUSTOM LOOK',
      name: `GUIDE LOOK (${selectedOccasion})`,
      nameEn: `Custom Guide Outfit`,
      occasion: selectedOccasion,
      occasionTag: selectedOccasion,
      message: 'Look مخصصة من الـOutfit Guide متناسقة من 3 قطع أساسية.',
      image:
        selectedTshirt.colorName === 'White'
          ? OUTFITS[1].image
          : selectedTshirt.colorName === 'Bordeaux' || selectedTshirt.colorName === 'البرغندي'
          ? OUTFITS[0].image
          : OUTFITS[2].image,
      pieces: [selectedTshirt, selectedJeans, selectedShoes],
      totalPrice: totalPrice,
    };
  };

  const handleCreateAndOrder = () => {
    const customOutfit = buildCustomOutfit();
    onSelectCustomOutfit(customOutfit);
  };

  const handleAddToCart = () => {
    const customOutfit = buildCustomOutfit();
    [selectedTshirt, selectedJeans, selectedShoes].forEach((piece) => {
      const defaultSize = piece.category === 'tshirt' ? 'L' : piece.category === 'jeans' ? '32' : '43';
      addToCart({
        productId: piece.id,
        productName: piece.name,
        productType: piece.category === 'tshirt' ? 'تيشيرت' : piece.category === 'jeans' ? 'بنطلون' : 'كوتشي',
        productCategory: piece.category,
        selectedSize: defaultSize,
        selectedColor: piece.colorName,
        selectedColorHex: piece.colorHex,
        price: piece.price,
        image: customOutfit.image,
        quantity: 1,
        outfitName: customOutfit.name,
      });
    });

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 3500);
  };

  return (
    <div
      id="outfit-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#1C1C1C]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] text-[#1C1C1C] w-full max-w-[800px] max-h-[92vh] sm:max-h-[88vh] rounded-2xl sm:rounded-3xl border border-[#C8C8C6] shadow-2xl flex flex-col text-right relative overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="shrink-0 p-4 sm:p-5 bg-[#1C1C1C] text-[#FFFFFF] border-b border-[#C8C8C6]/20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#C8C8C6]/30 flex items-center justify-center text-[#EAEAEA] hover:text-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors focus:outline-none"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-[11px] text-[#AFAFAD] font-mono mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAEAEA]" />
              <span>ULTRA ONE FIT • OUTFIT GUIDE</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-[#FFFFFF]">
              دليل تنسيق الـLook الخاص بيك
            </h2>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 overscroll-contain text-right">
          
          {/* Guide Explanation Box */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/80">
            <p className="text-xs sm:text-sm text-[#1C1C1C]/85 leading-relaxed">
              «الـOutfit Guide معمول عشان لو حابب تركيبة مختلفة تناسب يومك. القاعدة واحدة: <strong>3 قطع متناسقة = 1 Outfit كامل</strong> عشان تضمن شكل مرتب بدون حيرة.»
            </p>
          </div>

          {/* Section 1: Occasion Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-black text-[#1C1C1C] block">
                1. اختر المناسبة أو طابع يومك:
              </span>
              <span className="text-[11px] text-[#AFAFAD]">3 طوابع يومية</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {occasionOptions.map((occ) => {
                const isSelected = selectedOccasion === occ.label;
                return (
                  <button
                    key={occ.label}
                    type="button"
                    onClick={() => setSelectedOccasion(occ.label)}
                    className={`p-3 rounded-xl border text-right transition-all duration-200 focus:outline-none relative flex flex-col justify-between min-h-[58px] ${
                      isSelected
                        ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm ring-1 ring-[#1C1C1C]'
                        : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:bg-[#1C1C1C]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs sm:text-[13px]">{occ.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FFFFFF]" />}
                    </div>
                    <span className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-[#EAEAEA]/80' : 'text-[#AFAFAD]'}`}>
                      {occ.vibe}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Piece 1 - T-Shirt */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <span className="font-black text-xs sm:text-sm text-[#1C1C1C]">
                2. القطعة الأولى: التيشيرت الأوفرسايز
              </span>
              <span className="text-[11px] text-[#AFAFAD]">
                خامة بوليفار (سادة 450 ج.م أو COURAGEOUS جرافيك 499 ج.م)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {AVAILABLE_PIECES.tshirts.map((ts) => {
                const isSelected = selectedTshirt.id === ts.id;
                return (
                  <button
                    key={ts.id}
                    type="button"
                    onClick={() => setSelectedTshirt(ts)}
                    className={`p-3 rounded-xl border text-right transition-all duration-200 focus:outline-none relative min-h-[74px] flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm'
                        : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:bg-[#1C1C1C]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#C8C8C6] shrink-0"
                          style={{ backgroundColor: ts.colorHex }}
                        />
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#EAEAEA]' : 'text-[#AFAFAD]'}`}>
                          {ts.colorName}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold">{ts.price} ج.م</span>
                    </div>
                    <div className="font-bold text-xs leading-snug line-clamp-1">{ts.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Piece 2 - Jeans */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <span className="font-black text-xs sm:text-sm text-[#1C1C1C]">
                3. القطعة الثانية: بنطلون جينز (ريجولار أو وايد ليج)
              </span>
              <span className="text-[11px] text-[#AFAFAD]">
                جينز رباعية 95% قطن و5% ليكرا مع ضمان عام كامل
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {AVAILABLE_PIECES.jeans.map((jn) => {
                const isSelected = selectedJeans.id === jn.id;
                return (
                  <button
                    key={jn.id}
                    type="button"
                    onClick={() => setSelectedJeans(jn)}
                    className={`p-3 rounded-xl border text-right transition-all duration-200 focus:outline-none relative min-h-[74px] flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm'
                        : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:bg-[#1C1C1C]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#C8C8C6] shrink-0"
                          style={{ backgroundColor: jn.colorHex }}
                        />
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#EAEAEA]' : 'text-[#AFAFAD]'}`}>
                          {jn.colorName}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold">{jn.price} ج.م</span>
                    </div>
                    <div className="font-bold text-xs leading-snug line-clamp-1">{jn.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Piece 3 - Shoes */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <span className="font-black text-xs sm:text-sm text-[#1C1C1C]">
                4. القطعة الثالثة: كوتشي وسنيكرز
              </span>
              <span className="text-[11px] text-[#AFAFAD]">
                جلد مستورد ونعل فوم بيور مريح وخفيف
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {AVAILABLE_PIECES.shoes.map((sh) => {
                const isSelected = selectedShoes.id === sh.id;
                return (
                  <button
                    key={sh.id}
                    type="button"
                    onClick={() => setSelectedShoes(sh)}
                    className={`p-3 rounded-xl border text-right transition-all duration-200 focus:outline-none relative min-h-[74px] flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm'
                        : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:bg-[#1C1C1C]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#C8C8C6] shrink-0"
                          style={{ backgroundColor: sh.colorHex }}
                        />
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#EAEAEA]' : 'text-[#AFAFAD]'}`}>
                          {sh.colorName}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold">{sh.price} ج.م</span>
                    </div>
                    <div className="font-bold text-xs leading-snug line-clamp-1">{sh.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Fixed Footer: Total Summary & CTAs */}
        <div className="shrink-0 p-3.5 sm:p-4 bg-[#FFFFFF] border-t border-[#C8C8C6]/50 shadow-lg text-right">
          
          {/* Notification on cart addition */}
          {addedSuccess && (
            <div className="mb-2.5 p-2.5 rounded-[8px] bg-[#1C1C1C] text-[#FFFFFF] flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFFFFF]" />
                <span>تمت إضافة الـ 3 قطع للسلة بنجاح!</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setCartDrawerOpen(true);
                }}
                className="px-2 py-0.5 rounded bg-[#FFFFFF] text-[#1C1C1C] text-[11px] font-bold"
              >
                فتح السلة
              </button>
            </div>
          )}

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs font-black text-[#1C1C1C] block">
                إجمالي الـ3 قطع المنسقة
              </span>
              <span className="text-[11px] text-[#AFAFAD]">
                ({selectedTshirt.colorName} + {selectedJeans.colorName} + {selectedShoes.colorName})
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-[#1C1C1C] font-mono">
                {totalPrice.toLocaleString('ar-EG')}
              </span>
              <span className="text-xs font-bold text-[#1C1C1C]/80">جنيه</span>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            <button
              onClick={handleCreateAndOrder}
              className="w-full py-3 px-3.5 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] font-bold text-xs sm:text-sm hover:bg-[#2E2E2E] transition-all flex items-center justify-center gap-1.5 shadow-md active:translate-y-0"
              id="guide-order-btn"
            >
              <span>طلب الـOutfit دي وتحديد المقاسات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-3.5 rounded-xl bg-[#FFFFFF] text-[#1C1C1C] border-2 border-[#1C1C1C] font-bold text-xs sm:text-sm hover:bg-[#1C1C1C]/5 transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
              id="guide-add-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-[#1C1C1C]" />
              <span>إضافة الـOutfit للسلة (3 قطع)</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-[#AFAFAD] mt-2">
            شحن القاهرة 80 جنيه خلال 3–4 أيام • استبدال المقاس خلال 14 يوم
          </p>
        </div>

      </div>
    </div>
  );
};
