import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  LEGACY_LINE_PARENT_SLUGS_SORTED,
  LEGACY_PARENT_TO_COLLECTION_ROOT,
} from "@/lib/legacy-mega-menu-paths";

/**
 * Legacy mega-menu URLs (`/traditional-sarees/kanchi-pattu-sarees`) had no App Router page.
 * 308 → `/collections/kanchi-pattu-sarees` (same URL as Your Wedding Edit).
 * Also handles `/traditional-sarees` alone and short parents like `/designer-party-wear/organza-sarees`.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";

  if (pathname !== "/") {
    const bare = pathname.slice(1);
    const root = LEGACY_PARENT_TO_COLLECTION_ROOT[bare];
    if (root) {
      const url = request.nextUrl.clone();
      url.pathname = root;
      return NextResponse.redirect(url, 308);
    }
  }

  for (const parent of LEGACY_LINE_PARENT_SLUGS_SORTED) {
    const prefix = `/${parent}/`;
    if (!pathname.startsWith(prefix)) continue;

    const rest = pathname.slice(prefix.length);
    const lineSlug = rest.split("/").filter(Boolean)[0];
    if (!lineSlug || !/^[a-z0-9-]+$/i.test(lineSlug)) continue;

    const url = request.nextUrl.clone();
    url.pathname = `/collections/${lineSlug}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/traditional-sarees",
    "/traditional-sarees/:path*",
    "/wedding-sarees",
    "/wedding-sarees/:path*",
    "/designer-and-party-wear-sarees",
    "/designer-and-party-wear-sarees/:path*",
    "/festive-wear-sarees",
    "/festive-wear-sarees/:path*",
    "/casual-and-workwear-sarees",
    "/casual-and-workwear-sarees/:path*",
    "/dhoti-and-kanduva",
    "/dhoti-and-kanduva/:path*",
    "/designer-party-wear",
    "/designer-party-wear/:path*",
    "/festive-wear",
    "/festive-wear/:path*",
    "/casual-workwear",
    "/casual-workwear/:path*",
    "/dhoti-kanduva",
    "/dhoti-kanduva/:path*",
  ],
};
