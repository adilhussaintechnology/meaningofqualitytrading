"use client";

import { useLang } from "@/hooks/useLang";
import type { LString } from "@/data/i18n";
import { pick } from "@/data/i18n";
import { t } from "@/data/labels";
import type { LabelKey } from "@/data/labels";

export default function L({ value }: { value: string | LString }) {
  const lang = useLang();
  return <>{typeof value === "string" ? value : pick(value, lang)}</>;
}

export function LKey({ k }: { k: LabelKey }) {
  const lang = useLang();
  return <>{t(k, lang)}</>;
}

