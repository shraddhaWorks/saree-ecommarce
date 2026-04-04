import { labelToCollectionHref, toStaticSlug } from "@/lib/static-nav-data";

import type { MenuData, ShowcaseItem } from "./types";

function flattenNavItems(menu: MenuData) {
  return menu.sections.flatMap((s) => [...s.items]);
}

/**
 * Showcase card title → same `/collections/...` URL as the matching left-column link when possible
 * (Wedding Edit / mega menu flow).
 */
export function resolveMenuShowcaseHref(menu: MenuData, item: ShowcaseItem): string {
  if (item.href?.trim()) return item.href.trim();

  const navItems = flattenNavItems(menu);
  const key = toStaticSlug(item.title);
  const match = navItems.find((n) => toStaticSlug(n.label) === key);
  if (match?.href?.trim()) return match.href.trim();

  return labelToCollectionHref(item.title);
}

/** Mega menu list row: always a collection URL when href is missing. */
export function resolveMenuItemHref(item: { label: string; href?: string }): string {
  if (item.href?.trim()) return item.href.trim();
  return labelToCollectionHref(item.label);
}
