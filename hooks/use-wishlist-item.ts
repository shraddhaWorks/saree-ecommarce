"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useState } from "react";

import { getAccessToken } from "@/lib/auth-client";
import {
  fetchWishlistLinesCompact,
  readWishlistLocal,
  type WishlistLine,
  WISHLIST_UPDATED_EVENT,
  wishlistAdd,
  wishlistRemove,
} from "@/lib/wishlist";

export type WishlistItemMeta = {
  /** When omitted, add/remove resolves via slug (e.g. spotlight tiles before id is known). */
  productId?: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
};

async function loadLines(): Promise<WishlistLine[]> {
  const token = getAccessToken();
  if (token) {
    return fetchWishlistLinesCompact(false);
  }
  return readWishlistLocal();
}

function isSavedInLines(
  lines: { productId: string; slug: string }[],
  productId: string | undefined,
  slug: string,
): boolean {
  if (productId) return lines.some((l) => l.productId === productId);
  return lines.some((l) => l.slug === slug);
}

export function useWishlistItem(meta: WishlistItemMeta) {
  const { productId, slug, name, price, image } = meta;
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    if (!slug.trim()) {
      setSaved(false);
      return;
    }
    const lines = await loadLines();
    setSaved(isSavedInLines(lines, productId, slug));
  }, [productId, slug]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onUpdate = () => {
      void refresh();
    };
    window.addEventListener(WISHLIST_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, onUpdate);
  }, [refresh]);

  const toggle = async (e?: MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!slug.trim() || busy) return;
    setBusy(true);
    try {
      if (saved) {
        const resolvedId =
          productId ?? (await fetchWishlistLinesCompact(false)).find((l) => l.slug === slug)?.productId;
        if (!resolvedId) return;
        const r = await wishlistRemove(resolvedId);
        if (!r.ok) {
          console.warn(r.error ?? "wishlist remove failed");
          await refresh();
          return;
        }
        setSaved(false);
      } else {
        const r = await wishlistAdd({
          productId,
          slug,
          name,
          price,
          image,
        });
        if (!r.ok) {
          console.warn(r.error ?? "wishlist add failed");
          await refresh();
          return;
        }
        setSaved(true);
      }
      void refresh();
    } finally {
      setBusy(false);
    }
  };

  return { saved, busy, toggle };
}
