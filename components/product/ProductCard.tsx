import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import type { StorefrontProduct as Product } from "@/types/storefront";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const thumb = product.images[0] ?? "";

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group relative">
        <div className="relative">
          <img
            src={thumb}
            alt={product.name}
            className="w-full h-75 object-cover group-hover:scale-105 transition"
          />

          {product.discount ? (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              SALE <br /> {product.discount}% OFF
            </div>
          ) : null}

          <div className="absolute top-3 right-3 bg-black text-white p-2 rounded-full">
            <Eye size={16} />
          </div>

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-black text-white px-3 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold pointer-events-none">
              <ShoppingBag size={16} />
              View product
            </span>
          </div>
        </div>

        <div className="p-3 text-center">
          <p className="text-sm font-medium">{product.name}</p>
          <p className="mt-1 text-sm text-accent font-semibold">Rs. {product.price}</p>
        </div>
      </div>
    </Link>
  );
}
