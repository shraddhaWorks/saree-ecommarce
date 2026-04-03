import { StorefrontProductGrid } from "@/components/product/StorefrontProductGrid";
import { COLLECTION_SPOTLIGHT_ITEMS } from "@/lib/collection-spotlight";
import { attachCatalogToSpotlights } from "@/lib/collection-spotlight-resolve";
import { HOME_CATALOG_PREVIEW_LIMIT } from "@/lib/storefront-constants";
import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";

const spotlightSlugs = new Set(
  COLLECTION_SPOTLIGHT_ITEMS.map((i) => i.productSlug?.trim().toLowerCase()).filter(
    Boolean,
  ) as string[],
);

export default async function ProductList() {
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
    take: 32,
  });

  const products = rows
    .map(toStorefrontProduct)
    .filter((p) => !spotlightSlugs.has(p.slug.toLowerCase()))
    .slice(0, HOME_CATALOG_PREVIEW_LIMIT);
  const spotlightWithCatalog = await attachCatalogToSpotlights(COLLECTION_SPOTLIGHT_ITEMS);

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
            Add products in Admin — up to {HOME_CATALOG_PREVIEW_LIMIT} will list below these picks
            when in stock.
          </p>
        </>
      ) : (
        <StorefrontProductGrid
          products={products}
          density="compact"
          prependSpotlightItems={spotlightWithCatalog}
        />
      )}
    </div>
  );
}
