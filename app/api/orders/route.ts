import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

type LineInput = { productId?: string; qty?: number };

export async function GET(req: NextRequest) {
  try {
    const { user, profile } = await getUserFromRequest(req);
    if (!user || !profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (profile.role === "ADMIN") {
      const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          items: { include: { product: true } },
          user: true,
        },
      });
      return NextResponse.json({ orders }, { status: 200 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: profile.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: true } },
      },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error("GET /api/orders error", err);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { profile } = await getUserFromRequest(req);

    const body = (await req.json()) as {
      items?: LineInput[];
      guestEmail?: string;
      guestName?: string;
      guestPhone?: string;
      shippingLine1?: string;
      shippingCity?: string;
      shippingState?: string;
      shippingPostal?: string;
      shippingCountry?: string;
    };

    const items = body.items;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "items[] is required" }, { status: 400 });
    }

    const shippingLine1 = body.shippingLine1?.trim();
    const shippingCity = body.shippingCity?.trim();
    const guestName = body.guestName?.trim();
    const guestEmail = body.guestEmail?.trim()?.toLowerCase();
    const guestPhone = body.guestPhone?.trim();

    if (!shippingLine1 || !shippingCity || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json(
        {
          error:
            "guestName, guestEmail, guestPhone, shippingLine1 and shippingCity are required",
        },
        { status: 400 },
      );
    }

    const merged = new Map<string, number>();
    for (const line of items) {
      if (!line.productId || typeof line.qty !== "number") {
        return NextResponse.json(
          { error: "Each item needs productId and qty" },
          { status: 400 },
        );
      }
      const qty = Math.max(1, Math.floor(line.qty));
      merged.set(line.productId, (merged.get(line.productId) ?? 0) + qty);
    }
    const normalized = [...merged.entries()].map(([productId, qty]) => ({
      productId,
      qty,
    }));

    const order = await prisma.$transaction(async (tx) => {
      let totalPaise = 0;
      const lines: {
        productId: string;
        quantity: number;
        priceInPaise: number;
        productName: string;
      }[] = [];

      for (const line of normalized) {
        const product = await tx.product.findUnique({
          where: { id: line.productId },
        });
        if (!product) {
          throw new Error(`Product not found: ${line.productId}`);
        }
        if (!product.inStock || product.stockQuantity < line.qty) {
          throw new Error(`Insufficient stock for "${product.name}"`);
        }
        const lineTotal = product.priceInPaise * line.qty;
        totalPaise += lineTotal;
        lines.push({
          productId: product.id,
          quantity: line.qty,
          priceInPaise: product.priceInPaise,
          productName: product.name,
        });
      }

      const created = await tx.order.create({
        data: {
          totalPaise,
          userId: profile?.id ?? null,
          guestEmail,
          guestName,
          guestPhone,
          shippingLine1,
          shippingCity,
          shippingState: body.shippingState?.trim() || null,
          shippingPostal: body.shippingPostal?.trim() || null,
          shippingCountry: body.shippingCountry?.trim() || "India",
          items: {
            create: lines.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
              priceInPaise: l.priceInPaise,
              productName: l.productName,
            })),
          },
        },
        include: { items: true },
      });

      for (const line of normalized) {
        const updated = await tx.product.update({
          where: { id: line.productId },
          data: { stockQuantity: { decrement: line.qty } },
        });
        if (updated.stockQuantity <= 0) {
          await tx.product.update({
            where: { id: line.productId },
            data: { inStock: false, stockQuantity: 0 },
          });
        }
      }

      return created;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    if (message.startsWith("Product not found") || message.startsWith("Insufficient stock")) {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error("POST /api/orders error", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
