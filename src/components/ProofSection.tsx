import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Ruler,
  Layers,
  Palette,
  UserCheck,
  CheckCircle2,
  RefreshCw,
  Info,
} from 'lucide-react';
import {
  MODEL_DATA,
  SIZE_TABLE,
  FABRIC_IMAGE,
  MODEL_FIT_IMAGE,
} from '../data/outfits';

export const ProofSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTabSize, setActiveTabSize] = useState<'tshirts' | 'jeans' | 'shoes'>('tshirts');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);

  const totalSlides = 4;
  const slideTitles = [
    { title: 'بيانات الموديل', icon: UserCheck },
    { title: 'الخامات والتصنيع', icon: Layers },
    { title: 'الألوان والقطع', icon: Palette },
    { title: 'جدول المقاسات', icon: Ruler },
  ];

  // Auto-rotate every 4.5 seconds unless paused by user hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const colorItems = [
    { name: 'تيشيرت بوليفار سادة', category: 'تيشيرت', color: '#4A1521', label: 'Bordeaux (عنابي برغندي)', match: 'LOOK 01: AFTER CLASS' },
    { name: 'تيشيرت بوليفار سادة', category: 'تيشيرت', color: '#FFFFFF', label: 'White (أبيض ناصع)', match: 'LOOK 02: EVERYDAY' },
    { name: 'تيشيرت COURAGEOUS', category: 'تيشيرت', color: '#1C1C1C', label: 'Black (أسود جرافيك)', match: 'LOOK 03: AFTER DARK' },
    { name: 'جينز رباعية ريجولار', category: 'جينز', color: '#1C1C1C', label: 'Black (أسود ملكي)', match: 'LOOK 01' },
    { name: 'جينز رباعية ريجولار', category: 'جينز', color: '#2B3D52', label: 'Blue (أزرق)', match: 'LOOK 02' },
    { name: 'جينز رباعية وايد ليج', category: 'جينز', color: '#3A3A3A', label: 'Dark Grey (رمادي غامق)', match: 'LOOK 03' },
    { name: 'كوتشي وسنيكرز خفيف', category: 'كوتشي', color: '#EAEAEA', label: 'Off-White (أوف وايت)', match: 'LOOK 01 & 02' },
    { name: 'كوتشي وسنيكرز خفيف', category: 'كوتشي', color: '#1C1C1C', label: 'Black (أسود كامل)', match: 'LOOK 03' },
  ];

  return (
    <section
      id="proof-section"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-20 md:py-28 border-b border-[#C8C8C6]/40 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto mb-14">
          <div
            id="proof-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1C1C1C]/5 border border-[#C8C8C6] text-[#1C1C1C] text-xs font-bold tracking-wide mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]" />
            <span>تفاصيل واضحة قبل الاختيار</span>
          </div>

          <h2
            id="proof-headline"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1C1C] tracking-tight leading-tight mb-4"
          >
            شوف التفاصيل اللي ورا الـOutfit.
          </h2>

          <p className="text-base sm:text-lg text-[#1C1C1C]/70 leading-relaxed max-w-[620px] mx-auto">
            من بيانات الموديل للخامة والألوان والمقاسات — كل التفاصيل الأساسية واضحة قبل ما تختار.
          </p>
        </div>

        {/* Carousel Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
          {slideTitles.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                id={`carousel-tab-${idx}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border whitespace-nowrap focus:outline-none ${
                  isActive
                    ? 'bg-[#1C1C1C] text-[#FFFFFF] border-[#1C1C1C] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#1C1C1C]/75 border-[#C8C8C6] hover:bg-[#1C1C1C]/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFFFFF]' : 'text-[#AFAFAD]'}`} />
                <span>{slide.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Carousel Card Container */}
        <div className="relative bg-[#FFFFFF] rounded-3xl border border-[#C8C8C6] shadow-sm overflow-hidden min-h-[460px] flex flex-col justify-between mb-8">
          
          {/* Slide 01: MODEL DATA */}
          {activeSlide === 0 && (
            <div className="p-6 sm:p-10 text-right grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-7">
                <div className="inline-block text-xs font-mono font-bold text-[#AFAFAD] uppercase mb-2">
                  SLIDE 01 / MODEL DATA
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] mb-3">
                  بيانات الموديل في جلسات التصوير
                </h3>
                <p className="text-sm text-[#1C1C1C]/80 leading-relaxed mb-6">
                  {MODEL_DATA.note}
                </p>

                {/* Model stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <span className="text-xs text-[#AFAFAD] block">الطول</span>
                    <span className="text-lg font-bold text-[#1C1C1C] font-mono">{MODEL_DATA.height}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <span className="text-xs text-[#AFAFAD] block">الوزن</span>
                    <span className="text-lg font-bold text-[#1C1C1C] font-mono">{MODEL_DATA.weight}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <span className="text-xs text-[#AFAFAD] block">البنية</span>
                    <span className="text-xs font-bold text-[#1C1C1C]">{MODEL_DATA.build}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <span className="text-xs text-[#AFAFAD] block">مقاس التيشيرت</span>
                    <span className="text-base font-bold text-[#1C1C1C]">{MODEL_DATA.tshirtSize}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <span className="text-xs text-[#AFAFAD] block">مقاس الجينز</span>
                    <span className="text-base font-bold text-[#1C1C1C]">{MODEL_DATA.jeansSize}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <span className="text-xs text-[#AFAFAD] block">مقاس الحذاء</span>
                    <span className="text-base font-bold text-[#1C1C1C]">{MODEL_DATA.shoesSize} (EU)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C1C1C]/5 border border-[#C8C8C6] flex items-center gap-2.5 text-xs text-[#1C1C1C]">
                  <Info className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>قارن بياناتك ببيانات الموديل عشان يكون اختيار المقاس أوضح وأسهل.</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#C8C8C6] aspect-[4/3] bg-[#1C1C1C]/5 shadow-inner">
                  <img
                    src={MODEL_FIT_IMAGE}
                    alt="فحص ومطابقة مقاسات الموديل للقطع"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Slide 02: FABRIC */}
          {activeSlide === 1 && (
            <div className="p-6 sm:p-10 text-right grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-7">
                <div className="inline-block text-xs font-mono font-bold text-[#AFAFAD] uppercase mb-2">
                  SLIDE 02 / FABRICS
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] mb-3">
                  خامات حقيقية تدوم وتتحمل الاستهلاك اليومي
                </h3>
                <p className="text-sm text-[#1C1C1C]/80 leading-relaxed mb-6">
                  شوف الخامة واعرف تفاصيلها قبل ما تطلب.
                </p>

                <div className="space-y-3.5 mb-6">
                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#1C1C1C]">تيشيرت خامة بوليفار فاخرة (سادة وجرافيك)</span>
                      <span className="font-mono text-xs text-[#AFAFAD]">Oversized Fit</span>
                    </div>
                    <p className="text-xs text-[#1C1C1C]/70">
                      خامة بوليفار ناعمة وعالية الجودة بملمس فخم وثبات عالي للألوان ومقاومة للانكماش مع قصة أوفرسايز مريحة وعصرية.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#1C1C1C]">جينز خامة رباعية (ضمان لمدة عام كامل)</span>
                      <span className="font-mono text-xs text-[#AFAFAD]">95% قطن + 5% ليكرا</span>
                    </div>
                    <p className="text-xs text-[#1C1C1C]/70">
                      قماش جينز رباعية متين ومريح في الحركة والاستخدام اليومي، مع جيب عملي وقصات متقنة (ريجولار ووايد ليج) بضمان سنة كاملة.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#1C1C1C]">كوتشي وسنيكرز خفيف ومريح</span>
                      <span className="font-mono text-xs text-[#AFAFAD]">جلد مستورد ونعل فوم بيور</span>
                    </div>
                    <p className="text-xs text-[#1C1C1C]/70">
                      خامة جلد مستورد عالية الجودة ونعل فوم بيور خفيف جداً وممتص للصدمات يوفر راحة فائقة في المشي ومشاوير اليوم الطويلة.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#C8C8C6] aspect-[4/3] bg-[#1C1C1C]/5 shadow-inner">
                  <img
                    src={FABRIC_IMAGE}
                    alt="صورة ميكرو مقربة لخامة القطن الممشط ونسيج الجينز"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Slide 03: COLORS */}
          {activeSlide === 2 && (
            <div className="p-6 sm:p-10 text-right animate-in fade-in duration-300">
              <div className="inline-block text-xs font-mono font-bold text-[#AFAFAD] uppercase mb-2">
                SLIDE 03 / COLOR PALETTE
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] mb-2">
                الألوان والقطع المنسقة في التشكيلة
              </h3>
              <p className="text-sm text-[#1C1C1C]/80 leading-relaxed mb-6">
                ألوان أساسية مونوكرومية وهادئة صُممت لتتناغم معاً بدون أي نشاز. اضغط على أي عينة لرؤية تناسقها.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {colorItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorFilter(item.name)}
                    className={`p-3.5 rounded-2xl border text-right transition-all duration-200 focus:outline-none ${
                      selectedColorFilter === item.name
                        ? 'bg-[#1C1C1C] text-[#FFFFFF] border-[#1C1C1C] shadow-md'
                        : 'bg-[#FFFFFF] text-[#1C1C1C] border-[#C8C8C6] hover:bg-[#1C1C1C]/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-5 h-5 rounded-full border border-[#C8C8C6] shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#AFAFAD]/20">
                        {item.category}
                      </span>
                    </div>
                    <div className="font-bold text-sm mb-0.5">{item.name}</div>
                    <div className="text-xs opacity-75">{item.label}</div>
                    <div className="text-[11px] font-medium mt-2 pt-2 border-t border-current/20 opacity-90">
                      متناسقة مع {item.match}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-[#1C1C1C]/5 border border-[#C8C8C6] flex items-center gap-2 text-xs text-[#1C1C1C]">
                <CheckCircle2 className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                <span>جميع الألوان مصورة في إضاءة طبيعية بدون فلاتر تشويه لتطابق القطعة المستلمة بدقة.</span>
              </div>
            </div>
          )}

          {/* Slide 04: SIZE CHART */}
          {activeSlide === 3 && (
            <div className="p-6 sm:p-10 text-right animate-in fade-in duration-300">
              <div className="inline-block text-xs font-mono font-bold text-[#AFAFAD] uppercase mb-2">
                SLIDE 04 / SIZE SPECIFICATIONS
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1C] mb-2">
                جدول المقاسات الفعلي بالسنتيمتر
              </h3>
              <p className="text-sm text-[#1C1C1C]/80 leading-relaxed mb-6">
                قارن مقاساتك بجدول المقاسات قبل الطلب عشان تضمن الـFit المناسب.
              </p>

              {/* Subtabs for Tshirts, Jeans, Shoes */}
              <div className="flex items-center gap-2 mb-4 border-b border-[#C8C8C6]/50 pb-2">
                <button
                  onClick={() => setActiveTabSize('tshirts')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all focus:outline-none ${
                    activeTabSize === 'tshirts'
                      ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                      : 'bg-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C]/10'
                  }`}
                >
                  مقاسات التيشيرت
                </button>
                <button
                  onClick={() => setActiveTabSize('jeans')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all focus:outline-none ${
                    activeTabSize === 'jeans'
                      ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                      : 'bg-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C]/10'
                  }`}
                >
                  مقاسات الجينز
                </button>
                <button
                  onClick={() => setActiveTabSize('shoes')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all focus:outline-none ${
                    activeTabSize === 'shoes'
                      ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                      : 'bg-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C]/10'
                  }`}
                >
                  مقاسات الأحذية
                </button>
              </div>

              {/* Size Table Render */}
              <div className="overflow-x-auto rounded-xl border border-[#C8C8C6] mb-6">
                {activeTabSize === 'tshirts' && (
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#1C1C1C]/5 font-bold text-[#1C1C1C] border-b border-[#C8C8C6]">
                      <tr>
                        <th className="p-3">المقاس</th>
                        <th className="p-3">الوزن المقترح</th>
                        <th className="p-3">عرض الصدر</th>
                        <th className="p-3">الطول الكلي</th>
                        <th className="p-3">القصة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C8C8C6]/40 font-mono">
                      {SIZE_TABLE.tshirts.map((row) => (
                        <tr key={row.size} className="hover:bg-[#1C1C1C]/[0.02]">
                          <td className="p-3 font-bold text-sm text-[#1C1C1C]">{row.size}</td>
                          <td className="p-3">{row.weightRange}</td>
                          <td className="p-3">{row.chest}</td>
                          <td className="p-3">{row.length}</td>
                          <td className="p-3 text-[11px] font-sans text-[#1C1C1C]/80">{row.fit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTabSize === 'jeans' && (
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#1C1C1C]/5 font-bold text-[#1C1C1C] border-b border-[#C8C8C6]">
                      <tr>
                        <th className="p-3">المقاس</th>
                        <th className="p-3">محيط الخصر</th>
                        <th className="p-3">محيط الأرداف</th>
                        <th className="p-3">طول البنطلون</th>
                        <th className="p-3">القصة والضمان</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C8C8C6]/40 font-mono">
                      {SIZE_TABLE.jeans.map((row) => (
                        <tr key={row.size} className="hover:bg-[#1C1C1C]/[0.02]">
                          <td className="p-3 font-bold text-sm text-[#1C1C1C]">{row.size}</td>
                          <td className="p-3">{row.waist}</td>
                          <td className="p-3">{row.hips}</td>
                          <td className="p-3">{row.length}</td>
                          <td className="p-3 text-[11px] font-sans text-[#1C1C1C]/80">{row.fitNote} (ضمان سنة)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTabSize === 'shoes' && (
                  <table className="w-full text-right text-xs">
                    <thead className="bg-[#1C1C1C]/5 font-bold text-[#1C1C1C] border-b border-[#C8C8C6]">
                      <tr>
                        <th className="p-3">المقاس الأوروبي (EU)</th>
                        <th className="p-3">طول القدم بالسنتيمتر</th>
                        <th className="p-3">المواصفات والراحة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C8C8C6]/40">
                      {SIZE_TABLE.shoes.map((row) => (
                        <tr key={row.eu} className="hover:bg-[#1C1C1C]/[0.02]">
                          <td className="p-3 font-bold text-sm text-[#1C1C1C] font-mono">{row.eu}</td>
                          <td className="p-3 font-mono">{row.cm}</td>
                          <td className="p-3 text-[11px] text-[#1C1C1C]/70">{row.fitNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Policy note */}
              <div className="p-3.5 rounded-xl bg-[#1C1C1C]/5 border border-[#C8C8C6] flex items-center justify-between text-xs text-[#1C1C1C]">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#1C1C1C]" />
                  <span>المقاس ما طلعش مضبوط؟ استبدال متاح خلال 14 يوم حسب السياسة بدون تعقيد.</span>
                </div>
              </div>
            </div>
          )}

          {/* Carousel Footer Controls: Prev/Next & Dots */}
          <div className="p-4 border-t border-[#C8C8C6]/40 bg-[#1C1C1C]/[0.01] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="الشريحة السابقة"
                className="w-9 h-9 rounded-xl border border-[#C8C8C6] flex items-center justify-center text-[#1C1C1C] hover:bg-[#1C1C1C]/5 transition-colors focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="الشريحة التالية"
                className="w-9 h-9 rounded-xl border border-[#C8C8C6] flex items-center justify-center text-[#1C1C1C] hover:bg-[#1C1C1C]/5 transition-colors focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? 'w-6 bg-[#1C1C1C]' : 'w-2 bg-[#C8C8C6]'
                  }`}
                  aria-label={`انتقل إلى شريحة ${idx + 1}`}
                />
              ))}
            </div>

            <span className="text-xs font-mono text-[#AFAFAD]">
              {activeSlide + 1} / {totalSlides}
            </span>
          </div>

        </div>

        {/* Bottom Trust Strip */}
        <div
          id="proof-trust-strip"
          className="rounded-2xl border border-[#C8C8C6] py-4 px-6 text-center text-xs sm:text-sm font-semibold text-[#1C1C1C] bg-[#1C1C1C]/[0.02]"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>صور حقيقية</span>
            <span className="text-[#C8C8C6]">•</span>
            <span>بيانات واضحة</span>
            <span className="text-[#C8C8C6]">•</span>
            <span>مقاسات واضحة</span>
            <span className="text-[#C8C8C6]">•</span>
            <span>سياسة استبدال معلنة</span>
          </div>
        </div>

      </div>
    </section>
  );
};
