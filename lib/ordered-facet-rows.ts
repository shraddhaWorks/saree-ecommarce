/**
 * Shared “primary list + more” facet rows (same pattern as fabric).
 */

export type OrderedFacetRow = {
  value: string;
  label: string;
  count: number;
  thumbUrl?: string;
  tier: "primary" | "more";
};

export type PrimaryFacetDef = { value: string; label: string };

export function buildOrderedFacetRows(
  primary: readonly PrimaryFacetDef[],
  counts: Map<string, number>,
  swatches: readonly string[],
  moreLabelForValue: (value: string) => string = (v) => v,
): OrderedFacetRow[] {
  const primaryKeys = new Set(primary.map((p) => p.value));
  const primaryRows: OrderedFacetRow[] = primary.map((def, i) => ({
    value: def.value,
    label: def.label,
    count: counts.get(def.value) ?? 0,
    thumbUrl: swatches[i % swatches.length],
    tier: "primary",
  }));

  const more: OrderedFacetRow[] = [...counts.entries()]
    .filter(([k]) => !primaryKeys.has(k))
    .filter(([, c]) => c > 0)
    .sort((a, b) => moreLabelForValue(a[0]).localeCompare(moreLabelForValue(b[0])))
    .map(([value, count], idx) => ({
      value,
      label: moreLabelForValue(value),
      count,
      thumbUrl: swatches[idx % swatches.length],
      tier: "more" as const,
    }));

  return [...primaryRows, ...more];
}
