import React from 'react';
import { X, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onNavigateToProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onNavigateToProducts,
}) => {
  const {
    cart,
    totalItems,
    subtotal,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!cartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setCartDrawerOpen(false);
    onProceedToCheckout();
  };

  const handleContinueShopping = () => {
    setCartDrawerOpen(false);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-[#1C1C1C]/75 backdrop-blur-sm flex justify-start animate-in fade-in duration-200"
      onClick={() => setCartDrawerOpen(false)}
    >
      <div
        className="w-full max-w-[430px] bg-[#FFFFFF] text-[#1C1C1C] h-full shadow-2xl flex flex-col justify-between border-l border-[#C8C8C6] relative text-right animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#C8C8C6]/50 flex items-center justify-between">
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="w-8 h-8 rounded-lg border border-[#C8C8C6] flex items-center justify-center text-[#1C1C1C] hover:bg-[#EAEAEA] transition-colors focus:outline-none"
            aria-label="إغلاق السلة"
            id="close-cart-drawer-btn"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[6px] bg-[#1C1C1C]/[0.05] text-[#1C1C1C]">
              {totalItems} قطعة
            </span>
            <span className="font-black text-lg text-[#1C1C1C]">السلة</span>
          </div>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1C1C1C]/[0.04] border border-[#C8C8C6] flex items-center justify-center text-[#1C1C1C]/60">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1C1C1C]">سلتك فاضية حالياً</h3>
              <p className="text-xs text-[#AFAFAD] max-w-[220px]">
                تصفح المنتجات أو الـOutfits واختار القطع اللي تناسبك.
              </p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  onNavigateToProducts();
                }}
                className="mt-2 px-4 py-2 rounded-[8px] bg-[#1C1C1C] text-[#FFFFFF] text-xs font-bold hover:bg-[#2A2A2A] transition-colors"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-[14px] bg-[#1C1C1C]/[0.02] border border-[#C8C8C6]/70 flex items-start gap-3.5 relative"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-20 rounded-[10px] bg-[#EAEAEA]/50 overflow-hidden shrink-0 border border-[#C8C8C6]/50">
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-xs text-[#1C1C1C] truncate">
                      {item.productName}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#AFAFAD] hover:text-[#1C1C1C] p-1 transition-colors"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-[#AFAFAD]">
                    <span>اللون: </span>
                    <span className="text-[#1C1C1C] font-semibold">{item.selectedColor}</span>
                    <span className="mx-1.5">•</span>
                    <span>المقاس: </span>
                    <span className="text-[#1C1C1C] font-mono font-semibold">{item.selectedSize}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1.5">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-[6px] border border-[#C8C8C6] overflow-hidden bg-[#FFFFFF]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#1C1C1C] hover:bg-[#EAEAEA]"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-[#1C1C1C] border-x border-[#C8C8C6]/40">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#1C1C1C] hover:bg-[#EAEAEA]"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-mono font-bold text-xs text-[#1C1C1C]">
                      {item.price * item.quantity} جنيه
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#C8C8C6]/60 bg-[#FFFFFF] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#AFAFAD]">
              <span>شحن القاهرة (3-4 أيام):</span>
              <span className="font-bold text-[#1C1C1C] font-mono">80 جنيه</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#C8C8C6]/40">
              <span className="font-bold text-sm text-[#1C1C1C]">الإجمالي</span>
              <div className="text-left">
                <span className="text-xl font-black font-mono text-[#1C1C1C]">
                  {subtotal}
                </span>
                <span className="text-xs font-bold text-[#1C1C1C] mr-1">جنيه</span>
              </div>
            </div>

            {/* CTA 1: إتمام الطلب */}
            <button
              onClick={handleCheckoutClick}
              className="w-full h-[46px] rounded-[10px] bg-[#1C1C1C] text-[#FFFFFF] font-bold text-sm hover:bg-[#2A2A2A] transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
              id="cart-drawer-checkout-btn"
            >
              <span>إتمام الطلب</span>
              <ArrowLeft className="w-4 h-4 text-[#FFFFFF]" />
            </button>

            {/* CTA 2: كمّل التسوق */}
            <button
              onClick={handleContinueShopping}
              className="w-full h-[40px] rounded-[10px] bg-transparent text-[#1C1C1C] font-bold text-xs hover:bg-[#1C1C1C]/5 transition-colors"
              id="cart-drawer-continue-shopping-btn"
            >
              كمّل التسوق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
