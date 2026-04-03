/**
 * Fixed “Shop by Price” tiles on the home page (assets in /public/shop-by-price).
 * Links use collection browse query `priceMax` (rupees, inclusive).
 */

export type ShopByPriceTile = {
  id: string;
  /** Upper bound in rupees (inclusive), e.g. 5000 → products with price ≤ ₹5,000 */
  maxRupees: number;
  imageSrc: string;
  alt: string;
};

/** Default collection slug; must match a Category.slug or any handle (unknown slug = all in-stock products). */
export const SHOP_BY_PRICE_COLLECTION_SLUG = "sarees";

export const SHOP_BY_PRICE_TILES: readonly ShopByPriceTile[] = [
  {
    id: "under-5000",
    maxRupees: 5000,
    imageSrc: "/shop-by-price/under-5000.png",
    alt: "Shop sarees under five thousand rupees",
  },
  {
    id: "under-10000",
    maxRupees: 10000,
    imageSrc: "/shop-by-price/under-10000.png",
    alt: "Shop sarees under ten thousand rupees",
  },
  {
    id: "under-15000",
    maxRupees: 15000,
    imageSrc: "/shop-by-price/under-15000.png",
    alt: "Shop sarees under fifteen thousand rupees",
  },
  {
    id: "under-20000",
    maxRupees: 20000,
    imageSrc: "/shop-by-price/under-20000.png",
    alt: "Shop sarees under twenty thousand rupees",
  },
] as const;

export function shopByPriceHref(collectionSlug: string, maxRupees: number): string {
  const q = new URLSearchParams({ priceMax: String(maxRupees) }).toString();
  return `/collections/${encodeURIComponent(collectionSlug)}?${q}`;
}
