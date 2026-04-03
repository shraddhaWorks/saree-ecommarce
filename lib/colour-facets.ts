import type { Product } from "@/lib/generated/prisma/client";

import { buildOrderedFacetRows, type OrderedFacetRow } from "./ordered-facet-rows";

/**
 * Primary colours (reference: Green, Yellow first, then common saree palette).
 * Products whose `color` text matches keywords roll up into these buckets; others stay as-is under “More colours”.
 */
export const PRIMARY_COLOUR_FACET_DEFS = [
  {
    value: "Green",
    label: "Green",
    keywords: ["green", "mehendi", "mehndi", "olive", "emerald", "parrot", "bottle green", "pista", "mint"],
  },
  {
    value: "Yellow",
    label: "Yellow",
    keywords: ["yellow", "mustard", "haldi", "lemon", "lime", "amber"],
  },
  {
    value: "Gold",
    label: "Gold",
    keywords: ["gold", "golden", "antique gold"],
  },
  {
    value: "Red",
    label: "Red",
    keywords: ["red", "crimson", "cherry", "rani", "ruby", "scarlet"],
  },
  {
    value: "Maroon",
    label: "Maroon",
    keywords: ["maroon", "wine", "burgundy", "oxblood"],
  },
  {
    value: "Pink",
    label: "Pink",
    keywords: ["pink", "rose", "magenta", "fuchsia", "salmon"],
  },
  {
    value: "Blue",
    label: "Blue",
    keywords: ["blue", "navy", "turquoise", "teal", "aqua", "cobalt", "indigo", "royal blue"],
  },
  {
    value: "Orange",
    label: "Orange",
    keywords: ["orange", "rust", "terracotta", "coral", "peach"],
  },
  {
    value: "Purple",
    label: "Purple",
    keywords: ["purple", "violet", "lavender", "lilac", "plum"],
  },
  {
    value: "Black",
    label: "Black",
    keywords: ["black", "jet"],
  },
  {
    value: "White",
    label: "White",
    keywords: ["white", "ivory", "off white", "off-white", "cream white"],
  },
  {
    value: "Beige",
    label: "Beige",
    keywords: ["beige", "tan", "sand", "nude"],
  },
  {
    value: "Cream",
    label: "Cream",
    keywords: ["cream", "buttermilk"],
  },
  {
    value: "Brown",
    label: "Brown",
    keywords: ["brown", "coffee", "chocolate", "mocha"],
  },
  {
    value: "Grey",
    label: "Grey",
    keywords: ["grey", "gray", "silver", "ash"],
  },
] as const;

export function colourFacetBucket(p: Product): string | null {
  const raw = p.color?.trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();
  for (const def of PRIMARY_COLOUR_FACET_DEFS) {
    if (def.keywords.some((k) => lower.includes(k))) return def.value;
  }
  return raw;
}

export function buildColourFacetRows(
  counts: Map<string, number>,
  swatches: readonly string[],
): OrderedFacetRow[] {
  const primary = PRIMARY_COLOUR_FACET_DEFS.map(({ value, label }) => ({ value, label }));
  return buildOrderedFacetRows(primary, counts, swatches, (v) => v);
}
