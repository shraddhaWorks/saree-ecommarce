import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

function lineFromProductFull(p: {
  id: string;
  slug: string;
  name: string;
  priceInPaise: number;
  mainImageUrl: string | null;
  images: { url: string }[];
}) {
  const image = p.images[0]?.url ?? p.mainImageUrl ?? undefined;
  return {
    productId: p.id,
    slug: p.slug,
    name: p.name,
    price: Math.round(p.priceInPaise / 100),
    image,
  };
}

function lineFromProductCompact(p: {
  id: string;
  slug: string;
  name: string;
  priceInPaise: number;
  mainImageUrl: string | null;
}) {
  return {
    productId: p.id,
    slug: p.slug,
    name: p.name,
    price: Math.round(p.priceInPaise / 100),
    image: p.mainImageUrl ?? undefined,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { user, profile } = await getUserFromRequest(req);
    if (!user || !profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mode = req.nextUrl.searchParams.get("mode") ?? "compact";

    if (mode === "count") {
      const count = await prisma.wishlistItem.count({ where: { userId: profile.id } });
      return NextResponse.json({ count }, { status: 200 });
    }

    if (mode === "full") {
      const rows = await prisma.wishlistItem.findMany({
        where: { userId: profile.id },
        orderBy: { createdAt: "desc" },
        include: {
          product: {
            include: { images: { orderBy: { position: "asc" }, take: 1 } },
          },
        },
      });
      const items = rows.map((r) => lineFromProductFull(r.product));
      return NextResponse.json({ items, count: items.length }, { status: 200 });
    }

    const rows = await prisma.wishlistItem.findMany({
      where: { userId: profile.id },
      orderBy: { createdAt: "desc" },
      select: {
        product: {
          select: {
            id: true,
            slug: true,
            name: true,
            priceInPaise: true,
            mainImageUrl: true,
          },
        },
      },
    });
    const items = rows.map((r) => lineFromProductCompact(r.product));
    return NextResponse.json({ items, count: items.length }, { status: 200 });
  } catch (err) {
    console.error("GET /api/wishlist error", err);
    return NextResponse.json({ error: "Failed to load wishlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, profile } = await getUserFromRequest(req);
    if (!user || !profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { productId?: string };
    const productId = body.productId?.trim();
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.wishlistItem.upsert({
      where: {
        userId_productId: { userId: profile.id, productId },
      },
      create: { userId: profile.id, productId },
      update: {},
    });

    const count = await prisma.wishlistItem.count({ where: { userId: profile.id } });
    return NextResponse.json({ ok: true, count }, { status: 200 });
  } catch (err) {
    console.error("POST /api/wishlist error", err);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { user, profile } = await getUserFromRequest(req);
    if (!user || !profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = req.nextUrl.searchParams.get("productId")?.trim();
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    await prisma.wishlistItem.deleteMany({
      where: { userId: profile.id, productId },
    });

    const count = await prisma.wishlistItem.count({ where: { userId: profile.id } });
    return NextResponse.json({ ok: true, count }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/wishlist error", err);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
