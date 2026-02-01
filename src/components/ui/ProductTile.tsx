"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { LText, pickAny } from "@/data/i18n";
import { t } from "@/data/labels";
import { useCart } from "@/contexts/CartContext";
import ArabicNumberTranslator from "./ArabicNumberTranslator";

interface ProductTileProps {
  title: LText;
  imgSrc: string | undefined;
  href?: string;
  isNew?: boolean;
  className?: string;
  productId?: string;
  showCtas?: boolean;
  priceRange?: { min: number; max: number };
  brand?: string;
}

export default function ProductTile({
  title,
  imgSrc,
  href,
  isNew = false,
  className = "",
  productId,
  showCtas = false,
  priceRange,
  brand
}: ProductTileProps) {

  const lang = useLang();
  const { add } = useCart();
  const name = pickAny(title, lang);

  const onAdd = () => {
    if (!productId) return;
    add({ id: productId, name: title, img: imgSrc, qty: 1, priceRange, useDefaultPackaging: true });
  };

  return (
    <div
      className={`group relative rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all p-3 flex flex-col h-full ${className}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Product Image */}
      <div className="relative h-56 sm:h-64 w-full grid place-items-center bg-muted rounded-lg overflow-hidden">
        {isNew && (
          <span className="absolute left-2 top-2 z-20 px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-600 text-white shadow-md">
            {t("newProductBadge", lang)}
          </span>
        )}
        {href && <Link href={href} className="absolute inset-0" aria-label={name} />}
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width:640px) 80vw, (max-width:1024px) 50vw, 33vw"
            className="object-contain object-center transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="text-xs text-muted-foreground">Image</div>
        )}
      </div>

      {/* Brand */}
      <div className="text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest mt-3">
        {brand}
      </div>

      {/* Product Name */}
      <div className="text-center text-sm sm:text-base font-medium mt-1 text-gray-700 line-clamp-2 group-hover:text-primary transition-colors">
        {href ? <Link href={href}>{name}</Link> : name}
      </div>

      {/* Price Range */}
      {priceRange && (
        <div className="mt-3 text-center">
          <div className="text-sm font-semibold text-primary">
            {t("priceRange", lang)}:
            {" "}
            <span className="text-lg font-semibold text-foreground">
              {typeof priceRange?.min === "number" &&
                typeof priceRange?.max === "number" && (
                  <ArabicNumberTranslator min={priceRange.min} max={priceRange.max} />
                )}

            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            ({t("basedOnQuantity", lang)})
          </div>
        </div>
      )}


      {/* Spacer to push buttons to bottom */}
      <div className="flex-1"></div>

      {showCtas && (
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <Link
            href={href ?? "#"}
            className="flex-1 text-center py-2 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium text-sm hover:bg-gray-100 transition-shadow shadow-sm hover:shadow-md whitespace-nowrap"
          >
            {t("viewDetails", lang)}
          </Link>

          <button
            type="button"
            onClick={onAdd}
            disabled={!productId}
            className="flex-1 text-center py-2 px-2 rounded-lg bg-primary text-white font-medium text-sm hover:brightness-110 disabled:opacity-50 transition-shadow shadow-sm hover:shadow-md whitespace-nowrap"
          >
            {t("addToCart", lang)}
          </button>
        </div>
      )}


    </div>

  );
}




