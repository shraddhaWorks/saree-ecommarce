"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

type MenuKey = "sarees" | "apparel" | "handicrafts";
type PanelKey = "bag" | "search" | "profile" | null;

type MenuSection = {
  title: string;
  items: string[];
};

type MenuData = {
  label: string;
  sections: MenuSection[];
  showcase: "sarees" | "apparel" | "handicrafts";
};

const primaryLinks = [
  { label: "Bridal", href: "#", accent: true },
  { label: "Sarees", href: "#", menu: "sarees" as const },
  { label: "Apparel", href: "#", menu: "apparel" as const },
  { label: "Handicrafts", href: "#", menu: "handicrafts" as const },
  { label: "Kalanjali Ethnics", href: "#", accent: true },
  { label: "Custom Stitching", href: "#", accent: true },
  { label: "Blog", href: "#", accent: true },
  { label: "Ugadi Sale", href: "#", accent: true },
];

const menuData: Record<MenuKey, MenuData> = {
  sarees: {
    label: "Sarees",
    sections: [
      {
        title: "Fabric",
        items: [
          "Chiffon Sarees",
          "Cotton Sarees",
          "Crepe Sarees",
          "Georgette Sarees",
          "Linen Sarees",
          "Sico Sarees",
          "Silk Sarees",
          "Tussar Sarees",
        ],
      },
      {
        title: "Party And Bridal",
        items: [
          "Banarasi Sarees",
          "Bandhani Sarees",
          "Baluchari Sarees",
          "Chanderi Sarees",
          "Fancy Sarees",
          "Gadwal Sarees",
          "Kanchipattu Sarees",
          "Kota Sarees",
          "Kuppadam Sarees",
          "Mangalagiri Sarees",
          "Narayanpet Sarees",
          "Paithani Sarees",
          "Pochampally Sarees",
          "Rajkot Patola Sarees",
        ],
      },
      {
        title: "Type",
        items: [
          "Embroidery",
          "Hand Crafted Sarees",
          "Printed",
          "Painted",
          "Woven",
        ],
      },
      {
        title: "Natural Dyes",
        items: ["Ajrakh Sarees", "Kalamkari Sarees", "Bagru Sarees"],
      },
    ],
    showcase: "sarees",
  },
  apparel: {
    label: "Apparel",
    sections: [
      {
        title: "Clothing",
        items: [
          "Kurtas",
          "Kurta Sets",
          "Co-ord Sets",
          "Dresses",
          "Menswear",
          "Kidswear",
          "View All",
        ],
      },
      {
        title: "Women Add-ons",
        items: ["Dress Material", "Dupattas", "Stoles-Shawls", "Pavada"],
      },
      {
        title: "Shop By Craft",
        items: [
          "Ajrakh Prints",
          "Bagh Prints",
          "Bagru Prints",
          "Ikat weaves",
          "Heritage Weaves",
          "Kalamkari Prints",
          "Sanganeri Block Prints",
        ],
      },
      {
        title: "Shop By Collection",
        items: [
          "English Tweeds Ikats",
          "Vihaga Kalamkaris",
          "Travelogue Sanganeris",
          "Nandankanan Kalamkaris",
          "Mansarovar Ajrakhs",
          "Himalayan Trove Bagrus",
          "Shikhara Ikats",
          "Padmaja Baghs",
          "Butta Bomma Bagrus",
        ],
      },
    ],
    showcase: "apparel",
  },
  handicrafts: {
    label: "Handicrafts",
    sections: [
      {
        title: "All Handicrafts",
        items: [
          "Brass Items",
          "Culture Marble",
          "Mandirs",
          "Marble",
          "Marble Artefacts",
          "Rose Wood",
          "Rose Quartz Stone",
          "Sandalwood",
          "Sandstones",
          "Silver Range",
          "White Metal",
          "White Wood",
          "Wooden Art Work",
        ],
      },
      {
        title: "Gifts",
        items: [
          "Corporate Gifts",
          "Gift Items",
          "Ganesha Collection",
          "Painted Gifts",
        ],
      },
      {
        title: "Home Decor",
        items: ["Dining Tables", "Sofa Sets", "Wall Panel", "Wall Hangings"],
      },
    ],
    showcase: "handicrafts",
  },
};

