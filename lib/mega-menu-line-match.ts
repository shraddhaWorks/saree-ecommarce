import type { ProductWithRelations } from "@/lib/storefront-map";

/** All searchable text for a product (category + fields used for line matching). */
export function megaMenuProductHay(p: ProductWithRelations): string {
  return `${p.name} ${p.description ?? ""} ${p.slug} ${p.pattern ?? ""} ${p.color ?? ""} ${p.clothType} ${p.occasion ?? ""} ${p.category?.name ?? ""}`.toLowerCase();
}

/** Kanchi / Kanjivaram cues: spaced “kanchi pattu”, one-word kanchipattu, Tamil spellings, etc. */
const KANCHI_CUE_RE =
  /kanchipattu|kanchi[\s_-]+pattu|\bkanchi\b|kanjivaram|kanchipuram|kancheepuram|kanjeevaram|kanchivaram|conjeevaram/i;

type LineRule = (p: ProductWithRelations) => boolean;

function matchesKanchiPattu(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  const s = p.slug.toLowerCase();
  const blob = `${h} ${s}`;
  const cloth = String(p.clothType);
  return cloth === "KANJIVARAM" || KANCHI_CUE_RE.test(blob);
}

function matchesGadwalPattu(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  const s = p.slug.toLowerCase();
  return /\bgadwal\b/.test(h) || s.includes("gadwal");
}

function matchesBanaras(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return (
    String(p.clothType) === "BANARASI" ||
    /\bbanaras|banarasi|varanasi\b/.test(h) ||
    /\bbanaras|banarasi\b/.test(p.slug.toLowerCase())
  );
}

function matchesWord(p: ProductWithRelations, re: RegExp): boolean {
  const h = megaMenuProductHay(p);
  const s = p.slug.toLowerCase();
  return re.test(h) || re.test(s);
}

function matchesDhotiSilk(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return (
    /\bdhoti\b/.test(h) &&
    (/\bsilk\b/.test(h) || String(p.clothType) === "SILK" || /\bpattu\b/.test(h))
  );
}

function matchesDhotiCotton(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bdhoti\b/.test(h) && (/\bcotton\b/.test(h) || String(p.clothType) === "COTTON");
}

function matchesPattuKanduva(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bkanduva\b/.test(h) || /\bangavastram\b/.test(h);
}

function matchesDhotiKanduvaSet(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bdhoti\b/.test(h) && /\bkanduva\b/.test(h);
}

function matchesGeorgetteGroup(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  const c = String(p.clothType);
  return (
    /\bgeorgette\b/.test(h) ||
    /\bcrepe\b/.test(h) ||
    /\bsatin\b/.test(h) ||
    /\bchiffon\b/.test(h) ||
    c === "GEORGETTE" ||
    c === "CHIFFON" ||
    c === "CREPE"
  );
}

function matchesKhadiGroup(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return (
    /\bkhadi\b/.test(h) ||
    /\bjute\b/.test(h) ||
    /\bbhagalpur\b/.test(h) ||
    /\bprinted\b/.test(h)
  );
}

function matchesZariKota(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bkota\b/.test(h) || (/\bzari\b/.test(h) && /\bkota\b/.test(h)) || /\bsemi[\s-]*kota\b/.test(h);
}

function matchesMuslinDolaMashru(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bmuslin\b/.test(h) || /\bdola\b/.test(h) || /\bmashru\b/.test(h);
}

function matchesPavadaLehenga(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return (
    /\bpavada\b/.test(h) ||
    /\blehenga\b/.test(h) ||
    /\blehnga\b/.test(h) ||
    /\bhalf[\s-]*saree\b/.test(h)
  );
}

function matchesChanderiBailu(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bchanderi\b/.test(h) || /\bbailu\b/.test(h);
}

function matchesSoftPattu(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bsoft\b/.test(h) && /\bpattu\b/.test(h);
}

function matchesFancyDesigner(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bfancy\b/.test(h) || /\bdesigner\b/.test(h);
}

function matchesFusion(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bfusion\b/.test(h) || /\bindo[\s-]*western\b/.test(h) || /\bcontemporary\b/.test(h);
}

