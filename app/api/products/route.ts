import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

const ALLOWED_CLOTH_TYPES = [
  "SILK",
  "COTTON",
  "LINEN",
  "GEORGETTE",
  "CHIFFON",
  "KANJIVARAM",
  "BANARASI",
  "TUSSAR",
  "ORGANZA",
  "OTHER",
] as const;

const ALLOWED_OCCASIONS = [
  "WEDDING",
  "FESTIVE",
  "CASUAL",
  "OFFICE",
  "BRIDAL",
  "PARTY",
  "GIFTING",
  "OTHER",
] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const categorySlug = searchParams.get("category");
    const clothType = searchParams.get("clothType");
    const occasion = searchParams.get("occasion");
    const isSpecial = searchParams.get("special");
    const search = searchParams.get("search");
    const inStockOnly = searchParams.get("inStockOnly");
    const limit = Number(searchParams.get("limit") ?? "20");
    const offset = Number(searchParams.get("offset") ?? "0");

    const and: object[] = [];

    if (categorySlug) {
      and.push({ category: { slug: categorySlug.toLowerCase() } });
    }

    if (clothType && (ALLOWED_CLOTH_TYPES as readonly string[]).includes(clothType)) {
      and.push({ clothType: clothType as (typeof ALLOWED_CLOTH_TYPES)[number] });
    }

    if (occasion && (ALLOWED_OCCASIONS as readonly string[]).includes(occasion)) {
      and.push({ occasion: occasion as (typeof ALLOWED_OCCASIONS)[number] });
    }

    if (isSpecial === "true") {
      and.push({ isSpecial: true });
    }

    if (search) {
      and.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (inStockOnly === "true" || inStockOnly === "1") {
      and.push({ inStock: true, stockQuantity: { gt: 0 } });
    }

    const where = and.length > 0 ? { AND: and } : {};

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
      stockQuantity?: number;
      clothType?: string;
      occasion?: string;
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

    if (!(ALLOWED_CLOTH_TYPES as readonly string[]).includes(body.clothType)) {
      return NextResponse.json({ error: "Invalid clothType" }, { status: 400 });
    }
    if (body.occasion && !(ALLOWED_OCCASIONS as readonly string[]).includes(body.occasion)) {
      return NextResponse.json({ error: "Invalid occasion" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug.toLowerCase(),
        description: body.description,
        priceInPaise: body.priceInPaise,
        inStock: body.inStock ?? true,
        stockQuantity:
          typeof body.stockQuantity === "number"
            ? Math.max(0, Math.floor(body.stockQuantity))
            : body.inStock === false
              ? 0
              : 1,
        clothType: body.clothType as (typeof ALLOWED_CLOTH_TYPES)[number],
        occasion: body.occasion as (typeof ALLOWED_OCCASIONS)[number] | undefined,
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

