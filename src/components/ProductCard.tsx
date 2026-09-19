import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CatalogProduct } from '../types';

interface ProductCardProps {
  product: CatalogProduct;
  onOpenDetails: (product: CatalogProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
}) => {
  const [activeColor, setActiveColor] = useState<string>(product.colors[0]);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-[#FFFFFF] rounded-[20px] border border-[#C8C8C6] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-5 hover:-translate-y-0.5 text-right"
    >
      <div>
        {/* Product Image Frame (Consistent 3:4 Aspect Ratio) */}
        <div
          onClick={() => onOpenDetails(product)}
          className="relative w-full aspect-[3/4] rounded-[14px] bg-[#EAEAEA]/30 overflow-hidden mb-4 cursor-pointer border border-[#C8C8C6]/40"
        >
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />

          {/* Fit or key detail pill on top corner */}
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-[6px] bg-[#1C1C1C]/90 backdrop-blur-sm text-[#FFFFFF] text-[11px] font-bold font-mono tracking-wide shadow-sm">
            {product.fit}
          </div>
        </div>

        {/* Product Identity */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onOpenDetails(product)}
              className="font-bold text-base sm:text-lg text-[#1C1C1C] leading-snug cursor-pointer hover:underline decoration-[#1C1C1C]/30 transition-all"
            >
              {product.name}
            </h3>
            <span className="font-mono font-bold text-sm sm:text-base text-[#1C1C1C] shrink-0 pt-0.5">
              {product.price} جنيه
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#1C1C1C]/75 leading-relaxed">
            {product.cardShortCopy}
          </p>
        </div>

        {/* Available Colors with Interactive Color Swatches */}
        <div className="mb-3.5 pt-2 border-t border-[#C8C8C6]/40">
          <div className="flex items-center justify-between text-[11px] mb-2 text-[#AFAFAD]">
            <span className="font-medium text-[#1C1C1C]">الألوان المتاحة:</span>
            <span className="font-medium text-[#1C1C1C]">{activeColor}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 items-center">
            {product.colorOptions.map((col) => {
              const isSelected = activeColor === col.name;
              return (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => setActiveColor(col.name)}
                  title={`${col.name}${col.note ? ` (${col.note})` : ''}`}
                  className={`relative w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                    isSelected
                      ? 'border-[#1C1C1C] ring-2 ring-[#1C1C1C]/20 scale-105'
                      : 'border-[#C8C8C6] hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  aria-label={col.name}
                >
                  {/* Subtle white/dark inner dot if selected for clear accessibility */}
                  {isSelected && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        col.hex === '#FFFFFF' || col.hex === '#F8F8F8' || col.hex === '#F4F4F4'
                          ? 'bg-[#1C1C1C]'
                          : 'bg-[#FFFFFF]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Available Sizes List */}
        <div className="mb-4">
          <div className="text-[11px] text-[#AFAFAD] mb-1.5">المقاسات:</div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((sz) => (
              <span
                key={sz}
                className="px-2 py-0.5 rounded-[6px] bg-[#1C1C1C]/[0.04] border border-[#C8C8C6]/60 text-[11px] font-mono font-bold text-[#1C1C1C]"
              >
                {sz}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <button
        onClick={() => onOpenDetails(product)}
        className="w-full mt-2 h-[42px] rounded-[10px] bg-[#1C1C1C] text-[#FFFFFF] font-bold text-xs sm:text-[13px] hover:bg-[#2A2A2A] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
        id={`view-details-${product.id}`}
      >
        <span>شوف التفاصيل</span>
        <ArrowLeft className="w-3.5 h-3.5 text-[#FFFFFF]" />
      </button>
    </div>
  );
};
