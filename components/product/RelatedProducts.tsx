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

<<<<<<< HEAD
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
=======
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
>>>>>>> cb8727c (backend)
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