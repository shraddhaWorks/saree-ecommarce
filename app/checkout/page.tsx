"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { clearCart, getCart, type Cart } from "@/lib/cart";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import { useCart } from "@/components/cart";

export default function CheckoutPage() {
  const router = useRouter();

  const { state, clearCart, removeItem } = useCart();

  const handlePlaceOrder = () => {
    if (state.items.length === 0) return;
    clearCart();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-semibold tracking-tight">Checkout</h1>

        {state.items.length === 0 ? (
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
              {state.items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-3xl border border-black/10 bg-white p-6"
                >
                  <div className="flex gap-5">
                    {item.image ? (
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#f3ebe0]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-20 shrink-0 rounded-2xl bg-[#f3ebe0]" />
                    )}
                    <div className="flex flex-1 items-start justify-between gap-3 min-w-0">
                      <div className="min-w-0 flex flex-col justify-between h-full">
                        <div>
                          <p className="line-clamp-2 text-base font-semibold text-black/80">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-black/55">
                            Qty {item.quantity}
                            {item.size ? ` • Size: ${item.size}` : ""}
                            {item.color ? ` • Color: ${item.color}` : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-sm text-black/45 transition hover:text-[#9d2936] text-left"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="shrink-0 text-base font-semibold text-accent">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/70">Total</span>
                <span className="text-sm font-semibold text-black">
                  Rs. {state.total}
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
