import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 * Public: resolve a category by URL slug (e.g. for /collections/[handle]).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const category = await prisma.category.findUnique({
      where: { slug: slug.toLowerCase() },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (err) {
    console.error("GET /api/categories/slug/[slug] error", err);
    return NextResponse.json(
      { error: "Failed to load category" },
      { status: 500 },
    );
  }
}
