"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, useWishlist } from "@/components/cart";
import { Product } from "./product";
import RelatedProducts from "./RelatedProducts";
import {
    Facebook,
    Twitter,
    Instagram,
    Send,
    Mail,
} from "lucide-react";

interface Props {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetails({
    product,
    relatedProducts,
}: Props) {
    const router = useRouter();
    const { addItem } = useCart();
    const { toggleItem, isWishlisted } = useWishlist();
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [qty, setQty] = useState(1);
    const stock = product.stock ?? 0;
    const safeQty = Math.max(1, Math.min(qty, stock));
    const isOutOfStock = stock <= 0;

    const addProductToCart = () => {
        addItem({
            id: String(product.id),
            name: product.name || product.title || "",
            price: product.price,
            image: selectedImage,
            quantity: safeQty,
        });
        // Notify any cart UI (navbar drawer) to open.
        window.dispatchEvent(new Event("cart:open"));
    };

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        addProductToCart();
    };

    const handleBuyNow = () => {
        if (isOutOfStock) return;
        addProductToCart();
        router.push("/checkout");
    };

    const toggleWishlistItem = () => {
        toggleItem({
            id: String(product.id),
            name: product.name || product.title || "",
            price: product.price,
            image: product.images[0],
            href: `/products/${product.id}`,
        });
        window.dispatchEvent(new Event("wishlist:open"));
    };

    return (
        <div>
            {/* MAIN SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 px-5 lg:px-10 py-6 lg:py-8">
                {/* LEFT */}
                <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-5">

                    <div className="w-full md:w-[75%]">
                        <img
                            src={selectedImage}
                            className="w-full aspect-[3/4] md:h-[650px] object-cover object-top rounded-xl shadow-sm"
                        />
                    </div>

                    <div className="flex flex-row md:flex-col gap-3 md:gap-4 w-full md:w-[25%] overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setSelectedImage(img)}
                                alt=""
                                className={`h-24 min-w-[80px] object-cover md:h-[150px] md:min-w-0 md:w-full rounded-lg cursor-pointer border transition-all duration-300 ${selectedImage === img
                                    ? "border-black shadow-md scale-100"
                                    : "border-gray-200 blur-[2px] opacity-60 hover:blur-none hover:opacity-100"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:max-w-lg mt-4 lg:mt-0">
                    <h1 className="text-2xl md:text-3xl font-[Georgia,'Times New Roman',serif] text-black font-semibold mb-3">
                        {product.name || product.title}
                    </h1>

                    <div className="flex gap-3 mb-2">
                        <p className="text-xl font-semibold">
                            ₹{product.price}
                        </p>
                        {product.originalPrice && (
                            <p className="line-through text-gray-400">
                                ₹{product.originalPrice}
                            </p>
                        )}
                    </div>

                    <p className="text-gray-700 text-[15px] leading-relaxed mt-4 mb-5">
                        {product.description || "No description provided."}
                    </p>

                    <p className="text-sm text-gray-500 mb-3">
                        Tax included. Shipping calculated at checkout.
                    </p>

                    <p className="text-red-500 text-sm mb-4">
                        • {stock} items available
                    </p>

                    {/* Quantity */}
                    <div className="mb-6">
                        <p className="mb-2 font-medium">Quantity</p>
                        <div className="flex border rounded-lg w-fit">
                            <button
                                className="px-4 py-2"
                                onClick={() => qty > 1 && setQty(qty - 1)}
                            >
                                -
                            </button>
                            <span className="px-4">{qty}</span>
                            <button
                                className="px-4 py-2"
                                onClick={() => qty < stock && setQty(qty + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className={`bg-black text-white px-8 py-3 rounded-lg w-full transition ${
                                isOutOfStock ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
                            }`}
                        >
                            Add to cart
                        </button>
                        <button
                            type="button"
                            onClick={handleBuyNow}
                            disabled={isOutOfStock}
                            className={`bg-black text-white px-8 py-3 rounded-lg w-full transition ${
                                isOutOfStock ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
                            }`}
                        >
                            Buy it now
                        </button>
                    </div>

                    {/* Social */}
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={toggleWishlistItem}
                            className={`rounded-full border p-2 transition ${isWishlisted(String(product.id))
                                ? "border-[#9d2936] bg-[#9d2936] text-white"
                                : "border-black/15 text-black hover:border-[#9d2936] hover:text-[#9d2936]"
                                }`}
                            aria-label={isWishlisted(String(product.id)) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-[18px] w-[18px]"
                                fill={isWishlisted(String(product.id)) ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 20.5 4.8 13.7a4.9 4.9 0 0 1 6.9-6.9L12 7.1l.3-.3a4.9 4.9 0 0 1 6.9 6.9L12 20.5Z" />
                            </svg>
                        </button>
                        <Facebook size={18} />
                        <Twitter size={18} />
                        <Instagram size={18} />
                        <Send size={18} />
                        <Mail size={18} />
                    </div>

                    {/* Accordion */}
                    <div className="border-t pt-4">
                        <details className="py-3 border-b">
                            <summary className="cursor-pointer font-medium">
                                Description
                            </summary>
                            <p className="text-sm mt-2">
                                {product.description || "No description provided."}
                            </p>
                        </details>

                        <details className="py-3">
                            <summary className="cursor-pointer font-medium">
                                Product Specifications
                            </summary>
                            <div className="text-sm mt-2 space-y-1 bg-gray-50 p-3 rounded">
                                {product.fabric && <p><span className="font-semibold">Fabric:</span> {product.fabric}</p>}
                                {product.color && <p><span className="font-semibold">Color:</span> {product.color}</p>}
                                {product.brand && <p><span className="font-semibold">Brand:</span> {product.brand}</p>}
                                {product.category && <p><span className="font-semibold">Category:</span> {product.category}</p>}
                                {product.occasion && <p><span className="font-semibold">Occasion:</span> {product.occasion}</p>}
                            </div>
                        </details>
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            <RelatedProducts
                products={relatedProducts}
            />
        </div>
    );
}
