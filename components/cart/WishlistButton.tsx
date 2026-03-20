"use client";

import { useWishlist } from "./WishlistContext";
import { Heart } from "lucide-react";

export function WishlistButton({
    product,
}: {
    product: { id: string; name: string; price: number; image: string; href?: string };
}) {
    const { toggleItem, isWishlisted } = useWishlist();
    const active = isWishlisted(product.id);

    return (
        <button
            type="button"
            onClick={() => {
                toggleItem(product);
                window.dispatchEvent(new Event("wishlist:open"));
            }}
            className={`p-2 rounded-full transition ${active
                    ? 'text-red-500 bg-red-50'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
            aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart size={20} fill={active ? 'currentColor' : 'none'} />
        </button>
    );
}
