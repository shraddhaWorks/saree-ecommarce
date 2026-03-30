import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ProductCard from "@/components/product/ProductCard";
import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<{ q?: string }>;
}) {
  const { handle } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const q = sp?.q?.trim() || "";

  const category = await prisma.category.findUnique({ where: { slug: handle } });

  const rows = await prisma.product.findMany({
    where: {
      inStock: true,
      stockQuantity: { gt: 0 },
      ...(category ? { categoryId: category.id } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { slug: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { category: true, images: { orderBy: { position: "asc" } } },
    orderBy: { updatedAt: "desc" },
    take: 80,
  });

  const products = rows.map(toStorefrontProduct);

  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6">
        <h1 className="text-3xl font-semibold">
          {category?.name ?? handle.replace(/-/g, " ")}
        </h1>
        {q ? <p className="mt-2 text-sm text-black/55">Search: “{q}”</p> : null}

        {products.length === 0 ? (
          <p className="mt-8 rounded-3xl border border-black/10 bg-white p-6 text-sm text-black/60">
            No products found.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}

