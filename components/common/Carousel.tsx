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
  /**
   * Each side gets this % width as an invisible “tap to prev/next” band (center stays usable for links + horizontal swipe).
   * Example: 42 → left 42% tap = previous, right 42% = next, middle ~16% for hero CTA.
   */
  edgeTapPercent?: number;
  /** Finger swipes up (story-style) → next slide. */
  swipeUpForNext?: boolean;
  /**
   * Short tap/click almost anywhere on the track → next slide (captures clicks so full-bleed slide links won’t open).
   * When true, `edgeTapPercent` short-tap bands are skipped (swipe left/right/up still work).
   */
  tapAnywhereForNext?: boolean;
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
  edgeTapPercent = 0,
  swipeUpForNext = true,
  tapAnywhereForNext = false,
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
  /** Touch swipe: index at finger-down (mobile sensitivity). */
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartSlideIndex = useRef(0);
  const lastTouchEdgeNavAt = useRef(0);
  /** Touch target at finger-down (for tap-through elements like hero CTAs). */
  const touchStartTarget = useRef<EventTarget | null>(null);
  const currentIndex = slideCount > 0 ? Math.min(activeIndex, slideCount - 1) : 0;

  const isTapThroughTarget = useCallback((node: EventTarget | null) => {
    return node instanceof Element && node.closest("[data-carousel-tap-through]") != null;
  }, []);

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
    }, 32);
  }, [syncActiveFromScroll]);

  /** Light horizontal swipe advances slide (mobile thumbs often drift upward — keep this low). */
  const MIN_SWIPE_PX = 10;
  /**
   * Ignore swipe-to-advance only when vertical drag clearly wins (so slight “up” while swiping still moves slides).
   * Higher = more forgiving diagonal / upward drift.
   */
  const SWIPE_VERTICAL_DOMINANCE = 1.45;
  /** Upward swipe: next slide (mobile). */
  const SWIPE_UP_MIN_PX = 14;
  /** Upward movement must beat horizontal by this ratio (low = easier to trigger). */
  const SWIPE_UP_VS_HORIZONTAL = 0.42;
  /** Short tap (little movement) on left/right bands → prev/next; does not block horizontal scroll. */
  const TAP_MOVE_MAX_PX = 16;

  const edgePct = Math.min(48, Math.max(0, edgeTapPercent));

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartTarget.current = e.target;
      if (slideCount <= 1) return;
      const t = e.touches[0];
      if (!t) return;
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
      const el = trackRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (w < 1) return;
      const idx = Math.round(el.scrollLeft / w);
      touchStartSlideIndex.current = Math.max(0, Math.min(slideCount - 1, idx));
    },
    [slideCount],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (slideCount <= 1) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchStartX.current;
      const dy = t.clientY - touchStartY.current;

      if (swipeUpForNext) {
        if (
          dy < -SWIPE_UP_MIN_PX &&
          Math.abs(dy) > Math.abs(dx) * SWIPE_UP_VS_HORIZONTAL
        ) {
          lastTouchEdgeNavAt.current = Date.now();
          goToIndex(touchStartSlideIndex.current + 1);
          window.setTimeout(() => syncActiveFromScroll(), 80);
          return;
        }
      }

      if (Math.abs(dx) >= MIN_SWIPE_PX) {
        if (Math.abs(dy) <= Math.abs(dx) * SWIPE_VERTICAL_DOMINANCE) {
          const from = touchStartSlideIndex.current;
          if (dx < 0) {
            goToIndex(from + 1);
          } else {
            goToIndex(from - 1);
          }
          window.setTimeout(() => syncActiveFromScroll(), 80);
        }
        return;
      }

      if (
        tapAnywhereForNext &&
        Math.abs(dx) <= TAP_MOVE_MAX_PX &&
        Math.abs(dy) <= TAP_MOVE_MAX_PX
      ) {
        if (isTapThroughTarget(touchStartTarget.current)) return;
        lastTouchEdgeNavAt.current = Date.now();
        next();
        window.setTimeout(() => syncActiveFromScroll(), 80);
        return;
      }

      if (
        edgePct > 0 &&
        Math.abs(dx) <= TAP_MOVE_MAX_PX &&
        Math.abs(dy) <= TAP_MOVE_MAX_PX
      ) {
        const el = trackRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const relX = t.clientX - rect.left;
          const fw = rect.width;
          if (fw > 0) {
            const leftBand = (edgePct / 100) * fw;
            const rightStart = (1 - edgePct / 100) * fw;
            if (relX < leftBand) {
              lastTouchEdgeNavAt.current = Date.now();
              prev();
              window.setTimeout(() => syncActiveFromScroll(), 80);
            } else if (relX > rightStart) {
              lastTouchEdgeNavAt.current = Date.now();
              next();
              window.setTimeout(() => syncActiveFromScroll(), 80);
            }
          }
        }
      }
    },
    [edgePct, goToIndex, isTapThroughTarget, next, prev, slideCount, swipeUpForNext, syncActiveFromScroll, tapAnywhereForNext],
  );

  const handleTrackClickCapture = useCallback(
    (e: React.MouseEvent) => {
      if (slideCount <= 1) return;
      if (isTapThroughTarget(e.target)) return;
      if (Date.now() - lastTouchEdgeNavAt.current < 500) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (tapAnywhereForNext) {
        e.preventDefault();
        e.stopPropagation();
        next();
        window.setTimeout(() => syncActiveFromScroll(), 80);
        return;
      }
      if (edgePct <= 0) return;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const fw = rect.width;
      if (fw < 1) return;
      const leftBand = (edgePct / 100) * fw;
      const rightStart = (1 - edgePct / 100) * fw;
      if (relX < leftBand) {
        e.preventDefault();
        e.stopPropagation();
        prev();
        window.setTimeout(() => syncActiveFromScroll(), 80);
      } else if (relX > rightStart) {
        e.preventDefault();
        e.stopPropagation();
        next();
        window.setTimeout(() => syncActiveFromScroll(), 80);
      }
    },
    [edgePct, isTapThroughTarget, next, prev, slideCount, syncActiveFromScroll, tapAnywhereForNext],
  );

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
      className={`relative w-full overflow-hidden [overscroll-behavior-x:contain] ${className}`.trim()}
      onMouseEnter={() => (pauseOnHover ? setIsPaused(true) : undefined)}
      onMouseLeave={() => (pauseOnHover ? setIsPaused(false) : undefined)}
    >
      <div
        ref={trackRef}
        className="relative flex w-full touch-pan-x overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory lg:snap-proximity [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        role="list"
        onScroll={handleTrackScroll}
        onScrollEnd={syncActiveFromScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClickCapture={handleTrackClickCapture}
        onTouchCancel={() => syncActiveFromScroll()}
        onPointerDown={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            setTouchInProgress(true);
            const el = trackRef.current;
            if (el && e.pointerId != null) {
              try {
                el.setPointerCapture(e.pointerId);
              } catch {
                /* ignore */
              }
            }
          }
        }}
        onPointerUp={(e) => {
          if (e.pointerType === "touch" || e.pointerType === "pen") {
            const el = trackRef.current;
            if (el && e.pointerId != null) {
              try {
                if (el.hasPointerCapture(e.pointerId)) {
                  el.releasePointerCapture(e.pointerId);
                }
              } catch {
                /* ignore */
              }
            }
            window.setTimeout(() => setTouchInProgress(false), 280);
            window.setTimeout(() => syncActiveFromScroll(), 100);
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
            className="absolute left-4 top-1/2 z-[25] flex h-12 w-12 min-h-12 min-w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:left-8"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 z-[25] flex h-12 w-12 min-h-12 min-w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:right-8"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      ) : null}

      {showIndicators && slideCount > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-[25] flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/40 px-4 py-2.5 backdrop-blur-xl border border-white/10 md:bottom-8 md:gap-4 md:px-6 md:py-3">
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
