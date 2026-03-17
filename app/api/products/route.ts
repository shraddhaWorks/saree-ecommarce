import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ClothType, Occasion } from "@prisma/client";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const categorySlug = searchParams.get("category");
    const clothType = searchParams.get("clothType") as ClothType | null;
    const occasion = searchParams.get("occasion") as Occasion | null;
    const isSpecial = searchParams.get("special");
    const search = searchParams.get("search");
    const limit = Number(searchParams.get("limit") ?? "20");
    const offset = Number(searchParams.get("offset") ?? "0");

    const where: {
      category?: { slug: string };
      clothType?: ClothType;
      occasion?: Occasion;
      isSpecial?: boolean;
      OR?: { name?: { contains: string; mode: "insensitive" }; description?: { contains: string; mode: "insensitive" } }[];
    } = {};

    if (categorySlug) {
      where.category = { slug: categorySlug.toLowerCase() };
    }

    if (clothType && Object.values(ClothType).includes(clothType)) {
      where.clothType = clothType;
    }

    if (occasion && Object.values(Occasion).includes(occasion)) {
      where.occasion = occasion;
    }

    if (isSpecial === "true") {
      where.isSpecial = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { position: "asc" },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: offset,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json(
      {
        items,
        pagination: {
          total,
          limit,
          offset,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/products error", err);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { profile } = await getUserFromRequest(req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as {
      name?: string;
      slug?: string;
      description?: string;
      priceInPaise?: number;
      inStock?: boolean;
      clothType?: ClothType;
      occasion?: Occasion;
      isSpecial?: boolean;
      mainImageUrl?: string;
      thumbnailUrl?: string;
      color?: string;
      pattern?: string;
      blouseIncluded?: boolean;
      categoryId?: string;
      images?: { url: string; altText?: string; position?: number }[];
    };

    if (
      !body.name ||
      !body.slug ||
      typeof body.priceInPaise !== "number" ||
      !body.clothType ||
      !body.categoryId
    ) {
      return NextResponse.json(
        {
          error:
            "name, slug, priceInPaise, clothType and categoryId are required",
        },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug.toLowerCase(),
        description: body.description,
        priceInPaise: body.priceInPaise,
        inStock: body.inStock ?? true,
        clothType: body.clothType,
        occasion: body.occasion,
        isSpecial: body.isSpecial ?? false,
        mainImageUrl: body.mainImageUrl,
        thumbnailUrl: body.thumbnailUrl,
        color: body.color,
        pattern: body.pattern,
        blouseIncluded: body.blouseIncluded ?? true,
        categoryId: body.categoryId,
        images: body.images
          ? {
              create: body.images.map((img) => ({
                url: img.url,
                altText: img.altText,
                position: img.position ?? 0,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}

