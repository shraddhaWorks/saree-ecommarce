import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import type { HomeGridSection } from "@/lib/generated/prisma/client";

const SECTIONS: HomeGridSection[] = [
  "WEDDING_EDIT",
  "SHOP_BY_PRICE",
  "CRAFTS",
  "SHOP_BY_OCCASION",
];

export async function GET() {
  try {
    const [siteConfig, heroSlides, gridItems] = await Promise.all([
      prisma.siteConfig.upsert({
        where: { id: "default" },
        create: { id: "default" },
        update: {},
      }),
      prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.homeGridItem.findMany({
        orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
      }),
    ]);

    return NextResponse.json(
      {
        siteConfig,
        heroSlides,
        gridItems,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/storefront error", err);
    return NextResponse.json(
      { error: "Failed to load storefront" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { profile } = await getUserFromRequest(req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as {
      siteConfig?: {
        weddingEditTitle?: string;
        shopByPriceTitle?: string;
        craftsTitle?: string;
        shopByOccasionTitle?: string;
        specialsTitle?: string;
        aboutTitle?: string;
        aboutBody?: string;
        aboutImageUrl?: string | null;
      };
      heroSlides?: {
        imageUrl: string;
        altText?: string | null;
        linkUrl?: string | null;
      }[];
      gridItems?: {
        section: string;
        title: string;
        imageUrl: string;
        linkUrl?: string | null;
      }[];
    };

    await prisma.$transaction(async (tx) => {
      if (body.siteConfig) {
        const c = body.siteConfig;
        await tx.siteConfig.upsert({
          where: { id: "default" },
          create: {
            id: "default",
            weddingEditTitle: c.weddingEditTitle ?? "Your Wedding Edit",
            shopByPriceTitle: c.shopByPriceTitle ?? "Shop by Price",
            craftsTitle: c.craftsTitle ?? "Discover timeless crafts",
            shopByOccasionTitle: c.shopByOccasionTitle ?? "Shop by Occasion",
            specialsTitle: c.specialsTitle ?? "Special picks",
            aboutTitle: c.aboutTitle ?? "About Us",
            aboutBody: c.aboutBody ?? "",
            aboutImageUrl: c.aboutImageUrl ?? null,
          },
          update: {
            ...(c.weddingEditTitle !== undefined && {
              weddingEditTitle: c.weddingEditTitle,
            }),
            ...(c.shopByPriceTitle !== undefined && {
              shopByPriceTitle: c.shopByPriceTitle,
            }),
            ...(c.craftsTitle !== undefined && { craftsTitle: c.craftsTitle }),
            ...(c.shopByOccasionTitle !== undefined && {
              shopByOccasionTitle: c.shopByOccasionTitle,
            }),
            ...(c.specialsTitle !== undefined && { specialsTitle: c.specialsTitle }),
            ...(c.aboutTitle !== undefined && { aboutTitle: c.aboutTitle }),
            ...(c.aboutBody !== undefined && { aboutBody: c.aboutBody }),
            ...(c.aboutImageUrl !== undefined && {
              aboutImageUrl: c.aboutImageUrl,
            }),
          },
        });
      }

      if (Array.isArray(body.heroSlides)) {
        await tx.heroSlide.deleteMany();
        const slides = body.heroSlides.filter((s) => s.imageUrl?.trim());
        for (let i = 0; i < slides.length; i++) {
          const s = slides[i];
          await tx.heroSlide.create({
            data: {
              imageUrl: s.imageUrl.trim(),
              altText: s.altText?.trim() || null,
              linkUrl: s.linkUrl?.trim() || null,
              sortOrder: i,
            },
          });
        }
      }

      if (Array.isArray(body.gridItems)) {
        await tx.homeGridItem.deleteMany();
        for (const section of SECTIONS) {
          const inSection = body.gridItems.filter((g) => g.section === section);
          for (let i = 0; i < inSection.length; i++) {
            const g = inSection[i];
            if (!g.imageUrl?.trim() || !g.title?.trim()) continue;
            await tx.homeGridItem.create({
              data: {
                section,
                title: g.title.trim(),
                imageUrl: g.imageUrl.trim(),
                linkUrl: g.linkUrl?.trim() || null,
                sortOrder: i,
              },
            });
          }
        }
      }
    });

    const [siteConfig, heroSlides, gridItems] = await Promise.all([
      prisma.siteConfig.findUniqueOrThrow({ where: { id: "default" } }),
      prisma.heroSlide.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.homeGridItem.findMany({
        orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
      }),
    ]);

    return NextResponse.json(
      { siteConfig, heroSlides, gridItems, success: true },
      { status: 200 },
    );
  } catch (err) {
    console.error("PUT /api/storefront error", err);
    return NextResponse.json(
      { error: "Failed to save storefront" },
      { status: 500 },
    );
  }
}
