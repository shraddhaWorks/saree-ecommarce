/**
 * Maps `/collections/{slug}` mega-menu slugs (when not a real Category row) to the parent
 * collection slug + human label for scoped product filtering.
 */
export const MEGA_MENU_SLUG_META: Record<
  string,
  { parentCollectionSlug: string; label: string }
> = {};

export const toStaticSlug = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Same URL shape as Wedding Edit tiles: `/collections/{slug}`. */
export function labelToCollectionHref(label: string): string {
  return `/collections/${toStaticSlug(label)}`;
}

function addMegaMenuItems(parentCollectionSlug: string, labels: readonly string[]) {
  return labels.map((label) => {
    const slug = toStaticSlug(label);
    MEGA_MENU_SLUG_META[slug] = { parentCollectionSlug, label };
    return { label, href: `/collections/${slug}` as const };
  });
}

export const staticNavCategories = {
  traditionalSarees: {
    title: "Traditional Sarees",
    href: "/collections/traditional-sarees",
    items: addMegaMenuItems("traditional-sarees", [
      "Kanchi Pattu Sarees",
      "Banaras Sarees",
      "Paithani Sarees",
      "Patola Sarees",
      "Gadwal Pattu Sarees",
      "Arani Pattu Sarees",
      "Venkatagiri Sarees",
      "Uppada Pattu Sarees",
      "Mangalagiri Pattu Sarees",
      "Mysore Silk Sarees",
    ]),
  },
  weddingSarees: {
    title: "Wedding Sarees",
    href: "/collections/wedding-sarees",
    items: addMegaMenuItems("wedding-sarees", [
      "Bridal Sarees",
      "Reception Sarees",
      "Pradanam & Talambralu Sarees",
      "Nischayathartham/Engagement Sarees",
      "Mehendi & Haldi Sarees",
    ]),
  },
  designerPartyWearSarees: {
    title: "Designer & Party Wear Sarees",
    href: "/collections/designer-party-wear",
    items: addMegaMenuItems("designer-party-wear", [
      "Organza Sarees",
      "Zari Kota & Semi Kota Sarees",
      "Muslin, Dola & Mashru Sarees",
      "Fusion Sarees",
    ]),
  },
  festiveWearSarees: {
    title: "Festive Wear Sarees",
    href: "/collections/festive-wear",
    items: addMegaMenuItems("festive-wear", [
      "Pattu Pavada Set / Half Saree Set / Lehengas",
      "Chanderi & Bailu Silk Sarees",
      "Ikkat Sarees",
      "Bandini Sarees",
      "Fancy & Designer Sarees",
      "Soft Pattu",
    ]),
  },
  casualWorkwearSarees: {
    title: "Casual & Workwear Sarees",
    href: "/collections/casual-workwear",
    items: addMegaMenuItems("casual-workwear", [
      "Georgette, Crepe, Satin & Chiffon Silk Sarees",
      "Khadi, Jute, Bhagalpur & Printed Sarees",
      "Tissu Sarees",
      "Tusser Sarees",
    ]),
  },
  dhotiAndKanduva: {
    title: "Dhoti & Kanduva",
    href: "/collections/dhoti-kanduva",
    items: addMegaMenuItems("dhoti-kanduva", [
      "Silk Dhotis",
      "Cotton Dhotis",
      "Pattu Kanduvas",
      "Dhoti & Kanduva Sets",
    ]),
  },
  stores: {
    title: "Our Stores",
    href: "/stores",
    items: [
      { label: "Hyderabad Banjara Hills", href: "/stores#hyderabad-banjara-hills" },
      { label: "Secunderabad", href: "/stores#secunderabad" },
      { label: "Vijayawada", href: "/stores#vijayawada" },
      { label: "Visakhapatnam", href: "/stores#visakhapatnam" },
    ],
  },
} as const;

export const STATIC_NAV_COLLECTIONS_BY_HANDLE = Object.fromEntries(
  Object.values(staticNavCategories)
    .filter((category) => category.href.startsWith("/collections/"))
    .map((category) => [category.href.replace("/collections/", ""), category]),
) as Record<
  string,
  (typeof staticNavCategories)[keyof typeof staticNavCategories]
>;

/** Same line filter + parent scope as nav “Venkatagiri Sarees” (Your Wedding Edit tile URL). */
const vMeta = MEGA_MENU_SLUG_META["venkatagiri-sarees"];
if (vMeta) {
  MEGA_MENU_SLUG_META["venkatagiri-silk-sarees"] = { ...vMeta };
}

MEGA_MENU_SLUG_META["dharmavaram-pattu-sarees"] = {
  parentCollectionSlug: "traditional-sarees",
  label: "Dharmavaram Pattu Sarees",
};
