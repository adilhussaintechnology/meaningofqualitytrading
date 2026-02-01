"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import SimpleImageSlider from "@/components/ui/SimpleImageSlider";
import CategoryCard from "@/components/ui/CategoryCard";
import ProductTile from "@/components/ui/ProductTile";
import { categories, newProducts, mostVisited } from "@/data/catalog";
import { sliderBanners, categoryIconById, categoryThemeById, productImageByItemId } from "@/data/assets";
import { useLang } from "@/hooks/useLang";
import { pick } from "@/data/i18n";
import { t } from "@/data/labels";

export default function Home() {
  const lang = useLang();
  return (
    <div className="font-sans">
      {/* 1) Slider banner section */}
      <section className="py-6 sm:py-8">
        <Container>
          <SimpleImageSlider images={sliderBanners} intervalMs={6000} className="rounded-lg" />
        </Container>
      </section>

      {/* 2) Products slider display section */}
      <section className="py-10">
        <Container className="max-w-2xl">
          <div className="flex items-end justify-between gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("products", lang)}</h2>
            <Link href="/categories" className="text-sm text-primary hover:underline">{t("viewAll", lang)}</Link>
          </div>
          <Carousel className="mt-6" autoPlay pauseOnHover intervalMs={2600} stepItems={1}>
            {categories.map((c) => {
              const icon = categoryIconById[c.id] ?? "/images/product-categories/categories-icons/accessories.png";
              const theme = categoryThemeById[c.id] ?? { bg: "bg-slate-50", ring: "ring-slate-200", text: "text-slate-700" };
              return (
                <CategoryCard key={c.id} title={pick(c.title, lang)} href={`/categories/${c.id}`} iconSrc={icon} theme={theme} />
              );
            })}
          </Carousel>
        </Container>
      </section>
      {/* 4) New Products slider section */}
      <section className="py-10">
        <Container className="max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">{t("newProducts", lang)}</h2>
          <Carousel className="mt-6" autoPlay pauseOnHover intervalMs={3000} stepItems={1}>
            {newProducts.map((p) => (
              <ProductTile key={p.id} title={p.name} imgSrc={productImageByItemId[p.id]} isNew href={`/p/${p.id}`} productId={p.id} showCtas priceRange={p.priceRange} brand={p.Brand}/>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* 5) Most Visited slider section */}
      <section className="py-10 bg-muted">
        <Container className="max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">{t("mostVisitedProducts", lang)}</h2>
          <Carousel className="mt-6" autoPlay pauseOnHover intervalMs={3200} stepItems={1}>
            {mostVisited.map((p) => (
              <ProductTile key={p.id} title={p.name} imgSrc={productImageByItemId[p.id]} href={`/p/${p.id}`} productId={p.id} showCtas priceRange={p.priceRange} brand={p.Brand} />
            ))}
          </Carousel>
        </Container>
      </section>

      {/* 6) Featured Products slider section */}
      {/* <section className="py-10">
        <Container className="max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">{t("featuredProducts", lang)}</h2>
          <Carousel className="mt-6" autoPlay pauseOnHover intervalMs={3400} stepItems={1}>
            {featuredProducts.map((p) => (
              <ProductTile key={p.id} title={p.name} imgSrc={productImageByItemId[p.id]} href={`/p/${p.id}`} productId={p.id} showCtas priceRange={p.priceRange} brand={p.Brand} />
            ))}
          </Carousel>
        </Container>
      </section> */}

      {/* 7) Footer already included by layout */}
    </div>
  );
}
