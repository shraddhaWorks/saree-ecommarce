import type { PromoItem } from "@/components/home/HomePromoGrid";

import { COLLECTION_DISPLAY_TITLE_PARAM } from "@/lib/collection-catalog";

/** Same catalog as `/collections/traditional-sarees` (full parent category — all in-stock products). */
export const WEDDING_EDIT_COLLECTION_HREF = "/collections/traditional-sarees";

/** Same product list as traditional sarees; page heading comes from `displayTitle` (card name). */
export function weddingEditTraditionalHref(cardHeading: string): string {
  const q = new URLSearchParams();
  q.set(COLLECTION_DISPLAY_TITLE_PARAM, cardHeading.trim());
  return `${WEDDING_EDIT_COLLECTION_HREF}?${q.toString()}`;
}

const WEDDING_EDIT_TILES_BASE = [
  {
    id: "wedding-pattu-kanchi",
    title: "Kanchi pattu sarees",
    imageUrl: "/wedding-edit/kanchi-pattu.png",
  },
  {
    id: "wedding-pattu-gadwal",
    title: "Gadwal pattu sarees",
    imageUrl: "/wedding-edit/gadwal-pattu.png",
  },
  {
    id: "wedding-pattu-venkatagiri",
    title: "Venkatagiri silk sarees",
    imageUrl: "/wedding-edit/venkatagiri-silk.png",
  },
  {
    id: "wedding-pattu-uppada",
    title: "Uppada Pattu sarees",
    imageUrl: "/wedding-edit/uppada-pattu.png",
  },
  {
    id: "wedding-pattu-dharmavaram",
    title: "Dharmavaram Pattu Sarees",
    imageUrl: "/wedding-edit/dharmavaram-pattu.png",
  },
] as const;

/**
 * Five Pattu tiles always shown on the home “Your Wedding Edit” section.
 * Each card links to the traditional sarees collection with an H1 matching the card title.
 * Images live in `public/wedding-edit/` — commit that folder for production.
 */
export const WEDDING_EDIT_HOME_TILES: PromoItem[] = WEDDING_EDIT_TILES_BASE.map((tile) => ({
  ...tile,
  linkUrl: weddingEditTraditionalHref(tile.title),
}));

/** @deprecated Use WEDDING_EDIT_HOME_TILES — home page no longer reads wedding tiles from the database. */
export const WEDDING_EDIT_FALLBACK_TILES = WEDDING_EDIT_HOME_TILES;
