"use client";

import ProductCard from "./ProductCard";
import { Product } from "./product";

import { products } from "@/lib/dummyData";

export default function ProductList() {
  return (
    <div className="px-4 sm:px-6 py-6 bg-white">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Best of Sale
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}