import {
  buildFacets,
  collectionTitleFromHandle,
  filterProducts,
  parseCollectionBrowse,
  productMatchesMegaMenuLabel,
  sortProducts,
  type CollectionBrowseState,
  type CollectionFacets,
} from "@/lib/collection-browse";
import prisma from "@/lib/db";
import { MEGA_LINE_SLUG_RULES } from "@/lib/mega-menu-line-match";
import { MEGA_MENU_SLUG_META } from "@/lib/static-nav-data";
import { toStorefrontProduct, type ProductWithRelations } from "@/lib/storefront-map";
import type { StorefrontProduct } from "@/types/storefront";

/** Query key: optional H1 override (e.g. Your Wedding Edit cards → same catalog, custom title). */
export const COLLECTION_DISPLAY_TITLE_PARAM = "displayTitle";

const DISPLAY_TITLE_MAX_LEN = 120;

function pickDisplayTitleOverride(
  raw?: Record<string, string | string[] | undefined>,
): string | null {
  if (!raw) return null;
  const v = raw[COLLECTION_DISPLAY_TITLE_PARAM];
  const s = Array.isArray(v) ? v[0] : v;
  if (typeof s !== "string") return null;
  let t = s.trim();
  if (!t) return null;
  try {
    t = decodeURIComponent(t);
  } catch {
    // use trimmed raw
  }
  t = t.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, DISPLAY_TITLE_MAX_LEN);
  return t || null;
}

export type CollectionCatalogResult = {
  handle: string;
  browse: CollectionBrowseState;
  title: string;
  category: Awaited<ReturnType<typeof prisma.category.findUnique>>;
  parentCategory: Awaited<ReturnType<typeof prisma.category.findUnique>>;
  megaMeta: (typeof MEGA_MENU_SLUG_META)[string] | undefined;
  facets: CollectionFacets;
  products: StorefrontProduct[];
  /** Rows after line filter, before browse filters (for messaging). */
  linePoolLength: number;
};

/**
 * Same catalog resolution as `/collections/[handle]` (Prisma + line rules + browse filters).
 * Use from the collection page, `GET /api/collections/[handle]`, or other server code.
 */
export async function getCollectionCatalog(
  handle: string,
  rawSearchParams?: Record<string, string | string[] | undefined>,
): Promise<CollectionCatalogResult> {
  const browse = parseCollectionBrowse(rawSearchParams ?? {});

  const category = await prisma.category.findUnique({ where: { slug: handle } });
  const megaMeta = MEGA_MENU_SLUG_META[handle];

  const parentCategory =
    !category && megaMeta
      ? await prisma.category.findUnique({ where: { slug: megaMeta.parentCollectionSlug } })
      : null;

  const baseWhere = {
    inStock: true,
    stockQuantity: { gt: 0 },
    ...(category ? { categoryId: category.id } : {}),
    ...(!category && parentCategory ? { categoryId: parentCategory.id } : {}),
  };

  const allRows: ProductWithRelations[] =
    category || parentCategory || !megaMeta
      ? await prisma.product.findMany({
          where: baseWhere,
          include: { category: true, images: { orderBy: { position: "asc" } } },
          orderBy: { updatedAt: "desc" },
          take: 400,
        })
      : [];

  function productMatchesLine(p: ProductWithRelations): boolean {
    if (!megaMeta) return true;
    const rule = MEGA_LINE_SLUG_RULES[handle];
    if (rule) {
      return rule(p) || productMatchesMegaMenuLabel(p, megaMeta.label);
    }
    return productMatchesMegaMenuLabel(p, megaMeta.label);
  }

  const linePool = megaMeta ? allRows.filter(productMatchesLine) : allRows;
  const filtered = sortProducts(filterProducts(linePool, browse), browse.sort);
  const products = filtered.map(toStorefrontProduct);
  const facets = buildFacets(linePool);

  const displayTitleOverride = pickDisplayTitleOverride(rawSearchParams);
  const title =
    displayTitleOverride ||
    category?.name?.trim() ||
    megaMeta?.label ||
    collectionTitleFromHandle(handle, category?.name);

  return {
    handle,
    browse,
    title,
    category,
    parentCategory,
    megaMeta,
    facets,
    products,
    linePoolLength: linePool.length,
  };
}
