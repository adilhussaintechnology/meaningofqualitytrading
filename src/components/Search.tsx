"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { allItems, categories } from "@/data/catalog";
import { useLang } from "@/hooks/useLang";
import { pickAny } from "@/data/i18n";
import { t } from "@/data/labels";
import { productImageByItemId } from "@/data/assets";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import ArabicNumberTranslator from "@/components/ui/ArabicNumberTranslator";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const lang = useLang();
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Highlight matches in text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, idx) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={idx} className="bg-yellow-100 text-yellow-800">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Filtered results (cross-language)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as typeof allItems;

    return allItems.filter((item) => {
      const nameEn = item.name.en.toLowerCase();
      const nameAr = item.name.ar.toLowerCase();
      const brand = item.Brand.toLowerCase();
      const category = item.categoryId.toLowerCase();
      const id = item.id.toLowerCase();

      return (
        nameEn.includes(query) ||
        nameAr.includes(query) ||
        brand.includes(query) ||
        category.includes(query) ||
        id.includes(query)
      );
    });
  }, [q]);

  // Get category title in current language
  const getCategoryTitle = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? pickAny(cat.title, lang) : id;
  };

  return (
    <>
      <button
        type="button"
        className="
          relative flex h-10 w-10 items-center justify-center rounded-full
          bg-gray-600 text-white
          shadow-lg shadow-gray-500/50
          transform transition-all duration-300
          hover:scale-110 hover:shadow-xl
          animate-pulse
        "
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <FiSearch className="w-6 h-6 text-white animate-ping-slow" />
      </button>

      {/* Search Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-3xl rounded-lg bg-background p-4 shadow-lg ring-1 ring-black/10 animate-fadeIn"
          >
            {/* Input */}
            <div className="flex items-center gap-2 border-b border-muted pb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                placeholder={t("searchProducts", lang)}
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground/70 text-sm"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition"
                onClick={() => setOpen(false)}
              >
                {t("esc", lang)}
              </button>
            </div>

            {/* Results */}
            <div className="mt-4 max-h-80 overflow-auto divide-y divide-muted-foreground/20">
              {filtered.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">{t("noResults", lang)}</div>
              ) : (
                filtered.map((item) => (
                  <a
                    key={item.id}
                    href={`/p/${item.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      {productImageByItemId[item.id] ? (
                        <Image
                          src={productImageByItemId[item.id]}
                          alt={pickAny(item.name, lang)}
                          fill
                          className="object-contain rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {highlightMatch(item.name.en, q)} / {highlightMatch(item.name.ar, q)}
                      </div>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-2 mt-1">
                        <span>{highlightMatch(getCategoryTitle(item.categoryId), q)}</span>
                        <span>{highlightMatch(item.Brand, q)}</span>
                        {item.priceRange && (
                          <span className="text-xs font-semibold text-foreground">
                              {typeof item.priceRange?.min === "number" &&
                                typeof item.priceRange?.max === "number" && (
                                  <ArabicNumberTranslator min={item.priceRange.min} max={item.priceRange.max} />
                                )}

                            </span>
                        )}
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