const suggestedSearches = [
  "Kanjivaram Sarees",
  "Bridal Banarasi",
  "Handcrafted Dupattas",
  "Brass Home Decor",
];

export function StorefrontNavbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const hasOverlay = activeMenu !== null || activePanel !== null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setActivePanel(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = hasOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasOverlay]);

  const closeAll = () => {
    setActiveMenu(null);
    setActivePanel(null);
  };

  const stopEvent = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const openPanel = (panel: Exclude<PanelKey, null>) => {
    setActiveMenu(null);
    setActivePanel(panel);
  };

  const toggleMenu = (menu: MenuKey) => {
    setActivePanel(null);
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  const currentMenu = activeMenu ? menuData[activeMenu] : null;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 bg-[#fdfbf7] shadow-[0_10px_34px_rgba(44,25,17,0.08)]">
        <div className="h-[6px] bg-[#822733]" />
        <header className="border-b border-black/10 bg-[#fdfbf7]" onClick={closeAll}>
          <div className="mx-auto flex max-w-[1880px] items-center justify-between gap-8 px-4 py-5 lg:px-10">
            <Link href="/" className="shrink-0" onClick={closeAll}>
              <RangamLogo />
            </Link>

            <div className="hidden min-w-0 flex-1 lg:block" onClick={stopEvent}>
              <nav
                aria-label="Primary"
                className="flex flex-col items-center justify-center gap-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
                  {primaryLinks.map((item) =>
                    item.menu ? (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => toggleMenu(item.menu)}
                        className={`flex items-center gap-1 font-[Georgia,'Times New Roman',serif] text-[16px] tracking-[0.02em] transition ${
                          activeMenu === item.menu
                            ? "text-black"
                            : item.accent
                              ? "text-[#9d2936]"
                              : "text-black/90 hover:text-[#9d2936]"
                        }`}
                      >
                        <span>{item.label.toUpperCase()}</span>
                        <ChevronIcon open={activeMenu === item.menu} />
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeAll}
                        className={`font-[Georgia,'Times New Roman',serif] text-[16px] tracking-[0.02em] transition ${
                          item.accent
                            ? "text-[#9d2936]"
                            : "text-black/90 hover:text-[#9d2936]"
                        }`}
                      >
                        {item.label.toUpperCase()}
                      </Link>
                    ),
                  )}
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-3 sm:gap-5" onClick={stopEvent}>
              <IconButton label="Search" onClick={() => openPanel("search")}>
                <SearchIcon />
              </IconButton>
              <IconButton label="Profile" onClick={() => openPanel("profile")}>
                <UserIcon />
              </IconButton>
              <IconButton label="Bag" onClick={() => openPanel("bag")}>
                <BagIcon />
              </IconButton>
            </div>
          </div>

          <div className="border-t border-black/8 px-4 py-3 lg:hidden" onClick={stopEvent}>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {primaryLinks.map((item) =>
                item.menu ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => toggleMenu(item.menu)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                      activeMenu === item.menu
                        ? "border-[#9d2936] bg-[#9d2936] text-white"
                        : "border-black/10 bg-white text-black/70"
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={closeAll}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/70"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
          </div>
        </header>

        {currentMenu ? <MegaMenu menu={currentMenu} onItemClick={closeAll} /> : null}
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
        isOpen={activePanel === "bag"}
        title="Your bag"
        count="(0)"
        onClose={() => setActivePanel(null)}
      >
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

function MegaMenu({ menu, onItemClick }: { menu: MenuData; onItemClick: () => void }) {
  const columnsClass =
    menu.showcase === "handicrafts"
      ? "grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr_1.8fr]"
      : "grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.3fr]";

  return (
    <section className="border-t border-black/8 bg-[#fdfbf7] px-4 pb-8 pt-6 lg:px-10">
      <div className={`mx-auto grid max-w-[1880px] gap-10 ${columnsClass}`}>
        {menu.sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-[Georgia,'Times New Roman',serif] text-[22px] uppercase text-black">
              {section.title}
            </h3>
            <ul className="mt-7 space-y-4">
              {section.items.map((item) => (
                <li key={item} className="text-[18px] leading-none text-black/90">
                  <Link href="#" onClick={onItemClick} className="transition hover:text-[#9d2936]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <ShowcaseArt variant={menu.showcase} />
      </div>
    </section>
  );
}

function ShowcaseArt({
  variant,
}: {
  variant: MenuData["showcase"];
}) {
  if (variant === "sarees") {
    return (
      <div className="grid gap-5 self-start">
        <ShowcaseCard
          title="Artisan Silk"
          subtitle="Handwoven bridal drapes"
          className="min-h-[290px] bg-[radial-gradient(circle_at_top,#e4ad56,#b77922_50%,#5d3110)]"
        />
        <ShowcaseCard
          title="Printed Sarees"
          subtitle="Soft drape, bold florals"
          className="min-h-[290px] bg-[radial-gradient(circle_at_top,#f0d9b0,#d19d59_55%,#7c5035)]"
        />
      </div>
    );
  }

  if (variant === "apparel") {
    return (
      <ShowcaseCard
        title="Prints"
        subtitle="Modern silhouettes in heritage patterns"
        className="min-h-[300px] bg-[linear-gradient(135deg,#b7803c,#efd39b_45%,#8a5a31)]"
      />
    );
  }

  return (
    <div className="rounded-[30px] border border-[#dccfbe] bg-white px-6 py-7">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
        {["Frame", "Krishna", "Ganesha", "Nataraja", "Lakshmi"].map((item, index) => (
          <div
            key={item}
            className={`flex min-h-[168px] items-end justify-center rounded-[22px] p-4 text-center font-[Georgia,'Times New Roman',serif] text-sm text-[#704d21] ${
              index % 2 === 0
                ? "bg-[linear-gradient(180deg,#fbf4e7,#dcc39a)]"
                : "bg-[linear-gradient(180deg,#f7ecd6,#cdb078)]"
            }`}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseCard({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[26px] border border-[#d7c6b2] p-7 text-white shadow-[0_14px_40px_rgba(44,25,17,0.12)] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.18))]" />
      <div className="relative flex h-full flex-col justify-end">
        <p className="font-[Georgia,'Times New Roman',serif] text-4xl uppercase tracking-[0.04em]">
          {title}
        </p>
        <p className="mt-3 max-w-xs text-base text-white/90">{subtitle}</p>
      </div>
    </div>
  );
}

function Drawer({
  isOpen,
  title,
  count,
  onClose,
  children,
}: {
  isOpen: boolean;
  title: string;
  count?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-[780px] flex-col rounded-l-[18px] bg-[#fdfbf7] shadow-[-16px_0_48px_rgba(44,25,17,0.18)] transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="flex items-start justify-between gap-4 px-8 pb-6 pt-10">
        <h2 className="font-[Georgia,'Times New Roman',serif] text-[40px] leading-none text-black sm:text-[54px]">
          {title} {count ? <span className="text-[28px]">{count}</span> : null}
        </h2>
        <button
          type="button"
          aria-label={`Close ${title}`}
          onClick={onClose}
          className="mt-1 flex h-12 w-12 items-center justify-center rounded-full border border-black/45 text-black transition hover:border-[#9d2936] hover:text-[#9d2936]"
        >
          <CloseIcon />
        </button>
      </div>
      {children}
    </aside>
  );
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-black/5 hover:text-[#9d2936]"
    >
      {children}
    </button>
  );
}

export function RangamLogo() {
  return (
    <div className="flex items-center">
      <Image
        src="/WhatsApp_Image_2025-06-02_at_12_39_05_PM-removebg-preview.png"
        alt="Rangam The Fashion House"
        width={190}
        height={190}
        priority
        className="h-[72px] w-auto object-contain sm:h-[84px]"
      />
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="2" />
      <path
        d="M17.5 17.5L23 23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="9" r="4.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 23C7 19.6863 10.134 17 14 17C17.866 17 21 19.6863 21 23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 10H20L19 23H9L8 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11 11V8.5C11 6.567 12.567 5 14.5 5H13.5C15.433 5 17 6.567 17 8.5V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5L17 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17 5L5 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SadBagIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="19" r="18" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M31 31L40 40"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="15" cy="16" r="1.8" fill="currentColor" />
      <circle cx="23" cy="16" r="1.8" fill="currentColor" />
      <path
        d="M14 25C15.3 22.8 17 21.7 19 21.7C21 21.7 22.7 22.8 24 25"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
