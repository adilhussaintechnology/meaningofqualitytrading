'use client';

import Image from 'next/image';

export interface CategoryCardProps {
  title: string;
  href: string;
  iconSrc: string;
  theme?: { bg: string; ring: string; text: string; hoverBg?: string; hoverRing?: string; hoverText?: string };
}

export default function CategoryCard({ title, href, iconSrc, theme = { bg: 'bg-slate-50', ring: 'ring-slate-200', text: 'text-slate-700' } }: CategoryCardProps) {
  return (
    <a
      href={href}
      className="group block rounded-xl border border-foreground/10 bg-background p-5 hover:shadow-md transition-all hover:-translate-y-0.5 text-center cursor-pointer"
    >
      <div className={`h-14 w-14 rounded-lg ring-1 ${theme.ring} ${theme.bg} ${theme.hoverRing || ''} ${theme.hoverBg || ''} grid place-items-center mx-auto transition-transform`}>
        <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
          <Image src={iconSrc} alt={`${title} icon`} fill sizes="40px" className="object-contain" />
        </div>
      </div>
      <h3 className={`mt-4 text-base font-semibold transition-colors ${theme.text} ${theme.hoverText || ''}`}>{title}</h3>
    </a>
  );
}

