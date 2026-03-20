"use client";

import ProductCard from "./ProductCard";
import { Product } from "./product";

const products: Product[] = [
    {
        id: 1,
        name: "Chanderi Silk Cotton Purple Saree",
        price: 1999,
        discount: 20,
        stock: 1,
        description: "Elegant purple saree with zari stripes.",
        images: ["https://kalanjali.com/cdn/shop/files/1212588868-HY_1.jpg?v=1773820906&width=540"],
    },
    {
        id: 2,
        name: "Chanderi Silk Cotton Teal Green",
        price: 2199,
        discount: 20,
        stock: 3,
        description: "Stylish green saree.",
        images: ["https://kalanjali.com/cdn/shop/files/1212588861-HY_1.jpg?v=1773820899&width=540"],
    },
    {
        id: 3,
        name: "Chanderi Silk Cotton Maroon",
        price: 1899,
        discount: 20,
        stock: 2,
        description: "Traditional maroon saree.",
        images: ["https://kalanjali.com/cdn/shop/files/1212588858-HY_1.jpg?v=1773820900&width=540"],
    },
    {
        id: 4,
        name: "Chanderi Silk Cotton Black",
        price: 2099,
        discount: 20,
        stock: 5,
        description: "Elegant black saree.",
        images: ["https://kalanjali.com/cdn/shop/files/1212588856-HY_1.jpg?v=1773820901&width=540"],
    },
];

export default function ProductList() {
    return (
        <div className="px-6 py-6">
            <h2 className="text-2xl font-semibold mb-6">Best of Sale</h2>

            <div className="grid grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}