export type Banner = { src: string; alt: string; href?: string };

export const sliderBanners: Banner[] = [
  { src: "/images/sliders/100AQ-aquarium-silicone.jpg", alt: "Aquarium silicone sealant banner" },
  { src: "/images/sliders/705-universal-fast-adhesive.jpg", alt: "705 Universal Fast Adhesive banner" },
  { src: "/images/sliders/967P-fast-adhesive.jpg", alt: "967P Fast Adhesive banner" },
  { src: "/images/sliders/Aquazero.jpg", alt: "Aquazero waterproofing banner" },
  { src: "/images/sliders/C900-chemical-anchor.jpg", alt: "C900 Chemical Anchor banner" },
  { src: "/images/sliders/Fence-post-fix.jpg", alt: "Fence Post Fix foam banner" },
  { src: "/images/sliders/High-tack-adhesive.jpg", alt: "High Tack adhesive banner" },
  { src: "/images/sliders/Multiseal.jpg", alt: "Multiseal multipurpose banner" },
  { src: "/images/sliders/akfix-safe-use-handling-of-diisocyanates-trainings.jpg", alt: "Safe use and handling of diisocyanates training" },
  { src: "/images/sliders/akfix-spray-paint-banner-en.jpg", alt: "Akfix spray paint color range" },
  { src: "/images/sliders/thermcoat-thermal-acoustic-insulation-spray-foam_en.jpg", alt: "Thermcoat thermal acoustic insulation spray foam" }
];

export const categoryIconById: Record<string, string> = {
  "accessories": "/images/product-categories/categories-icons/accessories_1766815560312_v8mcn8.png",
  "adhesives": "/images/product-categories/categories-icons/adhesives.png",
  "aerosols": "/images/product-categories/categories-icons/aerosols.png",
  "anaerobics": "/images/product-categories/categories-icons/anaerobics.png",
  "automotive": "/images/product-categories/categories-icons/automotive.png",
  "category-1766747244591": "/images/product-categories/categories-icons/category-1766747244591_1766815545779_mq9olk.png",
  "category-1769276168804": "/images/product-categories/categories-icons/category-1769276168804_1769276341053_fuxor6.png",
  "coating-system": "/images/product-categories/categories-icons/coatings.png",
  "fire-rated": "/images/product-categories/categories-icons/fire-rated-series.png",
  "industrial": "/images/product-categories/categories-icons/industrials.png",
  "pu-foams": "/images/product-categories/categories-icons/pu-foams.png",
  "sealants": "/images/product-categories/categories-icons/sealants.png",
  "spray-paint": "/images/product-categories/categories-icons/spray-paints.png"
};

// Visual theme (Tailwind classes) for each category
export const categoryThemeById: Record<string, { bg: string; ring: string; text: string; hoverBg: string; hoverRing: string; hoverText: string }> = {};

// Map item IDs from data/catalog to product images
export const productImageByItemId: Record<string, string> = {
  "840P": "/images/all-products/adhesives/HB262-hybrid-wood-flooring-adhesive.png",
  "fp-1": "/images/all-products/pu-foams/820P-B1-fire-rated-pu-gun-foam.png",
  "fp-2": "/images/all-products/pu-foams/thermcoat-thermal-acoustic-insulation-pu-spray-foam_B2.png",
  "fp-3": "/images/sliders/C900-chemical-anchor.jpg",
  "mv-1": "/images/all-products/pu-foams/fast55-mega-pu-foam.png",
  "mv-2": "/images/all-products/pu-foams/fast70-mega-pu-foam.png",
  "mv-3": "/images/all-products/adhesives/610-pu-express-montage-adhesive.png",
  "mv-4": "/images/all-products/adhesives/PA370-express-pu-wood-marine-adhesive.png",
  "mv-5": "/images/all-products/sealants/1500-Heat-Fighter.png",
  "mv-6": "/images/all-products/adhesives/705-universal-fast-adhesive.png",
  "np-1": "/images/all-products/sealants/AC578-sanitary-sealant-bath-kitchen.png",
  "np-1765966726374": "/images/all-products/adhesives/HB262-hybrid-wood-flooring-adhesive.png",
  "np-1766645310521": "/images/all-products/adhesives/HB262-hybrid-wood-flooring-adhesive.png",
  "np-2": "/images/all-products/adhesives/Akfix-744-Allbond-Hybrid.png",
  "np-3": "/images/all-products/sealants/AC580-rapid-seal.png",
  "np-4": "/images/all-products/adhesives/702HV-super-glue.png",
  "np-5": "/images/all-products/adhesives/E360-Plast-Weld.png",
  "np-6": "/images/all-products/adhesives/HB262-hybrid-wood-flooring-adhesive.png",
  "p-1766663384890": "/images/all-products/adhesives/placeholder.png",
  "p-1766663541009": "/images/all-products/adhesives/placeholder.png",
  "p-1766663816115": "/images/all-products/fire-rated/p-1766663816115_1766743011221_jq9pyz.jpeg",
  "p-1766747336873": "/images/all-products/category-1766747244591/p-1766747336873_1766750555797_d1fezx.png",
  "p-1766848283790": "/images/all-products/category-1766747244591/p-1766848283790_1766848846727_z2sy66.png",
  "p-1769275165538": "/images/all-products/category-1766747244591/subcategory-1766842274536/p-1769275165538_1769275886294_twuuo3.png",
  "p-1769940476881": ""
};
