"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/data/i18n";
import { defaultLang } from "@/data/i18n";

export function useLang(initial: Lang = defaultLang): Lang {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang | null)) || initial;
    setLang(saved);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "lang" && e.newValue) {
        setLang(e.newValue as Lang);
      }
    };
    const onCustom = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail as Lang;
        if (detail) setLang(detail);
      } catch { /* noop */ }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("lang-changed", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("lang-changed", onCustom as EventListener);
    };
  }, [initial]);

  return lang;
}

