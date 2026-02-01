"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { PackagingRow } from "@/data/productDetails";
import { t } from "@/data/labels";
import { useLang } from "@/hooks/useLang";
// import Link from "next/link";

export default function AddToCart({
  productId,
  name,
  img,
  packaging = [],
  priceRange
}: {
  productId: string;
  name: string | { en: string; ar: string };
  img?: string;
  packaging?: PackagingRow[];
  priceRange?: {
    min: number;
    max: number;
  };
}) {
  const { add } = useCart();
  const lang = useLang();
  const [qty, setQty] = useState<number>(1);
  const [packIdx, setPackIdx] = useState<number>(0);
  const selected = packaging[packIdx];

  const onAdd = () => {
    add({
      id: productId,
      name: name,
      img,
      qty: Math.max(1, qty),
      productCode: selected?.productCode,
      volume: selected?.volume,
      stockCode: selected?.stockCode,
      type: selected?.type,
      priceRange,
    });
  };

  return (
    <div className="mt-6 rounded-2xl border border-black/5 bg-background p-5">
      <div className="flex flex-wrap items-end gap-3">
        {packaging.length > 0 && (
          <label className="text-xs text-muted-foreground">
            <div className="mb-1 font-medium">{t("packaging", lang)}</div>
            <select
              className="block rounded border px-2 py-1 text-sm"
              value={packIdx}
              onChange={(e) => setPackIdx(parseInt(e.target.value))}
            >
              {packaging.map((p, i) => (
                <option key={i} value={i}>
                  {(p.productCode ? `${p.productCode} ` : "") + (p.volume || "-")}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="text-xs text-muted-foreground">
          <div className="mb-1 font-medium">{t("quantity", lang)}</div>
          <input
            type="number"
            min={1}
            className="block w-24 rounded border px-3 py-1 text-sm"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
        {/* <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-muted"
        >
          {t("goToCart", lang)}
        </Link> */}
      </div>
      <div className="mt-4 ">
      <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center ml-4 mb-2 w-[200px] justify-center rounded-lg bg-primary px-4 py-2 text-white text-sm hover:brightness-110"
        >
          {t("addToCart", lang)}
        </button>

      <p className="text-sm">{t("addToQuoteNote", lang)}</p>
      </div>
    </div>
  );
}
