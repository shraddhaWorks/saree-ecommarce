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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (err) {
    console.error("GET /api/products/[id] error", err);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { profile } = await getUserFromRequest(req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
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

    if (body.clothType && !(ALLOWED_CLOTH_TYPES as readonly string[]).includes(body.clothType)) {
      return NextResponse.json({ error: "Invalid clothType" }, { status: 400 });
    }
    if (body.occasion && !(ALLOWED_OCCASIONS as readonly string[]).includes(body.occasion)) {
      return NextResponse.json({ error: "Invalid occasion" }, { status: 400 });
    }

    await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug?.toLowerCase(),
        description: body.description,
        priceInPaise: body.priceInPaise,
        inStock: body.inStock,
        stockQuantity:
          typeof body.stockQuantity === "number"
            ? Math.max(0, Math.floor(body.stockQuantity))
            : undefined,
        clothType: body.clothType as (typeof ALLOWED_CLOTH_TYPES)[number] | undefined,
        occasion: body.occasion as (typeof ALLOWED_OCCASIONS)[number] | undefined,
        isSpecial: body.isSpecial,
        mainImageUrl: body.mainImageUrl,
        thumbnailUrl: body.thumbnailUrl,
        color: body.color,
        pattern: body.pattern,
        blouseIncluded: body.blouseIncluded,
        categoryId: body.categoryId,
      },
    });

    if (body.images) {
      await prisma.productImage.deleteMany({
        where: { productId: id },
      });

      await prisma.productImage.createMany({
        data: body.images.map((img) => ({
          productId: id,
          url: img.url,
          altText: img.altText,
          position: img.position ?? 0,
        })),
      });
    }

    const updated = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { position: "asc" },
        },
      },
    });

    return NextResponse.json({ product: updated }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/products/[id] error", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { profile } = await getUserFromRequest(_req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/products/[id] error", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

