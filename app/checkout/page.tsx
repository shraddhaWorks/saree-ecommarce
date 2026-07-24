"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import {
import BackButton from "@/components/common/BackButton";
  clearCart,
  getCart,
  removeFromCart,
  type Cart,
} from "@/lib/cart";

const CONTINUE_SHOPPING_HREF = "/";

interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
  isDefault: boolean;
}

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

function getAddressStorageKey(): string {
  if (typeof window === "undefined") return "user_addresses:guest";
  const token = window.localStorage.getItem("saree_access_token");
  const userId = token ? decodeTokenSubject(token) : null;
  return `user_addresses:${userId ?? "guest"}`;
}

export default function CheckoutPage() {
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
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  useEffect(() => {
  const sync = () => {
    setCart(getCart());
  };

  sync();

  window.addEventListener("cart:updated", sync);

  return (
) => {
  <BackButton />
    window.removeEventListener("cart:updated", sync);
  };
}, []);

  useEffect(() => {
    // Load saved addresses from localStorage for the current user
    const stored = localStorage.getItem(getAddressStorageKey());
    if (stored) {
      try {
        const addresses = JSON.parse(stored) as Address[];
        setSavedAddresses(addresses);
        const defaultAddr = addresses.find((a) => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
        }
      } catch (err) {
        console.error("Failed to parse addresses", err);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me");
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

  useEffect(() => {
    const address = savedAddresses.find((item) => item.id === selectedAddressId);
    if (!address) return;

    setGuestName((prev) => prev || address.name);
    setGuestPhone((prev) => prev || address.phone);
    setShippingLine1(address.line1);
    setShippingCity(address.city);
    setShippingState(address.state ?? "");
    setShippingPostal(address.postalCode ?? "");
  }, [selectedAddressId, savedAddresses]);

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
        },
        body: JSON.stringify({
          items: cart.items.map((i) => ({ productId: i.productId, qty: i.qty })),
          guestName,
          guestEmail,
          guestPhone,
          shippingLine1,
          shippingCity,
          shippingState: shippingState || undefined,
          shippingPostal: shippingPostal || undefined,
          shippingCountry: "India",
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
      window.dispatchEvent(new Event("cart:updated"));
      window.location.assign("/");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />

      <section className="mx-auto max-w-5xl px-6 pb-12 pt-6">
        <h1 className="text-4xl font-semibold tracking-tight">Checkout</h1>

        {cart.items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-8 text-center">
            <p className="text-lg font-semibold">Your cart is empty.</p>
            <p className="mt-2 text-sm text-black/60">Add an item to continue shopping.</p>
            <div className="mt-8">
              <Link
                href={CONTINUE_SHOPPING_HREF}
                className="inline-flex w-full justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="order-2 space-y-4 lg:col-span-2 lg:order-1">
              <h2 className="text-lg font-semibold">Shipping</h2>
              {savedAddresses.length > 0 ? (
                <label className="block text-sm">
                  <span className="text-black/70">Use saved address</span>
                  <select
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2"
                  >
                    <option value="">Choose a saved address</option>
                    {savedAddresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.line1}, {address.city} {address.postalCode ? `(${address.postalCode})` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

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

            <div className="order-1 lg:col-span-3 lg:order-2">
              <ul className="space-y-4">
                {cart.items.map((item) => (
                  <li
                    key={item.productId}
                    className="rounded-3xl border border-black/10 bg-white p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-black/80">{item.name}</p>
                        <p className="mt-1 text-sm text-black/55">Qty {item.qty}</p>
                      </div>
                      <p className="text-base font-semibold text-accent">
                        Rs. {item.price * item.qty}
                      </p>
                    </div>
                    <button
                      type="button"
                    onClick={() => {
  const updatedCart = removeFromCart(item.productId);
  setCart(updatedCart);
  window.dispatchEvent(new Event("cart:updated"));
}}
                      className="mt-4 text-sm font-semibold text-black/55 underline hover:text-[#9d2936]"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-black/70">Total</span>
                  <span className="text-sm font-semibold text-black">Rs. {cartTotal}</span>
                </div>

                {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? "Placing order…" : "Place order"}
                </button>
                <Link
                  href={CONTINUE_SHOPPING_HREF}
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

