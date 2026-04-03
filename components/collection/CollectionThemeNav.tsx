"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { COLLECTION_QUICK_NAV } from "@/lib/collection-theme";

type Props = { className?: string };

/**
 * Three Kalanjali-style pills: circular thumbnail on the left, label on the right (not the 8-tile grid).
 */
export function CollectionThemeNav({ className = "" }: Props) {
  const pathname = usePathname();

  return (
    <div
      className={`flex w-full flex-wrap gap-2 pb-0.5 pt-0.5 sm:gap-2.5 md:gap-3 ${className}`}
    >
      {COLLECTION_QUICK_NAV.map((item) => {
        const href = item.query ? `${pathname}?${item.query}` : pathname;
        return (
          <Link
            key={item.id}
            href={href}
            scroll={false}
            className="group flex min-w-0 shrink-0 items-center gap-2 rounded-full border border-black/80 bg-white py-0.5 pl-0.5 pr-3 shadow-sm transition hover:bg-[#faf8f4] touch-manipulation sm:gap-2.5 sm:border-2 sm:py-1 sm:pl-1 sm:pr-4 md:gap-3 md:pr-5"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-black/15 sm:h-11 sm:w-11 md:h-12 md:w-12">
              <img
                src={item.imageUrl}
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </span>
            <span className="max-w-[9.5rem] truncate text-left text-xs font-semibold capitalize tracking-wide text-[#1a1512] sm:max-w-none sm:text-[13px] md:text-sm">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
