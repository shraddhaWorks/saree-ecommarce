"use client";

import { useCart } from "@/components/cart/CartContext";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
    const { state, updateQuantity, removeItem, clearCart } = useCart();

    if (state.items.length === 0) {
        return (
            <main className="min-h-screen bg-[#f7f0e7]">
                <StorefrontNavbar />
                <div className="pt-[154px] px-6 py-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-6">🛒</div>
                        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added any sarees to your cart yet.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#9d2936] text-white rounded-lg hover:bg-[#7c1f29] transition"
                        >
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f0e7]">
            <StorefrontNavbar />
            <div className="pt-[154px] px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Shopping Cart</h1>
                            <p className="text-gray-600 mt-1">
                                {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                        {state.items.map((item) => (
                            <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                                <div className="p-6">
                                    <div className="flex items-center gap-6">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                                            {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                            {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="text-right">
                                            <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-medium">Total:</span>
                            <span className="text-2xl font-bold text-[#9d2936]">
                                ₹{state.total.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href="/"
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-center"
                            >
                                Continue Shopping
                            </Link>
                            <button className="flex-1 px-6 py-3 bg-[#9d2936] text-white rounded-lg hover:bg-[#7c1f29] transition">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
