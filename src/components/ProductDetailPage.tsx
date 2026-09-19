import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ShoppingBag,
  ShieldCheck,
  Ruler,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CatalogProduct } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: CatalogProduct;
  onBackToProducts: () => void;
  onNavigateToOutfits: () => void;
  onOpenSizeChart: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToProducts,
  onNavigateToOutfits,
  onOpenSizeChart,
}) => {
  const { addToCart, setCartDrawerOpen, totalItems } = useCart();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setValidationError('اختار اللون والمقاس الأول.');
      return;
    }

    setValidationError('');
    addToCart({
      productId: product.id,
      productName: product.name,
      productType: product.type,
      selectedColor,
      selectedSize,
      quantity,
      price: product.price,
      image: product.image,
      warranty: product.warranty,
    });

    setIsAddedSuccessfully(true);
    setTimeout(() => {
      setIsAddedSuccessfully(false);
    }, 2800);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#1C1C1C] min-h-screen pt-24 sm:pt-28 pb-10 sm:pb-14 px-3 sm:px-6">
      <div className="max-w-[1180px] mx-auto">
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C8C8C6]/50">
          <button
            onClick={onBackToProducts}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1C1C1C] hover:text-[#1C1C1C]/70 transition-colors focus:outline-none py-1"
            id="back-to-products-btn"
          >
            <ArrowRight className="w-4 h-4 text-[#1C1C1C]" />
            <span>الرجوع للمنتجات</span>
          </button>

          <div className="text-[11px] sm:text-xs text-[#AFAFAD] flex items-center gap-1.5 font-medium">
            <span>المنتجات</span>
            <span>/</span>
            <span className="text-[#1C1C1C] font-semibold">{product.type}</span>
          </div>
        </div>

        {/* Main Product Layout (Desktop: Left Gallery, Right Details | Mobile: Gallery First) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (Desktop) / First Column: Large Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-[22px] bg-[#EAEAEA]/40 overflow-hidden border border-[#C8C8C6] shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Product Fit Tag Overlay */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-[8px] bg-[#1C1C1C]/90 backdrop-blur-md text-[#FFFFFF] text-xs font-bold font-mono tracking-wide shadow-md">
                {product.fit}
              </div>

              {product.warranty && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-[8px] bg-[#FFFFFF]/90 backdrop-blur-md text-[#1C1C1C] text-xs font-bold flex items-center gap-1.5 border border-[#C8C8C6] shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1C1C1C]" />
                  <span>{product.warranty}</span>
                </div>
              )}
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-[14px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/60 text-center text-xs text-[#1C1C1C]">
              <div className="flex flex-col items-center gap-1 p-1">
                <Truck className="w-4 h-4 text-[#1C1C1C]" />
                <span className="font-bold text-[11px]">شحن القاهرة</span>
                <span className="text-[10px] text-[#AFAFAD]">80 جنيه (3-4 أيام)</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-1 border-x border-[#C8C8C6]/50">
                <RotateCcw className="w-4 h-4 text-[#1C1C1C]" />
                <span className="font-bold text-[11px]">استبدال 14 يوم</span>
                <span className="text-[10px] text-[#AFAFAD]">بشروط الحالة الأصلية</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-1">
                <ShieldCheck className="w-4 h-4 text-[#1C1C1C]" />
                <span className="font-bold text-[11px]">دفع عند الاستلام</span>
                <span className="text-[10px] text-[#AFAFAD]">أو فودافون كاش</span>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop) / Second Column: Product Information & Purchase */}
          <div className="lg:col-span-6 text-right space-y-6">
            
            {/* Header Identity & Price */}
            <div>
              <div className="text-xs font-mono text-[#AFAFAD] uppercase tracking-wider mb-1.5">
                ULTRA ONE FIT • {product.type}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-[#1C1C1C]/80 leading-relaxed mb-4">
                {product.cardShortCopy}
              </p>

              <div className="flex items-baseline gap-3 pb-4 border-b border-[#C8C8C6]/60">
                <span className="text-3xl font-black font-mono text-[#1C1C1C]">
                  {product.price}
                </span>
                <span className="text-sm font-bold text-[#1C1C1C]">جنيه مصري</span>
              </div>
            </div>

            {/* 1. Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-bold text-[#1C1C1C]">
                  اختار اللون: <span className="font-normal text-[#1C1C1C]/70">{selectedColor || 'لم يتم التحديد بعد'}</span>
                </label>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.colorOptions.map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(col.name);
                        setValidationError('');
                      }}
                      className={`h-10 px-3.5 rounded-[10px] border flex items-center gap-2.5 transition-all text-xs font-bold ${
                        isSelected
                          ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm'
                          : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:border-[#1C1C1C]/60'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border shrink-0 ${
                          isSelected ? 'ring-1 ring-offset-1 ring-[#FFFFFF]' : 'border-[#C8C8C6]'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FFFFFF]" />}
                    </button>
                  );
                })}
              </div>

              {product.colorNotes && (
                <div className="mt-2 text-[11px] text-[#AFAFAD] leading-relaxed">
                  {product.colorNotes}
                </div>
              )}
            </div>

            {/* 2. Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-bold text-[#1C1C1C]">
                  اختار المقاس: <span className="font-normal text-[#1C1C1C]/70">{selectedSize || 'لم يتم التحديد بعد'}</span>
                </label>

                <button
                  type="button"
                  onClick={onOpenSizeChart}
                  className="text-xs text-[#1C1C1C] underline flex items-center gap-1 hover:text-[#1C1C1C]/70 font-semibold focus:outline-none"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#1C1C1C]" />
                  <span>دليل المقاسات</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  const weightText = product.sizeWeights?.[sz];
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setValidationError('');
                      }}
                      className={`py-2.5 px-3 rounded-[10px] border text-center transition-all ${
                        isSelected
                          ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm font-black'
                          : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:border-[#1C1C1C]/60 font-bold'
                      }`}
                    >
                      <div className="text-sm font-mono">{sz}</div>
                      {weightText && (
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? 'text-[#C8C8C6]' : 'text-[#AFAFAD]'
                          }`}
                        >
                          {weightText}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-[#1C1C1C]">الكمية:</span>
              <div className="flex items-center rounded-[8px] border border-[#C8C8C6] overflow-hidden bg-[#FFFFFF]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-[#1C1C1C] hover:bg-[#EAEAEA] font-bold text-sm focus:outline-none"
                  aria-label="تقليل الكمية"
                >
                  -
                </button>
                <span className="px-3.5 py-1.5 font-mono font-bold text-xs text-[#1C1C1C] border-x border-[#C8C8C6]/50 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-[#1C1C1C] hover:bg-[#EAEAEA] font-bold text-sm focus:outline-none"
                  aria-label="زيادة الكمية"
                >
                  +
                </button>
              </div>
            </div>

            {/* Validation Notice */}
            {validationError && (
              <div className="p-3 rounded-[10px] bg-[#1C1C1C]/5 border border-[#1C1C1C]/20 text-xs font-bold text-[#1C1C1C] animate-in fade-in duration-200">
                {validationError}
              </div>
            )}

            {/* Primary Action Button: أضف إلى السلة */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full h-[50px] rounded-[12px] font-black text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 focus:outline-none ${
                  isAddedSuccessfully
                    ? 'bg-[#1C1C1C] text-[#FFFFFF] scale-[0.99]'
                    : 'bg-[#1C1C1C] text-[#FFFFFF] hover:bg-[#2A2A2A] hover:-translate-y-0.5 active:translate-y-0'
                }`}
                id="add-to-cart-btn"
              >
                {isAddedSuccessfully ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFFFFF]" />
                    <span>تمت الإضافة للسلة</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
                    <span>أضف إلى السلة</span>
                  </>
                )}
              </button>

              {/* Lightweight Mini-Cart Feedback Notification */}
              {isAddedSuccessfully && (
                <div className="p-3 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6] flex items-center justify-between animate-in fade-in duration-200 text-xs">
                  <div className="flex items-center gap-2 text-[#1C1C1C]">
                    <Check className="w-4 h-4 text-[#1C1C1C]" />
                    <span>اتضافت للسلة ({selectedColor} • {selectedSize})</span>
                  </div>
                  <button
                    onClick={() => setCartDrawerOpen(true)}
                    className="font-bold underline text-[#1C1C1C] hover:text-[#1C1C1C]/70"
                  >
                    عرض السلة ({totalItems})
                  </button>
                </div>
              )}
            </div>

            {/* Clear Product Specifications Sections (Section 11) */}
            <div className="pt-6 border-t border-[#C8C8C6]/60 space-y-4">
              <h3 className="font-bold text-sm text-[#1C1C1C]">مواصفات القطعة الرسمية:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-[10px] bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/50">
                  <span className="text-[#AFAFAD] block mb-1">الخامة</span>
                  <span className="font-bold text-[#1C1C1C]">
                    {product.fabricComposition || product.fabric}
                  </span>
                </div>

                <div className="p-3 rounded-[10px] bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/50">
                  <span className="text-[#AFAFAD] block mb-1">القصة</span>
                  <span className="font-bold text-[#1C1C1C]">{product.fit}</span>
                </div>

                <div className="p-3 rounded-[10px] bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/50">
                  <span className="text-[#AFAFAD] block mb-1">الألوان</span>
                  <span className="font-bold text-[#1C1C1C]">
                    {product.colors.join(' • ')}
                  </span>
                </div>

                <div className="p-3 rounded-[10px] bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/50">
                  <span className="text-[#AFAFAD] block mb-1">المقاسات</span>
                  <span className="font-bold text-[#1C1C1C]">
                    {product.sizes.join(' / ')}
                  </span>
                </div>
              </div>

              {/* Long official description scanned */}
              <div className="p-4 rounded-[12px] bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/50">
                <span className="text-[11px] text-[#AFAFAD] font-bold block mb-1">التفاصيل الكاملة</span>
                <p className="text-xs text-[#1C1C1C]/80 leading-relaxed mb-3">
                  {product.description}
                </p>

                {product.additionalDetails && product.additionalDetails.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-[#C8C8C6]/40">
                    {product.additionalDetails.map((det, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#1C1C1C]/80">
                        <span className="w-1 h-1 rounded-full bg-[#1C1C1C]" />
                        <span>{det}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gentle Bridge toward the Outfits Experience */}
              <div className="p-4 rounded-[14px] bg-[#1C1C1C] text-[#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    <span>بتدور على الـLook مش القطعة؟</span>
                  </div>
                  <p className="text-[11px] text-[#C8C8C6]">
                    القطعة دي مصممة لتكون جزء من Look منسق جاهز ومدروس.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onNavigateToOutfits}
                  className="px-3.5 py-2 rounded-[8px] bg-[#FFFFFF] text-[#1C1C1C] text-xs font-black shrink-0 hover:bg-[#EAEAEA] transition-colors"
                >
                  شوف الـOutfits
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
