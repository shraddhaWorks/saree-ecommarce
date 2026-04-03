import type { PromoItem } from "@/components/home/HomePromoGrid";

/**
 * Four “Discover timeless crafts” tiles — same UX as Your Wedding Edit (see WeddingEditSection).
 * Images: public/timeless-crafts/*.png (assets 2–5 from design, labels match reference row).
 */
export const TIMELESS_CRAFTS_HOME_TILES: PromoItem[] = [
  {
    id: "craft-handwoven-silks",
    title: "Handwoven Silks",
    imageUrl: "/timeless-crafts/handwoven-silks.png",
    linkUrl: "/collections/handwoven-silks",
  },
  {
    id: "craft-zari-classics",
    title: "Zari Classics",
    imageUrl: "/timeless-crafts/zari-classics.png",
    linkUrl: "/collections/zari-classics",
  },
  {
    id: "craft-motif-heritage",
    title: "Motif Heritage",
    imageUrl: "/timeless-crafts/motif-heritage.png",
    linkUrl: "/collections/motif-heritage",
  },
  {
    id: "craft-contemporary-weaves",
    title: "Contemporary Weaves",
    imageUrl: "/timeless-crafts/contemporary-weaves.png",
    linkUrl: "/collections/contemporary-weaves",
  },
];
