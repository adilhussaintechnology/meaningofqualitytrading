import type { LString } from "@/data/i18n";

export type Category = {
  id: string;
  title: LString;
  desc?: LString;
};

export type Subcategory = {
  id: string;
  title: LString;
  categoryId: string;
};

export type Item = {
  id: string;
  name: LString;
  categoryId: string;
  subcategoryId?: string;
  priceRange?: { min: number; max: number };
  Brand: string;
  isNew?: boolean;          // flag for newProducts
  isMostVisited?: boolean;  // flag for mostVisited
  isFeatured?: boolean;     // flag for featuredProducts
};

export const categories: Category[] = [
  { id: "category-1769276168804", title: { en: "Safety Vest", ar: "سترة السلامة" } },
  { id: "category-1766747244591", title: { en: "Gun Powder", ar: "فئة جديدة" } },
  { id: "fire-rated", title: { en: "Fire Rated Series", ar: "حماية من الحريق" } },
  { id: "adhesives", title: { en: "Adhesives & Glues", ar: "لاصقات وغراء" } },
  { id: "sealants", title: { en: "Sealants", ar: "مانعات التسرب" } },
  { id: "pu-foams", title: { en: "PU Foams", ar: "رغوات البولي يوريثان" } },
  { id: "coating-system", title: { en: "Coating System", ar: "نظام الطلاء" } },
  { id: "aerosols", title: { en: "Aerosols", ar: "عبوات رش" } },
  { id: "automotive", title: { en: "Automotive", ar: "السيارات" } },
  { id: "industrial", title: { en: "Industrial", ar: "صناعي" } },
  { id: "anaerobics", title: { en: "Anaerobics", ar: "اللاهوائية" } },
  { id: "spray-paint", title: { en: "Spray Paints", ar: "دهانات الرش" } },
  { id: "accessories", title: { en: "Accessories", ar: "إكسسوارات" } }
];

export const subcategories: Subcategory[] = [
  { id: "subcategory-1769276439547", title: { en: "Safety Vest Sub Cate", ar: "Safety Vest Sub Cate - arabic" }, categoryId: "category-1769276168804" },
  { id: "subcategory-1766842274536", title: { en: "New Subcategory Gun Powder", ar: "فئة فرعية جديدة" }, categoryId: "category-1766747244591" },
  { id: "subcategory-1766670276520", title: { en: "Fire Rated Sub cate", ar: "فئة فرعية جديدة" }, categoryId: "fire-rated" },
  { id: "hybrid", title: { en: "Hybrid (MS Polymer)", ar: "هجين (MS Polymer)" }, categoryId: "adhesives" },
  { id: "cyanoacrylate", title: { en: "Cyanoacrylate", ar: "سيانو أكريلات" }, categoryId: "adhesives" },
  { id: "wood", title: { en: "Wood Glue", ar: "غراء الخشب" }, categoryId: "adhesives" },
  { id: "plastic", title: { en: "Plastic Weld", ar: "لحام البلاستيك" }, categoryId: "adhesives" },
  { id: "acrylic", title: { en: "Acrylic", ar: "أكريليك" }, categoryId: "sealants" },
  { id: "rapid", title: { en: "Rapid", ar: "سريع" }, categoryId: "sealants" },
  { id: "all-season", title: { en: "All Season", ar: "كل المواسم" }, categoryId: "pu-foams" },
  { id: "fire-rated", title: { en: "Fire Rated", ar: "مقاوم للحريق" }, categoryId: "pu-foams" },
  { id: "cleaner", title: { en: "Cleaners", ar: "منظفات" }, categoryId: "aerosols" },
  { id: "lubricant", title: { en: "Lubricants", ar: "زيوت" }, categoryId: "aerosols" }
];

