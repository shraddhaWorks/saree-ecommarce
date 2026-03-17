import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ClothType, Occasion } from "@prisma/client";
import { getUserFromRequest } from "@/lib/auth";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
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

export async function PUT(req: NextRequest, { params }: Params) {
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

    await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug?.toLowerCase(),
        description: body.description,
        priceInPaise: body.priceInPaise,
        inStock: body.inStock,
        clothType: body.clothType,
        occasion: body.occasion,
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
        where: { productId: params.id },
      });

      await prisma.productImage.createMany({
        data: body.images.map((img) => ({
          productId: params.id,
          url: img.url,
          altText: img.altText,
          position: img.position ?? 0,
        })),
      });
    }

    const updated = await prisma.product.findUnique({
      where: { id: params.id },
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

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { profile } = await getUserFromRequest(_req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.productImage.deleteMany({
      where: { productId: params.id },
    });

    await prisma.product.delete({
      where: { id: params.id },
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

