/**
 * Old mega-menu URLs were `/parent-slug/line-slug` (no App Router page → 404).
 * All of these must redirect/rewrite to `/collections/line-slug` (same as Wedding Edit tiles).
 * Keep `vercel.json` redirects in sync with this list.
 */
export const LEGACY_MEGA_MENU_PARENT_SLUGS = [
  "traditional-sarees",
  "wedding-sarees",
  "designer-and-party-wear-sarees",
  "festive-wear-sarees",
  "casual-and-workwear-sarees",
  "dhoti-and-kanduva",
] as const;

/**
 * Short URL prefixes used on some sites / bookmarks (nav collection roots differ from long mega-menu parents).
 * `/designer-party-wear/foo` → `/collections/foo` same as long parent form.
 */
export const LEGACY_SHORT_LINE_PARENT_SLUGS = [
  "designer-party-wear",
  "festive-wear",
  "casual-workwear",
  "dhoti-kanduva",
] as const;

/**
 * Exact path `/parent` (no child) → real storefront collection root.
 * Fixes 404 when middleware only handled `/parent/child` before.
 */
export const LEGACY_PARENT_TO_COLLECTION_ROOT: Record<string, string> = {
  "traditional-sarees": "/collections/traditional-sarees",
  "wedding-sarees": "/collections/wedding-sarees",
  "designer-and-party-wear-sarees": "/collections/designer-party-wear",
  "festive-wear-sarees": "/collections/festive-wear",
  "casual-and-workwear-sarees": "/collections/casual-workwear",
  "dhoti-and-kanduva": "/collections/dhoti-kanduva",
  "designer-party-wear": "/collections/designer-party-wear",
  "festive-wear": "/collections/festive-wear",
  "casual-workwear": "/collections/casual-workwear",
  "dhoti-kanduva": "/collections/dhoti-kanduva",
};

/** Longest first so a shorter slug never steals a match (defensive). */
export const LEGACY_LINE_PARENT_SLUGS_SORTED: string[] = [
  ...LEGACY_MEGA_MENU_PARENT_SLUGS,
  ...LEGACY_SHORT_LINE_PARENT_SLUGS,
].sort((a, b) => b.length - a.length);
