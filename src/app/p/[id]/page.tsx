import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import ProductTile from "@/components/ui/ProductTile";
import ImageGallery from "@/components/pdp/ImageGallery";
import AddToCart from "@/components/pdp/AddToCart";
import { allItems, categories } from "@/data/catalog";
import {
  categoryIconById,
  categoryThemeById,
  productImageByItemId,
} from "@/data/assets";
import { productDetailsById } from "@/data/productDetails";
import L from "@/components/i18n/L";
import { LKey } from "@/components/i18n/L";
import ArabicNumberTranslator from "@/components/ui/ArabicNumberTranslator";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  // Pre-render all known product detail pages for static export
  return allItems.map((i) => ({ id: i.id }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = allItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="py-14 sm:py-16">
        <Container className="max-w-3xl">
          <h1 className="text-2xl font-bold"><LKey k="productNotFound" /></h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <LKey k="productNotFoundDesc" />
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">
            ← <LKey k="backToHome" />
          </Link>
        </Container>
      </div>
    );
  }

  const img = productImageByItemId[item.id];
  const cat = categories.find((c) => c.id === item.categoryId);
  const icon = categoryIconById[item.categoryId];
  type CatTheme = (typeof categoryThemeById)[keyof typeof categoryThemeById];
  const defaultTheme: CatTheme = { bg: "bg-slate-50", ring: "ring-slate-200", text: "text-slate-700", hoverBg: "group-hover:bg-slate-100", hoverRing: "group-hover:ring-slate-300", hoverText: "group-hover:text-slate-800" };
  const theme: CatTheme = categoryThemeById[item.categoryId] ?? defaultTheme;

  const detail = productDetailsById[item.id] ?? {};
  const galleryImages = detail.images && detail.images.length ? detail.images : (img ? [img] : []);

  const nonEmptyApplications = (detail.applications ?? []).filter((p) => {
    if (typeof p === "string") return p.trim() !== "";
    return (p.en || "").trim() !== "" || (p.ar || "").trim() !== "";
  });

  // Simple related products: same category, different id
  const related = allItems.filter(
    (i) => i.categoryId === item.categoryId && i.id !== item.id
  );
  function toAbsoluteUrl(url: string) {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }

  return (
    <div className="py-10 sm:py-12">
      <Container className="max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:underline"><LKey k="home" /></Link>
          <span className="mx-1">/</span>
          <Link href="/categories" className="hover:underline"><LKey k="products" /></Link>
          {cat && (
            <>
              <span className="mx-1">/</span>
              <Link href="" className="hover:underline">
                <L value={cat.title} />
              </Link>
            </>
          )}
        </nav>

        {/* Title */}
        <header className="mt-3 flex flex-wrap items-center gap-3">
          {icon && (
            <span className={`h-9 w-9 rounded-lg ring-1 ${theme.ring} ${theme.bg} grid place-items-center`}>
              <span className="relative h-5 w-5">
                <Image src={icon} alt={`${item.categoryId} icon`} fill sizes="20px" className="object-contain" />
              </span>
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <L value={item.name} />
          </h1>
        </header>

        {/* Main content grid */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* Image card */}
          <div className="relative rounded-xl bg-background overflow-hidden 
                h-[320px] sm:h-[420px] lg:h-full max-h-[600px]">


            <ImageGallery images={galleryImages} isNew={detail.isNew} />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-foreground/10" />
          </div>

          {/* Info panel */}
          <div>
            {/* Category chip */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 text-xs font-medium capitalize">
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded ${theme.bg} ${theme.ring} ring-1`}>
                <span className="relative h-4 w-4">
                  {icon && (
                    <Image src={icon} alt="" fill sizes="16px" className="object-contain" />
                  )}
                </span>
              </span>
              <span className={theme.text}><L value={cat?.title || { en: item.categoryId.replace("-", " "), ar: item.categoryId.replace("-", " ") }} /></span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <L value={detail.description || { en: "High-performance product.", ar: "منتج عالي الأداء." }} />
            </p>

            {/* Price range */}
            {typeof item.priceRange?.min === "number" &&
              typeof item.priceRange?.max === "number" && (
                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-muted/40 px-4 py-2">
                    <span className="text-s text-muted-foreground">
                      <LKey k="priceRange" />:
                    </span>
                    <span className="text-lg font-semibold text-foreground">
                       {typeof item.priceRange?.min === "number" &&
                        typeof item.priceRange?.max === "number" && (
                          <ArabicNumberTranslator min={item.priceRange.min} max={item.priceRange.max} />
                        )}

                    </span>
                  </div>
                </div>
              )}



            <div className="mt-6 flex flex-wrap gap-3">
              {detail.tdsUrl && (
                <a
                  href={toAbsoluteUrl(detail.tdsUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm text-white hover:brightness-110"
                >
                  <LKey k="downloadTDS" />
                </a>
              )}

              {detail.sdsUrl && (
                <a
                  href={toAbsoluteUrl(detail.sdsUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                >
                  <LKey k="downloadSDS" />
                </a>
              )}
            </div>

            {/* Add to cart / inquiry */}
            <AddToCart productId={item.id} name={item.name} img={img} packaging={detail.packaging} priceRange={item.priceRange} />

            {/* Product Overview */}
            {detail.properties && detail.properties.length > 0 && (
              <div className="mt-8 rounded-2xl border border-foreground/10 bg-background p-5">
                <h2 className="text-base font-semibold text-foreground"><LKey k="properties" /></h2>
                <div className="mt-2 ml-3 rtl:mr-3 rtl:ml-0 space-y-2 text-sm text-muted-foreground">
                  {detail.properties.map((p, i) => (
                    <p key={i}><L value={p} /></p>
                  ))}
                </div>
              </div>
            )}

            {/* Use cases */}
            {nonEmptyApplications.length > 0 && (
              <div className="mt-5 rounded-2xl border border-foreground/10 bg-background p-5">
                <h2 className="text-base font-semibold text-foreground">
                  <LKey k="applicationAreas" />
                </h2>
                <ul className="mt-2 list-disc space-y-2 pl-5 rtl:pr-5 rtl:pl-0 text-sm text-muted-foreground">
                  {nonEmptyApplications.map((p, i) => (
                    <li key={i}><L value={p} /></li>
                  ))}
                </ul>
              </div>
            )}


            {/* Product Specifications */}
            {detail.productSpecs &&
              detail.productSpecs.length > 0 && (
                <div className="mt-5 rounded-2xl border border-foreground/10 bg-background p-5">
                  <h2 className="text-base font-semibold text-foreground">
                    <LKey k="productSpecifications" />
                  </h2>

                  <div className="mt-3 overflow-x-auto" dir="auto">
                    <table className="w-full text-xs">
                      <thead className="text-muted-foreground">
                        <tr className="border-b border-foreground/10">
                          <th className="py-2 px-3 text-start"><LKey k="title" /></th>
                          <th className="py-2 px-3 text-start"><LKey k="descriptionNotes" /></th>
                        </tr>
                      </thead>

                      <tbody>
                        {detail.productSpecs.map((row, i) => (
                          <tr key={i} className="border-b border-foreground/10">
                            <td className="py-2 px-3"><L value={row.specification} /></td>
                            <td className="py-2 px-3"><L value={row.value ?? "-"} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


            {/* Technical Specifications */}
            {detail.technicalSpecs && detail.technicalSpecs.length > 0 && (
              <div className="mt-5 rounded-2xl border border-foreground/10 bg-background p-5">
                <h2 className="text-base font-semibold text-foreground">
                  <LKey k="technicalSpecifications" />
                </h2>
                <div className="mt-3 overflow-x-auto" dir="auto">
                  <table className="w-full text-xs">
                    <thead className="text-muted-foreground">
                      <tr className="border-b border-foreground/10">
                        <th className="py-2 px-3 text-start"><LKey k="specification" /></th>
                        <th className="py-2 px-3 text-start"><LKey k="value" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.technicalSpecs.map((row, i) => (
                        <tr key={i} className="border-b border-foreground/10">
                          <td className="py-2 px-3"><L value={row.title ?? "-"} /></td>
                          <td className="py-2 px-3"><L value={row.description ?? "-"} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {/* Packaging table */}
            {detail.packaging && detail.packaging.length > 0 && (
              <div className="mt-5 rounded-2xl border border-foreground/10 bg-background p-5">
                <h2 className="text-base font-semibold text-foreground"><LKey k="packaging" /></h2>
                <div className="mt-3 overflow-x-auto" dir="auto">
                  <table className="w-full text-xs">
                    <thead className="text-muted-foreground">
                      <tr className="border-b border-foreground/10">
                        <th className="py-2 px-3 text-start"><LKey k="stockCode" /></th>
                        <th className="py-2 px-3 text-start"><LKey k="productCode" /></th>
                        <th className="py-2 px-3 text-start"><LKey k="type" /></th>
                        <th className="py-2 px-3 text-start"><LKey k="volume" /></th>
                        <th className="py-2 px-3 text-start"><LKey k="boxQty" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.packaging.map((row, i) => (
                        <tr key={i} className="border-b border-foreground/10">
                          <td className="py-2 px-3">{row.stockCode ?? "-"}</td>
                          <td className="py-2 px-3">{row.productCode ?? "-"}</td>
                          <td className="py-2 px-3">{row.type ?? "-"}</td>
                          <td className="py-2 px-3">{row.volume ?? "-"}</td>
                          <td className="py-2 px-3">{row.boxQty ?? "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight"><LKey k="relatedIn" /> {cat && <L value={cat.title} />}</h2>
            <Carousel className="mt-6">
              {related.slice(0, 8).map((r) => (
                <ProductTile key={r.id} title={r.name} imgSrc={productImageByItemId[r.id]} href={`/p/${r.id}`} priceRange={r.priceRange} />
              ))}
            </Carousel>
          </section>
        )}
      </Container>
    </div>
  );
}