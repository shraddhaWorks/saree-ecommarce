import prisma from "@/lib/db";
import { toStorefrontProduct } from "@/lib/storefront-map";
import ProductCard from "./ProductCard";

<<<<<<< HEAD
import { products } from "@/lib/dummyData";
=======
export default async function ProductList() {
  const rows = await prisma.product.findMany({
    where: {
      inStock: true,
      stockQuantity: { gt: 0 },
    },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const products = rows.map(toStorefrontProduct);
>>>>>>> cb8727c (backend)

  return (
    <div className="px-4 sm:px-6 py-6 bg-white">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Best of Sale
      </h2>

<<<<<<< HEAD
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
=======
      {products.length === 0 ? (
        <p className="text-center text-black/55 text-sm">
          No products yet. Add sarees from the admin panel.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
>>>>>>> cb8727c (backend)
    </div>
  );
}
