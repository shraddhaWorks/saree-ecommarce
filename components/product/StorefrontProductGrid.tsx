import type { ReactNode } from "react";

import { CollectionSpotlightCard } from "@/components/collection/CollectionSpotlightCard";
import type { CollectionSpotlightItem } from "@/lib/collection-spotlight";
import type { SpotlightWithCatalog } from "@/lib/collection-spotlight-resolve";
import type { StorefrontProduct } from "@/types/storefront";

import ProductCard from "./ProductCard";

export type StorefrontProductGridDensity = "compact" | "default";

type Props = {
  products: StorefrontProduct[];
  /** Smaller cards + tighter grid (home preview). */
  density?: StorefrontProductGridDensity;
  /** Editorial tiles shown first (e.g. five hero picks on home + category pages). */
  prependSpotlightItems?: SpotlightWithCatalog[];
  /**
   * After this many catalog products, insert `spotlightItems` once (e.g. 6).
   * Omit or set 0 to disable.
   */
  spotlightAfter?: number;
  spotlightItems?: CollectionSpotlightItem[];
  className?: string;
};

/**
 * Shared responsive product grid + optional editorial spotlight row (collection pages).
 */
export function StorefrontProductGrid({
  products,
  density = "default",
  prependSpotlightItems = [],
  spotlightAfter = 0,
  spotlightItems = [],
  className = "",
}: Props) {
  const compact = density === "compact";
  const cellClass =
    density === "compact"
      ? "w-full max-w-[11.25rem] sm:max-w-[12rem] md:max-w-[12.5rem]"
      : "w-full max-w-[14rem] sm:max-w-[15rem] md:max-w-[16rem] lg:max-w-[17rem]";

  const gridClass =
    density === "compact"
      ? "mx-auto grid w-full max-w-[1600px] grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      : "mx-auto grid w-full max-w-[1680px] grid-cols-2 justify-items-center gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-5";

  const showSpotlight =
    spotlightAfter > 0 && spotlightItems.length > 0 && products.length >= spotlightAfter;

  const head = showSpotlight ? products.slice(0, spotlightAfter) : products;
  const tail = showSpotlight ? products.slice(spotlightAfter) : [];

  const cells: ReactNode[] = [];

  prependSpotlightItems.forEach((item, i) => {
    cells.push(
      <div key={`prepend-spotlight-${i}`} className={cellClass}>
        <CollectionSpotlightCard
          item={item}
          compact={compact}
          catalogProduct={item.catalogProduct}
        />
      </div>,
    );
  });

  for (const p of head) {
    cells.push(
      <div key={p.id} className={cellClass}>
        <ProductCard product={p} compact={compact} />
      </div>,
    );
  }

  if (showSpotlight) {
    spotlightItems.forEach((item, i) => {
      cells.push(
        <div key={`spotlight-${i}`} className={cellClass}>
          <CollectionSpotlightCard item={item} compact={compact} />
        </div>,
      );
    });
  }

  for (const p of tail) {
    cells.push(
      <div key={p.id} className={cellClass}>
        <ProductCard product={p} compact={compact} />
      </div>,
    );
  }

  return <div className={`${gridClass} ${className}`.trim()}>{cells}</div>;
}
