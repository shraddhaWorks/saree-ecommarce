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

  const slidesToRender =
    visibleSlides.length > 0
      ? visibleSlides
      : [
          {
            id: "fallback-hero",
            imageUrl: "",
            altText: "Rangam Temple of Sarees",
            linkUrl: null,
          },
        ];

  const nodes = slidesToRender.map((s) =>
    s.imageUrl ? (
    <div
      key={s.id}
      className="relative h-[72dvh] min-h-[220px] w-full touch-pan-x overflow-hidden bg-[#8f171f] lg:h-[700px] lg:min-h-0"
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20" />
    </div>
    ) : (
      <div
        key={s.id}
        className="relative flex h-[64dvh] min-h-[320px] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#b1433c_0%,#8f171f_45%,#4a0f1b_100%)] text-center text-white lg:h-[700px] lg:min-h-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%,rgba(255,214,170,0.1))]" />
        <div className="relative mx-auto max-w-2xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Rangam Temple of Sarees
          </p>
          <h2 className="mt-4 font-serif-royal text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Handpicked sarees for every celebration
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
            Explore signature weaves, festive drapes, and timeless silks curated for daily
            elegance and grand occasions.
          </p>
        </div>
      </div>
    ),
  );

  return (
    <Carousel
      key={isLg ? "lg" : "sm"}
      slides={nodes}
      className="mx-auto w-[90%] bg-[#8f171f] lg:w-full"
      edgeTapPercent={47}
      swipeUpForNext
    />
  );
}
