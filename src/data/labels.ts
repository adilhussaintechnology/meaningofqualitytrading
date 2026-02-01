import type { Lang, LString } from "@/data/i18n";
import { defaultLang } from "@/data/i18n";

export const labels = {
  products: { en: "Products", ar: "الفئات" },
  viewAll: { en: "View all", ar: "عرض الكل" },
  solutions: { en: "Solutions", ar: "الحلول" },
  newProducts: { en: "New Products", ar: "منتجات جديدة" },
  mostVisitedProducts: { en: "Most Visited Products", ar: "المنتجات الأكثر زيارة" },
  featuredProducts: { en: "Featured Products", ar: "المنتجات المميزة" },
  categories: { en: "Products", ar: "الفئات" },
  about: { en: "About Us", ar: "حول" },
  quotationSummery: { en: "Request Quotation", ar: "طلب عرض سعر" },
  contact: { en: "Contact Us", ar: "اتصل" },
  home: { en: "Home", ar: "الصفحة الرئيسية" },
  productNotFound: { en: "Product not found", ar: "المنتج غير موجود" },
  productNotFoundDesc: {
    en: "The product you are looking for does not exist or has been moved.",
    ar: "المنتج الذي تبحث عنه غير موجود أو تم نقله.",
  },
  backToHome: { en: "Back to home", ar: "العودة إلى الصفحة الرئيسية" },
  downloadTDS: { en: "Download TDS", ar: "تحميل TDS" },
  downloadSDS: { en: "Download SDS", ar: "تحميل SDS" },
  contactSales: { en: "Contact Sales", ar: "تواصل مع المبيعات" },
  properties: { en: "Product Overview", ar: "نظرة عامة على المنتج" },
  applicationAreas: { en: "Use Cases", ar: "حالات الاستخدام" },
  packaging: { en: "Packaging", ar: "التعبئة" },
  stockCode: { en: "Stock Code", ar: "رمز المخزون" },
  productCode: { en: "Product Code", ar: "رمز المنتج" },
  type: { en: "Type", ar: "النوع" },
  volume: { en: "Volume", ar: "الحجم" },
  boxQty: { en: "BoxQty", ar: "عدد العلب" },
  relatedIn: { en: "Related in", ar: "منتجات ذات صلة في" },
  newProductBadge: { en: "New Product", ar: "منتج جديد" },
  noProductsInCategory: { en: "No products found in this category yet.", ar: "لا توجد منتجات في هذه الفئة بعد." },
  cart: { en: "Quotation List", ar: "الاستفسار" },
  cartTitle: { en: "Request Quotation", ar: " طلب عرض سعر" },
  addToCart: { en: "Request Quote", ar: "طلب عرض سعر" },
  quantity: { en: "Quantity", ar: "الكمية" },
  remove: { en: "Remove", ar: "إزالة" },
  clearCart: { en: "Clear Quote", ar: "مسح العرض" },
  emptyCart: { en: "Your quotation list is currently empty. Please click the button below to add products.", ar: "قائمة عرض السعر فارغة حالياً. يرجى الضغط على الزر أدناه لإضافة المنتجات." },
  items: { en: "Total Items", ar: "مجموع العناصر" },
  yourInfo: { en: "Your Info", ar: "معلوماتك" },
  name: { en: "Name", ar: "الاسم" },
  company: { en: "Company", ar: "الشركة" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  phone: { en: "Phone", ar: "الهاتف" },
  note: { en: "Note", ar: "ملاحظة" },
  sendWhatsAppInquiry: { en: "Send Quotation Via WhatsApp", ar: "إرسال استفسار عبر واتساب" },
  downloadPDF: { en: "Download PDF", ar: "تحميل PDF" },
  goToCart: { en: "Submit Quotation Request", ar: "إرسال طلب عرض أسعار" },
  addedToCart: { en: "Added to Inquiry", ar: "تمت الإضافة إلى الاستفسار" },
  viewDetails: { en: "View details", ar: "عرض التفاصيل" },
  continueShopping: { en: "Add To Quote", ar: "أضف للعرض" },
  priceRange: { en: "Price Range", ar: "نطاق السعر" },
  currency: { en: "SAR", ar: "ريال" },
  basedOnQuantity: {
    en: "Based on order quantity",
    ar: "حسب الكمية المطلوبة"
  },
  sendEmailInquiry: {
    en: "Send Quotation Via Email",
    ar: "إرسال استفسار عبر البريد الإلكتروني"
  },
  addProducts: {
    en: "Add Products",
    ar: "إضافة منتجات"
  },
  removeItem: {
    en: "Remove item",
    ar: "إزالة المنتج"
  },
  cartEmpty: {
    en: "Quotation list is empty",
    ar: "قائمة الاقتباسات فارغة"
  },
  footerDescription: {
    en: "Premium industrial adhesives, sealants, foams, and spray solutions for professional builders and manufacturers.",
    ar: "مواد لاصقة صناعية عالية الجودة، مانعات تسرب، رغوات، وحلول رذاذ للبناة والمصنعين المحترفين."
  },
  productsSection: { en: "Products", ar: "المنتجات" },
  allProducts: { en: "All Products", ar: "جميع المنتجات" },
  companySection: { en: "Company", ar: "الشركة" },
  aboutUs: { en: "About Us", ar: "حولنا" },
  contactUs: { en: "Contact Us", ar: "اتصل بنا" },
  customerCareSection: { en: "Customer Care", ar: "خدمة العملاء" },
  faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
  shoppingGuide: { en: "How to Request a Quotation", ar: "كيفية طلب عرض سعر" },
  returnExchange: { en: "Return & Exchange", ar: "الإرجاع والتبادل" },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  humanRightsSection: { en: "Human Rights", ar: "حقوق الإنسان" },
  humanRightsPolicy: { en: "Human Rights Policy", ar: "سياسة حقوق الإنسان" },
  humanRightsAnalysisProcess: { en: "Human Rights Analysis Process", ar: "عملية تحليل حقوق الإنسان" },
  humanRightsDueDiligance: { en: "Human Rights Due Diligance", ar: "الفحص الواجب لحقوق الإنسان" },
  supplierIncentiveProcess: { en: "Supplier Incentive Process", ar: "عملية حوافز الموردين" },
  copyright: {
    en: "Copyright © 2026. The Meaning of Quality Trading Establishment. CR. No. 1010545178. VAT No. 300018855900003. All Rights Reserved.",
    ar: "جميع الحقوق محفوظة © ٢٠٢٦. مؤسسة معنى الجودة للتجارة. س.ت. ١٠١٠٥٤٥١٧٨. الرقم الضريبي ٣٠٠٠١٨٨٥٥٩٠٠٠٠٣"
  },

  privacy: { en: "Privacy", ar: "الخصوصية" },
  terms: { en: "Terms", ar: "الشروط" },
  productSpecifications: { en: "Product Specifications", ar: "مواصفات المنتج" },
  title: { en: "Title", ar: "العنوان" },
  descriptionNotes: { en: "Description / Notes", ar: "الوصف / الملاحظات" },
  technicalSpecifications: { en: "Technical Specifications", ar: "المواصفات التقنية" },
  specification: { en: "Specification", ar: "المواصفة" },
  value: { en: "Value", ar: "القيمة" },
  toggleMenu: { en: "Toggle menu", ar: "تبديل القائمة" },
  close: { en: "Close", ar: "إغلاق" },
  decreaseQuantity: { en: "Decrease quantity", ar: "تقليل الكمية" },
  increaseQuantity: { en: "Increase quantity", ar: "زيادة الكمية" },
  imgPlaceholder: { en: "IMG", ar: "صورة" },
  codeLabel: { en: "Code:", ar: "الكود:" },
  volumeLabel: { en: "Volume:", ar: "الحجم:" },
  typeLabel: { en: "Type:", ar: "النوع:" },
  stockLabel: { en: "Stock:", ar: "المخزون:" },
  infoNoteSteps: {
    en: "Steps to submit your quotation:\n• Select products and add them to the list\n• Fill in your contact details\n• Choose one option:\n  – Submit the quotation directly\n  – Share it via WhatsApp or Email\n  – Download the PDF and send it to us via WhatsApp or Email",
    ar: "خطوات إرسال طلب التسعير:\n• اختر المنتجات وأضفها إلى القائمة\n• أدخل بيانات الاتصال الخاصة بك\n• اختر إحدى الطرق التالية:\n  – إرسال طلب التسعير مباشرة\n  – مشاركته عبر واتساب أو البريد الإلكتروني\n  – تنزيل ملف PDF وإرساله إلينا عبر واتساب أو البريد الإلكتروني"
  },


  search: { en: "Search", ar: "بحث" },
  searchProducts: { en: "Search products…", ar: "البحث عن المنتجات…" },
  esc: { en: "Esc", ar: "خروج" },
  noResults: { en: "No results.", ar: "لا توجد نتائج." },
  all: { en: "All", ar: "الكل" },
  noProductsInSection: { en: "No products found under this section.", ar: "لا توجد منتجات في هذا القسم." },
  addToQuoteNote: { en: "(Add this product to your quote list. You can add multiple products and submit a single request for quotation.)", ar: "(أضف هذا المنتج إلى قائمة عرض الأسعار الخاصة بك. يمكنك إضافة منتجات متعددة وتقديم طلب عرض أسعار واحد.)" },
  submitQuotation: { en: "Submit Quotation", ar: "تقديم عرض الأسعار" },
  share: { en: "Share", ar: "يشارك" },
  shareVia: { en: "share via", ar: "المشاركة عبر" },
  cancel: { en: "cancel", ar: "يلغي" },
  thankyou: { en: "Thank You!", ar: "شكرًا لك!" },
  thankSubmited: {
    en: "Your quotation request has been submitted successfully.", ar: "تم إرسال طلب عرض الأسعار الخاص بك بنجاح."
  },
  submitClose: { en: "Close", ar: "يغلق" },
  whatsapp: { en: "WhatsApp", ar: "واتس اب" },
  addtoquotepara: {
    en: "Add more products from the products page using “Add to Quote”.\nClear all items from the quote list using “Clear Quote”.",
    ar: "أضف المزيد من المنتجات من صفحة المنتجات باستخدام «إضافة إلى عرض السعر».\nامسح جميع العناصر من قائمة عرض السعر باستخدام «مسح عرض السعر»."
  },
  customerCare: { en: "Customer Care", ar: "رعاية العملاء" },
  termsOfBusiness: { en: "Terms of Buisness", ar: "شروط العمل" },
  totalItemsQuntity: { en: "Total Items Quantity", ar: "إجمالي كمية الأصناف" }
  ,

} as const;


export type LabelKey = keyof typeof labels;

export function t(key: LabelKey, lang: Lang = defaultLang): string {
  const rec = labels[key] as LString;
  return rec?.[lang] ?? rec?.en ?? "";
}

