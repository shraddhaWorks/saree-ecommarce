"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import { clearCart, getCart, type Cart } from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    const syncCart = () => setCart(getCart());
    syncCart();

    window.addEventListener("cart:updated", syncCart);
    return () => window.removeEventListener("cart:updated", syncCart);
  }, []);

  const cartTotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cart.items],
  );

  const handlePlaceOrder = () => {
    if (cart.items.length === 0) return;
    clearCart();
    setCart({ items: [] });
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />

      <section className="mx-auto max-w-5xl px-6 pt-[140px] pb-12">
        <h1 className="text-4xl font-semibold tracking-tight">Checkout</h1>

        {cart.items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-8 text-center">
            <p className="text-lg font-semibold">Your cart is empty.</p>
            <p className="mt-2 text-sm text-black/60">
              Add an item to continue shopping.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex w-full justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <ul className="space-y-4">
              {cart.items.map((item) => (
                <li
                  key={item.productId}
                  className="rounded-3xl border border-black/10 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-black/80">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-black/55">Qty {item.qty}</p>
                    </div>
                    <p className="text-base font-semibold text-accent">
                      Rs. {item.price * item.qty}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/70">Total</span>
                <span className="text-sm font-semibold text-black">
                  Rs. {cartTotal}
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="mt-6 w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Place order (demo)
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="mt-3 w-full rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black/80 transition hover:border-[#9d2936] hover:text-[#9d2936]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

