"use client";

import { Product } from "./product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function RelatedProducts({ products }: Props) {
    return (
        <div className="px-10 py-12">
            <h2 className="text-2xl font-semibold mb-6">
                Related Products
            </h2>

            <div className="grid grid-cols-4 gap-6">
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