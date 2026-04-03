import { Suspense } from "react";

import { CollectionBrowseBar } from "@/components/collection/CollectionBrowseBar";
import { CollectionThemeNav } from "@/components/collection/CollectionThemeNav";
import Footer from "@/components/footer/Footer";
import { StorefrontProductGrid } from "@/components/product/StorefrontProductGrid";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import {
  buildFacets,
  collectionTitleFromHandle,
  filterProducts,
  parseCollectionBrowse,
  sortProducts,
} from "@/lib/collection-browse";
import { COLLECTION_SPOTLIGHT_ITEMS } from "@/lib/collection-spotlight";
import { attachCatalogToSpotlights } from "@/lib/collection-spotlight-resolve";
import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";

type SearchParams = Record<string, string | string[] | undefined>;

export const dynamic = "force-dynamic";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<SearchParams>;
}) {
  const { handle } = await params;
  const sp = searchParams ? await searchParams : {};

  const raw: SearchParams = { ...sp };
  const browse = parseCollectionBrowse(raw);

  const category = await prisma.category.findUnique({ where: { slug: handle } });

  const baseWhere = {
    inStock: true,
    stockQuantity: { gt: 0 },
    ...(category ? { categoryId: category.id } : {}),
  };

  const allRows = await prisma.product.findMany({
    where: baseWhere,
    include: { category: true, images: { orderBy: { position: "asc" } } },
    orderBy: { updatedAt: "desc" },
    take: 400,
  });

  const filtered = filterProducts(allRows, browse);
  const sorted = sortProducts(filtered, browse.sort);
  const products = sorted.map(toStorefrontProduct);
  const facets = buildFacets(allRows);

  const title = collectionTitleFromHandle(handle, category?.name);
  const spotlightWithCatalog = await attachCatalogToSpotlights(COLLECTION_SPOTLIGHT_ITEMS);

  return (
    <main className="min-h-screen bg-[#fbf7f0] text-[#201815]">
      <StorefrontNavbar />
      <section className="pb-16 pt-5 md:pt-8">
        <div className="mx-auto max-w-[1680px] px-3 sm:px-4 md:px-6 lg:px-8">
          <h1 className="font-serif-royal text-3xl font-semibold tracking-[0.02em] text-[#1a1512] md:text-4xl lg:text-[2.35rem]">
            {title}
          </h1>
          {browse.q ? (
            <p className="mt-2 text-sm text-black/55">
              Search: &ldquo;{browse.q}&rdquo;
            </p>
          ) : null}

          <div className="mt-4 md:mt-8">
            <CollectionThemeNav />
          </div>

          <hr className="my-4 border-0 border-t border-dotted border-black/30 md:my-8" />

          <Suspense
            fallback={
              <div className="h-16 w-full max-w-3xl animate-pulse rounded-full bg-black/[0.06]" />
            }
          >
            <CollectionBrowseBar facets={facets} />
          </Suspense>

          <p className="mt-4 text-sm font-bold tracking-wide text-[#1a1512] md:mt-5 md:text-base">
            {products.length === 1
              ? "1 Product"
              : `${products.length.toLocaleString("en-IN")} Products`}
          </p>

          {products.length === 0 ? (
            <>
              <div className="mt-6">
                <StorefrontProductGrid
                  products={[]}
                  density="default"
                  prependSpotlightItems={spotlightWithCatalog}
                />
              </div>
              <p className="mt-6 rounded-2xl border border-black/10 bg-white p-8 text-center text-sm text-black/55">
                No products match these filters. Try clearing filters or pick another category.
              </p>
            </>
          ) : (
            <div className="mt-6">
              <StorefrontProductGrid
                products={products}
                density="default"
                prependSpotlightItems={spotlightWithCatalog}
              />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
