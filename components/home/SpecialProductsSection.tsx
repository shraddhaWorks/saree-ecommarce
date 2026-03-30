import ProductCard from "@/components/product/ProductCard";
import type { StorefrontProduct } from "@/types/storefront";

type Props = {
  title: string;
  products: StorefrontProduct[];
};

export function SpecialProductsSection({ title, products }: Props) {
  if (products.length === 0) return null;

  return (
    <div className="bg-white px-4 py-10">
      <h2 className="mb-6 text-center text-2xl font-semibold sm:text-3xl">{title}</h2>
      <p className="mb-8 text-center text-sm text-black/50">
        Mark products as “Featured / special” in Admin → Products to show them here.
      </p>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
