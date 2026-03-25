"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useCart, useWishlist } from "@/components/cart";
import { MegaMenu, menuData, primaryLinks, suggestedSearches, type MenuEntryKey, type MenuSection, type MenuItem } from "./menu";
import { Drawer, IconButton, RangamLogo } from "./ui";
import { BagIcon, CloseIcon, HeartIcon, SearchIcon, UserIcon, SadBagIcon, MenuIcon } from "./icons";

type PanelKey = "bag" | "search" | "profile" | "wishlist" | "menu" | null;

export function StorefrontNavbar() {
  const { state, removeItem } = useCart();
  const {
    state: wishlistState,
    removeItem: removeWishlistItem,
  } = useWishlist();
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [activeMenu, setActiveMenu] = useState<MenuEntryKey | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const hasOverlay = activePanel !== null;
  const hasMenuOverlay = activeMenu !== null;
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    const onPointerDown = (event: PointerEvent) => {
      if (!navbarRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseEnter = (menuKey: MenuEntryKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 200ms grace period
  };

  const stopEvent = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const openPanel = (panel: Exclude<PanelKey, null>) => {
    setActivePanel(panel);
    setActiveMenu(null);
  };

  const hasWishlistItems = wishlistState.items.length > 0;
  const formatPrice = (price: number) =>
    `Rs. ${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const isMegaMenuOpen = activeMenu !== null;

  return (
    <>
      <div 
        ref={navbarRef} 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          (isScrolled || !isHomePage) 
            ? "bg-[#fdfbf7] shadow-[0_10px_34px_rgba(44,25,17,0.08)]" 
            : "bg-[#fdfbf7] lg:bg-transparent"
        }`}
      >
        <div className={`h-[4px] bg-[#822733] transition-opacity duration-500 ${(isScrolled || !isHomePage) ? "opacity-100" : "opacity-100 lg:opacity-0"}`} />
        <header 
          className={`border-b border-black/10 transition-colors duration-500 ${
            (isScrolled || !isHomePage) ? "bg-[#fdfbf7]" : "bg-[#fdfbf7] border-transparent lg:bg-transparent"
          }`} 
          onClick={closeAll}
        >
          <div className="mx-auto max-w-[1880px] px-3 py-2 sm:px-4 sm:py-3 lg:px-8 lg:py-4">
            <div onClick={stopEvent}>
              <div className="flex items-center gap-[clamp(8px,1vw,24px)] whitespace-nowrap">
                  <div className="flex lg:hidden shrink-0 items-center mr-1 text-black">
                    <IconButton label="Menu" onClick={() => openPanel("menu")}>
                      <MenuIcon />
                    </IconButton>
                  </div>

                  <Link href="/" className="shrink-0" onClick={closeAll}>
                    <div className="transition-all duration-500">
                      <RangamLogo />
                    </div>
                  </Link>

                <nav aria-label="Primary" className="flex-1 min-w-0 hidden lg:block">
                  <div className="flex min-w-0 items-center justify-center gap-[clamp(8px,1.1vw,28px)] py-2">
                    {primaryLinks.map((item) => (
                      item.menuKey ? (
                        <button
                          key={item.label}
                          type="button"
                          onMouseEnter={() => handleMouseEnter(item.menuKey as MenuEntryKey)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => setActiveMenu(null)}
                          className={
                            activeMenu === item.menuKey
                              ? "min-w-0 shrink cursor-pointer text-center font-[Georgia,'Times_New_Roman',serif] text-[clamp(8px,0.9vw,17px)] leading-none tracking-normal text-[#9d2936] transition"
                              : `min-w-0 shrink cursor-pointer text-center font-[Georgia,'Times_New_Roman',serif] text-[clamp(8px,0.9vw,17px)] leading-none tracking-normal transition hover:text-[#9d2936] ${
                                  (isScrolled || !isHomePage) ? "text-black" : ""
                                }`
                          }
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeAll}
                          className={`min-w-0 shrink cursor-pointer text-center font-[Georgia,'Times_New_Roman',serif] text-[clamp(8px,0.9vw,17px)] leading-none tracking-normal transition hover:text-[#9d2936] ${
                            (isScrolled || !isHomePage) ? "text-black" : "text-white drop-shadow-sm hover:text-white/80"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    ))}
                  </div>
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3 text-black">
                  <IconButton label="Search" onClick={() => openPanel("search")} className="cursor-pointer">
                    <SearchIcon />
                  </IconButton>
                  <div className="relative hidden sm:block">
                    <IconButton label="Wishlist" onClick={() => openPanel("wishlist")} className="cursor-pointer">
                      <HeartIcon />
                    </IconButton>
                    {wishlistState.itemCount > 0 ? (
                      <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#9d2936] px-1 text-[10px] font-semibold text-white">
                        {wishlistState.itemCount}
                      </span>
                    ) : null}
                  </div>
                  <IconButton label="Profile" onClick={() => openPanel("profile")} className="cursor-pointer">
                    <UserIcon />
                  </IconButton>
                  <div className="relative hidden sm:block">
                    <IconButton label="Bag" onClick={() => openPanel("bag")} className="cursor-pointer">
                      <BagIcon />
                    </IconButton>
                    {state.itemCount > 0 ? (
                      <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#9d2936] px-1 text-[10px] font-semibold text-white">
                        {state.itemCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {activeMenu ? (
          <nav 
            aria-label="Primary mega menu" 
            onClick={closeAll}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 top-full w-full hidden lg:block animate-page-entrance"
          >
            <MegaMenu menu={menuData[activeMenu]} onItemClick={closeAll} />
          </nav>
        ) : null}
      </div>

      {hasMenuOverlay ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-[rgba(32,24,21,0.18)] backdrop-brightness-75 hidden lg:block"
          onClick={closeAll}
        />
      ) : null}

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
        count={`(${state.itemCount})`}
        onClose={() => setActivePanel(null)}
      >
        {state.items.length === 0 ? (
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
              {state.items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-black/10 bg-white p-4"
                >
                  <div className="flex gap-4">
                    {item.image ? (
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3ebe0]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-20 w-16 shrink-0 rounded-xl bg-[#f3ebe0]" />
                    )}
                    <div className="flex flex-1 items-start justify-between gap-3 min-w-0">
                      <div className="min-w-0 flex flex-col justify-between h-full">
                        <div>
                          <p className="line-clamp-2 text-sm font-semibold text-black/80">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-black/55">
                            Qty {item.quantity}
                            {item.size ? ` • Size: ${item.size}` : ""}
                            {item.color ? ` • Color: ${item.color}` : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-2 text-xs text-black/45 transition hover:text-[#9d2936] text-left"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-accent">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-black/10 px-8 py-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/70">Total</span>
                <span className="text-sm font-semibold text-black">
                  Rs. {state.total}
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
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/45 text-black transition hover:border-[#9d2936] hover:text-[#9d2936]"
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

      <Drawer
        isOpen={activePanel === "menu"}
        title="Menu"
        onClose={() => {
          setActivePanel(null);
          setOpenMobileSubmenu(null);
        }}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-20">
                    <div className="grid grid-cols-2 gap-3 border-b border-black/10 pb-5 pt-4 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setOpenMobileSubmenu(null);
                setActivePanel("wishlist");
              }}
              className="relative rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:border-[#9d2936] hover:text-[#9d2936]"
            >
              Wishlist
              {wishlistState.itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#9d2936] px-1 text-[10px] font-semibold text-white">
                  {wishlistState.itemCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenMobileSubmenu(null);
                setActivePanel("bag");
              }}
              className="relative rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:border-[#9d2936] hover:text-[#9d2936]"
            >
              Bag
              {state.itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#9d2936] px-1 text-[10px] font-semibold text-white">
                  {state.itemCount}
                </span>
              ) : null}
            </button>
          </div>
          <ul className="space-y-6 pt-6">
            {primaryLinks.map((item) => (
              <li key={item.label} className="border-b border-black/5 pb-6 last:border-0">
                <div 
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => {
                    if (item.menuKey) {
                      setOpenMobileSubmenu(openMobileSubmenu === item.label ? null : item.label);
                    } else if (item.href) {
                      window.location.href = item.href;
                      closeAll();
                    }
                  }}
                >
                  <span className="text-xl font-medium text-black transition hover:text-[#9d2936]">
                    {item.label}
                  </span>
                  {item.menuKey && (
                    <button
                      type="button"
                      className={`p-2 transition-transform duration-300 ${openMobileSubmenu === item.label ? "rotate-180" : ""}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                  )}
                </div>

                {item.menuKey && openMobileSubmenu === item.label && menuData[item.menuKey as MenuEntryKey] && (
                  <div className="mt-4 animate-page-entrance space-y-6 pl-4 border-l-2 border-[#9d2936]/10">
                    {/* Link to main category for mobile users */}
                    <li>
                      <Link
                        href={item.href || '#'}
                        onClick={closeAll}
                        className="block text-lg font-bold text-[#9d2936] transition hover:underline"
                      >
                        View All {item.label}
                      </Link>
                    </li>
                    
                    {menuData[item.menuKey as MenuEntryKey].sections.map((section: MenuSection) => (
                      <div key={section.title || "main"}>
                        {section.title && (
                          <h4 className="text-sm font-bold uppercase tracking-wider text-black/40 mb-3">
                            {section.title}
                          </h4>
                        )}
                        <ul className="space-y-4">
                          {section.items.map((subItem: MenuItem) => (
                            <li key={subItem.label}>
                              <Link
                                href={subItem.href || "#"}
                                onClick={closeAll}
                                className="block text-lg text-black/80 transition hover:text-[#9d2936]"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
}
