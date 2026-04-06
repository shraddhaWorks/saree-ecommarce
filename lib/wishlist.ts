import { getAccessToken, setAccessToken } from "@/lib/auth-client";

export type WishlistLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
};

export const WISHLIST_UPDATED_EVENT = "wishlist:updated";

export type WishlistUpdatedDetail = { count: number };

const WISHLIST_STORAGE_KEY = "wishlist_v1";

type CacheSlot = {
  lines: WishlistLine[] | null;
  inflight: Promise<WishlistLine[]> | null;
};

const compactCache: CacheSlot = { lines: null, inflight: null };
const fullCache: CacheSlot = { lines: null, inflight: null };

function emitWishlistUpdated(count: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<WishlistUpdatedDetail>(WISHLIST_UPDATED_EVENT, { detail: { count } }),
  );
}

function handleWishlistUnauthorized() {
  setAccessToken(null);
  invalidateWishlistCache();
  const count = readWishlistLocal().length;
  emitWishlistUpdated(count);
}

export function invalidateWishlistCache() {
  compactCache.lines = null;
  compactCache.inflight = null;
  fullCache.lines = null;
  fullCache.inflight = null;
}

/** Length from last compact/full fetch (browser only). */
export function getWishlistCachedCount(): number | null {
  if (typeof window === "undefined") return null;
  if (compactCache.lines) return compactCache.lines.length;
  if (fullCache.lines) return fullCache.lines.length;
  return null;
}

function emptyLines(): WishlistLine[] {
  return [];
}

export function readWishlistLocal(): WishlistLine[] {
  if (typeof window === "undefined") return emptyLines();
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return emptyLines();
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return emptyLines();
    const items = (parsed as { items?: unknown }).items;
    if (!Array.isArray(items)) return emptyLines();
    return items.filter((i): i is WishlistLine => {
      const x = i as Partial<WishlistLine>;
      return (
        typeof x.productId === "string" &&
        x.productId.length > 0 &&
        typeof x.slug === "string" &&
        typeof x.name === "string" &&
        typeof x.price === "number"
      );
    });
  } catch {
    return emptyLines();
  }
}

function writeWishlistLocal(lines: WishlistLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify({ items: lines }));
}

export function isInWishlistLocal(productId: string): boolean {
  return readWishlistLocal().some((l) => l.productId === productId);
}

export function addWishlistLocal(line: WishlistLine) {
  const existing = readWishlistLocal();
  if (existing.some((l) => l.productId === line.productId)) return;
  writeWishlistLocal([...existing, line]);
}

export function removeWishlistLocal(productId: string) {
  writeWishlistLocal(readWishlistLocal().filter((l) => l.productId !== productId));
}

