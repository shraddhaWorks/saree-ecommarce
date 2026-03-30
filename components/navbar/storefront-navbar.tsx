"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { authHeaders, getAccessToken, setAccessToken } from "@/lib/auth-client";
import { getCart, getCartCount, type Cart } from "@/lib/cart";
import { BagIcon, SearchIcon, UserIcon } from "./icons";
import { Drawer, IconButton, RangamLogo } from "./ui";
import { MainNavigation } from "./main-navigation";

type PanelKey = "bag" | "search" | "profile" | null;

type SearchHit = { id: string; slug: string; name: string; mainImageUrl?: string | null };

export function StorefrontNavbar() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [cart, setCart] = useState<Cart>({ items: [] });

  const [hasSession, setHasSession] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchHit[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  useEffect(() => {
    const sync = () => setCart(getCart());
    sync();
    window.addEventListener("cart:updated", sync);
    return () => window.removeEventListener("cart:updated", sync);
  }, []);

  useEffect(() => {
    if (activePanel === "profile") setHasSession(!!getAccessToken());
  }, [activePanel]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePanel(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  async function runSearch(q: string) {
    const query = q.trim();
    setSearchQuery(q);

    if (!query) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=12`);
      const data = (await res.json()) as { items?: SearchHit[]; error?: string };
      if (!res.ok) {
        setSearchError(data.error ?? "Search failed");
        setSearchResults([]);
        return;
      }
      setSearchResults(data.items ?? []);
    } catch {
      setSearchError("Network error");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  async function logout() {
    setAccessToken(null);
    setHasSession(false);
    setActivePanel(null);
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-40 w-full bg-[#f7f0e7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="shrink-0" aria-label="Home">
            <RangamLogo />
          </Link>

          <div className="flex-1">
            <MainNavigation />
          </div>

          <div className="flex items-center gap-1">
            <IconButton label="Search" onClick={() => setActivePanel("search")}>
              <SearchIcon />
            </IconButton>

            <IconButton label="Account" onClick={() => setActivePanel("profile")}>
              <UserIcon />
            </IconButton>

            <IconButton label="Cart" onClick={() => setActivePanel("bag")} className="relative">
              <BagIcon />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              ) : null}
            </IconButton>
          </div>
        </div>
      </header>

      <div className="h-[92px] sm:h-[108px] lg:h-[128px]" />

      <Drawer
        isOpen={activePanel === "bag"}
        title="Bag"
        count={cartCount ? `(${cartCount})` : ""}
        onClose={() => setActivePanel(null)}
      >
        <div className="flex-1 overflow-auto px-8 pb-8">
          {cart.items.length === 0 ? (
            <div className="rounded-3xl border border-black/10 bg-white p-6 text-center text-sm text-black/60">
              Your bag is empty.
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((i) => (
                <div key={i.productId} className="rounded-3xl border border-black/10 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{i.name}</p>
                      <p className="mt-1 text-sm text-black/55">Qty {i.qty}</p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-accent">Rs. {i.price * i.qty}</p>
                  </div>
                </div>
              ))}

              <Link
                href="/checkout"
                onClick={() => setActivePanel(null)}
                className="mt-4 block w-full rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </Drawer>

      <Drawer
        isOpen={activePanel === "search"}
        title="Search"
        onClose={() => setActivePanel(null)}
      >
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="rounded-3xl border border-black/10 bg-white p-4">
            <input
              value={searchQuery}
              onChange={(e) => {
                const next = e.target.value;
                setSearchQuery(next);
                void runSearch(next);
              }}
              placeholder="Search sarees..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          {searchLoading ? <p className="mt-3 text-sm text-black/55">Searching…</p> : null}
          {searchError ? <p className="mt-3 text-sm text-red-600">{searchError}</p> : null}

          <div className="mt-4 grid gap-3">
            {searchResults.map((hit) => (
              <Link
                key={hit.id}
                href={`/products/${hit.slug}`}
                onClick={() => setActivePanel(null)}
                className="rounded-3xl border border-black/10 bg-white p-4 transition hover:border-[#9d2936]"
              >
                <p className="text-sm font-semibold">{hit.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </Drawer>

      <Drawer
        isOpen={activePanel === "profile"}
        title="Account"
        onClose={() => setActivePanel(null)}
      >
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="rounded-3xl border border-black/10 bg-white p-6">
            {hasSession ? (
              <div className="space-y-3">
                <Link
                  href="/admin"
                  onClick={() => setActivePanel(null)}
                  className="block rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold transition hover:border-[#9d2936] hover:text-[#9d2936]"
                >
                  Admin dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/sign-in"
                  onClick={() => setActivePanel(null)}
                  className="block rounded-2xl bg-black px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setActivePanel(null)}
                  className="block rounded-2xl border border-black/10 px-4 py-3 text-center text-sm font-semibold transition hover:border-[#9d2936] hover:text-[#9d2936]"
                >
                  Create account
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setActivePanel(null)}
                  className="block text-center text-sm text-black/60 underline"
                >
                  Admin login
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}

