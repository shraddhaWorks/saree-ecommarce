"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { resolveMenuItemHref } from "@/components/navbar/menu/resolve-menu-href";

import { getNavMegaItems, resolveMegaPreviewHref } from "./nav-mega-items";

export function MainNavigation() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  const navItemsWithChildren = useMemo(() => getNavMegaItems(), []);

  return (
    <nav
      aria-label="Primary"
      className="relative hidden w-full justify-center overflow-visible lg:flex"
      onMouseLeave={() => setOpenLabel(null)}
    >
      <div className="w-full overflow-visible">
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 2xl:gap-x-8">
          {navItemsWithChildren.map((item) => {
            return (
              <li
                key={item.href}
                className="relative shrink-0"
                onMouseEnter={() => setOpenLabel(item.label)}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpenLabel(null)}
                  className="whitespace-nowrap font-serif-royal text-center text-[15px] font-semibold leading-snug tracking-[0.02em] text-[var(--announcement-maroon)] transition-colors hover:text-accent xl:text-[16px] 2xl:text-[17px]"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {openLabel ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 border-t border-[var(--announcement-sandal)]/25 bg-[var(--announcement-maroon)] shadow-2xl">
          {(() => {
            const openItem = navItemsWithChildren.find((item) => item.label === openLabel);
            if (!openItem || openItem.children.length === 0) return null;
            return (
              <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[320px_1fr] gap-8 px-8 py-7">
                <ul className="max-h-[52vh] overflow-auto rounded-xl border border-[var(--announcement-sandal)]/18 bg-[#6f1325]/55 p-2">
                  {openItem.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={resolveMenuItemHref(child)}
                        onClick={() => setOpenLabel(null)}
                        className="block rounded-lg px-3 py-2.5 text-[15px] font-medium leading-snug text-[var(--announcement-sandal)]/95 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-5">
                  {openItem.previews.map((preview) => (
                    <Link
                      key={preview.title}
                      href={resolveMegaPreviewHref(openItem, preview)}
                      onClick={() => setOpenLabel(null)}
                      className="group overflow-hidden rounded-xl border border-[var(--announcement-sandal)]/22 bg-[#6f1325]"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={preview.imageUrl}
                          alt={preview.title}
                          className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      <div className="border-t border-[var(--announcement-sandal)]/18 px-5 py-4">
                        <p className="font-serif-royal text-2xl leading-tight text-[var(--announcement-sandal)]">
                          {preview.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[var(--announcement-sandal)]/85">
                          {preview.subtitle}
                        </p>
                        <span className="mt-3 inline-block rounded-sm bg-[var(--announcement-sandal)] px-5 py-2 text-sm font-semibold text-[var(--announcement-maroon)]">
                          Shop Now
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      ) : null}
    </nav>
  );
}
