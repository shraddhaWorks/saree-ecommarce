import ProductCard from "@/components/product/ProductCard";
import type { StorefrontProduct } from "@/types/storefront";

export default function RelatedProducts({ products }: { products: StorefrontProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-12 px-5 lg:px-10">
      <h2 className="mb-6 text-xl font-semibold">Related products</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

