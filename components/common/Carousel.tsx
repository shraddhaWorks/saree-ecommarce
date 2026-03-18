"use client";

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface CarouselProps {
    /** Items to render in the carousel (preferred). */
    slides?: ReactNode[];
    /** Alternative to slides: any children will be treated as slides. */
    children?: ReactNode;
    /** Add custom className to the outer wrapper. */
    className?: string;
    /** Show navigation arrows (prev/next). */
    showArrows?: boolean;
    /** Show slide indicators (dots). */
    showIndicators?: boolean;
    /** Automatically advance slides. */
    autoPlay?: boolean;
    /** Pause auto-play when hovering over the carousel. */
    pauseOnHover?: boolean;
    /** Auto play interval in milliseconds. */
    autoPlayInterval?: number;
    /** Loop slides when reaching the end. */
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

        // Normalize children into an array of nodes
        const childrenArray = React.Children.toArray(children);
        return childrenArray.length > 0 ? childrenArray : [];
    }, [children, slides]);

    const slideCount = slideChildren.length;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

    const goToIndex = useCallback(
        (index: number) => {
            if (!trackRef.current || slideCount === 0) return;
            const normalized =
                index < 0 ? (loop ? slideCount - 1 : 0) : index >= slideCount ? (loop ? 0 : slideCount - 1) : index;
            setActiveIndex(normalized);

            const target = itemRefs.current[normalized];
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        },
        [loop, slideCount]
    );

    const next = useCallback(() => {
        goToIndex(activeIndex + 1);
    }, [activeIndex, goToIndex]);

    const prev = useCallback(() => {
        goToIndex(activeIndex - 1);
    }, [activeIndex, goToIndex]);

    useEffect(() => {
        if (!autoPlay || slideCount <= 1) return;
        if (isPaused) return;

        const interval = window.setInterval(() => {
            setActiveIndex((prev) => {
                const nextIndex = prev + 1;
                const normalized =
                    nextIndex < 0
                        ? loop
                            ? slideCount - 1
                            : 0
                        : nextIndex >= slideCount
                            ? loop
                                ? 0
                                : slideCount - 1
                            : nextIndex;

                return normalized;
            });
        }, autoPlayInterval);

        return () => window.clearInterval(interval);
    }, [autoPlay, autoPlayInterval, loop, isPaused, slideCount]);

    // Ensure scroll position stays in sync when activeIndex changes externally.
    useEffect(() => {
        const target = itemRefs.current[activeIndex];
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
    }, [activeIndex]);

    // Sync activeIndex if slideCount changes (e.g., dynamic slides)
    useEffect(() => {
        if (activeIndex >= slideCount) {
            setActiveIndex(slideCount - 1);
        }
    }, [activeIndex, slideCount]);

    if (slideCount === 0) {
        return null;
    }

    return (
        <div
            className={`relative w-full ${className}`.trim()}
            onMouseEnter={() => (pauseOnHover ? setIsPaused(true) : undefined)}
            onMouseLeave={() => (pauseOnHover ? setIsPaused(false) : undefined)}
        >
            <div
                ref={trackRef}
                className="relative flex w-full gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide"
                role="list"
            >
                {slideChildren.map((slide, idx) => (
                    <div
                        key={idx}
                        ref={(el) => {
                            itemRefs.current[idx] = el;
                        }}
                        className="snap-start shrink-0 w-full"
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-gray-700 shadow transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label="Previous slide"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-gray-700 shadow transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label="Next slide"
                    >
                        ›
                    </button>
                </>
            ) : null}

            {showIndicators && slideCount > 1 ? (
                <div className="mt-4 flex justify-center gap-2">
                    {slideChildren.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => goToIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-2 w-2 rounded-full transition-colors ${idx === activeIndex ? "bg-indigo-600" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