function matchesPradanam(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bpradanam\b/.test(h) || /\btalambralu\b/.test(h);
}

function matchesNischayathartham(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bnischayathartham\b/.test(h) || /\bengagement\b/.test(h);
}

function matchesMehendiHaldi(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bmehendi\b/.test(h) || /\bmehndi\b/.test(h) || /\bhaldi\b/.test(h);
}

function matchesDharmavaram(p: ProductWithRelations): boolean {
  const h = megaMenuProductHay(p);
  return /\bdharmavaram\b/.test(h) || p.slug.toLowerCase().includes("dharmavaram");
}

/**
 * Slug-specific rules: only products passing here appear on that `/collections/{slug}` line.
 * Unlisted slugs use `productMatchesMegaMenuLabel` in the collection page.
 */
export const MEGA_LINE_SLUG_RULES: Record<string, LineRule> = {
  "kanchi-pattu-sarees": matchesKanchiPattu,
  "gadwal-pattu-sarees": matchesGadwalPattu,
  "banaras-sarees": matchesBanaras,
  "paithani-sarees": (p) => matchesWord(p, /\bpaithani\b/),
  "patola-sarees": (p) => matchesWord(p, /\bpatola\b/),
  "arani-pattu-sarees": (p) => matchesWord(p, /\barani\b/),
  "venkatagiri-sarees": (p) => matchesWord(p, /\bvenkatagiri\b/),
  "venkatagiri-silk-sarees": (p) => matchesWord(p, /\bvenkatagiri\b/),
  "uppada-pattu-sarees": (p) => matchesWord(p, /\buppada\b/),
  "mangalagiri-pattu-sarees": (p) => matchesWord(p, /\b(?:mangalagiri|mangalgiri)\b/),
  "mysore-silk-sarees": (p) => matchesWord(p, /\bmysore\b/) || matchesWord(p, /\bmysuru\b/),

  "bridal-sarees": (p) =>
    String(p.occasion) === "BRIDAL" || matchesWord(p, /\bbridal\b/),
  "reception-sarees": (p) => matchesWord(p, /\breception\b/),
  "pradanam-and-talambralu-sarees": matchesPradanam,
  "nischayathartham-engagement-sarees": matchesNischayathartham,
  "mehendi-and-haldi-sarees": matchesMehendiHaldi,

  "organza-sarees": (p) =>
    String(p.clothType) === "ORGANZA" || matchesWord(p, /\borganza\b/),
  "zari-kota-and-semi-kota-sarees": matchesZariKota,
  "muslin-dola-and-mashru-sarees": matchesMuslinDolaMashru,
  "fusion-sarees": matchesFusion,

  "pattu-pavada-set-half-saree-set-lehengas": matchesPavadaLehenga,
  "chanderi-and-bailu-silk-sarees": matchesChanderiBailu,
  "ikkat-sarees": (p) => matchesWord(p, /\bikkat\b/) || matchesWord(p, /\bikat\b/),
  "bandini-sarees": (p) => matchesWord(p, /\bbandini\b/) || matchesWord(p, /\bbandhani\b/),
  "fancy-and-designer-sarees": matchesFancyDesigner,
  "soft-pattu": matchesSoftPattu,

  "georgette-crepe-satin-and-chiffon-silk-sarees": matchesGeorgetteGroup,
  "khadi-jute-bhagalpur-and-printed-sarees": matchesKhadiGroup,
  "tissu-sarees": (p) => matchesWord(p, /\btissu\b/) || matchesWord(p, /\btissue\b/),
  "tusser-sarees": (p) =>
    String(p.clothType) === "TUSSAR" ||
    matchesWord(p, /\btusser\b/) ||
    matchesWord(p, /\btussar\b/) ||
    matchesWord(p, /\btussore\b/),

  "silk-dhotis": matchesDhotiSilk,
  "cotton-dhotis": matchesDhotiCotton,
  "pattu-kanduvas": matchesPattuKanduva,
  "dhoti-and-kanduva-sets": matchesDhotiKanduvaSet,

  "dharmavaram-pattu-sarees": matchesDharmavaram,
};
