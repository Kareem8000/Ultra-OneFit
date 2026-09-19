import React from 'react';
import { MODEL_FIT_IMAGE } from '../data/outfits';
import { Ruler, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';

interface EditorialModelSplitSectionProps {
  onOpenSizeChart: () => void;
}

export const EditorialModelSplitSection: React.FC<EditorialModelSplitSectionProps> = ({
  onOpenSizeChart,
}) => {
  return (
    <section
      id="editorial-model-section"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-20 sm:py-24 border-b border-[#C8C8C6]/30 text-right"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Right Column: Credibility Copy & Specs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#1C1C1C]/5 border border-[#C8C8C6] text-xs font-bold text-[#1C1C1C] mb-4">
              بيانات الموديل الفعلي
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1C1C] leading-[1.2] mb-6">
              تفاصيل حقيقية على أرض الواقع، مش مجرد مانيكان بلاستيك
            </h2>

            <p className="text-sm sm:text-base text-[#1C1C1C]/75 leading-relaxed mb-6">
              عشان نضمن إنك تشوف الـLook وتتخيلها عليك بجد، جميع صورنا متصورة على موديل شاب مصري في شوارع وكافيهات القاهرة بنفس الأجواء اللي بتنزل فيها كل يوم.
            </p>

            {/* Spec Highlights Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-8">
              <div className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <span className="text-[11px] text-[#AFAFAD] block mb-1">طول الموديل</span>
                <span className="text-base font-black font-mono text-[#1C1C1C]">182 سم</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <span className="text-[11px] text-[#AFAFAD] block mb-1">وزن الموديل</span>
                <span className="text-base font-black font-mono text-[#1C1C1C]">76 كجم</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <span className="text-[11px] text-[#AFAFAD] block mb-1">مقاس التيشيرت</span>
                <span className="text-base font-black font-mono text-[#1C1C1C]">L (75–85 كجم)</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <span className="text-[11px] text-[#AFAFAD] block mb-1">مقاس البنطلون</span>
                <span className="text-base font-black font-mono text-[#1C1C1C]">32 Regular</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <span className="text-[11px] text-[#AFAFAD] block mb-1">مقاس الكوتشي</span>
                <span className="text-base font-black font-mono text-[#1C1C1C]">43 EU</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <span className="text-[11px] text-[#AFAFAD] block mb-1">قصة التيشيرت</span>
                <span className="text-base font-black text-[#1C1C1C]">Oversized Fit</span>
              </div>
            </div>

            <button
              onClick={onOpenSizeChart}
              className="h-[46px] px-5 rounded-[8px] bg-[#1C1C1C] text-[#FFFFFF] font-bold text-xs hover:bg-[#2E2E2E] transition-all flex items-center gap-2 shadow-sm"
            >
              <Ruler className="w-4 h-4 text-[#C8C8C6]" />
              <span>افتح جدول المقاسات بالسنتيمتر</span>
            </button>
          </div>

          {/* Left Column: Model Photography (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-[18px] overflow-hidden border border-[#C8C8C6] shadow-2xl relative bg-[#1C1C1C] group">
              <img
                src={MODEL_FIT_IMAGE}
                alt="موديل مصري يرتدي أزياء Ultra One Fit"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] sm:h-[500px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 right-4 left-4 p-3.5 rounded-[10px] bg-[#1C1C1C]/90 backdrop-blur-md border border-[#C8C8C6]/30 text-[#FFFFFF] text-xs">
                <span className="font-bold block mb-0.5">تصوير واقعي بنسبة 100%</span>
                <span className="text-[11px] text-[#C8C8C6]">بدون فلاتر تشويه للألوان أو تعديلات وهمية للإضاءة</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
