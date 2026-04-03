"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

import type { CollectionSpotlightItem } from "@/lib/collection-spotlight";
import { ProductTileQuickActions } from "@/components/product/ProductTileQuickActions";
import { FALLBACK_SAREE_IMAGE } from "@/lib/storefront-images";
import type { StorefrontProduct } from "@/types/storefront";

type Props = {
  item: CollectionSpotlightItem;
  compact?: boolean;
  /**
   * When provided (including `null`), cart uses DB-backed data when non-null.
   * `null` = no matching product for slug/id — Add to cart stays disabled.
   * Omit entirely to fall back to client fetch by slug (legacy).
   */
  catalogProduct?: StorefrontProduct | null;
};

/** Editorial file first so marketing art shows; DB photo used only if config path is empty. */
function primarySpotlightSrc(
  catalogProduct: StorefrontProduct | null | undefined,
  imageSrc: string,
): string {
  const fromConfig = imageSrc?.trim();
  const fromDb = catalogProduct?.images?.[0]?.trim();
  return fromConfig || fromDb || FALLBACK_SAREE_IMAGE;
}

function cartThumbForSpotlight(
  catalogProduct: StorefrontProduct | null | undefined,
  imageSrc: string,
): string {
  const fromDb = catalogProduct?.images?.[0]?.trim();
  const fromConfig = imageSrc?.trim();
  return fromDb || fromConfig || FALLBACK_SAREE_IMAGE;
}

function SpotlightTileImage({
  catalogProduct,
  imageSrc,
  title,
  compact,
  withHoverScale,
}: {
  catalogProduct?: StorefrontProduct | null;
  imageSrc: string;
  title: string;
  compact: boolean;
  withHoverScale?: boolean;
}) {
  const primary = primarySpotlightSrc(catalogProduct, imageSrc);
  const [src, setSrc] = useState(primary);

  useEffect(() => {
    setSrc(primary);
  }, [primary]);

  const scale = withHoverScale
    ? "transition duration-500 group-hover:scale-[1.03]"
    : "";

  return (
    <img
      src={src}
      alt={title}
      onError={() => setSrc(FALLBACK_SAREE_IMAGE)}
      className={`w-full object-cover ${scale} ${compact ? "aspect-[3/4]" : "aspect-[3/4] sm:aspect-[4/5]"}`}
    />
  );
}

/**
 * Editorial tile: links + cart match catalog when `catalogProduct` is resolved on the server.
 */
export function CollectionSpotlightCard({ item, compact = false, catalogProduct }: Props) {
  const legacyHref = item.href?.trim();
  const { imageSrc, title, price, compareAtPrice, discount } = item;

  const resolved = catalogProduct === undefined ? undefined : catalogProduct;
  const linkSlug =
    resolved?.slug ?? item.productSlug?.trim() ?? undefined;

  const shell = compact ? "rounded-lg shadow-sm" : "rounded-xl shadow-md";

  const meta = (
    <div className={`min-w-0 text-left ${compact ? "p-2" : "p-3 sm:p-4"}`}>
      <p
        className={`break-words font-medium leading-snug text-[#1a1512] ${compact ? "line-clamp-2 text-xs" : "text-sm"}`}
      >
        {title}
      </p>
      <div className={`flex flex-wrap items-baseline gap-1.5 ${compact ? "mt-1" : "mt-2 gap-2"}`}>
        {compareAtPrice != null && compareAtPrice > price ? (
          <span className={`text-black/40 line-through ${compact ? "text-[11px]" : "text-sm"}`}>
            Rs. {compareAtPrice.toLocaleString("en-IN")}.00
          </span>
        ) : null}
        <span
          className={`font-semibold ${discount ? "text-[#c41e3a]" : "text-accent"} ${compact ? "text-xs" : "text-sm"}`}
        >
          Rs. {price.toLocaleString("en-IN")}.00
        </span>
      </div>
    </div>
  );

  const badges =
    discount != null ? (
      <div
        className={`pointer-events-none absolute flex flex-col gap-0.5 ${compact ? "left-1.5 top-1.5" : "left-2 top-2 sm:left-3 sm:top-3"}`}
      >
        <span
          className={`bg-[#c41e3a] font-bold uppercase tracking-wide text-white ${compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px] sm:text-xs"}`}
        >
          SALE
        </span>
        <span
          className={`bg-[#c41e3a] font-bold text-white ${compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[10px] sm:text-xs"}`}
        >
          {discount}% OFF
        </span>
      </div>
    ) : null;

  if (linkSlug) {
    const inStockOk =
      resolved != null ? resolved.inStock && resolved.stock > 0 : true;
    const addDisabled =
      resolved != null ? !inStockOk : catalogProduct === null ? true : false;
    const addDisabledLabel =
      resolved != null && !inStockOk
        ? "Out of stock"
        : catalogProduct === null
          ? "Not in catalog"
          : undefined;

    const thumbForCart = cartThumbForSpotlight(resolved ?? null, imageSrc);

    return (
      <div className={`group relative min-w-0 cursor-pointer overflow-hidden bg-white ${shell}`}>
        <div className="relative">
          <Link href={`/products/${linkSlug}`} className="block">
            <SpotlightTileImage
              catalogProduct={resolved ?? null}
              imageSrc={imageSrc}
              title={title}
              compact={compact}
              withHoverScale
            />
          </Link>
          {badges}
          <Link
            href={`/products/${linkSlug}`}
            className={`absolute z-[1] rounded-full bg-black text-white transition hover:opacity-90 ${compact ? "right-2 top-2 p-1.5" : "right-3 top-3 p-2"}`}
            aria-label={`Quick view ${title}`}
          >
            <Eye size={compact ? 14 : 16} aria-hidden />
          </Link>
          <ProductTileQuickActions
            productSlug={linkSlug}
            label={title}
            compact={compact}
            addDisabled={addDisabled}
            addDisabledLabel={addDisabledLabel}
            cart={
              resolved != null
                ? {
                    mode: "direct",
                    productId: resolved.id,
                    name: resolved.name,
                    price: resolved.price,
                    image: thumbForCart,
                  }
                : { mode: "slug", slug: linkSlug }
            }
            className={`absolute z-[2] ${compact ? "bottom-2 right-2" : "bottom-3 right-3"}`}
          />
        </div>
        <Link href={`/products/${linkSlug}`} className="block min-w-0">
          {meta}
        </Link>
      </div>
    );
  }

  if (legacyHref) {
    return (
      <Link
        href={legacyHref}
        className={`group relative block min-w-0 cursor-pointer overflow-hidden bg-white ${shell}`}
      >
        <div className="relative">
          <SpotlightTileImage
            catalogProduct={undefined}
            imageSrc={imageSrc}
            title={title}
            compact={compact}
            withHoverScale
          />
          {badges}
          <span
            className={`absolute rounded-full bg-black text-white ${compact ? "right-2 top-2 p-1.5" : "right-3 top-3 p-2"}`}
          >
            <Eye size={compact ? 14 : 16} aria-hidden />
          </span>
        </div>
        {meta}
      </Link>
    );
  }

  return (
    <div className={`group relative min-w-0 cursor-default overflow-hidden bg-white ${shell}`}>
      <div className="relative">
        <SpotlightTileImage
          catalogProduct={undefined}
          imageSrc={imageSrc}
          title={title}
          compact={compact}
        />
        {badges}
        <span
          className={`absolute rounded-full bg-black text-white ${compact ? "right-2 top-2 p-1.5" : "right-3 top-3 p-2"}`}
        >
          <Eye size={compact ? 14 : 16} aria-hidden />
        </span>
      </div>
      {meta}
    </div>
  );
}
