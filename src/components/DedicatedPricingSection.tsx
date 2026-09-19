import React, { useState } from 'react';
import { Outfit } from '../types';
import { OUTFITS } from '../data/outfits';
import { Check, ArrowLeft, ShieldAlert, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface DedicatedPricingSectionProps {
  onSelectOutfit: (outfit: Outfit) => void;
}

export const DedicatedPricingSection: React.FC<DedicatedPricingSectionProps> = ({
  onSelectOutfit,
}) => {
  const [selectedOutfitIndex, setSelectedOutfitIndex] = useState<number>(0);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState<boolean>(false);
  const { addToCart, setCartDrawerOpen } = useCart();

  const currentOutfit = OUTFITS[selectedOutfitIndex] || OUTFITS[0];

  const handleAddToCart = () => {
    // Add all 3 pieces of the selected outfit to cart
    currentOutfit.pieces.forEach((piece) => {
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
        image: currentOutfit.image,
        quantity: 1,
        outfitName: currentOutfit.name,
      });
    });

    setAddedToCartSuccess(true);
    setTimeout(() => {
      setAddedToCartSuccess(false);
    }, 3500);
  };

  return (
    <section
      id="dedicated-pricing-section"
      className="bg-[#1C1C1C] text-[#FFFFFF] py-16 sm:py-24 border-b border-[#C8C8C6]/15 text-center"
    >
      <div className="max-w-[840px] mx-auto px-3.5 sm:px-6">
        
        {/* Centered Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFFFFF]/[0.08] border border-[#C8C8C6]/30 text-xs font-bold text-[#EAEAEA] mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#EAEAEA]" />
          <span>اطلب الآن تفاصيل واستلام الأوتفيت</span>
        </div>

        {/* Centered Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FFFFFF] leading-tight mb-3">
          تنسيقات Ultra One Fit الرسمية
        </h2>
        <p className="text-xs sm:text-sm text-[#AFAFAD] max-w-[560px] mx-auto mb-8 sm:mb-10">
          اختر الـLook المناسب ليومك، استعرض تفاصيل قطعه الـ3 المتناسقة، ثم كمل طلبك أو ضيفه للسلة بضغطة واحدة.
        </p>

        {/* STEP 1: Select the Look */}
        <div className="mb-6 text-right">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs sm:text-sm font-black text-[#FFFFFF] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#FFFFFF] text-[#1C1C1C] text-[11px] font-mono font-black flex items-center justify-center">
                1
              </span>
              حدد الـLook المطلوب أولاً:
            </span>
            <span className="text-[11px] text-[#AFAFAD] font-mono">
              3 تنسيقات رسمية معتمدة
            </span>
          </div>

          {/* 3 Looks Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
            {OUTFITS.map((outfit, index) => {
              const isSelected = selectedOutfitIndex === index;
              return (
                <button
                  key={outfit.id}
                  type="button"
                  onClick={() => {
                    setSelectedOutfitIndex(index);
                    setAddedToCartSuccess(false);
                  }}
                  className={`p-3.5 sm:p-4 rounded-[14px] border text-right transition-all duration-200 focus:outline-none relative ${
                    isSelected
                      ? 'bg-[#FFFFFF] text-[#1C1C1C] border-[#FFFFFF] shadow-lg ring-2 ring-[#FFFFFF]/50'
                      : 'bg-[#FFFFFF]/[0.05] text-[#EAEAEA] border-[#C8C8C6]/25 hover:bg-[#FFFFFF]/[0.09] hover:border-[#C8C8C6]/40'
                  }`}
                  id={`select-look-btn-${index + 1}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-[6px] uppercase tracking-wider ${
                        isSelected
                          ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                          : 'bg-[#FFFFFF]/10 text-[#C8C8C6]'
                      }`}
                    >
                      LOOK {outfit.number}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#1C1C1C] text-[#FFFFFF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div className={`font-black text-sm sm:text-base mb-1 ${isSelected ? 'text-[#1C1C1C]' : 'text-[#FFFFFF]'}`}>
                    {outfit.name}
                  </div>
                  <div className={`text-[11px] mb-2.5 line-clamp-1 ${isSelected ? 'text-[#1C1C1C]/75' : 'text-[#AFAFAD]'}`}>
                    {outfit.occasionTag}
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-current/10">
                    <span className="text-[10px] opacity-70">3 قطع كاملة</span>
                    <span className="font-mono font-black text-xs sm:text-sm">
                      {outfit.totalPrice.toLocaleString('ar-EG')} ج.م
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Selected Look Details & 3 Pieces Breakdown */}
        <div className="rounded-[18px] sm:rounded-[22px] bg-[#FFFFFF] text-[#1C1C1C] border border-[#C8C8C6] shadow-2xl p-4 sm:p-7 md:p-8 text-right relative overflow-hidden transition-all duration-300">
          
          {/* Active Look Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 sm:pb-5 border-b border-[#C8C8C6]/50 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1C1C] text-[#FFFFFF] text-[10px] font-mono font-black">
                  LOOK {currentOutfit.number}
                </span>
                <span className="text-xs text-[#1C1C1C]/70 font-semibold">
                  {currentOutfit.occasionTag}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-[#1C1C1C]">
                {currentOutfit.name} — تفاصيل ومكونات الـLook
              </h3>
            </div>

            {/* Total Price & Pieces count pill */}
            <div className="sm:text-left flex items-baseline sm:flex-col justify-between gap-1">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#1C1C1C]/[0.06] text-[#1C1C1C] text-[11px] font-bold">
                عدد القطع: 3 قطع متناسقة
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#1C1C1C]">
                  {currentOutfit.totalPrice.toLocaleString('ar-EG')}
                </span>
                <span className="text-xs font-bold text-[#1C1C1C]/70">جنيه</span>
              </div>
            </div>
          </div>

          {/* 3 Pieces Cards Breakdown */}
          <div className="mb-6">
            <span className="text-xs font-bold text-[#AFAFAD] block mb-2.5">
              قطع الـLook الثلاثة الجاهزة للارتداء:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentOutfit.pieces.map((piece, idx) => (
                <div
                  key={piece.id}
                  className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.025] border border-[#C8C8C6]/70 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <span className="text-[10px] font-bold text-[#AFAFAD] uppercase tracking-wider">
                        قطعة 0{idx + 1} • {piece.category === 'tshirt' ? 'تيشيرت' : piece.category === 'jeans' ? 'بنطلون' : 'سنيكرز'}
                      </span>
                      <span
                        className="w-3 h-3 rounded-full border border-[#C8C8C6] shrink-0"
                        style={{ backgroundColor: piece.colorHex }}
                        title={piece.colorName}
                      />
                    </div>
                    <div className="font-bold text-xs sm:text-[13px] text-[#1C1C1C] mb-1 leading-snug">
                      {piece.name}
                    </div>
                    <div className="text-[11px] text-[#1C1C1C]/65 mb-2 leading-relaxed">
                      {piece.details}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#C8C8C6]/40 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#AFAFAD]">اللون: {piece.colorName}</span>
                    <span className="font-mono font-black text-[#1C1C1C]">{piece.price} ج.م</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Guarantee Checklist */}
          <div className="space-y-2 mb-6 text-xs text-[#1C1C1C]/80 pt-4 border-t border-[#C8C8C6]/40">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#1C1C1C] shrink-0" />
              <span>فحص ومطابقة دقيقة للمقاسات حسب الطول والوزن قبل الشحن لضمان راحة التلبيس</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#1C1C1C] shrink-0" />
              <span>شحن للقاهرة 80 ج.م خلال 3–4 أيام عمل مع إمكانية المعاينة</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#1C1C1C] shrink-0" />
              <span>الدفع عند الاستلام كاش أو فودافون كاش (10% مقدم لتأكيد الجدية)</span>
            </div>
          </div>

          {/* Trust Alert Box */}
          <div className="p-3 rounded-[10px] bg-[#1C1C1C]/5 border border-[#C8C8C6]/60 flex items-center gap-2 mb-6 text-xs text-[#1C1C1C]">
            <ShieldAlert className="w-4 h-4 text-[#1C1C1C] shrink-0" />
            <span>تقدر تستبدل أي قطعة خلال 14 يوم بكل بساطة لو المقاس محتاج تعديل.</span>
          </div>

          {/* Added to cart alert notification */}
          {addedToCartSuccess && (
            <div className="mb-4 p-3 rounded-[10px] bg-[#1C1C1C] text-[#FFFFFF] flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#FFFFFF]" />
                <span>تمت إضافة الـ 3 قطع للـLook بالكامل إلى سلتك بنجاح!</span>
              </div>
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="px-2.5 py-1 rounded-[6px] bg-[#FFFFFF] text-[#1C1C1C] text-xs font-black hover:bg-[#EAEAEA]"
              >
                عرض السلة
              </button>
            </div>
          )}

          {/* Action Buttons: 1. Proceed to Sizing & Order | 2. Add to Cart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Primary CTA: Proceed to Order & Sizing */}
            <button
              onClick={() => onSelectOutfit(currentOutfit)}
              className="h-[48px] sm:h-[52px] rounded-[10px] bg-[#1C1C1C] text-[#FFFFFF] font-black text-xs sm:text-sm hover:bg-[#2E2E2E] transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
              id="proceed-outfit-order-btn"
            >
              <span>متابعة الطلب وتحديد المقاسات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Secondary CTA: Add entire outfit to Cart */}
            <button
              onClick={handleAddToCart}
              className="h-[48px] sm:h-[52px] rounded-[10px] bg-[#FFFFFF] text-[#1C1C1C] border-2 border-[#1C1C1C] font-black text-xs sm:text-sm hover:bg-[#1C1C1C]/5 transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none active:scale-[0.99]"
              id="add-outfit-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-[#1C1C1C]" />
              <span>إضافة الـOutfit للسلة (3 قطع)</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
