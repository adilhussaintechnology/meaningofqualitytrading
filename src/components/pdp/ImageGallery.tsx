'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import { t } from '@/data/labels';

interface ImageGalleryProps {
  images: string[];
  isNew?: boolean;
}

export default function ImageGallery({
  images,
  isNew
}: ImageGalleryProps) {
  const lang = useLang();
  const gallery = images && images.length ? images : ['/images/file.svg'];
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActive((prev) => (prev + 1) % gallery.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, gallery.length]);

  return (
    <div
      className="flex h-full flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image container */}
      <div className="relative flex-1 rounded-xl bg-background overflow-hidden h-80 lg:h-[400px]">
        <Image
          src={gallery[active]}
          alt="Product image"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />

        {/* NEW badge */}
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            {t("newProductBadge", lang)}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border transition
                ${active === i
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-foreground/10 hover:border-foreground/30'
                }`}
              type="button"
            >
              <Image
                src={src}
                alt="Thumbnail"
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
