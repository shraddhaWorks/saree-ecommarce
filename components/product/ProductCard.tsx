"use client";

import Link from "next/link";
import { Product } from "./product";
import { ShoppingBag } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl overflow-hidden group">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={product.images[0]}
            className="w-full h-[240px] object-cover transition duration-500 group-hover:scale-105"
          />

          {/* SALE TAG */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-3 space-y-2">

          {/* TITLE */}
          <p className="text-sm font-medium line-clamp-2 text-left">
            {product.name}
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">₹{product.price}</span>
            {product.discount && (
              <span className="text-gray-400 text-sm line-through">
                ₹{Math.round(product.price / (1 - product.discount / 100))}
              </span>
            )}
          </div>

          {/* BUTTON (FULL WIDTH - MOBILE FRIENDLY) */}
          <button className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium">
            <ShoppingBag size={16} />
            Add to Cart
          </button>

        </div>
      </div>
    </Link>
  );
}