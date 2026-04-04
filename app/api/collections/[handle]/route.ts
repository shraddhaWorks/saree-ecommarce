import { NextRequest, NextResponse } from "next/server";

import { getCollectionCatalog } from "@/lib/collection-catalog";

/**
 * JSON view of the same catalog as `/collections/[handle]` (query string = same browse filters).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ handle: string }> },
) {
  try {
    const { handle } = await context.params;
    if (!handle?.trim()) {
      return NextResponse.json({ error: "Missing handle" }, { status: 400 });
    }

    const sp = Object.fromEntries(request.nextUrl.searchParams.entries());
    const raw: Record<string, string | string[] | undefined> = {};
    for (const [k, v] of Object.entries(sp)) {
      raw[k] = v;
    }

    const { title, products, linePoolLength, megaMeta, category, parentCategory } =
      await getCollectionCatalog(handle.trim(), raw);

    return NextResponse.json(
      {
        handle: handle.trim(),
        title,
        productCount: products.length,
        linePoolCount: linePoolLength,
        hasMegaLineFilter: Boolean(megaMeta),
        hasCategory: Boolean(category),
        hasParentCategory: Boolean(parentCategory),
        products,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/collections/[handle]", err);
    return NextResponse.json({ error: "Failed to load collection" }, { status: 500 });
  }
}
