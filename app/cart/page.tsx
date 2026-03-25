"use client";

import { useCart } from "@/components/cart/CartContext";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function CartPage() {
    const { state, updateQuantity, removeItem, clearCart } = useCart();

    if (state.items.length === 0) {
        return (
            <main className="min-h-screen bg-[#f7f0e7]">
                <div className="px-6 py-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-6">Cart</div>
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
            <div className="px-6 py-8">
                <div className="max-w-4xl mx-auto">
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

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                        {state.items.map((item) => (
                            <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative">
                                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                                            <p className="text-gray-600">Rs. {item.price.toLocaleString()}</p>
                                            {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                            {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                                        </div>

                                        <div className="flex items-center justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0">
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1.5 hover:bg-white rounded-md transition shadow-sm"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1.5 hover:bg-white rounded-md transition shadow-sm"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <div className="text-right sm:min-w-[100px]">
                                                <p className="font-bold text-[#9d2936]">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-0 right-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-medium">Total:</span>
                            <span className="text-2xl font-bold text-[#9d2936]">
                                Rs. {state.total.toLocaleString()}
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
