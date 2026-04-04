"use client";

import { useState, type MouseEvent } from "react";
import { ShoppingBag } from "lucide-react";

import { addToCart } from "@/lib/cart";

type CartDirect = {
  mode: "direct";
  productId: string;
  name: string;
  price: number;
  image?: string;
};

type CartBySlug = {
  mode: "slug";
  slug: string;
};

type Props = {
  /** Shown in aria-labels (e.g. product name). */
  label?: string;
  compact?: boolean;
  cart: CartDirect | CartBySlug;
  /** When true, Add to cart is disabled (e.g. out of stock). */
  addDisabled?: boolean;
  /** Shown as button text when `addDisabled` (e.g. "Not in catalog"). */
  addDisabledLabel?: string;
  className?: string;
};

/**
 * Hover / touch actions on catalog tiles: add to cart (PDP is one tap on the image/title).
 */
export function ProductTileQuickActions({
  label,
  compact = false,
  cart,
  addDisabled = false,
  addDisabledLabel,
  className = "",
}: Props) {
  const ariaLabel = label ?? "product";
  const [busy, setBusy] = useState(false);

  const chip = compact
    ? "gap-1.5 rounded-full px-2 py-1.5 text-[10px] font-semibold shadow-lg"
    : "gap-2 rounded-full px-3 py-2.5 text-xs font-semibold shadow-lg";

  const iconCart = compact ? 14 : 16;

  const handleAdd = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addDisabled || busy) return;

    if (cart.mode === "direct") {
      addToCart({ ...cart, qty: 1 });
      window.dispatchEvent(new Event("cart:updated"));
      window.dispatchEvent(new Event("cart:open"));
      return;
    }

    setBusy(true);
    try {
      const r = await fetch(`/api/products/slug/${encodeURIComponent(cart.slug)}`);
      const data = (await r.json()) as {
        product?: {
          id: string;
          name: string;
          priceInPaise: number;
          inStock: boolean;
          stockQuantity: number;
          mainImageUrl?: string | null;
          images?: { url: string }[];
        };
      };
      if (!r.ok || !data.product) return;
      const p = data.product;
      if (!p.inStock || p.stockQuantity <= 0) return;
      const price = Math.round(p.priceInPaise / 100);
      const image = p.images?.[0]?.url ?? p.mainImageUrl ?? undefined;
      addToCart({
        productId: p.id,
        name: p.name,
        price,
        image,
        qty: 1,
      });
      window.dispatchEvent(new Event("cart:updated"));
      window.dispatchEvent(new Event("cart:open"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`pointer-events-auto flex flex-col items-end gap-2 transition-opacity duration-300 sm:pointer-events-none sm:opacity-0 sm:group-hover:pointer-events-auto sm:group-hover:opacity-100 ${className}`.trim()}
    >
      <button
        type="button"
        onClick={handleAdd}
        disabled={addDisabled || busy}
        className={`flex items-center border border-black/20 bg-white text-[#1a1512] transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50 ${chip}`}
      >
        <ShoppingBag size={iconCart} aria-hidden />
        {busy ? "Adding…" : addDisabled ? (addDisabledLabel ?? "Unavailable") : "Add to cart"}
      </button>
    </div>
  );
}
