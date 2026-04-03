/**
 * Storefront fabric filter: fixed primary list (order + labels) plus any other cloth types
 * that appear in the catalog (Kanjivaram, Banarasi, etc.) under "More fabrics".
 */

import { buildOrderedFacetRows, type OrderedFacetRow } from "./ordered-facet-rows";

export const PRIMARY_STOREFRONT_FABRICS = [
  { value: "CHIFFON", label: "Chiffon" },
  { value: "COTTON", label: "Cotton" },
  { value: "CREPE", label: "Crepe" },
  { value: "GEORGETTE", label: "Georgette" },
  { value: "LINEN", label: "Linen" },
  { value: "SICO", label: "Sico" },
  { value: "SILK", label: "Silk" },
  { value: "TUSSAR", label: "Tussar" },
] as const;

/** Human labels for admin / PDP (all Prisma ClothType values). */
export const CLOTH_TYPE_LABELS: Record<string, string> = {
  SILK: "Silk",
  COTTON: "Cotton",
  LINEN: "Linen",
  GEORGETTE: "Georgette",
  CHIFFON: "Chiffon",
  KANJIVARAM: "Kanjivaram",
  BANARASI: "Banarasi",
  TUSSAR: "Tussar",
  ORGANZA: "Organza",
  CREPE: "Crepe",
  SICO: "Sico",
  OTHER: "Other",
};

export function clothTypeDisplayLabel(value: string): string {
  return CLOTH_TYPE_LABELS[value] ?? value.replace(/_/g, " ");
}

export type FabricFacetBuildRow = OrderedFacetRow;

export function buildFabricFacetRows(
  counts: Map<string, number>,
  swatches: readonly string[],
): FabricFacetBuildRow[] {
  return buildOrderedFacetRows([...PRIMARY_STOREFRONT_FABRICS], counts, swatches, clothTypeDisplayLabel);
}
