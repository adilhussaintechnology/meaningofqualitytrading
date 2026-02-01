import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { categories, subcategoriesByCategoryId } from "@/data/catalog";
import { categoryIconById, categoryThemeById } from "@/data/assets";
import L, { LKey } from "@/components/i18n/L";

export default function CategoriesIndexPage() {
  return (
    <div className="py-10 sm:py-12">
      <Container className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight"><LKey k="categories" /></h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <L value={{ en: "Browse all product categories and drill down into subcategories.", ar: "تصفح جميع الفئات وتعمق في الفئات الفرعية." }} />
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => {
            const icon = categoryIconById[c.id] ?? "/images/product-categories/categories-icons/accessories.png";
            const theme = categoryThemeById[c.id] ?? { bg: "bg-slate-50", ring: "ring-slate-200", text: "text-slate-700", hoverBg: "group-hover:bg-slate-100", hoverRing: "group-hover:ring-slate-300", hoverText: "group-hover:text-slate-800" };
            const subcats = subcategoriesByCategoryId[c.id] || [];
            return (
              <div key={c.id} className="rounded-xl border border-foreground/10 bg-background p-5 hover:shadow-sm transition-shadow">
                <Link href={`/categories/${c.id}`} className="flex items-center gap-3">
                  <span className={`h-10 w-10 rounded-lg ring-1 ${theme.ring} ${theme.bg} ${theme.hoverRing} ${theme.hoverBg} grid place-items-center`}>
                    <span className="relative h-6 w-6">
                      <Image src={icon} alt="category icon" fill sizes="24px" className="object-contain" />
                    </span>
                  </span>
                  <h2 className={`text-base font-semibold ${theme.text} ${theme.hoverText}`}>
                    <L value={c.title} />
                  </h2>
                </Link>
                {subcats.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {subcats.map((sc) => (
                      <Link
                        key={sc.id}
                        href={`/categories/${c.id}?sc=${sc.id}`}
                        className="rounded-full border px-3 py-1 text-xs hover:bg-muted capitalize"
                      >
                        <L value={sc.title} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

