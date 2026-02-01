"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";
import { useLang } from "@/hooks/useLang";
import { t } from "@/data/labels";
import { pickAny } from "@/data/i18n";
import ArabicNumberTranslator from "../ui/ArabicNumberTranslator";

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, lastAdded, items, updateQty, remove } = useCart();
  const lang = useLang();

  const isRTL = lang === "ar"; // Arabic => Right-to-Left

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  return (
    <div
      className={`fixed inset-0 z-50 ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeDrawer}
      />

      {/* Panel */}
      <aside
        className={`absolute top-0 h-full w-[90%] max-w-md bg-background shadow-xl transition-transform duration-200
          ${drawerOpen ? "translate-x-0" : isRTL ? "-translate-x-full" : "translate-x-full"}
          ${isRTL ? "left-0" : "right-0"}
        `}
        role="dialog"
        aria-label={t("cart", lang)}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-foreground/10 p-4">
            <div className="text-base font-semibold">
              {t("cart", lang)} ({items.length})
            </div>
            <button className="rounded p-2 hover:bg-muted" onClick={closeDrawer} aria-label={t("close", lang)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-auto p-4">
            {/* Last added */}
            {(lastAdded && items.length > 0) && (
              <div className="rounded-lg border border-foreground/10 bg-background p-3 mb-4">
                <div className="text-xs font-semibold mb-2">{t("addedToCart", lang)}</div>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 rounded bg-background ring-1 ring-foreground/10 overflow-hidden">
                    {lastAdded.img ? (
                      <Image src={lastAdded.img} alt={pickAny(lastAdded.name, lang)} fill sizes="64px" className="object-contain" />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">{t("imgPlaceholder", lang)}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium line-clamp-2">{pickAny(lastAdded.name, lang)}</div>
                    <div className="text-xs text-muted-foreground">
                      {lastAdded.productCode && <span className="mr-2">Code: {lastAdded.productCode}</span>}
                      {lastAdded.volume && <span>Volume: {lastAdded.volume}</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart items or empty message */}
            {items.length > 0 ? (
              <div className="space-y-2">
                {items.map((it) => {
                  const key = `${it.id}|${it.productCode ?? ""}|${it.volume ?? ""}|${it.stockCode ?? ""}|${it.type ?? ""}`;
                  return (
                    <div key={key} className="flex items-center gap-3 rounded border border-foreground/10 bg-background p-2">
                      <div className="relative h-12 w-12 rounded bg-background ring-1 ring-foreground/10 overflow-hidden">
                        {it.img ? (
                          <Image src={it.img} alt={pickAny(it.name, lang)} fill sizes="48px" className="object-contain" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-[10px] text-muted-foreground">{t("imgPlaceholder", lang)}</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-medium">{pickAny(it.name, lang)}</div>
                        {typeof it.priceRange?.min === "number" && typeof it.priceRange?.max === "number" && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {t("priceRange", lang)}:
                            <span className="text-xs font-semibold text-foreground">
                              {typeof it.priceRange?.min === "number" &&
                                typeof it.priceRange?.max === "number" && (
                                  <ArabicNumberTranslator min={it.priceRange.min} max={it.priceRange.max} />
                                )}

                            </span>
                          </div>
                        )}
                        <div className="mt-1 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                          {it.productCode && (
                            <span className="rounded-full bg-muted px-2 py-0.5 ring-1 ring-foreground/10">
                              {t("productCode", lang)}: {it.productCode}
                            </span>
                          )}
                          {it.volume && (
                            <span className="rounded-full bg-muted px-2 py-0.5 ring-1 ring-foreground/10">
                              {t("volume", lang)}: {it.volume}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          {/* Quantity counter */}
                          <div className="inline-flex items-center rounded-lg border bg-background/70 shadow-sm">
                            <button
                              type="button"
                              aria-label={t("decreaseQuantity", lang)}
                              className="h-7 w-7 text-xs hover:bg-muted rounded-l-lg"
                              onClick={() => updateQty(it.id, Math.max(1, it.qty - 1), key)}
                            >
                              −
                            </button>
                            {/* <div className="h-7 w-20 border-x grid place-items-center text-xs select-none">{it.qty}</div> */}
                            <input
                              type="number"
                              min={1}
                              value={it.qty}
                              onChange={(e) =>
                                updateQty(
                                  it.id,
                                  Math.max(1, Number(e.target.value) || 1),
                                  key
                                )
                              }
                              className="h-8 w-22 border-x px-2 text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              aria-label={t("quantity", lang)}
                            />
                            <button
                              type="button"
                              aria-label={t("increaseQuantity", lang)}
                              className="h-7 w-7 text-xs hover:bg-muted rounded-r-lg"
                              onClick={() => updateQty(it.id, it.qty + 1, key)}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-50 text-red-600"
                            onClick={() => remove(it.id, key)}
                            type="button"
                            aria-label={t("remove", lang)}
                            title={t("remove", lang)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path
                                d="M6 7h12M10 7v11m4-11v11M4 7h16l-1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 7Zm3-2h8l-1 2H8l-1-2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center text-sm text-muted-foreground h-full">
                <svg
                  className="w-12 h-12 mb-2 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v2H3V3zM3 7h18v13H3V7z"></path>
                </svg>
                {t("cartEmpty", lang) || "Your cart is empty."}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="border-t border-foreground/10 p-4 space-y-2">
            <Link
              className="inline-flex w-full items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-muted"
              onClick={closeDrawer}
              href="/categories"
            >
              {t("continueShopping", lang)}
            </Link>
            <Link
              href="/cart"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:brightness-110"
              onClick={closeDrawer}
            >
              {t("goToCart", lang)}
            </Link>
          </footer>
        </div>
      </aside>
    </div>
  );
}
