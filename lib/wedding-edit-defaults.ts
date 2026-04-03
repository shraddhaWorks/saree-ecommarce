import type { PromoItem } from "@/components/home/HomePromoGrid";

/**
 * Five Pattu tiles always shown on the home “Your Wedding Edit” section.
 * Images live in `public/wedding-edit/` — commit that folder for production.
 */
export const WEDDING_EDIT_HOME_TILES: PromoItem[] = [
  {
    id: "wedding-pattu-kanchi",
    title: "Kanchi pattu sarees",
    imageUrl: "/wedding-edit/kanchi-pattu.png",
    linkUrl: "/collections/kanchi-pattu-sarees",
  },
  {
    id: "wedding-pattu-gadwal",
    title: "Gadwal pattu sarees",
    imageUrl: "/wedding-edit/gadwal-pattu.png",
    linkUrl: "/collections/gadwal-pattu-sarees",
  },
  {
    id: "wedding-pattu-venkatagiri",
    title: "Venkatagiri silk sarees",
    imageUrl: "/wedding-edit/venkatagiri-silk.png",
    linkUrl: "/collections/venkatagiri-silk-sarees",
  },
  {
    id: "wedding-pattu-uppada",
    title: "Uppada Pattu sarees",
    imageUrl: "/wedding-edit/uppada-pattu.png",
    linkUrl: "/collections/uppada-pattu-sarees",
  },
  {
    id: "wedding-pattu-dharmavaram",
    title: "Dharmavaram Pattu Sarees",
    imageUrl: "/wedding-edit/dharmavaram-pattu.png",
    linkUrl: "/collections/dharmavaram-pattu-sarees",
  },
];

/** @deprecated Use WEDDING_EDIT_HOME_TILES — home page no longer reads wedding tiles from the database. */
export const WEDDING_EDIT_FALLBACK_TILES = WEDDING_EDIT_HOME_TILES;
