
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "./product";
import RelatedProducts from "./RelatedProducts";
import {
    Facebook,
    Twitter,
    Instagram,
    Send,
    Mail,
} from "lucide-react";

import { addToCart } from "@/lib/cart";

interface Props {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetails({
    product,
    relatedProducts,
}: Props) {
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [qty, setQty] = useState(1);

    const router = useRouter();
    const safeQty = Math.max(1, Math.min(qty, product.stock));
    const isOutOfStock = product.stock <= 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            qty: safeQty,
            image: selectedImage,
        });

        // Notify any cart UI (navbar drawer) to refresh.
        window.dispatchEvent(new Event("cart:updated"));
        window.dispatchEvent(new Event("cart:open"));
    };

    const handleBuyNow = () => {
        if (isOutOfStock) return;
        handleAddToCart();
        router.push("/checkout");
    };

    return (
        <div>
            {/* MAIN SECTION */}
            <div className="grid grid-cols-2 gap-10 px-10 py-8">
                {/* LEFT */}
                <div className="flex gap-5">

                    <div className="w-[75%]">
                        <img
                            src={selectedImage}
                            className="w-full h-162.5 object-cover rounded-xl"
                        />
                    </div>

                    <div className="flex flex-col gap-4 w-[25%]">
                        {product.images.map((img, i) => (
                            <>
                           
                           
                           
                             <img
                                key={i}
                                src={img}
                                onClick={() => setSelectedImage(img)}
                                className={`h-37.5 rounded-lg cursor-pointer border ${selectedImage === img
                                    ? "border-black"
                                    : "border-gray-200"
                                    }`}
                            />
                             </>
                            
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="max-w-lg">
                    <h1 className="text-2xl font-medium mb-3">
                        {product.name}
                    </h1>

                    <div className="flex gap-3 mb-2">
                        <p className="text-xl font-semibold">
                            Rs. {product.price}
                        </p>
                        <p className="line-through text-gray-400">
                            Rs. {product.price + 1000}
                        </p>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                        Tax included. Shipping calculated at checkout.
                    </p>

                    <p className="text-red-500 text-sm mb-4">
                        • {product.stock} items available
                    </p>

                    <p className="text-gray-700 text-sm mb-6">
                        {product.description}
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
                                onClick={() => qty < product.stock && setQty(qty + 1)}
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
                                {product.description}
                            </p>
                        </details>

                        <details className="py-3">
                            <summary className="cursor-pointer font-medium">
                                Product Specifications
                            </summary>
                            <p className="text-sm mt-2">
                                Fabric: Chanderi Silk Cotton
                            </p>
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