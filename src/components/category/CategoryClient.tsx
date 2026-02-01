"use client";

import ProductTile from "@/components/ui/ProductTile";
import { productImageByItemId } from "@/data/assets";
import type { Item, Subcategory } from "@/data/catalog";
import L from "@/components/i18n/L";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { t } from "@/data/labels";

export default function CategoryClient({ items, subcategories }: { items: Item[]; subcategories: Subcategory[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = useLang();

  const [active, setActive] = useState<string | null>(null);

  // Sync from URL ?sc=
  useEffect(() => {
    const sc = searchParams.get("sc");
    setActive(sc ?? null);
  }, [searchParams]);

  // Update URL when local selection changes
  const setActiveAndUrl = (next: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (next) {
      params.set("sc", next);
    } else {
      params.delete("sc");
    }
    // Avoid adding a new history entry; prevent scroll jump
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const filtered = useMemo(() => (active ? items.filter((i) => i.subcategoryId === active) : items), [active, items]);

  return (
    <div>
      {subcategories && subcategories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className={`rounded-full border px-3 py-1 text-xs ${active === null ? "bg-primary text-white" : "hover:bg-muted"}`}
            onClick={() => setActiveAndUrl(null)}
            aria-pressed={active === null}
          >
            {t("all", lang)}
          </button>
          {subcategories.map((sc) => (
            <button
              key={sc.id}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs capitalize ${active === sc.id ? "bg-primary text-white" : "hover:bg-muted"}`}
              onClick={() => setActiveAndUrl(sc.id)}
              aria-pressed={active === sc.id}
            >
              <L value={sc.title} />
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductTile key={p.id} title={p.name} imgSrc={productImageByItemId[p.id]} href={`/p/${p.id}`} productId={p.id} showCtas priceRange={p.priceRange} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">{t("noProductsInSection", lang)}</p>
      )}
    </div>
  );
}
