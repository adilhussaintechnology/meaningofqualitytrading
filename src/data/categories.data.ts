import { LString } from "@/data/i18n";

export type CategoryEntry = {
  id: string;
  title: LString;
  icon?: string;
};

export const categoriesData: CategoryEntry[] = [
  { id: "accessories", title: { en: "Accessories", ar: "إكسسوارات" }, icon: "/images/product-categories/categories-icons/accessories.png" },
  { id: "fire-rated", title: { en: "Fire Rated Series", ar: "حماية من الحريق" }, icon: "/images/product-categories/categories-icons/fire-rated-series.png" },
  { id: "adhesives", title: { en: "Adhesives & Glues", ar: "لاصقات وغراء" }, icon: "/images/product-categories/categories-icons/adhesives.png" },
  { id: "sealants", title: { en: "Sealants", ar: "مانعات التسرب" }, icon: "/images/product-categories/categories-icons/sealants.png" },
  { id: "pu-foams", title: { en: "PU Foams", ar: "رغوات البولي يوريثان" }, icon: "/images/product-categories/categories-icons/pu-foams.png" },
  { id: "aerosols", title: { en: "Aerosols", ar: "عبوات رش" }, icon: "/images/product-categories/categories-icons/aerosols.png" },
  { id: "coating-system", title: {en: "Coating System" ,ar: "نظام الطلاء"}, icon: "/images/product-categories/categories-icons/coatings.png"},
  { id: "automotive", title: {en: "Automotive" ,ar: "السيارات"}, icon: "/images/product-categories/categories-icons/automotive.png"},
  { id: "industrial", title: {en: "Industrial" ,ar: "صناعي"}, icon: "/images/product-categories/categories-icons/industrials.png"},
  { id: "anaerobics", title: {en: "Anaerobics" ,ar: "اللاهوائية"}, icon: "/images/product-categories/categories-icons/anaerobics.png"},
  { id: "spray-paint", title: {en: "Spray Paints" ,ar: "دهانات الرش"}, icon: "/images/product-categories/categories-icons/spray-paints.png"},
];

