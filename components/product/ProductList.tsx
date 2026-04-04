import { StorefrontProductGrid } from "@/components/product/StorefrontProductGrid";
import { COLLECTION_SPOTLIGHT_ITEMS } from "@/lib/collection-spotlight";
import { attachCatalogToSpotlights } from "@/lib/collection-spotlight-resolve";
import { PRODUCT_LIST_FULL_PAGE_TAKE } from "@/lib/storefront-constants";
import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";

const spotlightSlugs = new Set(
  COLLECTION_SPOTLIGHT_ITEMS.map((i) => i.productSlug?.trim().toLowerCase()).filter(
    Boolean,
  ) as string[],
);

export type ProductListProps = {
  /**
   * When set (e.g. home page), only this many catalog products are shown after excluding spotlight SKUs.
   * When omitted, all matching in-stock products are shown (up to {@link PRODUCT_LIST_FULL_PAGE_TAKE}).
   */
  maxProducts?: number;
};

export default async function ProductList({ maxProducts }: ProductListProps = {}) {
  const take =
    maxProducts != null ? Math.min(PRODUCT_LIST_FULL_PAGE_TAKE, Math.max(maxProducts * 10, 48)) : PRODUCT_LIST_FULL_PAGE_TAKE;

  const rows = await prisma.product.findMany({
    where: {
      inStock: true,
      stockQuantity: { gt: 0 },
    },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
    },
    orderBy: [{ isSpecial: "desc" }, { updatedAt: "desc" }],
    take,
  });

  let products = rows
    .map(toStorefrontProduct)
    .filter((p) => !spotlightSlugs.has(p.slug.toLowerCase()));

  if (maxProducts != null) {
    products = products.slice(0, Math.max(0, maxProducts));
  }
  const spotlightWithCatalog = await attachCatalogToSpotlights(COLLECTION_SPOTLIGHT_ITEMS);
  // Home (`maxProducts`): skip prepended spotlight cards so the grid is only catalog rows (stays at 6 cells).

  return (
    <div className="bg-white px-3 py-6 sm:px-6">
      <h2 className="mb-8 text-center font-serif-royal text-2xl font-semibold tracking-[0.02em] text-[#1a1512] md:mb-10 md:text-3xl lg:text-[2.15rem]">
        Best of Sale
      </h2>

      {products.length === 0 ? (
        <>
          <StorefrontProductGrid
            products={[]}
            density="compact"
            prependSpotlightItems={spotlightWithCatalog}
          />
          <p className="mt-4 text-center text-sm text-black/55">
            Add products in Admin — they will list below these picks when in stock
            {maxProducts != null ? ` (home shows up to ${maxProducts})` : ""}.
          </p>
        </>
      ) : (
        <StorefrontProductGrid
          products={products}
          density="compact"
          prependSpotlightItems={maxProducts != null ? [] : spotlightWithCatalog}
        />
      )}
    </div>
  );
}
