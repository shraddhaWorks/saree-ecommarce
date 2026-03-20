"use client";

import Link from "next/link";
import { Product } from "./product";
import { Eye, ShoppingBag } from "lucide-react";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/products/${product.id}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group relative">
                <div className="relative">
                    <img
                        src={product.images[0]}
                        className="w-full h-75 object-cover group-hover:scale-105 transition"
                    />

                    {/* SALE TAG */}
                    {product.discount && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            SALE <br /> {product.discount}% OFF
                        </div>
                    )}

                    {/* VIEW ICON */}
                    <div className="absolute top-3 right-3 bg-black text-white p-2 rounded-full">
                        <Eye size={16} />
                    </div>

                    {/* 🛒 ADD TO PRODUCTS (HOVER ONLY) */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <button className="bg-black text-white px-3 py-3 rounded-full shadow-lg hover:scale-110 flex items-center gap-2 text-xs font-semibold">
                            <ShoppingBag size={16} />
                            Add to Products
                        </button>
                    </div>
                </div>

                <div className="p-3 text-center">
                    <p className="text-sm font-medium">{product.name}</p>
                </div>
            </div>
        </Link>
    );
}