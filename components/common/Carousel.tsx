"use client";

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface CarouselProps {
  slides?: ReactNode[];
  children?: ReactNode;
  className?: string;
  showArrows?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
}

export default function Carousel({
  slides,
  children,
  className = "",
  showArrows = true,
  showIndicators = true,
  autoPlay = true,
  pauseOnHover = false,
  autoPlayInterval = 5000,
  loop = true,
}: CarouselProps) {
  const slideChildren = useMemo<ReactNode[]>(() => {
    if (slides && slides.length > 0) return slides;
    const childrenArray = React.Children.toArray(children);
    return childrenArray.length > 0 ? childrenArray : [];
  }, [children, slides]);

  const slideCount = slideChildren.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentIndex = slideCount > 0 ? Math.min(activeIndex, slideCount - 1) : 0;

  const goToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current || slideCount === 0) return;
      const normalized =
        index < 0 ? (loop ? slideCount - 1 : 0) : index >= slideCount ? (loop ? 0 : slideCount - 1) : index;
      setActiveIndex(normalized);

      const target = itemRefs.current[normalized];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    },
    [loop, slideCount],
  );

  const next = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const prev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  useEffect(() => {
    if (!autoPlay || slideCount <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prevIndex) => {
        const safeIndex = Math.min(prevIndex, slideCount - 1);
        const nextIndex = safeIndex + 1;
        if (nextIndex >= slideCount) {
          return loop ? 0 : slideCount - 1;
        }
        return nextIndex;
      });
    }, autoPlayInterval);

    return () => window.clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, loop, slideCount]);

  useEffect(() => {
    const target = itemRefs.current[currentIndex];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, [currentIndex]);

  if (slideCount === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`.trim()}
      onMouseEnter={() => (pauseOnHover ? setIsPaused(true) : undefined)}
      onMouseLeave={() => (pauseOnHover ? setIsPaused(false) : undefined)}
    >
      <div
        ref={trackRef}
        className="relative flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {slideChildren.map((slide, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className="w-full shrink-0 snap-start"
            role="listitem"
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && slideCount > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[28px] leading-none text-black shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-white"
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[28px] leading-none text-black shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-white"
            aria-label="Next slide"
          >
            &gt;
          </button>
        </>
      ) : null}

      {showIndicators && slideCount > 1 ? (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
          {slideChildren.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all ${
                idx === currentIndex
                  ? "h-4 w-4 border-2 border-white bg-transparent"
                  : "h-3 w-3 bg-white/95"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
