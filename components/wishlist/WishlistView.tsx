"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { getAccessToken } from "@/lib/auth-client";
import { FALLBACK_SAREE_IMAGE } from "@/lib/storefront-images";
import {
  fetchWishlistLinesFull,
  readWishlistLocal,
  WISHLIST_UPDATED_EVENT,
  wishlistRemove,
  type WishlistLine,
} from "@/lib/wishlist";

export function WishlistView() {
  const [items, setItems] = useState<WishlistLine[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    try {
      const token = getAccessToken();
      if (token) {
        setItems(await fetchWishlistLinesFull(true));
      } else {
        setItems(readWishlistLocal());
      }
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onUpdate = () => void load({ silent: true });
    window.addEventListener(WISHLIST_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, onUpdate);
  }, [load]);

  const remove = async (productId: string) => {
    await wishlistRemove(productId);
  };

  if (loading) {
    return <p className="mt-6 text-sm text-black/60">Loading your wishlist…</p>;
  }

  if (items.length === 0) {
    return (
      <p className="mt-6 text-sm text-black/60">
        Nothing saved yet. Tap the heart on a product to add it here.
      </p>
    );
  }

  return (
    <ul className="mx-auto mt-10 grid max-w-4xl gap-4 px-4 sm:grid-cols-2">
      {items.map((line) => (
        <li
          key={line.productId}
          className="flex gap-4 rounded-xl border border-black/10 bg-white p-4 text-left shadow-sm"
        >
          <Link href={`/products/${line.slug}`} className="shrink-0">
            <img
              src={line.image?.trim() || FALLBACK_SAREE_IMAGE}
              alt=""
              className="h-28 w-20 rounded-lg object-cover sm:h-32 sm:w-24"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${line.slug}`}
              className="font-medium text-[#1a1512] hover:text-[#c41e3a]"
            >
              {line.name}
            </Link>
            <p className="mt-1 text-sm font-semibold text-[#c41e3a]">
              Rs. {line.price.toLocaleString("en-IN")}.00
            </p>
            <button
              type="button"
              onClick={() => void remove(line.productId)}
              className="mt-3 text-xs font-semibold text-black/50 underline-offset-2 hover:text-[#c41e3a] hover:underline"
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
