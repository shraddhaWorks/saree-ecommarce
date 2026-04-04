"use client";

import type { MouseEvent } from "react";
import { Heart } from "lucide-react";

type WishlistUiState = {
  saved: boolean;
  busy: boolean;
  toggle: (e?: MouseEvent<HTMLElement>) => void | Promise<void>;
};

type Base = WishlistUiState & {
  name: string;
  compact?: boolean;
};

export function WishlistFloatingHeart({ saved, busy, toggle, name, compact = false }: Base) {
  const icon = compact ? 14 : 16;
  const box = compact ? "right-2 top-2 h-8 w-8" : "right-3 top-3 h-9 w-9";

  return (
    <button
      type="button"
      onClick={(e) => void toggle(e)}
      disabled={busy}
      className={`absolute z-[1] flex items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/10 transition hover:bg-black/[0.03] disabled:opacity-50 ${box}`}
      aria-label={saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
    >
      <Heart
        size={icon}
        aria-hidden
        className={saved ? "fill-black text-black" : "text-black"}
        strokeWidth={saved ? 0 : 2.25}
      />
    </button>
  );
}

export function WishlistInlineHeart({ saved, busy, toggle, name, compact = false }: Base) {
  const icon = compact ? 16 : 18;

  return (
    <div className={`flex items-center ${compact ? "mt-1.5" : "mt-2"}`}>
      <button
        type="button"
        onClick={(e) => void toggle(e)}
        disabled={busy}
        className="inline-flex items-center gap-1.5 text-left text-xs font-medium text-[#1a1512]/70 transition hover:text-[#c41e3a] disabled:opacity-50 sm:text-sm"
        aria-label={saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      >
      </button>
    </div>
  );
}
