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
  const scrollSyncTimerRef = useRef<number | null>(null);
  const [touchInProgress, setTouchInProgress] = useState(false);
  const currentIndex = slideCount > 0 ? Math.min(activeIndex, slideCount - 1) : 0;

  const goToIndex = useCallback(
    (index: number) => {
      if (!trackRef.current || slideCount === 0) return;
      const normalized =
        index < 0 ? (loop ? slideCount - 1 : 0) : index >= slideCount ? (loop ? 0 : slideCount - 1) : index;
      setActiveIndex(normalized);

      if (!trackRef.current) return;
      const container = trackRef.current;
      const slideWidth = container.clientWidth;
      const newScrollLeft = normalized * slideWidth;
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    },
    [loop, slideCount],
  );

  const next = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const prev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const syncActiveFromScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || slideCount < 1) return;
    const w = el.clientWidth;
    if (w < 1) return;
    const idx = Math.round(el.scrollLeft / w);
    const clamped = Math.max(0, Math.min(slideCount - 1, idx));
    setActiveIndex((prev) => (prev === clamped ? prev : clamped));
  }, [slideCount]);

  const handleTrackScroll = useCallback(() => {
    if (scrollSyncTimerRef.current) {
      window.clearTimeout(scrollSyncTimerRef.current);
    }
    scrollSyncTimerRef.current = window.setTimeout(() => {
      scrollSyncTimerRef.current = null;
      syncActiveFromScroll();
    }, 60);
  }, [syncActiveFromScroll]);

  useEffect(() => {
    return () => {
      if (scrollSyncTimerRef.current) {
        window.clearTimeout(scrollSyncTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoPlay || slideCount <= 1 || isPaused || touchInProgress) return;

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
  }, [autoPlay, autoPlayInterval, isPaused, loop, slideCount, touchInProgress]);

  useEffect(() => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const slideWidth = container.clientWidth;
    container.scrollTo({ left: currentIndex * slideWidth, behavior: "smooth" });
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
        className="relative flex w-full touch-pan-x overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        role="list"
        onScroll={handleTrackScroll}
        onScrollEnd={syncActiveFromScroll}
        onPointerDown={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            setTouchInProgress(true);
          }
        }}
        onPointerUp={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            window.setTimeout(() => setTouchInProgress(false), 400);
            window.setTimeout(() => syncActiveFromScroll(), 120);
          }
        }}
        onPointerCancel={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            setTouchInProgress(false);
          }
        }}
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
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 min-h-12 min-w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:left-8"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 min-h-12 min-w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:right-8"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      ) : null}

      {showIndicators && slideCount > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/40 px-4 py-2.5 backdrop-blur-xl border border-white/10 md:bottom-8 md:gap-4 md:px-6 md:py-3">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="text-white hover:text-white/80 transition"
            aria-label={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            )}
          </button>
          <div className="flex items-center gap-2">
            {slideChildren.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 transition-all duration-500 rounded-full ${idx === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