export const newProducts: Item[] = [
  { id: "p-1769275165538", name: { en: "ABC", ar: "ABC - Arabic" }, categoryId: "category-1769276168804", subcategoryId: "subcategory-1766842274536", priceRange: { min: 300, max: 600 }, Brand: "Niki" },
  { id: "p-1766848283790", name: { en: "New Product", ar: "منتج جديد" }, categoryId: "category-1766747244591", subcategoryId: "subcategory-1766842274536", priceRange: { min: 50, max: 100 }, Brand: "Sultan" },
  { id: "np-1", name: { en: "AC578 Sanitary Bath & Kitchen Acrylic Sealant", ar: "AC578 مانع تسرب أكريليك للمطبخ والحمام" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 50 }, Brand: "Akfix" },
  { id: "np-2", name: { en: "740 Allbond Hybrid", ar: "740 أولبوند هجين" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "np-3", name: { en: "AC580 Rapid Seal", ar: "AC580 رابيد سيل" }, categoryId: "sealants", subcategoryId: "rapid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "np-4", name: { en: "702HY Super Glue Cyanoacrylate", ar: "702HY لاصق فائق سيانو أكريلات" }, categoryId: "adhesives", subcategoryId: "cyanoacrylate", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "np-5", name: { en: "E360 Plast Weld", ar: "E360 بلاست ويلد" }, categoryId: "adhesives", subcategoryId: "plastic", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "np-6", name: { en: "HB262 Hybrid Wood Flooring Adhesive", ar: "HB262 لاصق هجين لأرضيات الخشب" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "840P", name: { en: "840P B2 Fire Rated PU Gun Foam", ar: "840P لاصق هجين لأرضيات الخشب" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 100 }, Brand: "Sultan" },
  { id: "np-1765966726374", name: { en: "New Product testing New things", ar: "منتج جديد" }, categoryId: "adhesives", subcategoryId: "plastic", priceRange: { min: 20, max: 60 }, Brand: "Sultan" },
  { id: "np-1766645310521", name: { en: "Testing Item", ar: "منتج جديد" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 50 }, Brand: "Sultan" },
  { id: "mv-1", name: { en: "805P PU Gun Foam Multi Purpose", ar: "805P رغوة مسدس PU متعددة الأغراض" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-2", name: { en: "Fast 70 Mega PU Gun Foam", ar: "فاست 70 ميجا رغوة مسدس PU" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-3", name: { en: "610 PU Express Montage Adhesive (Transparent)", ar: "610 لاصق تركيب PU إكسبريس (شفاف)" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-4", name: { en: "PA370 Express PU Wood Glue (Marine Adhesive)", ar: "PA370 غراء خشب PU إكسبريس (بحري)" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-5", name: { en: "1500 Heat Fighter", ar: "1500 مقاوم الحرارة" }, categoryId: "aerosols", subcategoryId: "lubricant", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-6", name: { en: "705 Universal Fast Adhesive", ar: "705 لاصق سريع عالمي" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "fp-1", name: { en: "820P B1 Fire Rated PU Gun Foam", ar: "820P B1 رغوة مسدس PU مقاومة للحريق" }, categoryId: "pu-foams", subcategoryId: "fire-rated", priceRange: { min: 15, max: 25 }, Brand: "Sultan" },
  { id: "fp-2", name: { en: "Thermcoat Thermal Acoustic Insulation PU Spray Foam", ar: "ثرموكوت رغوة رذاذ عازلة حراريًا وصوتيًا" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 20, max: 40 }, Brand: "Sultan" },
  { id: "fp-3", name: { en: "C900 Chemical Anchor", ar: "C900 مرس كيميائي" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 25, max: 50 }, Brand: "Sultan" }
];

export const mostVisited: Item[] = [
  { id: "840P", name: { en: "840P B2 Fire Rated PU Gun Foam", ar: "840P لاصق هجين لأرضيات الخشب" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 100 }, Brand: "Sultan" },
  { id: "np-1765966726374", name: { en: "New Product testing New things", ar: "منتج جديد" }, categoryId: "adhesives", subcategoryId: "plastic", priceRange: { min: 20, max: 60 }, Brand: "Sultan" },
  { id: "np-1766645310521", name: { en: "Testing Item", ar: "منتج جديد" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 50 }, Brand: "Sultan" },
  { id: "mv-1", name: { en: "805P PU Gun Foam Multi Purpose", ar: "805P رغوة مسدس PU متعددة الأغراض" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-2", name: { en: "Fast 70 Mega PU Gun Foam", ar: "فاست 70 ميجا رغوة مسدس PU" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-3", name: { en: "610 PU Express Montage Adhesive (Transparent)", ar: "610 لاصق تركيب PU إكسبريس (شفاف)" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-4", name: { en: "PA370 Express PU Wood Glue (Marine Adhesive)", ar: "PA370 غراء خشب PU إكسبريس (بحري)" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-5", name: { en: "1500 Heat Fighter", ar: "1500 مقاوم الحرارة" }, categoryId: "aerosols", subcategoryId: "lubricant", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-6", name: { en: "705 Universal Fast Adhesive", ar: "705 لاصق سريع عالمي" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "fp-1", name: { en: "820P B1 Fire Rated PU Gun Foam", ar: "820P B1 رغوة مسدس PU مقاومة للحريق" }, categoryId: "pu-foams", subcategoryId: "fire-rated", priceRange: { min: 15, max: 25 }, Brand: "Sultan" },
  { id: "fp-2", name: { en: "Thermcoat Thermal Acoustic Insulation PU Spray Foam", ar: "ثرموكوت رغوة رذاذ عازلة حراريًا وصوتيًا" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 20, max: 40 }, Brand: "Sultan" },
  { id: "fp-3", name: { en: "C900 Chemical Anchor", ar: "C900 مرس كيميائي" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 25, max: 50 }, Brand: "Sultan" }
];

export const featuredProducts: Item[] = [
  { id: "np-4", name: { en: "702HY Super Glue Cyanoacrylate", ar: "702HY لاصق فائق سيانو أكريلات" }, categoryId: "adhesives", subcategoryId: "cyanoacrylate", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "np-5", name: { en: "E360 Plast Weld", ar: "E360 بلاست ويلد" }, categoryId: "adhesives", subcategoryId: "plastic", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "np-1765966726374", name: { en: "New Product testing New things", ar: "منتج جديد" }, categoryId: "adhesives", subcategoryId: "plastic", priceRange: { min: 20, max: 60 }, Brand: "Sultan" },
  { id: "np-1766645310521", name: { en: "Testing Item", ar: "منتج جديد" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 50 }, Brand: "Sultan" },
  { id: "mv-1", name: { en: "805P PU Gun Foam Multi Purpose", ar: "805P رغوة مسدس PU متعددة الأغراض" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-2", name: { en: "Fast 70 Mega PU Gun Foam", ar: "فاست 70 ميجا رغوة مسدس PU" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-3", name: { en: "610 PU Express Montage Adhesive (Transparent)", ar: "610 لاصق تركيب PU إكسبريس (شفاف)" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-4", name: { en: "PA370 Express PU Wood Glue (Marine Adhesive)", ar: "PA370 غراء خشب PU إكسبريس (بحري)" }, categoryId: "adhesives", subcategoryId: "wood", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-5", name: { en: "1500 Heat Fighter", ar: "1500 مقاوم الحرارة" }, categoryId: "aerosols", subcategoryId: "lubricant", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "mv-6", name: { en: "705 Universal Fast Adhesive", ar: "705 لاصق سريع عالمي" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 10, max: 20 }, Brand: "Sultan" },
  { id: "fp-1", name: { en: "820P B1 Fire Rated PU Gun Foam", ar: "820P B1 رغوة مسدس PU مقاومة للحريق" }, categoryId: "pu-foams", subcategoryId: "fire-rated", priceRange: { min: 15, max: 25 }, Brand: "Sultan" },
  { id: "fp-2", name: { en: "Thermcoat Thermal Acoustic Insulation PU Spray Foam", ar: "ثرموكوت رغوة رذاذ عازلة حراريًا وصوتيًا" }, categoryId: "pu-foams", subcategoryId: "all-season", priceRange: { min: 20, max: 40 }, Brand: "Sultan" },
  { id: "fp-3", name: { en: "C900 Chemical Anchor", ar: "C900 مرس كيميائي" }, categoryId: "adhesives", subcategoryId: "hybrid", priceRange: { min: 25, max: 50 }, Brand: "Sultan" }
];

export const allItems: Item[] = [...newProducts, ...mostVisited, ...featuredProducts].filter((item, index, arr) => arr.findIndex(i => i.id === item.id) === index);

// Derived: Group subcategories by category ID for easier access
export const subcategoriesByCategoryId: Record<string, Subcategory[]> = subcategories.reduce((acc, sub) => {
  if (!acc[sub.categoryId]) {
    acc[sub.categoryId] = [];
  }
  acc[sub.categoryId].push(sub);
  return acc;
}, {} as Record<string, Subcategory[]>);
