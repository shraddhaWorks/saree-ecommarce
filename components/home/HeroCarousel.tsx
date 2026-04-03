"use client";

import { useEffect, useMemo, useState } from "react";

import Carousel from "@/components/common/Carousel";
import { OutOrInLink } from "@/lib/external-link";

export type HeroSlideView = {
  id: string;
  imageUrl: string;
  altText: string | null;
  linkUrl: string | null;
  /** If true, slide is only included from the `lg` breakpoint (laptop/desktop). */
  desktopOnly?: boolean;
};

export function HeroCarousel({ slides }: { slides: HeroSlideView[] }) {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsLg(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const visibleSlides = useMemo(
    () => slides.filter((s) => !s.desktopOnly || isLg),
    [slides, isLg],
  );

  if (visibleSlides.length === 0) {
    return (
      <div className="relative flex h-[90dvh] min-h-[220px] w-full items-center justify-center bg-[#8f171f] text-center text-white lg:h-[700px] lg:min-h-0">
        <p className="max-w-md px-6 text-sm sm:text-base">
          No hero images yet. Add cover photos in{" "}
          <strong>Admin → Storefront</strong>.
        </p>
      </div>
    );
  }

  const nodes = visibleSlides.map((s) => (
    <div
      key={s.id}
      className="relative h-[90dvh] min-h-[220px] w-full touch-pan-x overflow-hidden bg-[#8f171f] lg:h-[700px] lg:min-h-0"
    >
      {s.linkUrl ? (
        <OutOrInLink
          href={s.linkUrl}
          className="block h-full w-full touch-pan-x [-webkit-user-drag:none]"
        >
          <img
            src={s.imageUrl}
            alt={s.altText ?? ""}
            className="block h-full w-full object-cover object-center select-none"
            draggable={false}
            loading="eager"
          />
        </OutOrInLink>
      ) : (
        <img
          src={s.imageUrl}
          alt={s.altText ?? ""}
          className="block h-full w-full touch-pan-x object-cover object-center select-none"
          draggable={false}
          loading="eager"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25" />
    </div>
  ));

  return (
    <Carousel
      key={isLg ? "lg" : "sm"}
      slides={nodes}
      className="w-full bg-[#8f171f]"
    />
  );
}
