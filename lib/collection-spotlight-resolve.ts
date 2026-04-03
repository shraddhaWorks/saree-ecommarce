import type { CollectionSpotlightItem } from "@/lib/collection-spotlight";
import prisma from "@/lib/db";
import { toStorefrontProduct, type ProductWithRelations } from "@/lib/storefront-map";
import type { StorefrontProduct } from "@/types/storefront";

export type SpotlightWithCatalog = CollectionSpotlightItem & {
  /** Resolved from `productId` or `productSlug`; null if nothing matches the database. */
  catalogProduct: StorefrontProduct | null;
};

/**
 * Loads catalog rows for each spotlight tile so Add to cart uses real ids/prices (no failing client fetch).
 */
export async function attachCatalogToSpotlights(
  items: CollectionSpotlightItem[],
): Promise<SpotlightWithCatalog[]> {
  const ids = [...new Set(items.map((i) => i.productId?.trim()).filter(Boolean))] as string[];
  const slugs = [
    ...new Set(
      items.map((i) => i.productSlug?.trim().toLowerCase()).filter(Boolean),
    ),
  ] as string[];

  const byId = new Map<string, StorefrontProduct>();
  const bySlug = new Map<string, StorefrontProduct>();

  if (ids.length > 0) {
    const rows = await prisma.product.findMany({
      where: { id: { in: ids } },
      include: { category: true, images: { orderBy: { position: "asc" } } },
    });
    for (const p of rows) {
      byId.set(p.id, toStorefrontProduct(p as ProductWithRelations));
    }
  }

  if (slugs.length > 0) {
    const rows = await prisma.product.findMany({
      where: {
        OR: slugs.map((s) => ({ slug: { equals: s, mode: "insensitive" } })),
      },
      include: { category: true, images: { orderBy: { position: "asc" } } },
    });
    for (const p of rows) {
      bySlug.set(p.slug.toLowerCase(), toStorefrontProduct(p as ProductWithRelations));
    }
  }

  return items.map((item) => {
    const id = item.productId?.trim();
    if (id && byId.has(id)) {
      return { ...item, catalogProduct: byId.get(id)! };
    }
    const slug = item.productSlug?.trim().toLowerCase();
    if (slug && bySlug.has(slug)) {
      return { ...item, catalogProduct: bySlug.get(slug)! };
    }
    return { ...item, catalogProduct: null };
  });
}
