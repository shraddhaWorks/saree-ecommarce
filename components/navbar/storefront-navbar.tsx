"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getAccessToken, setAccessToken } from "@/lib/auth-client";
import { getCart, getCartCount, type Cart } from "@/lib/cart";
import { AnnouncementBar } from "./announcement-bar";
import { BagIcon, ChevronIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./icons";
import { getNavMegaItems } from "./nav-mega-items";
import { Drawer, IconButton, RangamLogo } from "./ui";
import { MainNavigation } from "./main-navigation";

type PanelKey = "bag" | "search" | "profile" | null;

type SearchHit = { id: string; slug: string; name: string; mainImageUrl?: string | null };

export function StorefrontNavbar() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExpandedLabel, setMobileExpandedLabel] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart>({ items: [] });

  const [hasSession, setHasSession] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchHit[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const cartCount = useMemo(() => getCartCount(cart), [cart]);

  const navMegaItems = useMemo(() => getNavMegaItems(), []);

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
      if (event.key === "Escape") {
        setActivePanel(null);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) setMobileExpandedLabel(null);
  }, [mobileNavOpen]);

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

  const iconLinkClass =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black/70 transition hover:bg-black/8 hover:text-accent sm:h-9 sm:w-9 lg:h-10 lg:w-10";

  return (
    <>
      <AnnouncementBar />

      <header className="fixed left-0 right-0 top-8 z-40 w-full max-w-none border-b border-black/10 bg-[var(--navbar-sandal)]/95 shadow-sm backdrop-blur max-lg:border-b-0 max-lg:shadow-none">
        {/* Mobile: logo left + burger right only — compact strip (~80% visual height vs prior) */}
        <div className="flex min-h-[40px] items-center justify-between px-2 py-1 sm:min-h-[44px] sm:px-3 sm:py-1.5 lg:hidden">
          <Link
            href="/"
            className="inline-flex leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--navbar-sandal)]"
            aria-label="Rangam home"
          >
            <RangamLogo />
          </Link>

          <button
            type="button"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileNavOpen((o) => !o)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full leading-none text-black/70 transition hover:bg-black/8"
          >
            {mobileNavOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Desktop/tablet: centered logo + utility icons */}
        <div className="hidden min-h-[46px] w-full grid-cols-[1fr_auto_1fr] items-center gap-y-2 py-2 lg:grid">
          <div className="min-w-0" aria-hidden="true" />

          <div className="col-start-2 flex justify-center justify-self-center px-1">
            <Link
              href="/"
              className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--navbar-sandal)]"
              aria-label="Rangam home"
            >
              <RangamLogo />
            </Link>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-1 pr-2">
            <IconButton label="Search" onClick={() => setActivePanel("search")}>
              <SearchIcon />
            </IconButton>

            <Link href="/wishlist" className={iconLinkClass} aria-label="Wishlist">
              <HeartIcon />
            </Link>

            <IconButton label="Account" onClick={() => setActivePanel("profile")}>
              <UserIcon />
            </IconButton>

            <IconButton
              label="Cart"
              onClick={() => setActivePanel("bag")}
              className="relative"
            >
              <BagIcon />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white ring-2 ring-[var(--navbar-sandal)] sm:h-[18px] sm:min-w-[18px] sm:text-[10px]">
                  {cartCount}
                </span>
              ) : null}
            </IconButton>
          </div>
        </div>

        <div className="hidden w-full border-t border-black/10 lg:block" />

        <div className="hidden w-full px-3 pb-2 pt-2 sm:px-5 lg:block lg:px-8">
          <MainNavigation />
        </div>
      </header>

      {/* Mobile & tablet: long menu lives in drawer until large screens */}
      <div
        className={`fixed inset-x-0 bottom-0 top-8 z-50 lg:hidden ${mobileNavOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          tabIndex={mobileNavOpen ? 0 : -1}
          aria-label="Close menu"
          className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${mobileNavOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileNavOpen(false)}
        />
        <nav
          id="mobile-primary-nav"
          className={`absolute left-0 top-0 flex h-full w-full max-w-full flex-col border-r border-black/10 bg-[var(--navbar-sandal)] shadow-2xl transition-transform duration-300 ease-out sm:max-w-md ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Primary"
        >
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-black/55">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-black/70 transition hover:bg-black/8 hover:text-accent"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="border-b border-black/10 px-3 py-3">
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  setActivePanel("search");
                }}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-black/10 bg-white/40 px-2 py-2 text-[11px] font-medium text-black/75 transition hover:bg-white/70"
              >
                <SearchIcon />
                Search
              </button>
              <Link
                href="/wishlist"
                onClick={() => setMobileNavOpen(false)}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-black/10 bg-white/40 px-2 py-2 text-[11px] font-medium text-black/75 transition hover:bg-white/70"
              >
                <HeartIcon />
                Wishlist
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  setActivePanel("profile");
                }}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-black/10 bg-white/40 px-2 py-2 text-[11px] font-medium text-black/75 transition hover:bg-white/70"
              >
                <UserIcon />
                Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  setActivePanel("bag");
                }}
                className="relative flex flex-col items-center justify-center gap-1 rounded-xl border border-black/10 bg-white/40 px-2 py-2 text-[11px] font-medium text-black/75 transition hover:bg-white/70"
              >
                <BagIcon />
                Bag
                {cartCount > 0 ? (
                  <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <ul className="flex-1 overflow-auto px-2 py-2">
            {navMegaItems.map((item, megaIndex) => {
              const expanded = mobileExpandedLabel === item.label;
              const hasMega = item.children.length > 0;
              const panelId = `mobile-mega-panel-${megaIndex}`;
              return (
                <li key={item.href} className="border-b border-black/[0.08] last:border-b-0">
                  {hasMega ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      className="flex w-full items-center gap-2 px-3 py-3.5 text-left font-serif-royal text-base font-semibold leading-snug tracking-wide text-[#2a221c] transition-colors hover:bg-black/[0.05] active:bg-black/[0.08]"
                      onClick={() =>
                        setMobileExpandedLabel((cur) => (cur === item.label ? null : item.label))
                      }
                    >
                      <span className="min-w-0 flex-1">{item.label}</span>
                      <span className="shrink-0 text-black/55" aria-hidden>
                        <ChevronIcon open={expanded} />
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-3.5 font-serif-royal text-base font-semibold leading-snug tracking-wide text-[#2a221c] transition-colors hover:bg-black/[0.05] active:bg-black/[0.08]"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasMega && expanded ? (
                    <div
                      id={panelId}
                      className="border-t border-black/10 bg-[var(--announcement-maroon)] px-2 pb-3 pt-2"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        className="mb-2 block rounded-md px-2 py-2 text-center text-sm font-semibold text-[var(--announcement-sandal)] underline-offset-2 hover:underline"
                      >
                        View all {item.label}
                      </Link>
                      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-invisible">
                        {item.previews.map((preview) => (
                          <Link
                            key={preview.title}
                            href={item.href}
                            onClick={() => setMobileNavOpen(false)}
                            className="relative block w-[min(78vw,280px)] shrink-0 overflow-hidden rounded-lg border border-[var(--announcement-sandal)]/25"
                          >
                            <img
                              src={preview.imageUrl}
                              alt={preview.title}
                              className="h-[140px] w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="font-serif-royal text-lg leading-tight text-[var(--announcement-sandal)]">
                                {preview.title}
                              </p>
                              <span className="mt-1 inline-block rounded-sm bg-[var(--announcement-sandal)] px-3 py-1 text-[11px] font-semibold text-[var(--announcement-maroon)]">
                                Shop
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <ul className="mt-1 max-h-[40vh] overflow-auto rounded-lg border border-[var(--announcement-sandal)]/20 bg-[#6f1325]/50 p-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setMobileNavOpen(false)}
                              className="block rounded-md px-3 py-2.5 text-sm font-medium text-[var(--announcement-sandal)]/95 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div
        className="h-[calc(2rem+56px)] sm:h-[calc(2rem+60px)] lg:h-[calc(2rem+108px)]"
        aria-hidden
      />

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
