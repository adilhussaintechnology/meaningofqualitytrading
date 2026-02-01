"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";
import { useState } from "react";
import { FiX, FiMenu, FiChevronDown } from "react-icons/fi";
import LanguageToggle from "./LanguageToggle";
import Search from "./Search";
import { categories as headerCategories } from "@/data/catalog";
import { categoryIconById, categoryThemeById } from "@/data/assets";
import { useLang } from "@/hooks/useLang";
import { pick } from "@/data/i18n";
import { t } from "@/data/labels";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = useLang();
  const { count, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        {/* Logo Section */}
{/* Logo */}
<div className="flex items-center shrink-0">
  <Link href="/" className="block">
    <div
      className="
        relative
        h-[48px]
        w-[160px]
        sm:h-[56px] sm:w-[200px]
        md:h-[64px] md:w-[260px]
        lg:h-[80px] lg:w-[320px]
      "
    >
      <Image
        src="/images/logo/canvas1.png"
        alt="The Meaning of Quality Trading"
        fill
        priority
        className="object-contain"
      />
    </div>
  </Link>
</div>


        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
          <Link
            href="/"
            className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200 font-medium"
          >
            {t("home", lang)}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="whitespace-nowrap inline-flex items-center gap-1 px-3 xl:px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200 font-medium"
            >
              {t("categories", lang)}
              <FiChevronDown className={`ml-1 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full mt-0 z-20 w-64 xl:w-72 rounded-xl border border-foreground/10 bg-background p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                {headerCategories.map((c) => {
                  const icon = categoryIconById[c.id] ?? "/images/product-categories/categories-icons/accessories.png";
                  const theme = categoryThemeById[c.id] ?? { bg: "bg-slate-50", ring: "ring-slate-200", text: "text-slate-700" };
                  return (
                    <Link
                      key={c.id}
                      href={`/categories/${c.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-all duration-200 group"
                    >
                      <span className={`h-8 w-8 rounded-lg ring-1 ${theme.ring} ${theme.bg} grid place-items-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                        <span className="relative h-5 w-5">
                          <Image src={icon} alt={`${pick(c.title, lang)} icon`} fill sizes="20px" className="object-contain" />
                        </span>
                      </span>
                      <span className="font-medium">{pick(c.title, lang)}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/cart"
            className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200 font-medium"
          >
            {t("quotationSummery", lang)}
          </Link>

          <Link
            href="/customer-care/about"
            className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200 font-medium"
          >
            {t("about", lang)}
          </Link>

          <Link
            href="/customer-care"
            className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200 font-medium"
          >
            {t("contact", lang)}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <Search />
          <button
            onClick={openDrawer}
            className="relative inline-flex items-center gap-2 px-3 xl:px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all duration-200 font-medium whitespace-nowrap"
            aria-label={t("cart", lang)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            </svg>
            <span className="hidden xl:inline">{t("cart", lang)}</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[22px] items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 px-1.5 text-[10px] font-bold text-white shadow-lg">
                {count}
              </span>
            )}
          </button>
          <LanguageToggle />
        </div>

        {/* Mobile/Tablet Actions */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
          <Search />
          <button
            onClick={openDrawer}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label={t("cart", lang)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 px-1 text-[9px] font-bold text-white shadow-md">
                {count}
              </span>
            )}
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors duration-200"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t("toggleMenu", lang)}
            type="button"
          >
            {mobileOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </Container>

      {/* Polished Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-foreground/10 bg-gradient-to-b from-background via-background to-muted/30 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <Container className="py-4">
            <div className="flex flex-col gap-1.5">
              {/* Home Link */}
              <Link
                href="/"
                className="group px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-200 font-semibold flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span>{t("home", lang)}</span>
              </Link>

              {/* Categories Dropdown */}
              <details className="group/details rounded-xl overflow-hidden border border-foreground/5 bg-background hover:border-purple-200 transition-colors duration-200">
                <summary className="cursor-pointer px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200 font-semibold list-none flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center group-hover/details:scale-110 transition-transform duration-200">
                      <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <span>{t("categories", lang)}</span>
                  </div>
                  <FiChevronDown className="text-base transition-transform duration-200 group-open/details:rotate-180" />
                </summary>
                
                <div className="bg-gradient-to-b from-gray-50/50 to-slate-50/50 px-2 py-2 space-y-1">
                  {headerCategories.map((c) => {
                    const icon = categoryIconById[c.id] ?? "/images/product-categories/categories-icons/accessories.png";
                    const theme = categoryThemeById[c.id] ?? { bg: "bg-slate-50", ring: "ring-slate-200" };
                    return (
                      <Link
                        key={c.id}
                        href={`/categories/${c.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground/80 hover:bg-white hover:text-foreground rounded-lg transition-all duration-200 hover:shadow-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className={`h-7 w-7 rounded-lg ring-1 ${theme.ring} ${theme.bg} grid place-items-center flex-shrink-0`}>
                          <span className="relative h-4 w-4">
                            <Image src={icon} alt={`${pick(c.title, lang)} icon`} fill sizes="16px" className="object-contain" />
                          </span>
                        </span>
                        <span className="font-medium">{pick(c.title, lang)}</span>
                      </Link>
                    );
                  })}
                </div>
              </details>

              {/* Cart Link */}
              <Link
                href="/cart"
                className="group px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 rounded-xl transition-all duration-200 font-semibold flex items-center justify-between"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span>{t("quotationSummery", lang)}</span>
                </div>
                {count > 0 && (
                  <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 px-2 text-xs font-bold text-white shadow-md">
                    {count}
                  </span>
                )}
              </Link>

              {/* About Link */}
              <Link
                href="/customer-care/about"
                className="group px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-all duration-200 font-semibold flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>{t("about", lang)}</span>
              </Link>

              {/* Contact Link */}
              <Link
                href="/customer-care"
                className="group px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 rounded-xl transition-all duration-200 font-semibold flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="h-4 w-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{t("contact", lang)}</span>
              </Link>

              {/* Language Toggle */}
              <div className="pt-3 mt-2 border-t border-foreground/10">
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">Language</span>
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}