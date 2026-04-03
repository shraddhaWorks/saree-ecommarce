import type { PromoItem } from "@/components/home/HomePromoGrid";

/**
 * Static “Shop by Occasion” tiles — 2×2 on sm+ (two per row), stacked on mobile.
 * Images: public/shop-by-occasion/*.png
 * Links align with `components/navbar/nav-items.ts` collection slugs.
 */
export const SHOP_BY_OCCASION_HOME_TILES: PromoItem[] = [
  {
    id: "occasion-festive",
    title: "Festive",
    imageUrl: "/shop-by-occasion/festive.png",
    linkUrl: "/collections/festive-wear",
  },
  {
    id: "occasion-wedding",
    title: "Wedding",
    imageUrl: "/shop-by-occasion/wedding.png",
    linkUrl: "/collections/wedding-sarees",
  },
  {
    id: "occasion-casual",
    title: "Casual",
    imageUrl: "/shop-by-occasion/casual.png",
    linkUrl: "/collections/casual-workwear",
  },
  {
    id: "occasion-party",
    title: "Party",
    imageUrl: "/shop-by-occasion/party.png",
    linkUrl: "/collections/designer-party-wear",
  },
];
