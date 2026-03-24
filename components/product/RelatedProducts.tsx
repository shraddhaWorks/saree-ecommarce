"use client";

import { Product } from "./product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function RelatedProducts({ products }: Props) {
    return (
        <div className="px-5 md:px-10 py-8 md:py-12 border-t border-gray-100 mt-4">
            <h2 className="text-2xl md:text-3xl font-[Georgia,'Times New Roman',serif] text-black font-semibold mb-6">
                Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                    />
                ))}
            </div>
        </div>
    );
}