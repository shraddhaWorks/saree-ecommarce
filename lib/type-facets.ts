import type { Product } from "@/lib/generated/prisma/client";

import { buildOrderedFacetRows, type OrderedFacetRow } from "./ordered-facet-rows";

/** Matches reference Type filter: Embroidery, Printed, Printed|Woven, Woven. */
export const PRIMARY_TYPE_FACETS = [
  { value: "Embroidery", label: "Embroidery" },
  { value: "Printed", label: "Printed" },
  { value: "Printed|Woven", label: "Printed|Woven" },
  { value: "Woven", label: "Woven" },
] as const;

export function typeBucket(p: Product): string {
  const t = `${p.pattern ?? ""} ${p.name} ${p.description ?? ""}`.toLowerCase();
  if (t.includes("embroider") || t.includes("embroid")) return "Embroidery";
  const hasPrint = t.includes("print");
  const hasWoven =
    t.includes("woven") ||
    t.includes("weave") ||
    t.includes("handloom") ||
    t.includes("hand loom");
  if (hasPrint && hasWoven) return "Printed|Woven";
  if (hasPrint) return "Printed";
  return "Woven";
}

export function buildTypeFacetRows(
  counts: Map<string, number>,
  swatches: readonly string[],
): OrderedFacetRow[] {
  return buildOrderedFacetRows([...PRIMARY_TYPE_FACETS], counts, swatches);
}
