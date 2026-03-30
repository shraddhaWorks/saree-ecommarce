import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/db";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!row) notFound();

  const initial = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    priceInPaise: row.priceInPaise,
    inStock: row.inStock,
    stockQuantity: row.stockQuantity,
    clothType: row.clothType,
    occasion: row.occasion,
    isSpecial: row.isSpecial,
    mainImageUrl: row.mainImageUrl,
    thumbnailUrl: row.thumbnailUrl,
    categoryId: row.categoryId,
    images: row.images.map((i) => ({
      url: i.url,
      altText: i.altText ?? undefined,
      position: i.position,
    })),
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit product</h1>
      <ProductForm mode="edit" initial={initial} />
    </div>
  );
}
