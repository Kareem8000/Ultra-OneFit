import { CatalogProduct } from '../types';

import courageousImg from '../assets/images/prod_courageous_tshirt_1789740061209.jpg';
import plainBoulevardImg from '../assets/images/prod_plain_boulevard_1789740073203.jpg';
import regularJeansImg from '../assets/images/prod_regular_jeans_1789740087475.jpg';
import wideLegJeansImg from '../assets/images/prod_wide_leg_jeans_1789740098242.jpg';
import adidasSneakersImg from '../assets/images/prod_adidas_sneakers_1789740109474.jpg';
import nikeSneakersImg from '../assets/images/prod_nike_sneakers_1789740121337.jpg';

/**
 * المصدر المعتمد الوحيد لمنتجات Ultra One Fit (الـ 6 منتجات الرسمية)
 */
export const OFFICIAL_CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-1-courageous',
    name: 'تيشيرت "COURAGEOUS" الأوفرسايز',
    type: 'تيشيرت',
    fabric: 'بوليفار فاخر',
    fit: 'Oversized Fit',
    design: 'طباعة جرافيك عالية الدقة موزعة على الصدر والجانب',
    colors: ['الأسود الملكي', 'الأبيض الناصع', 'العنابي (البرغندي)'],
    colorOptions: [
      { name: 'الأسود الملكي', hex: '#1C1C1C', note: 'لمظهر أنيق وعصري' },
      { name: 'الأبيض الناصع', hex: '#FFFFFF', note: 'خيار كلاسيكي راقٍ وسهل التنسيق' },
      { name: 'العنابي (البرغندي)', hex: '#4A1521', note: 'لمسة من الفخامة والتميز' },
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    sizeDetails: 'M: 65/75 • L: 75/85 • XL: 85/95 • 2XL: 95/105',
    sizeWeights: {
      M: '65/75 كجم',
      L: '75/85 كجم',
      XL: '85/95 كجم',
      '2XL': '95/105 كجم',
    },
    additionalDetails: [
      'ملمس ناعم',
      'مقاومة للتجعد',
      'ثبات ممتاز للشكل مع الاستخدام المتكرر',
    ],
    description:
      'تيشيرت أوفرسايز عصري يجمع بين الراحة والجودة، بخامة بوليفار ناعمة ومقاومة للتجعد وتحافظ على ثبات الشكل مع الاستخدام المتكرر. يتميز بطباعة جرافيك عالية الدقة وثابتة، موزعة على الصدر والجانب لتمنح إطلالة مميزة من مختلف الزوايا.',
    colorNotes:
      'الأسود الملكي: لمظهر أنيق وعصري • الأبيض الناصع: خيار كلاسيكي راقٍ وسهل التنسيق • العنابي (البرغندي): لمسة من الفخامة والتميز',
    price: 499,
    image: courageousImg,
    cardShortCopy: 'تيشيرت أوفرسايز من بوليفار فاخر، بطباعة جرافيك عالية الدقة وثابتة.',
    cardFitDetail: 'بوليفار فاخر • Oversized Fit',
  },
  {
    id: 'prod-2-boulevard-plain',
    name: 'تيشيرت بوليفار سادة',
    type: 'تيشيرت',
    fabric: 'بوليفار أصلي',
    fit: 'Oversize',
    design: 'سادة',
    colors: ['الأسود', 'الأبيض', 'بينك', 'البرغندي'],
    colorOptions: [
      { name: 'الأسود', hex: '#1C1C1C', note: 'أسود كلاسيك يومي' },
      { name: 'الأبيض', hex: '#FFFFFF', note: 'أبيض قطني ناصع' },
      { name: 'بينك', hex: '#D9A5B3', note: 'وردي هادئ معاصر' },
      { name: 'البرغندي', hex: '#4A1521', note: 'عنابي فاخر وأنيق' },
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    sizeDetails: 'M: 65/75 • L: 75/85 • XL: 85/95 • 2XL: 95/105',
    sizeWeights: {
      M: '65/75 كجم',
      L: '75/85 كجم',
      XL: '85/95 كجم',
      '2XL': '95/105 كجم',
    },
    additionalDetails: [
      'ملمس ناعم',
      'متانة عالية',
      'مقاومة للتآكل',
      'تهوية وراحة طوال اليوم',
      'ثبات للألوان مع تكرار الغسيل',
      'ياقة متينة تحافظ على شكلها',
    ],
    description:
      'تيشيرت بوليفار مصمم ليجمع بين فخامة المظهر وعملية الاستخدام اليومي. يتميز بنسيج بوليفار بملمس ناعم ومتانة عالية ومقاومة للتآكل، مع تهوية وراحة طوال اليوم وثبات للألوان مع تكرار الغسيل. يتميز بقصة أفرسايز مريحة وياقة متينة تحافظ على شكلها الأنيق، لتجمع الإطلالة بين الكاجوال والاحترافية.',
    price: 450,
    image: plainBoulevardImg,
    cardShortCopy: 'تيشيرت بوليفار سادة بقصة Oversize، مريح للاستخدام اليومي ويحافظ على شكله.',
    cardFitDetail: 'بوليفار أصلي • Oversize',
  },
  {
    id: 'prod-3-regular-jeans',
    name: 'بنطلون جينز',
    type: 'بنطلون جينز',
    fabric: 'جينز رباعية عالية الجودة',
    fabricComposition: '95% قطن / 5% ليكرا',
    fit: 'Regular',
    colors: ['الأسود', 'الفِراني', 'التلجي', 'الكحلي', 'الأزرق'],
    colorOptions: [
      { name: 'الأسود', hex: '#1C1C1C', note: 'أسود ملكي داكن' },
      { name: 'الفِراني', hex: '#4E5359', note: 'رمادي غامق أنيق' },
      { name: 'التلجي', hex: '#9EA8B3', note: 'أزرق ثلجي فاتح' },
      { name: 'الكحلي', hex: '#1D263B', note: 'كحلي كلاسيك رصين' },
      { name: 'الأزرق', hex: '#2E4057', note: 'أزرق جينز متوسط' },
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    sizeDetails: '30 / 32 / 34 / 36 / 38 / 40',
    warranty: 'ضمان لمدة عام',
    additionalDetails: ['خياطة 3 إبر', 'أزرار مستوردة'],
    description:
      'بنطلون جينز بخامة رباعية عالية الجودة، بنسبة 95% قطن و5% ليكرا، مع تلبيس Regular وخياطة 3 إبر وأزرار مستوردة، ومتوفر بعدة ألوان ومقاسات.',
    price: 540,
    image: regularJeansImg,
    cardShortCopy: 'جينز بقصة Regular، بخامة 95% قطن و5% ليكرا.',
    cardFitDetail: 'Regular • 95% قطن / 5% ليكرا • ضمان عام',
  },
  {
    id: 'prod-4-wide-leg-jeans',
    name: 'بنطلون وايد ليج جينز رجالي',
    type: 'بنطلون جينز',
    fabric: 'جينز رباعية عالية الجودة',
    fit: 'Wide Leg',
    colors: ['الأسود', 'الكحلي', 'اللبني الفاتح'],
    colorOptions: [
      { name: 'الأسود', hex: '#1C1C1C', note: 'أسود واسع عصري' },
      { name: 'الكحلي', hex: '#1D263B', note: 'كحلي داكن راقي' },
      { name: 'اللبني الفاتح', hex: '#8FA9C4', note: 'جينز باهت مريح' },
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    sizeDetails: '30 / 32 / 34 / 36 / 38 / 40',
    additionalDetails: ['تقفيل ممتاز بجودة عالية'],
    description:
      'بنطلون وايد ليج جينز رجالي بتصميم شيك، مناسب للمهام اليومية المختلفة، ويمنحك قطعة واسعة بستايل عصري وراحة طوال اليوم.',
    price: 620,
    image: wideLegJeansImg,
    cardShortCopy: 'جينز Wide Leg واسع ومريح، مناسب للمهام اليومية المختلفة.',
    cardFitDetail: 'Wide Leg • جينز رباعية واسع',
  },
  {
    id: 'prod-5-adidas-sneakers',
    name: 'كوتشي Adidas Sneakers',
    type: 'كوتشي / سنيكرز',
    fabric: 'جلد مستورد درجة أولى',
    fit: 'تلبيس مظبوط',
    design: 'Sneakers',
    colors: ['الأبيض', 'الأسود'],
    colorOptions: [
      { name: 'الأبيض', hex: '#F4F4F4', note: 'أبيض نقي مع خطوط كلاسيك' },
      { name: 'الأسود', hex: '#1C1C1C', note: 'أسود كامل رصين' },
    ],
    sizes: ['41', '42', '43', '44', '45'],
    sizeDetails: '41 / 42 / 43 / 44 / 45 (تلبيس مظبوط)',
    additionalDetails: [
      'نعل P.V.C فوم بيور',
      'خفيف جدًا ومرن',
      'بطانة إسفنجية',
      'رباط محكم للقدم',
      'سهل التنظيف',
      'فرش طبي مريح للقدم',
    ],
    description:
      'كوتشي Adidas Sneakers مناسب للمهام اليومية والخروجات. يتميز بنعل P.V.C فوم بيور خفيف ومرن، وفوندي من جلد مستورد درجة أولى مزود برباط محكم وبطانة إسفنجية، مع فرش طبي مريح للقدم وسهولة في التنظيف.',
    price: 510,
    image: adidasSneakersImg,
    cardShortCopy: 'سنيكرز خفيف ومرن، مناسب للمهام اليومية والخروجات.',
    cardFitDetail: 'جلد مستورد درجة أولى • تلبيس مظبوط',
  },
  {
    id: 'prod-6-nike-sneakers',
    name: 'كوتشي Nike Sneakers',
    type: 'كوتشي / سنيكرز',
    fabric: 'جلد مستورد درجة أولى',
    fit: 'تلبيس مظبوط',
    design: 'Sneakers',
    colors: ['أوف وايت بتطعيم لبني', 'أوف وايت', 'الأسود', 'الرمادي'],
    colorOptions: [
      { name: 'أوف وايت بتطعيم لبني', hex: '#DCE5EB', note: 'أوف وايت مع لمسة لبني هادئة' },
      { name: 'أوف وايت', hex: '#EDECE7', note: 'أوف وايت كلاسيك راقي' },
      { name: 'الأسود', hex: '#1C1C1C', note: 'أسود أنيق شامل' },
      { name: 'الرمادي', hex: '#7D8287', note: 'رمادي عصري متعدد الاستخدام' },
    ],
    sizes: ['41', '42', '43', '44', '45'],
    sizeDetails: '41 / 42 / 43 / 44 / 45 (تلبيس مظبوط)',
    additionalDetails: [
      'نعل P.V.C فوم بيور',
      'خفيف جدًا ومرن',
      'بطانة إسفنجية',
      'رباط محكم للقدم',
      'فرش طبي مريح للقدم',
    ],
    description:
      'كوتشي Nike Sneakers مناسب للمهام اليومية والخروجات. يتميز بنعل P.V.C فوم بيور خفيف ومرن، وفوندي من جلد مستورد درجة أولى مزود ببطانة ورباط محكم للقدم، مع فرش طبي مريح للقدم.',
    price: 599,
    image: nikeSneakersImg,
    cardShortCopy: 'سنيكرز خفيف ومريح، مناسب للمهام اليومية والخروجات.',
    cardFitDetail: 'جلد مستورد درجة أولى • تلبيس مظبوط',
  },
];
