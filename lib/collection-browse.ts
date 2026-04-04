import type { Product } from "@/lib/generated/prisma/client";

import { buildColourFacetRows, colourFacetBucket } from "./colour-facets";
import { buildFabricFacetRows } from "./fabric-facets";
import { COLLECTION_DROPDOWN_SWATCHES } from "./collection-theme";
import { buildSpecialityFacetRows, specialityBucket } from "./speciality-facets";
import { buildTypeFacetRows, typeBucket } from "./type-facets";
import type { ProductWithRelations } from "./storefront-map";

export type FacetOption = {
  value: string;
  label: string;
  count: number;
  thumbUrl?: string;
  /** Primary vs extra values (e.g. more fabrics / colours / specialities). */
  tier?: "primary" | "more";
};

export type CollectionFacets = {
  fabric: FacetOption[];
  type: FacetOption[];
  speciality: FacetOption[];
  colour: FacetOption[];
  priceMin: number;
  priceMax: number;
};

export type CollectionBrowseState = {
  fabric: Set<string>;
  type: Set<string>;
  speciality: Set<string>;
  colour: Set<string>;
  priceMin: number | null;
  priceMax: number | null;
  saleMin: number | null;
  saleMax: number | null;
  sort: string;
  q: string;
};

/** Parse Next.js searchParams into browse state. */
export function parseCollectionBrowse(
  raw: Record<string, string | string[] | undefined>,
): CollectionBrowseState {
  const one = (k: string) => {
    const v = raw[k];
    if (Array.isArray(v)) return v[0] ?? "";
    return v ?? "";
  };

  const multi = (k: string) => {
    const v = raw[k];
    if (!v) return [] as string[];
    const s = Array.isArray(v) ? v.join(",") : v;
    return s
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  };

  const num = (k: string) => {
    const n = parseInt(one(k), 10);
    return Number.isFinite(n) ? n : null;
  };

  const sortRaw = one("sort").trim();
  const allowedSort = new Set(["new", "bestselling", "old", "price-asc", "price-desc", "sale"]);
  const sort = allowedSort.has(sortRaw) ? sortRaw : "bestselling";

  return {
    fabric: new Set(multi("fabric")),
    type: new Set(multi("type")),
    speciality: new Set(multi("spec")),
    colour: new Set(multi("colour")),
    priceMin: num("priceMin"),
    priceMax: num("priceMax"),
    saleMin: num("saleMin"),
    saleMax: num("saleMax"),
    sort,
    q: one("q").trim(),
  };
}

function priceRs(p: Product) {
  return Math.round(p.priceInPaise / 100);
}

function matchesBrowse(p: Product, s: CollectionBrowseState): boolean {
  if (s.q) {
    const hay = `${p.name} ${p.description ?? ""} ${p.slug}`.toLowerCase();
    if (!hay.includes(s.q.toLowerCase())) return false;
  }
  if (s.fabric.size > 0 && !s.fabric.has(String(p.clothType))) return false;
  if (s.type.size > 0 && !s.type.has(typeBucket(p))) return false;
  if (s.speciality.size > 0 && !s.speciality.has(specialityBucket(p))) return false;
  if (s.colour.size > 0) {
    const bucket = colourFacetBucket(p);
    if (!bucket || !s.colour.has(bucket)) return false;
  }
  const pr = priceRs(p);
  if (s.priceMin != null && pr < s.priceMin) return false;
  if (s.priceMax != null && pr > s.priceMax) return false;
  const disc = p.isSpecial ? 10 : 0;
  if (s.saleMin != null && disc < s.saleMin) return false;
  if (s.saleMax != null && disc > s.saleMax) return false;
  return true;
}

export function filterProducts(products: ProductWithRelations[], s: CollectionBrowseState) {
  return products.filter((row) => matchesBrowse(row, s));
}

/** Stopwords when matching mega-menu labels to product text (slug/name/description). */
const MEGA_LABEL_STOPWORDS = new Set([
  "sarees",
  "saree",
  "silk",
  "wear",
  "and",
  "the",
  "for",
  "set",
  "half",
  "full",
  "party",
  "casual",
  "work",
  "traditional",
  "designer",
  "festive",
]);

/** A token matches if any of these substrings appear in hay (e.g. Kanjivaram → Kanchi line). */
const MEGA_TOKEN_ALIASES: Record<string, readonly string[]> = {
  kanchi: ["kanchi", "kanjivaram", "kanchipuram", "kanchi pattu"],
  pattu: ["pattu"],
  banaras: ["banaras", "banarasi"],
  paithani: ["paithani"],
  patola: ["patola"],
  gadwal: ["gadwal"],
  arani: ["arani"],
  venkatagiri: ["venkatagiri"],
  uppada: ["uppada"],
  mangalagiri: ["mangalagiri"],
  mysore: ["mysore"],
  bridal: ["bridal"],
  reception: ["reception"],
  organza: ["organza"],
  ikkat: ["ikkat", "ikat"],
  bandini: ["bandini", "bandhani"],
  georgette: ["georgette"],
  khadi: ["khadi"],
  tusser: ["tusser", "tussar", "tussore"],
  tissu: ["tissu", "tissue"],
};

