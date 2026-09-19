import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { SIZE_TABLE, MODEL_DATA } from '../data/outfits';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'tshirts' | 'jeans' | 'shoes'>('tshirts');

  return (
    <div
      id="size-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#1C1C1C]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] text-[#1C1C1C] w-full max-w-[660px] max-h-[92vh] sm:max-h-[88vh] rounded-2xl sm:rounded-3xl border border-[#C8C8C6] shadow-2xl flex flex-col text-right relative overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-5 bg-[#1C1C1C] text-[#FFFFFF] border-b border-[#C8C8C6]/20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#C8C8C6]/30 flex items-center justify-center text-[#EAEAEA] hover:text-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors focus:outline-none"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8C8C6]" />
            <h3 className="font-extrabold text-base sm:text-lg md:text-xl text-[#FFFFFF]">
              جدول المقاسات الفعلي بالسنتيمتر
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
          {/* Model info quick bar */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6] text-xs text-[#1C1C1C]/80">
            <span className="font-bold text-[#1C1C1C] block mb-1">بيانات الموديل للمقارنة:</span>
            <span>الطول {MODEL_DATA.height} • الوزن {MODEL_DATA.weight} • يرتدي L في التيشيرت و32 في الجينز و43 في الحذاء.</span>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-[#C8C8C6]/50 pb-2">
            <button
              onClick={() => setActiveTab('tshirts')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                activeTab === 'tshirts'
                  ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                  : 'bg-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C]/10'
              }`}
            >
              تيشيرت بوليفار
            </button>
            <button
              onClick={() => setActiveTab('jeans')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                activeTab === 'jeans'
                  ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                  : 'bg-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C]/10'
              }`}
            >
              جينز ريجولار ووايد ليج
            </button>
            <button
              onClick={() => setActiveTab('shoes')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none ${
                activeTab === 'shoes'
                  ? 'bg-[#1C1C1C] text-[#FFFFFF]'
                  : 'bg-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C]/10'
              }`}
            >
              كوتشي وسنيكرز
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#C8C8C6] mb-6">
            {activeTab === 'tshirts' && (
              <table className="w-full text-right text-xs">
                <thead className="bg-[#1C1C1C]/5 font-bold text-[#1C1C1C] border-b border-[#C8C8C6]">
                  <tr>
                    <th className="p-3">المقاس</th>
                    <th className="p-3">الوزن الموصى به</th>
                    <th className="p-3">عرض الصدر</th>
                    <th className="p-3">الطول</th>
                    <th className="p-3">القصة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C8C8C6]/40">
                  {SIZE_TABLE.tshirts.map((row) => (
                    <tr key={row.size} className="hover:bg-[#1C1C1C]/[0.02]">
                      <td className="p-3 font-bold text-sm text-[#1C1C1C]">{row.size}</td>
                      <td className="p-3 font-semibold text-[#1C1C1C]">{row.weightRange}</td>
                      <td className="p-3 font-mono">{row.chest}</td>
                      <td className="p-3 font-mono">{row.length}</td>
                      <td className="p-3 text-[11px] text-[#1C1C1C]/70">{row.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'jeans' && (
              <table className="w-full text-right text-xs">
                <thead className="bg-[#1C1C1C]/5 font-bold text-[#1C1C1C] border-b border-[#C8C8C6]">
                  <tr>
                    <th className="p-3">المقاس</th>
                    <th className="p-3">محيط الخصر</th>
                    <th className="p-3">محيط الأرداف</th>
                    <th className="p-3">الطول</th>
                    <th className="p-3">القصات المتاحة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C8C8C6]/40 font-mono">
                  {SIZE_TABLE.jeans.map((row) => (
                    <tr key={row.size} className="hover:bg-[#1C1C1C]/[0.02]">
                      <td className="p-3 font-bold text-sm text-[#1C1C1C]">{row.size}</td>
                      <td className="p-3">{row.waist}</td>
                      <td className="p-3">{row.hips}</td>
                      <td className="p-3">{row.length}</td>
                      <td className="p-3 font-sans text-[11px] text-[#1C1C1C]/70">{row.fitNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'shoes' && (
              <table className="w-full text-right text-xs">
                <thead className="bg-[#1C1C1C]/5 font-bold text-[#1C1C1C] border-b border-[#C8C8C6]">
                  <tr>
                    <th className="p-3">المقاس (EU)</th>
                    <th className="p-3">طول القدم (سم)</th>
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

          <div className="p-3.5 rounded-xl bg-[#1C1C1C]/5 border border-[#C8C8C6] flex items-center gap-2 text-xs text-[#1C1C1C]">
            <CheckCircle2 className="w-4 h-4 text-[#1C1C1C] shrink-0" />
            <span>الاستبدال متاح خلال 14 يوم في حال احتجت تغيير المقاس بعد الاستلام.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
