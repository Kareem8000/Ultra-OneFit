import React, { useState, useEffect, useRef } from 'react';
import { Outfit, ProductPiece, ColorSwatchOption, CatalogProduct } from '../types';
import { OFFICIAL_CATALOG_PRODUCTS } from '../data/products';
import { OUTFITS } from '../data/outfits';
import { useCart } from '../context/CartContext';
import { useAnalytics } from './TrackingToast';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  Ruler,
  AlertCircle,
  ShoppingBag,
  Sparkles,
  Eye,
  RotateCcw,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

interface LookDetailPageProps {
  outfit: Outfit;
  onBackToOutfits: () => void;
  onOpenSizeChart: () => void;
  onOpenProductDetails?: (product: CatalogProduct) => void;
  onSelectOtherOutfit?: (outfit: Outfit) => void;
}

interface PieceSelectionState {
  color: string;
  colorHex: string;
  size: string;
}

export const LookDetailPage: React.FC<LookDetailPageProps> = ({
  outfit,
  onBackToOutfits,
  onOpenSizeChart,
  onOpenProductDetails,
  onSelectOtherOutfit,
}) => {
  const { addToCart, setCartCheckoutModalOpen } = useCart();
  const { trackEvent } = useAnalytics();

  // Look Gallery: ONLY look/model/editorial photos
  const galleryImages = outfit.galleryImages && outfit.galleryImages.length > 0
    ? outfit.galleryImages
    : [outfit.image];

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Piece selections (color & size for the 3 pieces)
  const [pieceSelections, setPieceSelections] = useState<Record<string, PieceSelectionState>>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  // Initialize piece selections when outfit changes
  useEffect(() => {
    const initial: Record<string, PieceSelectionState> = {};
    outfit.pieces.forEach((piece) => {
      initial[piece.id] = {
        color: piece.colorName,
        colorHex: piece.colorHex,
        size: '', // Empty initially so user consciously picks their size
      };
    });
    setPieceSelections(initial);
    setActiveSlideIndex(0);
    setAttemptedSubmit(false);

    trackEvent('outfit_details_viewed', {
      outfitId: outfit.id,
      outfitName: outfit.name,
      totalPrice: outfit.totalPrice,
    });
  }, [outfit.id]);

  // Autoplay loop for the look slider (5 seconds, pauses on hover)
  useEffect(() => {
    if (galleryImages.length <= 1 || !isAutoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [galleryImages.length, isAutoPlaying]);

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handleColorChange = (pieceId: string, colorName: string, colorHex: string) => {
    setPieceSelections((prev) => ({
      ...prev,
      [pieceId]: {
        ...prev[pieceId],
        color: colorName,
        colorHex: colorHex,
      },
    }));
    trackEvent('color_selected', {
      outfitName: outfit.name,
      pieceId,
      color: colorName,
    });
  };

  const handleSizeChange = (pieceId: string, size: string) => {
    setPieceSelections((prev) => ({
      ...prev,
      [pieceId]: {
        ...prev[pieceId],
        size,
      },
    }));
    trackEvent('size_selected', {
      outfitName: outfit.name,
      pieceId,
      size,
    });
  };

  // Check if all 3 pieces have selected sizes
  const allSizesSelected = outfit.pieces.every(
    (piece) => pieceSelections[piece.id] && pieceSelections[piece.id].size !== ''
  );

  const calculatedTotal = outfit.pieces.reduce((sum, piece) => sum + piece.price, 0);

  const getCatalogData = (catalogProductId?: string): CatalogProduct | undefined => {
    if (!catalogProductId) return undefined;
    return OFFICIAL_CATALOG_PRODUCTS.find((p) => p.id === catalogProductId);
  };

  // Add the 3 items to cart
  const executeAddToCart = (proceedToCheckout: boolean) => {
    if (!allSizesSelected) {
      setAttemptedSubmit(true);
      const missing = outfit.pieces.find(
        (p) => !pieceSelections[p.id] || pieceSelections[p.id].size === ''
      );
      if (missing) {
        const el = document.getElementById(`piece-card-${missing.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    // Add each of the 3 pieces to the cart
    outfit.pieces.forEach((piece) => {
      const sel = pieceSelections[piece.id];
      const catalogInfo = getCatalogData(piece.catalogProductId);
      const pieceImage = piece.image || catalogInfo?.image || outfit.image;

      addToCart({
        productId: piece.catalogProductId || piece.id,
        productName: piece.name,
        productType:
          piece.category === 'tshirt'
            ? 'تيشيرت'
            : piece.category === 'jeans'
            ? 'بنطلون جينز'
            : 'كوتشي',
        productCategory: piece.category,
        selectedColor: sel.color,
        selectedColorHex: sel.colorHex,
        selectedSize: sel.size,
        quantity: 1,
        price: piece.price,
        image: pieceImage,
        outfitName: outfit.name,
        warranty: catalogInfo?.warranty,
      });
    });

    trackEvent('look_add_to_cart', {
      outfitId: outfit.id,
      outfitName: outfit.name,
      totalPrice: calculatedTotal,
      proceedToCheckout,
    });

    if (proceedToCheckout) {
      setCartCheckoutModalOpen(true);
    } else {
      setAddedNotification('تمت إضافة الـ 3 قطع المكونة للـLook إلى سلتك بنجاح.');
      setTimeout(() => setAddedNotification(null), 4000);
    }
  };

  // Filter other 2 outfits for switcher at bottom
  const otherOutfits = OUTFITS.filter((o) => o.id !== outfit.id);

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#1C1C1C] pt-20 sm:pt-24 pb-20 selection:bg-[#1C1C1C] selection:text-[#FFFFFF]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* 01. Breadcrumb & Navigation Bar                          */}
        {/* ========================================================= */}
        <nav className="mb-6 sm:mb-8 flex items-center justify-between text-xs text-[#555555]">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToOutfits}
              className="hover:text-[#1C1C1C] transition-colors flex items-center gap-1 font-bold"
            >
              <span>الرئيسية</span>
            </button>
            <span className="text-[#C8C8C6]">/</span>
            <button
              onClick={onBackToOutfits}
              className="hover:text-[#1C1C1C] transition-colors font-medium"
            >
              <span>الـOutfits المنسقة</span>
            </button>
            <span className="text-[#C8C8C6]">/</span>
            <span className="text-[#1C1C1C] font-bold">{outfit.name}</span>
          </div>

          <button
            onClick={onBackToOutfits}
            className="inline-flex items-center gap-1.5 text-xs text-[#1C1C1C] font-bold bg-[#FFFFFF] border border-[#C8C8C6] hover:border-[#1C1C1C] px-3.5 py-1.5 rounded-full shadow-sm transition-all"
          >
            <span>عرض كل الـOutfits</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* ========================================================= */}
        {/* 02. Look Hero: Dedicated Look Slider + Identity Box      */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          
          {/* LEFT: Look Visual Slider (Dedicated ONLY to the Complete Look) */}
          <div
            className="lg:col-span-7 space-y-3"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slider Frame */}
            <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full bg-[#EFEFEF] rounded-[24px] overflow-hidden border border-[#C8C8C6] shadow-sm group">
              <img
                src={galleryImages[activeSlideIndex]}
                alt={`${outfit.name} — صورة الـLook كاملة (${activeSlideIndex + 1})`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
              />

              {/* Gradient vignette for text clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Badges */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#1C1C1C]/90 backdrop-blur-md text-xs font-mono font-bold text-[#FFFFFF] border border-white/20 shadow-md">
                  LOOK {outfit.number}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-xs font-bold text-[#1C1C1C] border border-[#C8C8C6] shadow-md">
                  {outfit.context}
                </span>
              </div>

              {/* Slide Counter Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono font-bold text-[#FFFFFF] border border-white/10">
                  {activeSlideIndex + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Next / Prev Navigation Buttons */}
              {galleryImages.length > 1 && (
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={handlePrevSlide}
                    className="w-11 h-11 rounded-full bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#1C1C1C] border border-[#C8C8C6] shadow-md flex items-center justify-center pointer-events-auto transition-all hover:scale-105 active:scale-95"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="w-11 h-11 rounded-full bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#1C1C1C] border border-[#C8C8C6] shadow-md flex items-center justify-center pointer-events-auto transition-all hover:scale-105 active:scale-95"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Bottom Dot Indicators */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-2 transition-all rounded-full ${
                        activeSlideIndex === idx
                          ? 'w-7 bg-[#FFFFFF] shadow-md'
                          : 'w-2 bg-[#FFFFFF]/60 hover:bg-[#FFFFFF]'
                      }`}
                      aria-label={`انتقل للصورة ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1">
                {galleryImages.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative w-20 h-24 rounded-[14px] overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeSlideIndex === idx
                        ? 'border-[#1C1C1C] ring-2 ring-[#1C1C1C]/25 scale-100 shadow-sm'
                        : 'border-[#C8C8C6] opacity-70 hover:opacity-100 hover:border-[#1C1C1C]'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`زاوية ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                      0{idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Look Identity, Context, Headline & Fast Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-1">
            <div className="space-y-4">
              {/* Look Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1C]/[0.05] border border-[#C8C8C6] text-xs font-bold text-[#1C1C1C]">
                <span className="font-mono">LOOK {outfit.number}</span>
                <span>•</span>
                <span>{outfit.context}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1C1C] tracking-tight">
                {outfit.name}
              </h1>

              {/* Quote Headline */}
              <p className="text-xl sm:text-2xl font-black text-[#1C1C1C] leading-snug">
                “{outfit.headline || outfit.message}”
              </p>

              {/* Story/Description */}
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                {outfit.description || outfit.descriptionText}
              </p>

              {/* Key Concept Highlights */}
              <div className="p-4 sm:p-5 rounded-[18px] bg-[#FFFFFF] border border-[#C8C8C6] shadow-sm space-y-2.5">
                <div className="flex items-center gap-2 text-[#1C1C1C] font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#1C1C1C]" />
                  <span>تنسيق احترافي متكامل من 3 قطع أساسية:</span>
                </div>
                <ul className="text-xs sm:text-sm text-[#555555] space-y-1.5 pr-4 list-disc">
                  <li>تيشيرت أوفرسايز بوليفار أصلي عالي التهوية والراحة.</li>
                  <li>بنطلون جينز رباعية 95% قطن و5% ليكرا مع ضمان عام.</li>
                  <li>كوتشي سنيكرز جلد مستورد بنعل بيور فوم مريح طوال اليوم.</li>
                </ul>
              </div>
            </div>

            {/* Quick Pricing Box & Scroll CTA */}
            <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#1C1C1C] shadow-md space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#555555] block font-medium">
                    سعر الـLook الكامل (3 قطع):
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5 font-mono">
                    <span className="text-3xl sm:text-4xl font-black text-[#1C1C1C]">
                      {calculatedTotal.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-[#555555]">جنيه</span>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-[11px] text-[#555555] block">الشحن</span>
                  <span className="text-xs font-bold text-[#1C1C1C] bg-[#F4F4F4] px-2.5 py-1 rounded-md inline-block border border-[#C8C8C6]/50">
                    3–4 أيام عمل (80 ج.م)
                  </span>
                </div>
              </div>

              <a
                href="#pieces-cards-section"
                className="w-full py-3.5 px-5 rounded-[12px] bg-[#1C1C1C] text-[#FFFFFF] text-center font-bold text-sm hover:bg-[#000000] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              >
                <span>تحديد مقاسات الـ 3 قطع وإتمام الطلب ↓</span>
              </a>
            </div>

            {/* Micro guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs text-[#555555]">
              <div className="flex items-center gap-2 p-2.5 rounded-[10px] bg-[#FFFFFF] border border-[#C8C8C6]/60">
                <Truck className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                <span>معاينة وقياس عند الاستلام</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-[10px] bg-[#FFFFFF] border border-[#C8C8C6]/60">
                <RotateCcw className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                <span>استبدال المقاس مجاناً</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 03. The Three Pieces: Professional Visual Product Cards  */}
        {/* ========================================================= */}
        <section id="pieces-cards-section" className="pt-12 mb-16 border-t border-[#C8C8C6]">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1C1C]/[0.05] border border-[#C8C8C6] text-xs font-bold text-[#1C1C1C] mb-2">
                <span>القطع الـ 3 المكونة للـ Look</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1C1C1C] tracking-tight">
                تفاصيل القطع وصور المنتجات
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                كل قطعة معروضة بصورتها الحقيقية وخامتها. حدد اللون والمقاس لكل قطعة، أو اضغط على أي كارت لمعاينة تفاصيل المنتج بالكامل.
              </p>
            </div>

            <button
              onClick={onOpenSizeChart}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C1C1C] bg-[#FFFFFF] border border-[#C8C8C6] hover:border-[#1C1C1C] px-3.5 py-2 rounded-[10px] shadow-sm transition-colors shrink-0"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>جدول المقاسات وبيانات المودل</span>
            </button>
          </div>

          {/* 3 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfit.pieces.map((piece, index) => {
              const catalogInfo = getCatalogData(piece.catalogProductId);
              const pieceImage = piece.image || catalogInfo?.image || outfit.image;
              const currentSel = pieceSelections[piece.id] || {
                color: piece.colorName,
                colorHex: piece.colorHex,
                size: '',
              };
              const isMissingSize = attemptedSubmit && currentSel.size === '';

              // Available colors
              const availableColors: ColorSwatchOption[] =
                piece.availableColors ||
                catalogInfo?.colorOptions || [
                  { name: piece.colorName, hex: piece.colorHex },
                ];

              const categoryArabic =
                piece.category === 'tshirt'
                  ? 'تيشيرت أوفرسايز'
                  : piece.category === 'jeans'
                  ? 'بنطلون جينز'
                  : 'كوتشي سنيكرز';

              return (
                <div
                  key={piece.id}
                  id={`piece-card-${piece.id}`}
                  className={`bg-[#FFFFFF] border rounded-[22px] p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md ${
                    isMissingSize
                      ? 'border-red-500 ring-2 ring-red-100'
                      : 'border-[#C8C8C6] hover:border-[#1C1C1C]'
                  }`}
                >
                  <div>
                    {/* Card Header: Piece Order + Category + Fit Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-[#1C1C1C] bg-[#F4F4F4] px-2.5 py-1 rounded-[8px] border border-[#C8C8C6]/50">
                        قطعة 0{index + 1} — {categoryArabic}
                      </span>
                      <span className="text-xs font-bold text-[#555555] bg-[#FBFBFB] px-2.5 py-1 rounded-[8px] border border-[#C8C8C6]/40">
                        {piece.fit || catalogInfo?.fit}
                      </span>
                    </div>

                    {/* Product Image Frame with Zoom Effect */}
                    <div className="relative aspect-[4/3] w-full bg-[#F4F4F4] rounded-[16px] overflow-hidden mb-4 border border-[#C8C8C6]/40 group/img">
                      <img
                        src={pieceImage}
                        alt={piece.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                      />

                      {/* Floating inspect pill */}
                      {catalogInfo && onOpenProductDetails && (
                        <button
                          type="button"
                          onClick={() => onOpenProductDetails(catalogInfo)}
                          className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-sm transition-all hover:scale-105"
                          title="عرض تفاصيل المنتج في الكتالوج"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>معاينة المنتج</span>
                        </button>
                      )}

                      {/* Price badge over image */}
                      <div className="absolute top-2.5 right-2.5 bg-[#FFFFFF]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold font-mono text-[#1C1C1C] border border-[#C8C8C6] shadow-sm">
                        {piece.price} ج.م
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base sm:text-lg font-black text-[#1C1C1C] mb-1.5">
                      {piece.name}
                    </h3>

                    {/* Fabric and craftsmanship details */}
                    <p className="text-xs text-[#555555] leading-relaxed mb-4 pb-3 border-b border-[#C8C8C6]/40">
                      {piece.fabric || catalogInfo?.fabric} • {piece.details || catalogInfo?.cardShortCopy}
                    </p>

                    {/* Color Swatches Selector */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-[#1C1C1C]">اللون:</span>
                        <span className="text-[#555555] font-semibold">{currentSel.color}</span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {availableColors.map((col) => {
                          const isSelected = currentSel.color === col.name;
                          return (
                            <button
                              key={col.name}
                              type="button"
                              onClick={() => handleColorChange(piece.id, col.name, col.hex)}
                              title={col.name}
                              className={`px-2.5 py-1 rounded-[8px] border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#1C1C1C] bg-[#1C1C1C] text-[#FFFFFF] shadow-sm scale-100'
                                  : 'border-[#C8C8C6] bg-[#FFFFFF] text-[#1C1C1C] hover:border-[#1C1C1C]'
                              }`}
                            >
                              <span
                                className="w-3 h-3 rounded-full border border-black/15 inline-block shrink-0"
                                style={{ backgroundColor: col.hex }}
                              />
                              <span>{col.name}</span>
                              {isSelected && <Check className="w-3 h-3 text-[#FFFFFF]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-[#1C1C1C]">المقاس المطلوب:</span>
                        {currentSel.size ? (
                          <span className="font-mono font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded text-[11px] border border-green-200 flex items-center gap-1">
                            <Check className="w-3 h-3 text-green-600" />
                            <span>المقاس: {currentSel.size}</span>
                          </span>
                        ) : (
                          <span className="text-red-500 font-bold text-[11px]">
                            * مطلوب اختيار المقاس
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                        {piece.sizes.map((sz) => {
                          const isSelected = currentSel.size === sz;
                          return (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => handleSizeChange(piece.id, sz)}
                              className={`py-2 rounded-[8px] text-xs font-mono font-bold border transition-all text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1C1C1C] text-[#FFFFFF] border-[#1C1C1C] shadow-sm scale-105'
                                  : 'bg-[#FFFFFF] text-[#1C1C1C] border-[#C8C8C6] hover:border-[#1C1C1C] hover:bg-[#F9F9F9]'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>

                      {/* Error reminder if missing */}
                      {isMissingSize && (
                        <div className="mt-2 p-2 rounded-[8px] bg-red-50 border border-red-200 text-xs text-red-600 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>يرجى اختيار مقاس {piece.name} أولاً</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Price + Button to View Full Product */}
                  <div className="pt-3 border-t border-[#C8C8C6]/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[11px] text-[#555555] block">سعر القطعة:</span>
                      <span className="font-mono font-black text-[#1C1C1C] text-sm">
                        {piece.price} ج.م
                      </span>
                    </div>

                    {catalogInfo && onOpenProductDetails && (
                      <button
                        type="button"
                        onClick={() => onOpenProductDetails(catalogInfo)}
                        className="text-xs font-bold text-[#1C1C1C] hover:underline flex items-center gap-1 py-1 px-2 rounded-md hover:bg-[#F4F4F4]"
                      >
                        <span>تفاصيل القطعة</span>
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04. Order Summary & Primary Purchase Box                 */}
        {/* ========================================================= */}
        <section className="mb-16 bg-[#FFFFFF] border-2 border-[#1C1C1C] rounded-[24px] p-6 sm:p-8 shadow-md">
          <div className="max-w-[760px] mx-auto">
            <div className="text-center sm:text-right mb-6">
              <span className="text-xs font-bold text-[#555555] block mb-1">
                الخطوة الأخيرة
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1C]">
                ملخص طلب الـLook (3 قطع كاملة)
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mt-1">
                تأكد من اختيارات المقاسات والألوان للـ 3 قطع قبل إتمام الطلب:
              </p>
            </div>

            {/* Line items table with selections */}
            <div className="space-y-3 mb-6">
              {outfit.pieces.map((piece) => {
                const sel = pieceSelections[piece.id] || {
                  color: piece.colorName,
                  colorHex: piece.colorHex,
                  size: '',
                };
                const catalogInfo = getCatalogData(piece.catalogProductId);
                const pieceImage = piece.image || catalogInfo?.image || outfit.image;

                return (
                  <div
                    key={piece.id}
                    className="flex items-center justify-between text-xs sm:text-sm p-3 sm:p-4 bg-[#F9F9F9] border border-[#C8C8C6]/70 rounded-[14px]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pieceImage}
                        alt={piece.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-[10px] object-cover border border-[#C8C8C6] shrink-0"
                      />
                      <div>
                        <span className="font-black text-[#1C1C1C] block text-sm">
                          {piece.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-[#555555] mt-0.5">
                          <span>اللون: <strong className="text-[#1C1C1C]">{sel.color}</strong></span>
                          <span>•</span>
                          {sel.size ? (
                            <span className="font-bold text-green-700">
                              المقاس: <strong className="font-mono text-[#1C1C1C]">{sel.size}</strong>
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold">
                              (لم يتم اختيار المقاس بعد)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono font-black text-[#1C1C1C] text-sm shrink-0 mr-2">
                      {piece.price} ج.م
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total pricing calculation */}
            <div className="border-t border-[#C8C8C6] pt-4 mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#555555]">
                <span>المجموع الفرعي (3 قطع):</span>
                <span className="font-mono font-bold text-[#1C1C1C]">{calculatedTotal} ج.م</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#555555]">
                <span>شحن وتوصيل (القاهرة والجيزة):</span>
                <span className="font-mono font-bold text-[#1C1C1C]">80 ج.م</span>
              </div>
              <div className="border-t border-[#C8C8C6]/60 pt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-sm sm:text-base font-black text-[#1C1C1C]">
                    الإجمالي النهائي شامل التوصيل:
                  </span>
                  <span className="block text-[11px] text-[#555555]">
                    الدفع عند الاستلام بعد المعاينة أو Vodafone Cash
                  </span>
                </div>
                <div className="flex items-baseline gap-1 font-mono text-[#1C1C1C]">
                  <span className="text-2xl sm:text-3xl font-black">
                    {(calculatedTotal + 80).toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-[#555555]">جنيه</span>
                </div>
              </div>
            </div>

            {/* Notification alert */}
            {addedNotification && (
              <div className="mb-4 p-3.5 rounded-[12px] bg-green-50 border border-green-200 text-xs text-green-800 font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>{addedNotification}</span>
              </div>
            )}

            {/* Primary & Secondary Action CTAs */}
            <div className="space-y-3">
              <button
                id="btn-complete-look-order"
                onClick={() => executeAddToCart(true)}
                className={`w-full py-4 px-6 rounded-[14px] font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  allSizesSelected
                    ? 'bg-[#1C1C1C] text-[#FFFFFF] hover:bg-[#000000] hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-[#EAEAEA] text-[#777777] border border-[#C8C8C6]'
                }`}
              >
                <span>إتمام طلب الـLook الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => executeAddToCart(false)}
                className="w-full py-3.5 px-6 rounded-[14px] bg-[#FFFFFF] border-2 border-[#1C1C1C] text-[#1C1C1C] font-black text-xs sm:text-sm hover:bg-[#F4F4F4] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#1C1C1C]" />
                <span>إضافة الـ 3 قطع إلى السلة والمتابعة</span>
              </button>
            </div>

            {!allSizesSelected && (
              <p className="text-xs text-center text-red-600 mt-3 font-bold">
                * يرجى اختيار مقاس كل قطعة من الـ 3 قطع بالأعلى لإتمام الطلب.
              </p>
            )}

            {/* Reassurances list */}
            <div className="mt-6 pt-6 border-t border-[#C8C8C6]/50 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-[#555555]">
              <div className="flex items-center justify-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#1C1C1C]" />
                <span>توصيل خلال 3–4 أيام عمل</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1C1C1C]" />
                <span>معاينة وفحص قبل الاستلام</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-medium">
                <RotateCcw className="w-4 h-4 text-[#1C1C1C]" />
                <span>استبدال المقاس مجاناً</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05. Switch to Other Looks                                */}
        {/* ========================================================= */}
        {otherOutfits.length > 0 && onSelectOtherOutfit && (
          <section className="pt-8 border-t border-[#C8C8C6]">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-black text-[#1C1C1C]">
                استكشف الـLooks التانية
              </h3>
              <p className="text-xs text-[#555555] mt-0.5">
                تنسيقات مختلفة لكل وقت في يومك
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[800px] mx-auto">
              {otherOutfits.map((other) => (
                <div
                  key={other.id}
                  onClick={() => onSelectOtherOutfit(other)}
                  className="p-4 rounded-[18px] bg-[#FFFFFF] border border-[#C8C8C6] hover:border-[#1C1C1C] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <img
                    src={other.image}
                    alt={other.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 rounded-[12px] object-cover border border-[#C8C8C6] group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div className="flex-1 text-right">
                    <span className="text-[11px] font-mono font-bold text-[#555555] block">
                      LOOK {other.number} — {other.context}
                    </span>
                    <h4 className="text-base font-black text-[#1C1C1C] mt-0.5 group-hover:text-black">
                      {other.name}
                    </h4>
                    <p className="text-xs text-[#555555] line-clamp-1 mt-1">
                      {other.message}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C8C8C6]/40">
                      <span className="font-mono font-bold text-xs text-[#1C1C1C]">
                        {other.totalPrice.toLocaleString()} ج.م
                      </span>
                      <span className="text-xs font-bold text-[#1C1C1C] flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                        <span>شوف الـLook</span>
                        <ArrowLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
