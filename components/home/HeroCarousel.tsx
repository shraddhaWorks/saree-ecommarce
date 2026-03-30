"use client";

import Carousel from "@/components/common/Carousel";
import { OutOrInLink } from "@/lib/external-link";

export type HeroSlideView = {
  id: string;
  imageUrl: string;
  altText: string | null;
  linkUrl: string | null;
};

export function HeroCarousel({ slides }: { slides: HeroSlideView[] }) {
  if (slides.length === 0) {
    return (
      <div className="relative flex h-[420px] w-full items-center justify-center bg-[#8f171f] text-center text-white sm:h-[520px] lg:h-[700px]">
        <p className="max-w-md px-6 text-sm sm:text-base">
          No hero images yet. Add cover photos in{" "}
          <strong>Admin → Storefront</strong>.
        </p>
      </div>
    );
  }

  const nodes = slides.map((s) => (
    <div
      key={s.id}
      className="relative h-[420px] w-full overflow-hidden bg-[#8f171f] sm:h-[520px] lg:h-[700px]"
    >
      {s.linkUrl ? (
        <OutOrInLink href={s.linkUrl} className="block h-full w-full">
          <img
            src={s.imageUrl}
            alt={s.altText ?? ""}
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
        </OutOrInLink>
      ) : (
        <img
          src={s.imageUrl}
          alt={s.altText ?? ""}
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25" />
    </div>
  ));

  return <Carousel slides={nodes} className="w-full" />;
}
