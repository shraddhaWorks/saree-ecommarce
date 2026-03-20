"use client";

import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";
import { useCart, useWishlist } from "@/components/cart";
import { Product } from "./product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { addItem } = useCart();
    const { toggleItem, isWishlisted } = useWishlist();

    return (
        <Link href={`/products/${product.id}`}>
            <div className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md">
                <div className="relative">
                    <img
                        src={product.images[0]}
                        className="h-75 w-full object-cover transition group-hover:scale-105"
                    />

                    {product.discount ? (
                        <div className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs text-white">
                            SALE <br /> {product.discount}% OFF
                        </div>
                    ) : null}

                    <div className="absolute right-3 top-3 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                toggleItem({
                                    id: String(product.id),
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    href: `/products/${product.id}`,
                                });
                                window.dispatchEvent(new Event("wishlist:open"));
                            }}
                            className={`rounded-full p-2 ${isWishlisted(String(product.id))
                                ? "bg-[#9d2936] text-white"
                                : "bg-white text-black"
                                }`}
                            aria-label={isWishlisted(String(product.id)) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill={isWishlisted(String(product.id)) ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20.5 4.8 13.7a4.9 4.9 0 0 1 6.9-6.9L12 7.1l.3-.3a4.9 4.9 0 0 1 6.9 6.9L12 20.5Z" />
                            </svg>
                        </button>
                        <div className="rounded-full bg-black p-2 text-white">
                            <Eye size={16} />
                        </div>
                    </div>

                    <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                addItem({
                                    id: String(product.id),
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    quantity: 1,
                                });
                                window.dispatchEvent(new Event("cart:open"));
                            }}
                            className="flex items-center gap-2 rounded-full bg-black px-3 py-3 text-xs font-semibold text-white shadow-lg transition hover:scale-110"
                        >
                            <ShoppingBag size={16} />
                            Add to Cart
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
