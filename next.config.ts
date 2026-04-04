import type { NextConfig } from "next";

import {
  LEGACY_MEGA_MENU_PARENT_SLUGS,
  LEGACY_PARENT_TO_COLLECTION_ROOT,
  LEGACY_SHORT_LINE_PARENT_SLUGS,
} from "./lib/legacy-mega-menu-paths";

function supabaseStorageRemotePattern():
  | { protocol: "https"; hostname: string; pathname: string }
  | undefined {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return undefined;
    return {
      protocol: "https",
      hostname: u.hostname,
      pathname: "/storage/v1/object/public/**",
    };
  } catch {
    return undefined;
  }
}

const supabasePattern = supabaseStorageRemotePattern();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...(supabasePattern ? [supabasePattern] : [])],
  },
  /** Same destinations as Wedding Edit: `/collections/:slug` (fixes 404 on old mega-menu URLs). */
  async redirects() {
    const nested = LEGACY_MEGA_MENU_PARENT_SLUGS.map((parent) => ({
      source: `/${parent}/:slug`,
      destination: "/collections/:slug",
      permanent: true,
    }));
    const nestedShort = LEGACY_SHORT_LINE_PARENT_SLUGS.map((parent) => ({
      source: `/${parent}/:slug`,
      destination: "/collections/:slug",
      permanent: true,
    }));
    const parentOnly = Object.entries(LEGACY_PARENT_TO_COLLECTION_ROOT).map(
      ([parent, dest]) => ({
        source: `/${parent}`,
        destination: dest,
        permanent: true,
      }),
    );
    return [...nested, ...nestedShort, ...parentOnly];
  },
};

export default nextConfig;
