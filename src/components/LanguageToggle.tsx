"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as "en" | "ar" | null)) || "en";
    setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      localStorage.setItem("lang", lang);
      // notify other components in the same tab
      window.dispatchEvent(new CustomEvent("lang-changed", { detail: lang }));
    }
  }, [lang]);

  return (
    <div className="inline-flex rounded border border-black/10 overflow-hidden">
      <button
        type="button"
        className={`px-3 py-1 text-xs ${lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`px-3 py-1 text-xs ${lang === "ar" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        onClick={() => setLang("ar")}
      >
        AR
      </button>
    </div>
  );
}
