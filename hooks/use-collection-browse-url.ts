"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { CollectionBrowseState } from "@/lib/collection-browse";
import {
  parseCollectionBrowse,
  patchCollectionBrowse,
  serializeCollectionBrowse,
} from "@/lib/collection-browse";

export type UseCollectionBrowseUrlOptions = {
  /** Override when the listing URL is not the current `usePathname()` (e.g. embedded). */
  pathname?: string;
};

/**
 * Keeps product filters in the URL (fabric, type, speciality, colour, price, sale %, sort, q)
 * so the same bar works on any page that parses `searchParams` with `parseCollectionBrowse`
 * and runs `filterProducts` / `sortProducts` on the server (or client).
 */
export function useCollectionBrowseUrl(options?: UseCollectionBrowseUrlOptions) {
  const router = useRouter();
  const pathnameDefault = usePathname();
  const pathname = options?.pathname ?? pathnameDefault;
  const searchParams = useSearchParams();

  const readState = useCallback((): CollectionBrowseState => {
    const raw: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      raw[k] = v;
    });
    return parseCollectionBrowse(raw);
  }, [searchParams]);

  const state = useMemo(() => readState(), [readState]);

  const push = useCallback(
    (next: CollectionBrowseState) => {
      const q = serializeCollectionBrowse(next);
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const patch = useCallback(
    (partial: Partial<CollectionBrowseState>) => {
      push(patchCollectionBrowse(readState(), partial));
    },
    [push, readState],
  );

  const toggleFacet = useCallback(
    (field: "fabric" | "type" | "speciality" | "colour", value: string) => {
      const cur = readState();
      const nextSet = new Set(cur[field]);
      if (nextSet.has(value)) nextSet.delete(value);
      else nextSet.add(value);
      push(patchCollectionBrowse(cur, { [field]: nextSet }));
    },
    [push, readState],
  );

  return { state, pathname, push, patch, toggleFacet, readState };
}
