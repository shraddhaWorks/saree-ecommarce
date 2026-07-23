export type CartLine = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export type Cart = {
  items: CartLine[];
};

const CART_STORAGE_KEY_PREFIX = "cart_v1";
const LEGACY_CART_STORAGE_KEY = "cart_v1";

function decodeTokenSubject(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const decoded = atob(padded);
    const parsed = JSON.parse(decoded) as { sub?: unknown };
    if (typeof parsed.sub !== "string" || !parsed.sub.trim()) return null;
    return parsed.sub;
  } catch {
    return null;
  }
}

function getCartStorageKey(): string {
  if (typeof window === "undefined") return `${CART_STORAGE_KEY_PREFIX}:guest`;
  const token = window.localStorage.getItem("saree_access_token");
  const userId = token ? decodeTokenSubject(token) : null;
  return `${CART_STORAGE_KEY_PREFIX}:${userId ?? "guest"}`;
}

function emptyCart(): Cart {
  return { items: [] };
}

function readFromStorage(): Cart {
  if (typeof window === "undefined") return emptyCart();

  try {
    const activeKey = getCartStorageKey();
    const raw = window.localStorage.getItem(activeKey);
    if (!raw) {
      const legacy = window.localStorage.getItem(LEGACY_CART_STORAGE_KEY);
      if (legacy && activeKey.endsWith(":guest")) {
        window.localStorage.setItem(activeKey, legacy);
        window.localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
      } else {
        return emptyCart();
      }
    }
    const source = raw ?? window.localStorage.getItem(activeKey);
    if (!source) return emptyCart();

    const parsed = JSON.parse(source) as unknown;
    if (!parsed || typeof parsed !== "object") return emptyCart();

    const cart = parsed as Partial<Cart>;
    if (!Array.isArray(cart.items)) return emptyCart();

    if (
      cart.items.some(
        (i) => typeof (i as { productId?: unknown }).productId === "number",
      )
    ) {
      window.localStorage.removeItem(activeKey);
      return emptyCart();
    }

    return {
      items: cart.items
        .filter((i): i is CartLine => {
          const item = i as Partial<CartLine>;
          return (
            typeof item.productId === "string" &&
            item.productId.length > 0 &&
            typeof item.name === "string" &&
            typeof item.price === "number" &&
            typeof item.qty === "number" &&
            item.qty > 0
          );
        })
        .map((i) => ({
          ...i,
          qty: Math.floor(i.qty),
        })),
    };
  } catch {
    return emptyCart();
  }
}

function writeToStorage(cart: Cart) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getCartStorageKey(), JSON.stringify(cart));
}

export function getCart(): Cart {
  return readFromStorage();
}

export function getCartCount(cart?: Cart): number {
  const c = cart ?? readFromStorage();
  return c.items.reduce((sum, item) => sum + item.qty, 0);
}

export function addToCart(input: Omit<CartLine, "qty"> & { qty: number }): Cart {
  const qty = Math.max(1, Math.floor(input.qty));
  const existing = readFromStorage();

  const idx = existing.items.findIndex((i) => i.productId === input.productId);
  if (idx >= 0) {
    const next = [...existing.items];
    next[idx] = {
      ...next[idx],
      qty: next[idx].qty + qty,
      name: input.name,
      price: input.price,
      image: input.image,
    };
    const cart = { items: next };
    writeToStorage(cart);
    return cart;
  }

  const cart = { items: [...existing.items, { ...input, qty }] };
  writeToStorage(cart);
  return cart;
}

export function clearCart() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getCartStorageKey());
}

export function removeFromCart(productId: string): Cart {
  const existing = readFromStorage();
  const cart = { items: existing.items.filter((i) => i.productId !== productId) };
  writeToStorage(cart);
  return cart;
}
