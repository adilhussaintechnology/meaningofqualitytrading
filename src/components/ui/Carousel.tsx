"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface CarouselProps {
  className?: string;
  children: React.ReactNode;
  itemWidth?: number;
  autoPlay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  stepItems?: number;
}

export default function Carousel({
  className,
  children,
  itemWidth,
  autoPlay = false,
  intervalMs = 3000,
  pauseOnHover = true,
  stepItems,
}: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [stepPx, setStepPx] = useState<number | null>(null);

  // Compute step width for stepItems
  useEffect(() => {
    if (!stepItems) return;
    const compute = () => {
      const inner = innerRef.current;
      if (!inner || inner.children.length === 0) { setStepPx(null); return; }
      const first = inner.children[0] as HTMLElement;
      const style = getComputedStyle(inner);
      const gap = parseFloat(style.columnGap || "0");
      setStepPx(first.offsetWidth + (gap || 0));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [stepItems, children]);

  const scrollBy = useCallback((dir: -1 | 1, mode: "step" | "page" = "step") => {
    const el = ref.current;
    if (!el) return;
    let amount = itemWidth ?? el.clientWidth * 0.9;
    if (mode === "step" && stepItems) {
      amount = (stepPx ?? amount) * stepItems;
    }
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, [itemWidth, stepItems, stepPx]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;
    let id: number | null = null;
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      if (el.scrollWidth <= el.clientWidth + 4) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else scrollBy(1, stepItems ? "step" : "page");
    };
    if (!paused) id = window.setInterval(tick, Math.max(1200, intervalMs));
    return () => { if (id) window.clearInterval(id); };
  }, [autoPlay, intervalMs, paused, scrollBy, stepItems]);

  const wrapperProps = pauseOnHover
    ? { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false) }
    : {};

  return (
    <div className={clsx("relative", className)} {...wrapperProps}>
      {/* Previous Button */}
      <button
        aria-label="Previous"
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 shadow ring-1 ring-foreground/10 p-2 hover:bg-muted disabled:opacity-40"
        onClick={() => scrollBy(-1, stepItems ? "step" : "page")}
        type="button"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Scroll container */}
      <div ref={ref} className="scroll-smooth overflow-x-auto px-2">
        <div
          ref={innerRef}
          className="grid grid-flow-col gap-4 auto-cols-[minmax(250px,1fr)]"
        >
          {children}
        </div>
      </div>

      {/* Next Button */}
      <button
        aria-label="Next"
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 shadow ring-1 ring-foreground/10 p-2 hover:bg-muted disabled:opacity-40"
        onClick={() => scrollBy(1, stepItems ? "step" : "page")}
        type="button"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
