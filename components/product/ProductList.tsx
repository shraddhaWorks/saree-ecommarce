import { StorefrontProductGrid } from "@/components/product/StorefrontProductGrid";
import {
  filterProducts,
  parseCollectionBrowse,
  sortProducts,
  type CollectionBrowseState,
} from "@/lib/collection-browse";
import { PRODUCT_LIST_FULL_PAGE_TAKE } from "@/lib/storefront-constants";
import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";

export type ProductListProps = {
  /**
   * When set (e.g. home page), only this many catalog products are shown after excluding spotlight SKUs.
   * When omitted, all matching in-stock products are shown (up to {@link PRODUCT_LIST_FULL_PAGE_TAKE}).
   */
  maxProducts?: number;
  rawSearchParams?: Record<string, string | string[] | undefined>;
};

export default async function ProductList({
  maxProducts,
  rawSearchParams,
}: ProductListProps = {}) {
  const take =
    maxProducts != null ? Math.min(PRODUCT_LIST_FULL_PAGE_TAKE, Math.max(maxProducts * 10, 48)) : PRODUCT_LIST_FULL_PAGE_TAKE;
  const browse: CollectionBrowseState = parseCollectionBrowse(rawSearchParams ?? {});

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

  let products = sortProducts(filterProducts(rows, browse), browse.sort).map(toStorefrontProduct);

  if (maxProducts != null) {
    products = products.slice(0, Math.max(0, maxProducts));
  }

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
          />
          <p className="mt-4 text-center text-sm text-black/55">
            No sarees found
            {maxProducts != null ? ` in this section` : ""}.
          </p>
        </>
      ) : (
        <StorefrontProductGrid
          products={products}
          density="compact"
        />
      )}
    </div>
  );
}
