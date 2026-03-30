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

const CART_STORAGE_KEY = "cart_v1";

function emptyCart(): Cart {
  return { items: [] };
}

function readFromStorage(): Cart {
  if (typeof window === "undefined") return emptyCart();

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return emptyCart();

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return emptyCart();

    const cart = parsed as Partial<Cart>;
    if (!Array.isArray(cart.items)) return emptyCart();

    if (
      cart.items.some(
        (i) => typeof (i as { productId?: unknown }).productId === "number",
      )
    ) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
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
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
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
  window.localStorage.removeItem(CART_STORAGE_KEY);
}
