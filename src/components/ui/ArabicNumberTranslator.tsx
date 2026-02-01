// ProductDetailClient.tsx
"use client";

import { useLang } from "@/hooks/useLang";
import { toArabicNumber } from "@/utils/ToArabicNumber";
import { RiyalSymbol } from "@/components/ui/RiyalSymbol";

export default function ArabicNumberTranslator({ min, max }: { min: number; max: number }) {
  const lang = useLang();
  const formatNum = (n: number) => (lang === "ar" ? toArabicNumber(n) : n);

  return (
    <div className="inline-flex items-center gap-2 rounded-lg ">
      <span className="text-s font-semibold text-foreground">
        <RiyalSymbol /> {formatNum(min)} – {formatNum(max)}
      </span>
    </div>
  );
}
