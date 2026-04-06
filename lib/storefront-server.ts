import {
  filterProducts,
  parseCollectionBrowse,
  sortProducts,
} from "@/lib/collection-browse";
import prisma from "@/lib/db";
import type { HeroSlide, HomeGridItem, SiteConfig } from "@/lib/generated/prisma/client";
import { toStorefrontProduct } from "@/lib/storefront-map";
import type { StorefrontProduct } from "@/types/storefront";

export type StorefrontPayload = {
  siteConfig: SiteConfig;
  heroSlides: HeroSlide[];
  gridItems: HomeGridItem[];
  specialProducts: StorefrontProduct[];
};

async function ensureSiteConfig(): Promise<SiteConfig> {
  return prisma.siteConfig.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: {},
  });
}

export async function getStorefrontPayload(): Promise<StorefrontPayload> {
  const [siteConfig, heroSlidesRaw, gridItems, specialRows, fallbackHeroRows] = await Promise.all([
    ensureSiteConfig(),
    prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.homeGridItem.findMany({ orderBy: [{ section: "asc" }, { sortOrder: "asc" }] }),
    prisma.product.findMany({
      where: {
        isSpecial: true,
        inStock: true,
        stockQuantity: { gt: 0 },
      },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
      orderBy: { updatedAt: "desc" },
      take: 12,
    }),
    prisma.product.findMany({
      where: {
        inStock: true,
        stockQuantity: { gt: 0 },
      },
      include: {
        category: true,
        images: { orderBy: { position: "asc" } },
      },
      orderBy: { updatedAt: "desc" },
      take: 6,
    }),
  ]);

  const heroSlides =
    heroSlidesRaw.length > 0
      ? heroSlidesRaw
      : fallbackHeroRows.map((row, index) => {
          const product = toStorefrontProduct(row);
          const now = new Date();
          return {
            id: `fallback-${row.id}`,
            imageUrl: product.images[0],
            altText: product.name,
            linkUrl: `/products/${product.slug}`,
            sortOrder: index,
            createdAt: now,
            updatedAt: now,
          };
        });

  return {
    siteConfig,
    heroSlides,
    gridItems,
    specialProducts: specialRows.map(toStorefrontProduct),
  };
}

export async function getFilteredSpecialProducts(
  rawSearchParams?: Record<string, string | string[] | undefined>,
): Promise<StorefrontProduct[]> {
  const browse = parseCollectionBrowse(rawSearchParams ?? {});

  const specialRows = await prisma.product.findMany({
    where: {
      isSpecial: true,
      inStock: true,
      stockQuantity: { gt: 0 },
    },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
    },
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  return sortProducts(filterProducts(specialRows, browse), browse.sort).map(toStorefrontProduct);
}
