import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { categories, allItems, subcategoriesByCategoryId } from "@/data/catalog";
import { categoryIconById, categoryThemeById } from "@/data/assets";
import L, { LKey } from "@/components/i18n/L";
import CategoryClient from "@/components/category/CategoryClient";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const cat = categories.find((c) => c.id === id);
  const items = allItems.filter((i) => i.categoryId === id);
  const icon = categoryIconById[id] ?? "/images/product-categories/categories-icons/accessories.png";
  type CatTheme = (typeof categoryThemeById)[keyof typeof categoryThemeById];
  const defaultTheme: CatTheme = { bg: "bg-slate-50", ring: "ring-slate-200", text: "text-slate-700", hoverBg: "group-hover:bg-slate-100", hoverRing: "group-hover:ring-slate-300", hoverText: "group-hover:text-slate-800" };
  const theme: CatTheme = categoryThemeById[id] ?? defaultTheme;

  if (!cat) {
    return (
      <div className="py-14 sm:py-16">
        <Container className="max-w-5xl">
          <h1 className="text-2xl font-bold"><LKey k="categories" /> — 404</h1>
          <p className="mt-2 text-sm text-muted-foreground">This category does not exist.</p>
          <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">← <LKey k="backToHome" /></Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-12">
      <Container className="max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:underline"><LKey k="home" /></Link>
          <span className="mx-1">/</span>
          {/* <Link href="/categories" className="hover:underline"><LKey k="categories" /></Link> */}
          <Link href="/categories" className="hover:underline">
            <span><LKey k="categories" /></span>
          </Link>

          <span className="mx-1">/</span>
          <span className="text-foreground"><L value={cat.title} /></span>
        </nav>

        {/* Title */}
        <header className="mt-3 flex items-center gap-3">
          {icon && (
            <span className={`h-9 w-9 rounded-lg ring-1 ${theme.ring} ${theme.bg} grid place-items-center`}>
              <span className="relative h-5 w-5">
                <Image src={icon} alt="category icon" fill sizes="20px" className="object-contain" />
              </span>
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <L value={cat.title} />
          </h1>
        </header>

        {/* Subcategories + Grid */}
        {items.length > 0 ? (
          <Suspense fallback={<div className="mt-8 text-sm text-muted-foreground">Loading…</div>}>
            <CategoryClient items={items} subcategories={subcategoriesByCategoryId[id] || []} />
          </Suspense>
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">
            <LKey k="noProductsInCategory" />
          </p>
        )}
      </Container>
    </div>
  );
}

