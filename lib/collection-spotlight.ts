/**
 * Editorial tiles spliced into collection grids after the 6th product.
 * Images live under `public/collection-spotlight/`.
 */
export type CollectionSpotlightItem = {
  imageSrc: string;
  title: string;
  /** Rupees (same as StorefrontProduct.price). */
  price: number;
  compareAtPrice?: number;
  discount?: number;
  /**
   * Admin product `slug` — PDP link and cart when a row exists with this slug.
   * Prefer `productId` if slug is hard to match.
   */
  productSlug?: string;
  /** Admin product UUID — most reliable link for Add to cart (copy from Admin → Edit product URL). */
  productId?: string;
  /** Optional non-product URL when you do not use `productSlug`. */
  href?: string;
};

export const COLLECTION_SPOTLIGHT_ITEMS: CollectionSpotlightItem[] = [
  {
    imageSrc: "/collection-spotlight/spotlight-1.png",
    title: "Mangalgiri Silk Green Saree",
    price: 4705,
    productSlug: "mangalgiri-silk-green-saree",
  },
  {
    imageSrc: "/collection-spotlight/spotlight-2.png",
    title: "Kanchipattu Brocade Sea Green Saree",
    price: 36513,
    compareAtPrice: 40570,
    discount: 10,
    productSlug: "kanchipattu-brocade-sea-green-saree",
  },
  {
    imageSrc: "/collection-spotlight/spotlight-3.png",
    title: "Kanchipattu Brocade Sea Green Saree",
    price: 35703,
    compareAtPrice: 39670,
    discount: 10,
    productSlug: "kanchipattu-brocade-mint-saree",
  },
  {
    imageSrc: "/collection-spotlight/spotlight-4.png",
    title: "Green Pochampally Cotton Ikat Saree",
    price: 4995,
    productSlug: "green-pochampally-cotton-ikat-saree",
  },
  {
    imageSrc: "/collection-spotlight/spotlight-5.png",
    title: "Banaras Red Saree For Wedding",
    price: 15000,
    productSlug: "banaras-red-saree-for-wedding",
  },
];
