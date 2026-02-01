import { LString } from "@/data/i18n";

export type ProductTileEntry = {
  id: string; // product id used in /p/[id]
  name: LString;
  image: string;
  isNew?: boolean;
};

export type SectionProducts = {
  newProducts: ProductTileEntry[];
  mostVisited: ProductTileEntry[];
};

export const homepageProducts: SectionProducts = {
  newProducts: [
    {
      id: "bond-master-100",
      name: { en: "Bond Master 100", ar: "بوند ماستر 100" },
      image: "/images/products/bond-master-100.png",
      isNew: true,
    },
    {
      id: "seal-pro-5",
      name: { en: "Seal Pro 5", ar: "سيل برو 5" },
      image: "/images/products/seal-pro-5.png",
      isNew: true,
    },
  ],
  mostVisited: [
    {
      id: "foam-fix-200",
      name: { en: "Foam Fix 200", ar: "فوم فيكس 200" },
      image: "/images/products/foam-fix-200.png",
    },
    {
      id: "glass-grip-50",
      name: { en: "Glass Grip 50", ar: "جلاس جريب 50" },
      image: "/images/products/glass-grip-50.png",
    },
  ],
};

