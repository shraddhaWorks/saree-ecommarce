import type { Product } from "@/lib/generated/prisma/client";

import { buildOrderedFacetRows, type OrderedFacetRow } from "./ordered-facet-rows";

/**
 * Primary specialities (reference images 2–3). Matched on name / description / pattern.
 * Order is intentional; more specific phrases should appear earlier in rules below.
 */
export const PRIMARY_SPECIALITY_DEFS = [
  { value: "Banarasi", label: "Banarasi" },
  { value: "Bandhani", label: "Bandhani" },
  { value: "Chanderi", label: "Chanderi" },
  { value: "Fancy", label: "Fancy" },
  { value: "Gadwal", label: "Gadwal" },
  { value: "Kalamkari", label: "Kalamkari" },
  { value: "Kanchipattu", label: "Kanchipattu" },
  { value: "Mangalagiri", label: "Mangalagiri" },
  { value: "Narayanpet", label: "Narayanpet" },
  { value: "Paithani", label: "Paithani" },
  { value: "Pochampally", label: "Pochampally" },
  { value: "Rajkot Patola", label: "Rajkot Patola" },
  { value: "Soft Silk", label: "Soft Silk" },
  { value: "Uppada", label: "Uppada" },
  { value: "Venkatagiri", label: "Venkatagiri" },
] as const;

const SPECIALITY_RULES: { value: string; keywords: string[] }[] = [
  { value: "Rajkot Patola", keywords: ["rajkot patola", "rajkot", "patola"] },
  { value: "Soft Silk", keywords: ["soft silk"] },
  {
    value: "Kanchipattu",
    keywords: ["kanchipattu", "kanchipuram", "kanjivaram", "kanchi pattu", "kancheepuram"],
  },
  { value: "Pochampally", keywords: ["pochampally", "pochampalli", "ikkat", "ikat"] },
  { value: "Banarasi", keywords: ["banarasi", "banaras", "benarasi", "varanasi"] },
  { value: "Bandhani", keywords: ["bandhani", "bandhej"] },
  { value: "Chanderi", keywords: ["chanderi"] },
  { value: "Fancy", keywords: ["fancy"] },
  { value: "Gadwal", keywords: ["gadwal"] },
  { value: "Kalamkari", keywords: ["kalamkari"] },
  { value: "Mangalagiri", keywords: ["mangalagiri"] },
  { value: "Narayanpet", keywords: ["narayanpet"] },
  { value: "Paithani", keywords: ["paithani"] },
  { value: "Uppada", keywords: ["uppada"] },
  { value: "Venkatagiri", keywords: ["venkatagiri"] },
];

function titleCaseOccasion(s: string): string {
  return s
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

export function specialityMoreFacetLabel(value: string): string {
  if (value.startsWith("OCC_")) return titleCaseOccasion(value.slice(4));
  if (value === "SPEC_CLASSIC") return "Classic";
  return value;
}

/** One bucket per product for filters + facet counts. */
export function specialityBucket(p: Product): string {
  const t = `${p.name} ${p.description ?? ""} ${p.pattern ?? ""}`.toLowerCase();
  for (const rule of SPECIALITY_RULES) {
    if (rule.keywords.some((k) => t.includes(k))) return rule.value;
  }
  if (p.occasion) return `OCC_${String(p.occasion)}`;
  return "SPEC_CLASSIC";
}

export function buildSpecialityFacetRows(
  counts: Map<string, number>,
  swatches: readonly string[],
): OrderedFacetRow[] {
  return buildOrderedFacetRows([...PRIMARY_SPECIALITY_DEFS], counts, swatches, specialityMoreFacetLabel);
}
