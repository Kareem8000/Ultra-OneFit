import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, RotateCcw, Truck, CreditCard, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1C1C1C]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] text-[#1C1C1C] w-full max-w-[760px] rounded-3xl border border-[#C8C8C6] shadow-2xl overflow-hidden my-6 text-right relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-[#1C1C1C] text-[#FFFFFF] border-b border-[#C8C8C6]/20 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-[#C8C8C6]/30 flex items-center justify-center text-[#EAEAEA] hover:text-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors focus:outline-none"
            aria-label="إغلاق"
            id="close-legal-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            {type === 'terms' ? (
              <FileText className="w-5 h-5 text-[#C8C8C6]" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#C8C8C6]" />
            )}
            <div className="text-right">
              <h3 className="font-extrabold text-base sm:text-lg text-[#FFFFFF] leading-tight">
                {type === 'terms' ? 'الشروط والأحكام وسياسة الاستخدام' : 'سياسة الخصوصية وأمان البيانات'}
              </h3>
              <span className="text-[10px] text-[#AFAFAD] font-mono block">
                Ultra One Fit • 3 pieces • 1 outfit
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#1C1C1C]/85 leading-relaxed">
          {type === 'terms' ? (
            <>
              {/* Introduction */}
              <div className="p-4 rounded-2xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <p className="font-bold text-[#1C1C1C] mb-1">مرحباً بك في براند Ultra One Fit</p>
                <p className="text-xs text-[#1C1C1C]/75">
                  تحكم هذه الشروط والأحكام استخدامك لمنصتنا الإلكترونية وشراء الـOutfits المنسقة المكوّنة من 3 قطع متناسقة (تيشيرت بوليفار أصلي أو فاخر، بنطلون جينز رباعية قطن وليكرا، وكوتشي سنيكرز). يُعد تأكيد طلبك موافقة صريحة على هذه السياسات.
                </p>
              </div>

              {/* 1. Outfit Concept */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>1. مفهوم الـOutfit ووحدة البيع</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm text-[#1C1C1C]/80">
                  <li>كل Look يُباع كوحدة متكاملة مكوّنة من 3 قطع منسقة لضمان تناغم الألوان والخامات.</li>
                  <li>يتم توضيح سعر ومواصفات كل قطعة بشفافية تامة، والسعر الإجمالي يشمل الـ 3 قطع دون أي رسوم خفية.</li>
                  <li>الأسعار المعروضة بالجنيه المصري (EGP).</li>
                </ul>
              </div>

              {/* 2. Shipping */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>2. الشحن والتوصيل</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm text-[#1C1C1C]/80">
                  <li>تكلفة شحن محافظة القاهرة ثابتة: <strong>80 جنيه مصري</strong> تُحسب بشكل مستقل وواضح في ملخص الطلب.</li>
                  <li>مدة التوصيل المعتادة هي من <strong>3 إلى 4 أيام عمل</strong> من تاريخ تأكيد تفاصيل الطلب مع العميل هاتفياً أو عبر واتساب.</li>
                  <li>يرجى التأكد من كتابة العنوان ورقم الهاتف بدقة لتفادي أي تأخير في مسار مندوب الشحن.</li>
                </ul>
              </div>

              {/* 3. Payment */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>3. طرق الدفع وعربون التأكيد</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm text-[#1C1C1C]/80">
                  <li><strong>الدفع عند الاستلام (COD):</strong> الدفع نقداً للمندوب عند استلام الشحنة.</li>
                  <li><strong>الدفع عبر فودافون كاش (Vodafone Cash):</strong> يتطلب سداد <strong>10% مقدماً كعربون تأكيد جدية الطلب</strong>، مع سداد باقي المبلغ ومصاريف الشحن عند الاستلام.</li>
                </ul>
              </div>

              {/* 4. Exchange Policy */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <RotateCcw className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>4. سياسة الاستبدال (14 يوماً)</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm text-[#1C1C1C]/80">
                  <li>يحق للعميل طلب استبدال المقاس أو القطعة خلال <strong>14 يوماً</strong> من تاريخ استلام الشحنة.</li>
                  <li>يشترط أن تكون القطع بحالتها الأصلية غير ملبوسة خارج المعاينة، مع وجود التاغ الأصلي والتغليف السليم.</li>
                  <li><strong>تكلفة شحن الاستبدال:</strong> يتحمل العميل مصاريف شحن الاستبدال في حالات تغيير المقاس بناءً على اختياره، بينما يتحمل المتجر كافة التكاليف في حال وجود أي عيب صناعة مثبت.</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Privacy Content */}
              <div className="p-4 rounded-2xl bg-[#1C1C1C]/[0.03] border border-[#C8C8C6]/70">
                <p className="font-bold text-[#1C1C1C] mb-1">التزامنا بخصوصيتك وأمان بياناتك</p>
                <p className="text-xs text-[#1C1C1C]/75">
                  في Ultra One Fit، نعتبر خصوصية بياناتك الشخصية أولوية قصوى. توضح هذه السياسة كيف نقوم بجمع واستخدام وحماية البيانات التي تقدمها عند الطلب أو التواصل معنا.
                </p>
              </div>

              {/* 1. Data Collected */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>1. البيانات التي نجمعها</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#1C1C1C]/80 mb-2">
                  نجمع فقط البيانات الأساسية الضرورية لإتمام وتوصيل طلبك بنجاح:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm text-[#1C1C1C]/80">
                  <li>الاسم الكامل للتسجيل والتواصل.</li>
                  <li>رقم الهاتف للتأكيد وتنسيق التوصيل من خلال شركة الشحن.</li>
                  <li>عنوان التوصيل الدقيق داخل القاهرة لتوصيل الشحنة.</li>
                  <li>اختيارات المقاسات وطريقة الدفع المفضلة.</li>
                </ul>
              </div>

              {/* 2. Usage */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>2. كيف نستخدم بياناتك؟</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm text-[#1C1C1C]/80">
                  <li>تجهيز ومطابقة مقاسات الـOutfit المكون من 3 قطع قبل التغليف والشحن.</li>
                  <li>مشاركة بيانات العنوان والهاتف حصرياً مع مندوب أو شركة الشحن لتسليم الأوردر.</li>
                  <li>التواصل معك لخدمة ما بعد البيع في حال رغبتك في الاستبدال خلال الـ 14 يوماً.</li>
                </ul>
              </div>

              {/* 3. Protection */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>3. حماية البيانات وعدم المشاركة مع أطراف خارجية</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#1C1C1C]/80">
                  نحن نتعهد بعدم بيع، تأجير، أو مشاركة بياناتك الشخصية مع أي أطراف إعلانية أو تجارية خارجية لأي غرض تسويقي. تُستخدم بياناتك لخدمتك فقط داخل متجر Ultra One Fit.
                </p>
              </div>

              {/* 4. Contact */}
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1C1C1C] flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                  <span>4. الاستفسار والتواصل</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#1C1C1C]/80">
                  إذا كان لديك أي سؤال بخصوص سياسة الخصوصية أو ترغب في تعديل أو حذف بيانات اتصالك، يمكنك التواصل معنا مباشرة من خلال قنوات الدعم المعلنة.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#1C1C1C]/5 border-t border-[#C8C8C6]/50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#AFAFAD]">
            آخر تحديث: سبتمبر 2026
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] text-xs font-bold hover:bg-[#2E2E2E] transition-all focus:outline-none"
            id="acknowledge-legal-modal-btn"
          >
            فهمت، إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
