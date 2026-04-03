/**
 * Top row on collection pages — matches Kalanjali-style three pills (image left, label right).
 * Images: `public/collection-theme/theme-1.svg` … `theme-3.svg` (replace with PNG/WebP using the same paths if you prefer).
 */
export type CollectionQuickNavItem = {
  id: string;
  label: string;
  imageUrl: string;
  /** Query string fragment (no leading ?). Empty = clear to collection default. */
  query: string;
};

export const COLLECTION_QUICK_NAV: CollectionQuickNavItem[] = [
  { id: "new", label: "New Arrivals", imageUrl: "/collection-theme/theme-1.svg", query: "sort=new" },
  { id: "bestsellers", label: "Bestsellers", imageUrl: "/collection-theme/theme-2.svg", query: "sort=bestselling" },
  { id: "shop-all", label: "Shop All", imageUrl: "/collection-theme/theme-3.svg", query: "" },
];

/** Thumbnails cycled for each row inside Fabric / Type / Speciality / Colour dropdowns. */
export const COLLECTION_DROPDOWN_SWATCHES = [
  "/collection-ui/dropdown-swatch-1.svg",
  "/collection-ui/dropdown-swatch-2.svg",
] as const;
