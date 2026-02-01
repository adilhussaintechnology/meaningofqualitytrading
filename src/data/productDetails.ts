import type { LString } from "@/data/i18n";

export type PackagingRow = {
  stockCode?: string;
  productCode?: string;
  type?: string;
  volume?: string;
  boxQty?: string;
};

export type ProductSpecification = {
  specification: string | LString;
  value: string | LString;
};

export type TechnicalSpecification = {
  title?: string | LString;
  description?: string | LString;
};

export type ProductDetail = {
  description?: string | LString;
  properties?: Array<string | LString>;
  applications?: Array<string | LString>;
  productSpecs?: ProductSpecification[];
  technicalSpecs?: TechnicalSpecification[];
  packaging?: PackagingRow[];
  tdsUrl?: string;
  sdsUrl?: string;
  isNew?: boolean;
  images?: string[];
};

export const productDetailsById: Record<string, ProductDetail> = {
  "np-1": {
    isNew: true,
    description: { en: "High-quality, one-component acrylic based joint sealant suitable for general sealing in and around kitchen and bathroom. Prevents mold growth thanks to a powerful fungicide.", ar: "مادة مانعة للتسرب عالية الجودة، أحادية المكون، مصنوعة من الأكريليك، مناسبة للاستخدام العام في سد الفواصل داخل وحول المطابخ والحمامات. تمنع نمو العفن بفضل مبيد فطري قوي." },
    properties: [
      { en: "Perfect adhesion without use of a primer on most, even slightly damp substrates. Can be painted over after curing. Colourfast and waterproof after curing. Non-stringing, non-sag formula.", ar: "" }
    ],
    applications: [
      "Sealing around kitchen worktops etc.",
      "Sealing around baths, sanitary ware, basins and ceramics.",
      "Internal sealing around uPVC, timber and metal window and door frames.",
      "Filling gaps, cracks and joints in facades, walls and ceilings before painting."
    ],
    productSpecs: [
      { specification: {"en":"Grade","ar":"الصفحة الرئيسية"}, value: {"en":"Industrial / Laboratory","ar":"الصفحة الرئيسية"} },
      { specification: "Molecular Formula", value: "C₂H₆O" },
      { specification: "Molecular Weight", value: "46.07 g/mol" },
      { specification: "Boiling Point", value: "78.37 °C" },
      { specification: "Melting Point", value: "-114.1 °C" },
      { specification: "Solubility", value: "Miscible with water" }
    ],
    technicalSpecs: [
      { title: {"en":"Cas Number","ar":"الصفحة الرئيسية"}, description: {"en":"64-17-5","ar":"الصفحة الرئيسية2222"} },
      { title: "Purity", description: "≥ 99.9%" },
      { title: "Appearance", description: "Clear liquid" },
      { title: "Density", description: "0.789 g/cm³" },
      { title: "Storage", description: "Cool, dry place" }
    ],
    packaging: [
      { stockCode: "-", productCode: "AC578", type: "-", volume: "310 ml", boxQty: "12" },
      { stockCode: "-", productCode: "AC579", type: "-", volume: "410 ml", boxQty: "19" }
    ],
    tdsUrl: "www.google.com",
    images: [
      "/images/all-products/sealants/AC578-sanitary-sealant-bath-kitchen.png",
      "/images/all-products/adhesives/740-allbond-glue.png",
      "/images/all-products/adhesives/E360-Plast-Weld.png",
      "/images/all-products/sealants/AC580-rapid-seal.png"
    ]
  },
  "np-2": {
    isNew: true,
    description: "High-quality, one-component acrylic based joint sealant suitable for general sealing in and around kitchen and bathroom. Prevents mold growth thanks to a powerful fungicide.",
    properties: [
      "Perfect adhesion without use of a primer on most, even slightly damp substrates.",
      "Can be painted over after curing.",
      "Colourfast and waterproof after curing.",
      "Non-stringing, non-sag formula."
    ],
    applications: [
      "Sealing around kitchen worktops etc.",
      "Sealing around baths, sanitary ware, basins and ceramics.",
      "Internal sealing around uPVC, timber and metal window and door frames.",
      "Filling gaps, cracks and joints in facades, walls and ceilings before painting."
    ],
    packaging: [
      { stockCode: "-", productCode: "AC578", type: "-", volume: "310 ml", boxQty: "12" },
      { stockCode: "-", productCode: "AC579", type: "-", volume: "410 ml", boxQty: "19" }
    ],
    images: [
      "/images/all-products/adhesives/740-allbond-glue.png"
    ]
  },
  "840P": {
    isNew: true,
    description: "Akfix 840P is a self-extinguishable aerosol polyurethane foam for filling, sealing and bonding gaps. PU foam used with an applicator gun and features higher yield, easier application and reusability.",
    properties: [
      "Rated B2 according to DIN 4102.",
      "Excellent adhesion to most building materials.",
      "It does not contain any propellant gases that are harmful to the ozone layer.",
      "It can be painted after curing.",
      "It can be cut and sawn."
    ],
    applications: [
      "Fixing and insulating of door and window frames.",
      "Filling and sealing of gaps, joints and cavities.",
      "Filling of penetrations in walls.",
      "Insulating electrical outlets and water pipes."
    ],
    packaging: [
      { stockCode: "FA018", productCode: "840P", type: "All Season", boxQty: "12" },
      { stockCode: "FA019", productCode: "841P", type: "All Season", boxQty: "16" }
    ],
    images: [
      "/images/all-products/fire-related-products/820P-B1-fire-rated-pu-gun-foam.png"
    ]
  },
  "p-1766747336873": {
    description: { en: "hello", ar: "ar hello" },
    properties: [
      { en: "product over vire en", ar: "product over viwe at" }
    ],
    applications: [
      { en: "1", ar: "1" },
      { en: "2", ar: "2" },
      { en: "3", ar: "3" }
    ],
    productSpecs: [
      { specification: {"en":"1","ar":"123"}, value: {"en":"12","ar":"123"} }
    ],
    technicalSpecs: [
      { title: {"en":"1234","ar":"4321"}, description: {"en":"1234","ar":"4321"} }
    ],
    images: [
      "/images/all-products/category-1766747244591/p-1766747336873_1766750555797_d1fezx.png"
    ]
  },
  "p-1766819707316": {
    
  },
  "p-1766838665290": {
    description: { en: "helo", ar: "how" },
    properties: [
      { en: "new thing are comming ", ar: "asdfas ar" }
    ],
    applications: [
      { en: "hello", ar: "fine" },
      { en: "how are you", ar: "fine " },
      { en: "fine", ar: "fine" }
    ],
    images: [
      "/images/all-products/category-1766747244591/p-1766838665290_1766838908965_3ljcsj.png",
      "/images/all-products/category-1766747244591/p-1766838665290_1766838912240_as7lkn.png"
    ]
  },
  "p-1766848283790": {
    images: [
      "/images/all-products/category-1766747244591/p-1766848283790_1766848846727_z2sy66.png",
      "/images/all-products/category-1766747244591/p-1766848283790_1766848849368_ckjjkf.png",
      "/images/all-products/category-1766747244591/p-1766848283790_1766848851661_rrmi67.png"
    ]
  },
  "p-1769275165538": {
    description: { en: "hello abc section here ", ar: "hello abc section here - Arabic" },
    properties: [
      { en: "dsfaasdfaskldfjasdoifjoi", ar: "asdfjaoire asdfoijawer arabic" }
    ],
    applications: [
      { en: "washroom dsf", ar: "washroom arabic" },
      { en: "room", ar: "room arabic" },
      { en: "drawing room", ar: "drawing room arabic" }
    ],
    productSpecs: [
      { specification: {"en":"A1","ar":"a1 arabic"}, value: {"en":"200","ar":"200"} }
    ],
    technicalSpecs: [
      { title: {"en":"4ewefr","ar":"sdfasdf"}, description: {"en":"asdfasf","ar":"asdfae"} }
    ],
    packaging: [
      { stockCode: "A1243", productCode: "F5533", type: "asdf", volume: "500ml", boxQty: "15" }
    ],
    tdsUrl: "www.google.com",
    images: [
      "/images/all-products/category-1766747244591/subcategory-1766842274536/p-1769275165538_1769275886294_twuuo3.png",
      "/images/all-products/category-1766747244591/subcategory-1766842274536/p-1769275165538_1769275906950_gajew8.png",
      "/images/all-products/category-1766747244591/subcategory-1766842274536/p-1769275165538_1769275929674_in9m6r.png"
    ]
  }
};
