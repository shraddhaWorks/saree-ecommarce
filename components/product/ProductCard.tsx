"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useWishlistItem } from "@/hooks/use-wishlist-item";
import { FALLBACK_SAREE_IMAGE } from "@/lib/storefront-images";
import type { StorefrontProduct as Product } from "@/types/storefront";

import { ProductTileQuickActions } from "./ProductTileQuickActions";
import { WishlistFloatingHeart, WishlistInlineHeart } from "./WishlistHeartButtons";

interface Props {
  product: Product;
  /** Tighter layout for dense grids (e.g. home “Best of Sale”). */
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: Props) {
  const thumbRaw = product.images[0]?.trim() ?? "";
  const thumb = thumbRaw || FALLBACK_SAREE_IMAGE;
  const [imgSrc, setImgSrc] = useState(thumb);
  useEffect(() => {
    setImgSrc(thumb);
  }, [thumb]);
  const isOutOfStock = !product.inStock || product.stock <= 0;

  const wishlist = useWishlistItem({
    productId: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: imgSrc,
  });

  const shell = compact
    ? "rounded-lg shadow-sm"
    : "rounded-xl shadow-md";

  return (
    <div
      className={`group relative min-w-0 overflow-hidden bg-white ${shell}`}
    >
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(FALLBACK_SAREE_IMAGE)}
            className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${compact ? "aspect-[3/4]" : "aspect-[3/4] sm:aspect-[4/5]"}`}
          />
        </Link>

        {product.discount ? (
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
              {product.discount}% OFF
            </span>
          </div>
        ) : null}

        <WishlistFloatingHeart
          name={product.name}
          compact={compact}
          saved={wishlist.saved}
          busy={wishlist.busy}
          toggle={wishlist.toggle}
        />

        <ProductTileQuickActions
          label={product.name}
          compact={compact}
          addDisabled={isOutOfStock}
          addDisabledLabel={isOutOfStock ? "Out of stock" : undefined}
          cart={{
            mode: "direct",
            productId: product.id,
            name: product.name,
            price: product.price,
            image: imgSrc,
          }}
          className={`absolute z-[2] ${compact ? "bottom-2 right-2" : "bottom-3 right-3"}`}
        />
      </div>

      <div className={`min-w-0 text-left ${compact ? "p-2" : "p-3 sm:p-4"}`}>
        <Link href={`/products/${product.slug}`} className="block min-w-0">
          <p
            className={`break-words font-medium leading-snug text-[#1a1512] ${compact ? "line-clamp-2 text-xs" : "text-sm"}`}
          >
            {product.name}
          </p>
          <div className={`flex flex-wrap items-baseline gap-1.5 ${compact ? "mt-1" : "mt-2 gap-2"}`}>
            {product.compareAtPrice != null && product.compareAtPrice > product.price ? (
              <span className={`text-black/40 line-through ${compact ? "text-[11px]" : "text-sm"}`}>
                Rs. {product.compareAtPrice.toLocaleString("en-IN")}.00
              </span>
            ) : null}
            <span
              className={`font-semibold ${product.discount ? "text-[#c41e3a]" : "text-accent"} ${compact ? "text-xs" : "text-sm"}`}
            >
              Rs. {product.price.toLocaleString("en-IN")}.00
            </span>
          </div>
        </Link>
        <WishlistInlineHeart
          name={product.name}
          compact={compact}
          saved={wishlist.saved}
          busy={wishlist.busy}
          toggle={wishlist.toggle}
        />
      </div>
    </div>
  );
}
