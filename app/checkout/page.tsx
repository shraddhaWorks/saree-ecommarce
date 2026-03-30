"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { clearCart, getCart, type Cart } from "@/lib/cart";
<<<<<<< HEAD
import { useCart } from "@/components/cart";
=======
import { authHeaders, getAccessToken } from "@/lib/auth-client";
>>>>>>> cb8727c (backend)

export default function CheckoutPage() {
  const router = useRouter();

<<<<<<< HEAD
  const { state, clearCart, removeItem } = useCart();

  const handlePlaceOrder = () => {
    if (state.items.length === 0) return;
    clearCart();
    router.push("/");
=======
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [shippingLine1, setShippingLine1] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingPostal, setShippingPostal] = useState("");

  useEffect(() => {
    const syncCart = () => setCart(getCart());
    syncCart();

    window.addEventListener("cart:updated", syncCart);
    return () => window.removeEventListener("cart:updated", syncCart);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getAccessToken();
      if (!token) return;
      try {
        const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as {
          profile?: { name?: string | null; email?: string | null };
        };
        if (data.profile?.name) setGuestName((n) => n || data.profile!.name!);
        if (data.profile?.email) setGuestEmail((e) => e || data.profile!.email!);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const cartTotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cart.items],
  );

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          items: cart.items.map((i) => ({
            productId: i.productId,
            qty: i.qty,
          })),
          guestName,
          guestEmail,
          guestPhone,
          shippingLine1,
          shippingCity,
          shippingState: shippingState || undefined,
          shippingPostal: shippingPostal || undefined,
        }),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not place order");
        setSubmitting(false);
        return;
      }

      clearCart();
      setCart({ items: [] });
      router.push("/?ordered=1");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
>>>>>>> cb8727c (backend)
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
<<<<<<< HEAD
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
=======
          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-4 order-2 lg:order-1">
              <h2 className="text-lg font-semibold">Shipping</h2>
              <label className="block text-sm">
                <span className="text-black/70">Full name</span>
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  autoComplete="name"
                />
              </label>
              <label className="block text-sm">
                <span className="text-black/70">Email</span>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  autoComplete="email"
                />
              </label>
              <label className="block text-sm">
                <span className="text-black/70">Phone</span>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  autoComplete="tel"
                />
              </label>
              <label className="block text-sm">
                <span className="text-black/70">Address line</span>
                <input
                  value={shippingLine1}
                  onChange={(e) => setShippingLine1(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  autoComplete="street-address"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-black/70">City</span>
                  <input
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-black/70">PIN</span>
                  <input
                    value={shippingPostal}
                    onChange={(e) => setShippingPostal(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  />
                </label>
>>>>>>> cb8727c (backend)
              </div>
              <label className="block text-sm">
                <span className="text-black/70">State (optional)</span>
                <input
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                />
              </label>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
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

                {error ? (
                  <p className="mt-4 text-sm text-red-600">{error}</p>
                ) : null}

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? "Placing order…" : "Place order"}
                </button>
                <Link
                  href="/"
                  className="mt-3 block w-full rounded-full border border-black/15 bg-white px-4 py-3 text-center text-sm font-semibold text-black/80 transition hover:border-[#9d2936] hover:text-[#9d2936]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
