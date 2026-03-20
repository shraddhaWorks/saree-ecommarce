"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { ShoppingBag } from "lucide-react";
import { CartSidebar } from "../sidebar/cart-sidebar";

export function CartButton() {
    const { state } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-700 hover:text-[#9d2936] transition"
            >
                <ShoppingBag size={24} />
                {state.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#9d2936] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {state.itemCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <CartSidebar />
                </>
            )}
        </>
    );
}
