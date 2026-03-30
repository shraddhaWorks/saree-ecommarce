import { notFound } from "next/navigation";

import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ProductDetails from "@/components/product/ProductDetails";
import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const row = await prisma.product.findUnique({
    where: { slug: handle },
    include: { category: true, images: { orderBy: { position: "asc" } } },
  });
  if (!row) notFound();

  const relatedRows = await prisma.product.findMany({
    where: {
      id: { not: row.id },
      categoryId: row.categoryId,
      inStock: true,
      stockQuantity: { gt: 0 },
    },
    include: { category: true, images: { orderBy: { position: "asc" } } },
    orderBy: { updatedAt: "desc" },
    take: 8,
  });

  return (
    <div className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />
      <ProductDetails
        product={toStorefrontProduct(row)}
        relatedProducts={relatedRows.map(toStorefrontProduct)}
      />
      <Footer />
    </div>
  );
}

