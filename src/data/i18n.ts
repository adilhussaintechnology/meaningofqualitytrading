// Simple i18n helpers for static data
export type Lang = "en" | "ar";
export type LString = { en: string; ar: string };
export type LText = string | LString;

export const defaultLang: Lang = "en";

export function pick(ls: LString, lang: Lang = defaultLang): string {
  return ls?.[lang] ?? ls?.en ?? "";
}

export function pickAny(value: LText, lang: Lang = defaultLang): string {
  return typeof value === "string" ? value : pick(value, lang);
}