function megaTokenMatches(token: string, hay: string): boolean {
  if (hay.includes(token)) return true;
  const aliases = MEGA_TOKEN_ALIASES[token];
  if (aliases) return aliases.some((a) => hay.includes(a.replace(/\s+/g, "")) || hay.includes(a));
  return false;
}

/**
 * Narrows products to those that match a mega-menu / wedding-edit line (e.g. "Kanchi Pattu Sarees").
 * Short labels (≤3 keywords): every keyword must match. Longer labels: majority must match.
 * If nothing meaningful is left after stopwords, no products match.
 */
export function productMatchesMegaMenuLabel(p: ProductWithRelations, menuLabel: string): boolean {
  const tokens = (menuLabel.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(
    (t) => t.length > 2 && !MEGA_LABEL_STOPWORDS.has(t),
  );
  if (tokens.length === 0) return false;
  const hay = `${p.name} ${p.description ?? ""} ${p.slug} ${p.pattern ?? ""} ${p.color ?? ""} ${p.clothType} ${p.category?.name ?? ""}`.toLowerCase();
  const hits = tokens.filter((t) => megaTokenMatches(t, hay));
  if (tokens.length <= 3) {
    return hits.length === tokens.length;
  }
  const need = Math.max(2, Math.ceil(tokens.length * 0.55));
  return hits.length >= need;
}

export function sortProducts(products: ProductWithRelations[], sort: string) {
  const next = [...products];
  switch (sort) {
    case "new":
      next.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;
    case "bestselling":
      next.sort((a, b) => b.stockQuantity - a.stockQuantity || b.updatedAt.getTime() - a.updatedAt.getTime());
      break;
    case "price-asc":
      next.sort((a, b) => a.priceInPaise - b.priceInPaise);
      break;
    case "price-desc":
      next.sort((a, b) => b.priceInPaise - a.priceInPaise);
      break;
    case "sale":
      next.sort((a, b) => Number(b.isSpecial) - Number(a.isSpecial) || b.priceInPaise - a.priceInPaise);
      break;
    case "old":
      next.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      break;
    default:
      next.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }
  return next;
}

function countMap(keys: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const k of keys) {
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

export function buildFacets(products: ProductWithRelations[]): CollectionFacets {
  let minP = Infinity;
  let maxP = 0;
  for (const p of products) {
    const r = priceRs(p);
    if (r < minP) minP = r;
    if (r > maxP) maxP = r;
  }
  if (!Number.isFinite(minP)) minP = 0;
  if (maxP < minP) maxP = minP;

  const fabrics = countMap(products.map((p) => String(p.clothType)));
  const fabricOptions = buildFabricFacetRows(fabrics, COLLECTION_DROPDOWN_SWATCHES);
  const types = countMap(products.map(typeBucket));
  const specs = countMap(products.map(specialityBucket));
  const colourBuckets = products
    .map(colourFacetBucket)
    .filter((c): c is string => c != null);
  const colours = countMap(colourBuckets);

  const typeOptions = buildTypeFacetRows(types, COLLECTION_DROPDOWN_SWATCHES);
  const specialityOptions = buildSpecialityFacetRows(specs, COLLECTION_DROPDOWN_SWATCHES);
  const colourOptions = buildColourFacetRows(colours, COLLECTION_DROPDOWN_SWATCHES);

  return {
    fabric: fabricOptions,
    type: typeOptions,
    speciality: specialityOptions,
    colour: colourOptions,
    priceMin: minP,
    priceMax: maxP,
  };
}

export function collectionTitleFromHandle(handle: string, categoryName?: string | null) {
  if (categoryName?.trim()) return categoryName.trim();
  return handle
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function serializeCollectionBrowse(s: CollectionBrowseState): string {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.sort && s.sort !== "bestselling") p.set("sort", s.sort);
  if (s.fabric.size) p.set("fabric", [...s.fabric].sort().join(","));
  if (s.type.size) p.set("type", [...s.type].sort().join(","));
  if (s.speciality.size) p.set("spec", [...s.speciality].sort().join(","));
  if (s.colour.size) p.set("colour", [...s.colour].sort().join(","));
  if (s.priceMin != null) p.set("priceMin", String(s.priceMin));
  if (s.priceMax != null) p.set("priceMax", String(s.priceMax));
  if (s.saleMin != null) p.set("saleMin", String(s.saleMin));
  if (s.saleMax != null) p.set("saleMax", String(s.saleMax));
  return p.toString();
}

/** Build browse state from current URL + patch (for client toggles). */
export function patchCollectionBrowse(
  base: CollectionBrowseState,
  patch: Partial<CollectionBrowseState>,
): CollectionBrowseState {
  return {
    fabric: patch.fabric ?? base.fabric,
    type: patch.type ?? base.type,
    speciality: patch.speciality ?? base.speciality,
    colour: patch.colour ?? base.colour,
    priceMin: patch.priceMin !== undefined ? patch.priceMin : base.priceMin,
    priceMax: patch.priceMax !== undefined ? patch.priceMax : base.priceMax,
    saleMin: patch.saleMin !== undefined ? patch.saleMin : base.saleMin,
    saleMax: patch.saleMax !== undefined ? patch.saleMax : base.saleMax,
    sort: patch.sort ?? base.sort,
    q: patch.q !== undefined ? patch.q : base.q,
  };
}