async function loadRemoteIntoSlot(
  slot: CacheSlot,
  mode: "compact" | "full",
  force: boolean,
): Promise<WishlistLine[]> {
  if (typeof window === "undefined") return [];
  const token = getAccessToken();
  if (!token) return readWishlistLocal();

  if (force) {
    slot.lines = null;
    slot.inflight = null;
  } else if (slot.lines) {
    return slot.lines;
  }
  if (slot.inflight) return slot.inflight;

  slot.inflight = (async () => {
    try {
      const r = await fetch(`/api/wishlist?mode=${mode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.status === 401) {
        handleWishlistUnauthorized();
        slot.inflight = null;
        return readWishlistLocal();
      }
      if (!r.ok) {
        slot.inflight = null;
        return [];
      }
      const data = (await r.json()) as { items?: WishlistLine[] };
      const items = data.items ?? [];
      slot.lines = items;
      slot.inflight = null;
      return items;
    } catch {
      slot.inflight = null;
      return [];
    }
  })();

  return slot.inflight;
}

/** Shared across all product cards — one HTTP request when many hearts mount. */
export async function fetchWishlistLinesCompact(force = false): Promise<WishlistLine[]> {
  return loadRemoteIntoSlot(compactCache, "compact", force);
}

/** Wishlist page: first gallery image when needed. */
export async function fetchWishlistLinesFull(force = false): Promise<WishlistLine[]> {
  return loadRemoteIntoSlot(fullCache, "full", force);
}

/** Navbar bootstrap — single COUNT query, no product join. */
export async function fetchWishlistCountRemote(): Promise<number> {
  if (typeof window === "undefined") return 0;
  const token = getAccessToken();
  if (!token) return readWishlistLocal().length;
  try {
    const r = await fetch("/api/wishlist?mode=count", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (r.status === 401) {
      handleWishlistUnauthorized();
      return readWishlistLocal().length;
    }
    if (!r.ok) return getWishlistCachedCount() ?? 0;
    const j = (await r.json()) as { count?: number };
    return typeof j.count === "number" ? j.count : 0;
  } catch {
    return getWishlistCachedCount() ?? 0;
  }
}

export async function resolveProductMetaFromSlug(slug: string): Promise<{
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
} | null> {
  const r = await fetch(`/api/products/slug/${encodeURIComponent(slug)}`);
  if (!r.ok) return null;
  const data = (await r.json()) as {
    product?: {
      id: string;
      slug: string;
      name: string;
      priceInPaise: number;
      mainImageUrl?: string | null;
      images?: { url: string }[];
    };
  };
  const p = data.product;
  if (!p) return null;
  const image = p.images?.[0]?.url ?? p.mainImageUrl ?? undefined;
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Math.round(p.priceInPaise / 100),
    image,
  };
}

export type WishlistAddInput = {
  productId?: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
};

export async function wishlistAdd(
  input: WishlistAddInput,
): Promise<{ ok: boolean; count?: number; error?: string }> {
  let productId = input.productId?.trim();
  let slug = input.slug;
  let name = input.name;
  let price = input.price;
  let image = input.image;

  if (!productId) {
    const meta = await resolveProductMetaFromSlug(input.slug);
    if (!meta) return { ok: false, error: "Product not found" };
    productId = meta.id;
    slug = meta.slug;
    name = meta.name;
    price = meta.price;
    image = image ?? meta.image;
  }

  const line: WishlistLine = { productId, slug, name, price, image };

  const token = getAccessToken();
  if (token) {
    const r = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    const j = (await r.json().catch(() => ({}))) as { error?: string; count?: number };
    if (r.status === 401) {
      handleWishlistUnauthorized();
      addWishlistLocal(line);
      const count = readWishlistLocal().length;
      emitWishlistUpdated(count);
      return { ok: true, count };
    }
    if (!r.ok) {
      return { ok: false, error: j.error ?? "Could not save to wishlist" };
    }
    invalidateWishlistCache();
    const count = typeof j.count === "number" ? j.count : 0;
    emitWishlistUpdated(count);
    return { ok: true, count };
  }

  addWishlistLocal(line);
  const count = readWishlistLocal().length;
  emitWishlistUpdated(count);
  return { ok: true, count };
}

export async function wishlistRemove(
  productId: string,
): Promise<{ ok: boolean; count?: number; error?: string }> {
  const token = getAccessToken();
  if (token) {
    const r = await fetch(`/api/wishlist?productId=${encodeURIComponent(productId)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const j = (await r.json().catch(() => ({}))) as { error?: string; count?: number };
    if (r.status === 401) {
      handleWishlistUnauthorized();
      removeWishlistLocal(productId);
      const count = readWishlistLocal().length;
      emitWishlistUpdated(count);
      return { ok: true, count };
    }
    if (!r.ok) {
      return { ok: false, error: j.error ?? "Could not remove" };
    }
    invalidateWishlistCache();
    const count = typeof j.count === "number" ? j.count : 0;
    emitWishlistUpdated(count);
    return { ok: true, count };
  }
  removeWishlistLocal(productId);
  const count = readWishlistLocal().length;
  emitWishlistUpdated(count);
  return { ok: true, count };
}

export async function fetchRemoteWishlist(): Promise<WishlistLine[] | null> {
  const token = getAccessToken();
  if (!token) return null;
  const lines = await fetchWishlistLinesCompact(false);
  return lines;
}
