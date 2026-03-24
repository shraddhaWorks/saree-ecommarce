"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { useCart, useWishlist } from "@/components/cart";
import { MegaMenu, menuData, primaryLinks, suggestedSearches, type MenuEntryKey } from "./menu";
import { Drawer, IconButton, RangamLogo } from "./ui";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
  SadBagIcon,
} from "./icons";
import { getCart, type Cart } from "@/lib/cart";

type PanelKey = "bag" | "search" | "profile" | "wishlist" | null;

export function StorefrontNavbar() {
  const { state } = useCart();
  const {
    state: wishlistState,
    removeItem: removeWishlistItem,
  } = useWishlist();
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [activeMenu, setActiveMenu] = useState<MenuEntryKey | null>(null);
  const hasOverlay = activePanel !== null;

  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePanel(null);
        setActiveMenu(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const syncCart = () => setCart(getCart());
    syncCart();

    const openBag = () => setActivePanel("bag");

    window.addEventListener("cart:updated", syncCart);
    window.addEventListener("cart:open", openBag);

    return () => {
      window.removeEventListener("cart:updated", syncCart);
      window.removeEventListener("cart:open", openBag);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = hasOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasOverlay]);

  useEffect(() => {
    const openBag = () => setActivePanel("bag");
    window.addEventListener("cart:open", openBag);

    return () => window.removeEventListener("cart:open", openBag);
  }, []);

  useEffect(() => {
    const openWishlist = () => setActivePanel("wishlist");
    window.addEventListener("wishlist:open", openWishlist);

    return () => window.removeEventListener("wishlist:open", openWishlist);
  }, []);

  const closeAll = () => {
    setActivePanel(null);
    setActiveMenu(null);
  };

  const stopEvent = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const openPanel = (panel: Exclude<PanelKey, null>) => {
    setActivePanel(panel);
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const hasWishlistItems = wishlistState.items.length > 0;
  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const isMegaMenuOpen = activeMenu !== null;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 bg-[#fdfbf7] shadow-[0_10px_34px_rgba(44,25,17,0.08)]">
        <div className="h-[6px] bg-[#822733]" />
        <header className="border-b border-black/10 bg-[#fdfbf7]" onClick={closeAll}>
          <div className={`mx-auto flex items-center gap-8 px-4 py-5 lg:px-10 ${isMegaMenuOpen ? "max-w-none justify-center" : "max-w-[1880px] justify-between"}`}>
            {!isMegaMenuOpen ? (
              <Link href="/" className="shrink-0" onClick={closeAll}>
                <RangamLogo />
              </Link>
            ) : null}

            <div className={`hidden min-w-0 lg:block ${isMegaMenuOpen ? "w-full flex-none" : "flex-1"}`} onClick={stopEvent}>
              <nav
                aria-label="Primary"
                className="overflow-hidden rounded-[2px]"
              >
                <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 ${isMegaMenuOpen ? "px-0" : "px-5"} xl:gap-x-10`}>
                  {primaryLinks.map((item) => (
                    item.menuKey ? (
                      <button
                        key={item.label}
                        type="button"
                        onMouseEnter={() => setActiveMenu(item.menuKey)}
                        onClick={() => setActiveMenu((current) => (current === item.menuKey ? null : item.menuKey))}
                        className={activeMenu === item.menuKey ? "font-[Georgia,'Times New Roman',serif] text-[17px] tracking-[0.01em] transition text-[#9d2936]" : "font-[Georgia,'Times New Roman',serif] text-[17px] tracking-[0.01em] transition text-black hover:text-black/70"}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeAll}
                        className="font-[Georgia,'Times New Roman',serif] text-[17px] tracking-[0.01em] text-black transition hover:text-black/70"
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
                {activeMenu ? (
                  <MegaMenu menu={menuData[activeMenu]} onItemClick={closeAll} />
                ) : null}
              </nav>
            </div>

            {!isMegaMenuOpen ? (
              <div className="flex items-center gap-3 sm:gap-5" onClick={stopEvent}>
                <IconButton label="Search" onClick={() => openPanel("search")}>
                  <SearchIcon />
                </IconButton>
                <div className="relative">
                  <IconButton label="Wishlist" onClick={() => openPanel("wishlist")}>
                    <HeartIcon />
                  </IconButton>
                  {wishlistState.itemCount > 0 ? (
                    <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#9d2936] px-1 text-[10px] font-semibold text-white">
                      {wishlistState.itemCount}
                    </span>
                  ) : null}
                </div>
                <IconButton label="Profile" onClick={() => openPanel("profile")}>
                  <UserIcon />
                </IconButton>
                <div className="relative">
                  <IconButton label="Bag" onClick={() => openPanel("bag")}>
                    <BagIcon />
                  </IconButton>
                  {state.itemCount > 0 ? (
                    <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#9d2936] px-1 text-[10px] font-semibold text-white">
                      {state.itemCount}
                    </span>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
          <div className="border-t border-black/8 px-4 py-3 lg:hidden" onClick={stopEvent}>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {primaryLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold tracking-[0.04em] text-black/70"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </header>
      </div>

      {hasOverlay ? (
        <button
          type="button"
          aria-label="Close overlay"
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
          onClick={closeAll}
        />
      ) : null}

      <Drawer
        isOpen={activePanel === "wishlist"}
        title="Wishlist"
        count={`(${wishlistState.itemCount})`}
        onClose={() => setActivePanel(null)}
      >
        {hasWishlistItems ? (
          <div className="flex flex-1 flex-col px-6 pb-8">
            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {wishlistState.items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_12px_34px_rgba(44,25,17,0.07)]"
                >
                  <div className="flex gap-4">
                    <div className="h-28 w-24 overflow-hidden rounded-2xl bg-[#f3ebe0]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="line-clamp-2 text-base font-semibold text-black">
                            {item.name}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-[#9d2936]">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWishlistItem(item.id)}
                          className="text-sm text-black/45 transition hover:text-[#9d2936]"
                        >
                          Remove
                        </button>
                      </div>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className="mt-4 inline-block border-b border-black pb-1 text-sm text-black/75"
                        >
                          View Product
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black text-black">
              <HeartIcon />
            </div>
            <h3 className="font-[Georgia,'Times New Roman',serif] text-4xl tracking-[0.02em] text-black">
              Your wishlist is empty
            </h3>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="mt-8 border-b border-black pb-1 text-lg text-black/80"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={activePanel === "bag"}
        title="Your bag"
        count={`(${cartCount})`}
        onClose={() => setActivePanel(null)}
      >
        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border-2 border-black text-black">
              <SadBagIcon />
            </div>
            <h3 className="font-[Georgia,'Times New Roman',serif] text-4xl tracking-[0.02em] text-black">
              Your cart is empty
            </h3>
            <button
              type="button"
              onClick={() => setActivePanel(null)}
              className="mt-8 border-b border-black pb-1 text-lg text-black/80"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <ul className="flex-1 space-y-3 overflow-auto px-8 py-6">
              {cart.items.map((item) => (
                <li
                  key={item.productId}
                  className="rounded-2xl border border-black/10 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-black/80">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-black/55">
                        Qty {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-accent">
                      Rs. {item.price * item.qty}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-black/10 px-8 py-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/70">Total</span>
                <span className="text-sm font-semibold text-black">
                  Rs. {cartTotal}
                </span>
              </div>

              <div className="mt-5">
                <Link
                  href="/checkout"
                  onClick={() => setActivePanel(null)}
                  className="block w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 text-center"
                >
                  Checkout
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="mt-3 block w-full rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black/80 transition hover:border-[#9d2936] hover:text-[#9d2936]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={activePanel === "search"}
        title="Search"
        onClose={() => setActivePanel(null)}
      >
        <div className="space-y-8 px-6 pb-8">
          <div className="flex items-center rounded-2xl border border-black/20 bg-white px-6 py-4">
            <input
              type="search"
              placeholder="Suggested searches"
              className="w-full bg-transparent text-[18px] text-black outline-none placeholder:text-black/55"
            />
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"
            >
              <SearchIcon />
            </button>
          </div>
          <div className="h-px bg-black/15" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
              Popular Searches
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {suggestedSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-black/80 transition hover:border-[#9d2936] hover:text-[#9d2936]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Drawer>

      {activePanel === "profile" ? (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <section className="relative w-full max-w-[1050px] rounded-[32px] bg-[#fdfbf7] p-6 shadow-[0_30px_80px_rgba(44,25,17,0.2)] sm:p-10">
            <button
              type="button"
              aria-label="Close profile"
              onClick={() => setActivePanel(null)}
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-black/45 text-black transition hover:border-[#9d2936] hover:text-[#9d2936]"
            >
              <CloseIcon />
            </button>
            <h2 className="text-center font-[Georgia,'Times New Roman',serif] text-4xl text-black sm:text-6xl">
              Customer login
            </h2>
            <div className="mx-auto mt-8 max-w-[630px] rounded-[26px] bg-white px-7 py-10 shadow-[0_12px_40px_rgba(44,25,17,0.08)] sm:px-10">
              <form className="space-y-6">
                <label className="block">
                  <span className="mb-3 block text-[18px] text-black">Email</span>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="h-20 w-full rounded-2xl border border-black/18 px-6 text-[18px] outline-none transition focus:border-[#9d2936]"
                  />
                </label>
                <label className="block">
                  <span className="mb-3 block text-[18px] text-black">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="h-20 w-full rounded-2xl border border-black/18 px-6 text-[18px] outline-none transition focus:border-[#9d2936]"
                  />
                </label>
                <div className="text-right">
                  <button
                    type="button"
                    className="border-b border-black pb-1 text-[16px] text-black"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full border border-[#9d2936] px-6 py-4 font-[Georgia,'Times New Roman',serif] text-2xl text-[#9d2936] transition hover:bg-[#9d2936] hover:text-white"
                >
                  Log in
                </button>
                <p className="pt-4 text-center text-[17px] text-black">
                  Don&apos;t have any account?{" "}
                  <button type="button" className="border-b border-black pb-1">
                    Create an account
                  </button>
                </p>
              </form>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}











