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
  const [siteConfig, heroSlides, gridItems, specialRows] = await Promise.all([
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
  ]);

  return {
    siteConfig,
    heroSlides,
    gridItems,
    specialProducts: specialRows.map(toStorefrontProduct),
  };
}
