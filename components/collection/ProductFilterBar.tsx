"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

import type { CollectionBrowseState, CollectionFacets, FacetOption } from "@/lib/collection-browse";
import { useCollectionBrowseUrl } from "@/hooks/use-collection-browse-url";

export type ProductFilterBarProps = {
  facets: CollectionFacets;
  /** When omitted, uses the current route pathname. */
  pathname?: string;
  /** Hide the colour dropdown (e.g. on pages that do not expose colour facets). */
  hideColour?: boolean;
  className?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <span className="ml-0.5 inline-block shrink-0 text-[10px] text-black/50" aria-hidden>
      {open ? "▲" : "▼"}
    </span>
  );
}

const facetPanelShell =
  "pointer-events-auto relative z-[100] flex max-h-[min(72dvh,420px)] min-w-[min(100vw-2rem,320px)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#fffdfb] shadow-[0_16px_48px_rgba(26,21,18,0.14)] max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:left-0 max-md:mt-0 max-md:max-h-[min(78dvh,560px)] max-md:min-w-full max-md:rounded-t-2xl max-md:rounded-b-none max-md:border-x-0 max-md:border-b-0 max-md:shadow-[0_-16px_48px_rgba(26,21,18,0.18)] md:absolute md:left-0 md:top-full md:mt-1.5 md:min-w-[300px]";

const facetScrollClass = "min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pb-2 pt-1";

const rangePanelBaseClass =
  "z-50 rounded-lg border border-black/10 bg-white p-4 shadow-lg max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:top-auto max-md:left-0 max-md:right-0 max-md:w-full max-md:max-w-none max-md:rounded-t-2xl max-md:rounded-b-none max-md:border-x-0 max-md:border-b-0 max-md:px-4 max-md:pb-[max(16px,env(safe-area-inset-bottom))] max-md:pt-4 max-md:shadow-[0_-12px_48px_rgba(0,0,0,0.16)] md:absolute md:top-full md:mt-1";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 10" width="12" height="10" aria-hidden fill="none">
      <path
        d="M1 5.2 4.2 8.2 11 1.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function normalizeRange(minRaw: string, maxRaw: string) {
  const parsedMin = minRaw.trim() ? parseInt(minRaw, 10) : null;
  const parsedMax = maxRaw.trim() ? parseInt(maxRaw, 10) : null;

  const min = Number.isFinite(parsedMin as number) ? parsedMin : null;
  const max = Number.isFinite(parsedMax as number) ? parsedMax : null;

  if (min != null && max != null && min > max) {
    return { min: max, max: min };
  }

  return { min, max };
}

/** Mounts only while open so search query resets without effects. */
function FacetDropdownOpenPanel({
  label,
  options,
  selected,
  onToggle,
  onClose,
  searchable,
  sectionMoreLabel,
}: {
  label: string;
  options: FacetOption[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  onClose: () => void;
  searchable?: boolean;
  sectionMoreLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const searchFieldId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const showMoreHeading =
    Boolean(sectionMoreLabel) &&
    filtered.some((o) => o.tier === "more") &&
    filtered.some((o) => o.tier !== "more");

  const primaryRows = options.filter((o) => o.tier === "primary");
  const primaryAllZero =
    primaryRows.length > 0 && primaryRows.every((o) => o.count === 0);
  const moreTierHasStock = options.some((o) => o.tier === "more" && o.count > 0);

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[90] cursor-default bg-black/25 max-md:bg-black/35"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        className={facetPanelShell}
        role="listbox"
        aria-label={label}
        aria-multiselectable="true"
      >
        <div
          className="mx-auto mt-2 hidden h-1 w-10 shrink-0 rounded-full bg-black/15 max-md:block"
          aria-hidden
        />
        <div className="border-b border-black/[0.06] px-3 pb-2 pt-2 md:pt-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1512]">{label}</p>
          <p className="mt-0.5 text-xs text-black/45">Select one or more</p>
        </div>
        {searchable ? (
          <div className="border-b border-black/[0.06] px-3 py-2">
            <label className="sr-only" htmlFor={searchFieldId}>
              Search {label}
            </label>
            <input
              id={searchFieldId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}…`}
              autoComplete="off"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-[#1a1512] placeholder:text-black/35 outline-none ring-[#8f2333]/30 focus:border-[#8f2333]/40 focus:ring-2"
            />
          </div>
        ) : null}
        {sectionMoreLabel && primaryAllZero && moreTierHasStock ? (
          <p className="border-b border-black/[0.06] px-3 py-2 text-xs leading-snug text-black/50">
            Additional options with stock are under{" "}
            <span className="font-medium text-[#1a1512]/80">{sectionMoreLabel}</span> — scroll the
            list.
          </p>
        ) : null}
        <div className={facetScrollClass}>
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-black/45">No matches</p>
          ) : (
            filtered.map((opt, idx) => {
              const checked = selected.has(opt.value);
              const noMatches = opt.count === 0;
              const prev = filtered[idx - 1];
              const showSection =
                showMoreHeading && opt.tier === "more" && prev && prev.tier !== "more";

              return (
                <div key={opt.value}>
                  {showSection ? (
                    <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40">
                      {sectionMoreLabel}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    role="option"
                    aria-selected={checked}
                    title={
                      noMatches && !checked
                        ? "No in-stock products match this option in this collection — you can still apply the filter"
                        : undefined
                    }
                    onClick={() => onToggle(opt.value)}
                    className={`flex w-full min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2.5 text-left text-sm transition md:min-h-10 md:py-2 hover:bg-[#8f2333]/[0.06] active:bg-[#8f2333]/10 ${checked ? "bg-[#8f2333]/[0.07]" : ""}`}
                  >
                    {opt.thumbUrl ? (
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/10 bg-black/[0.03]">
                        <Image
                          src={opt.thumbUrl}
                          alt=""
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span className="h-10 w-10 shrink-0 rounded-full border border-dashed border-black/15 bg-black/[0.02]" />
                    )}
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                        checked
                          ? "border-[#8f2333] bg-[#8f2333] text-white"
                          : "border-black/25 bg-white"
                      }`}
                      aria-hidden
                    >
                      {checked ? <CheckIcon className="text-white" /> : null}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">
                      <span className="font-medium text-[#1a1512]">{opt.label}</span>
                      <span className="ml-1.5 tabular-nums text-black/40">({opt.count})</span>
                    </span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

function FacetDropdown({
  label,
  options,
  selected,
  onToggle,
  open,
  onOpen,
  onClose,
  searchable,
  sectionMoreLabel,
}: {
  label: string;
  options: FacetOption[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  searchable?: boolean;
  sectionMoreLabel?: string;
}) {
  const activeInFacet = useMemo(
    () => options.reduce((n, o) => n + (selected.has(o.value) ? 1 : 0), 0),
    [options, selected],
  );

  if (options.length === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => (open ? onClose() : onOpen())}
        className="flex min-h-11 min-w-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-[#1a1512] touch-manipulation hover:bg-black/[0.04] active:bg-black/[0.06] md:min-h-0 md:rounded-none md:px-3 md:py-1.5 md:text-xs"
      >
        <span>{label}</span>
        {activeInFacet > 0 ? (
          <span className="rounded-full bg-[#8f2333]/12 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-[#8f2333] md:text-[10px]">
            {activeInFacet}
          </span>
        ) : null}
        <Chevron open={open} />
      </button>
      {open ? (
        <FacetDropdownOpenPanel
          label={label}
          options={options}
          selected={selected}
          onToggle={onToggle}
          onClose={onClose}
          searchable={searchable}
          sectionMoreLabel={sectionMoreLabel}
        />
      ) : null}
    </div>
  );
}

/** Remount when URL-driven price/sale bounds change so fields stay in sync (back/forward, clear). */
function PriceSalePanels({
  browseState,
  facets,
  patch,
  openKey,
  setOpenKey,
}: {
  browseState: CollectionBrowseState;
  facets: CollectionFacets;
  patch: (partial: Partial<CollectionBrowseState>) => void;
  openKey: string | null;
  setOpenKey: (k: string | null) => void;
}) {
  const [priceMin, setPriceMin] = useState(
    () => (browseState.priceMin != null ? String(browseState.priceMin) : ""),
  );
  const [priceMax, setPriceMax] = useState(
    () => (browseState.priceMax != null ? String(browseState.priceMax) : ""),
  );
  const [saleMin, setSaleMin] = useState(
    () => (browseState.saleMin != null ? String(browseState.saleMin) : ""),
  );
  const [saleMax, setSaleMax] = useState(
    () => (browseState.saleMax != null ? String(browseState.saleMax) : ""),
  );

  const applyPrice = () => {
    const { min, max } = normalizeRange(priceMin, priceMax);
    patch({
      priceMin: min,
      priceMax: max,
    });
    setOpenKey(null);
  };

  const applySale = () => {
    const { min, max } = normalizeRange(saleMin, saleMax);
    patch({
      saleMin: min,
      saleMax: max,
    });
    setOpenKey(null);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenKey(openKey === "price" ? null : "price")}
          className="flex min-h-11 min-w-0 items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-[#1a1512] touch-manipulation active:bg-black/[0.06] md:min-h-0 md:rounded-none md:px-3 md:py-1.5 md:text-xs"
        >
          Price
          <Chevron open={openKey === "price"} />
        </button>
        {openKey === "price" ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default bg-black/20 max-md:bg-black/30"
              aria-label="Close"
              onClick={() => setOpenKey(null)}
            />
            <div className={`${rangePanelBaseClass} md:left-0 md:w-[min(92vw,280px)]`}>
              <div
                className="mx-auto mb-3 hidden h-1 w-10 rounded-full bg-black/20 max-md:block"
                aria-hidden
              />
              <p className="mb-2 text-xs text-black/55">
                Range: Rs. {facets.priceMin.toLocaleString("en-IN")} –{" "}
                {facets.priceMax.toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                  className="w-full rounded border border-black/15 px-2 py-1.5 text-sm"
                />
                <span className="text-black/40">—</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  className="w-full rounded border border-black/15 px-2 py-1.5 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={applyPrice}
                className="mt-3 w-full rounded-full bg-[#1a1512] py-2 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenKey(openKey === "sale" ? null : "sale")}
          className="flex min-h-11 min-w-0 max-w-full items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-[#1a1512] touch-manipulation active:bg-black/[0.06] md:min-h-0 md:rounded-none md:px-3 md:py-1.5 md:text-xs"
        >
          <span className="md:hidden">% Sale</span>
          <span className="hidden md:inline">Percent Sale</span>
          <Chevron open={openKey === "sale"} />
        </button>
        {openKey === "sale" ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default bg-black/20 max-md:bg-black/30"
              onClick={() => setOpenKey(null)}
              aria-label="Close"
            />
            <div className={`${rangePanelBaseClass} md:right-0 md:left-auto md:w-[min(92vw,260px)]`}>
              <div
                className="mx-auto mb-3 hidden h-1 w-10 rounded-full bg-black/20 max-md:block"
                aria-hidden
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={saleMin}
                  onChange={(e) => setSaleMin(e.target.value)}
                  className="w-full rounded border border-black/15 px-2 py-1.5 text-sm"
                />
                <span>—</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={saleMax}
                  onChange={(e) => setSaleMax(e.target.value)}
                  className="w-full rounded border border-black/15 px-2 py-1.5 text-sm"
                />
              </div>
              <p className="mt-2 text-xs text-black/50">
                Featured products use 10% off in this storefront.
              </p>
              <button
                type="button"
                onClick={applySale}
                className="mt-3 w-full rounded-full bg-[#1a1512] py-2 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

/**
 * Fabric, Type, Speciality, optional Colour, Price range, Percent sale, plus sort — all driven by URL
 * via `parseCollectionBrowse` / `serializeCollectionBrowse`. Use on any listing whose data layer
 * applies the same filter state (e.g. collection page server filter).
 */
export function ProductFilterBar({ facets, pathname, hideColour, className }: ProductFilterBarProps) {
  const { state, patch, toggleFacet } = useCollectionBrowseUrl(
    pathname !== undefined ? { pathname } : undefined,
  );
  const [openKey, setOpenKey] = useState<string | null>(null);

  const clearFilters = () => {
    patch({
      fabric: new Set(),
      type: new Set(),
      speciality: new Set(),
      colour: new Set(),
      priceMin: null,
      priceMax: null,
      saleMin: null,
      saleMax: null,
    });
    setOpenKey(null);
  };

  const sortOptions = [
    { value: "bestselling", label: "Best Selling" },
    { value: "new", label: "Date, new to old" },
    { value: "old", label: "Date, old to new" },
    { value: "price-asc", label: "Price, low to high" },
    { value: "price-desc", label: "Price, high to low" },
    { value: "sale", label: "% Sale off" },
  ];

  const rootClass = className ?? "";

  return (
    <div className={`flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6 ${rootClass}`}>
      <div className="min-w-0 flex-1 lg:max-w-[min(100%,980px)]">
        <div className="w-full pb-0.5 md:pb-1">
          <div className="flex w-full max-w-full flex-wrap items-center gap-x-0.5 gap-y-1 rounded-2xl border-2 border-black/85 bg-white px-1 py-1 shadow-sm lg:inline-flex lg:w-max lg:max-w-full lg:flex-nowrap lg:gap-x-0 lg:gap-y-0 lg:rounded-full lg:px-1.5 lg:py-1">
            <FacetDropdown
              label="Fabric"
              options={facets.fabric}
              selected={state.fabric}
              onToggle={(v) => toggleFacet("fabric", v)}
              open={openKey === "fabric"}
              onOpen={() => setOpenKey("fabric")}
              onClose={() => setOpenKey(null)}
              searchable
              sectionMoreLabel="More fabrics"
            />
            <FacetDropdown
              label="Type"
              options={facets.type}
              selected={state.type}
              onToggle={(v) => toggleFacet("type", v)}
              open={openKey === "type"}
              onOpen={() => setOpenKey("type")}
              onClose={() => setOpenKey(null)}
              searchable
            />
            <FacetDropdown
              label="Speciality"
              options={facets.speciality}
              selected={state.speciality}
              onToggle={(v) => toggleFacet("speciality", v)}
              open={openKey === "spec"}
              onOpen={() => setOpenKey("spec")}
              onClose={() => setOpenKey(null)}
              searchable
              sectionMoreLabel="More specialities"
            />
            {hideColour ? null : (
              <FacetDropdown
                label="Colour"
                options={facets.colour}
                selected={state.colour}
                onToggle={(v) => toggleFacet("colour", v)}
                open={openKey === "colour"}
                onOpen={() => setOpenKey("colour")}
                onClose={() => setOpenKey(null)}
                searchable
                sectionMoreLabel="More colours"
              />
            )}

            <PriceSalePanels
              key={`${state.priceMin ?? ""}-${state.priceMax ?? ""}-${state.saleMin ?? ""}-${state.saleMax ?? ""}`}
              browseState={state}
              facets={facets}
              patch={patch}
              openKey={openKey}
              setOpenKey={setOpenKey}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="mt-2 min-h-10 text-left text-xs font-medium text-[#8f2333] underline-offset-2 hover:underline touch-manipulation md:mt-2.5"
        >
          Clear filters
        </button>
      </div>

      <div className="flex w-full shrink-0 flex-row flex-wrap items-center gap-2 lg:w-auto lg:max-w-[min(100%,320px)] lg:flex-nowrap lg:justify-end">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-black/55">
          Sort By:
        </span>
        <select
          value={state.sort}
          onChange={(e) => {
            patch({ sort: e.target.value });
          }}
          aria-label="Sort products"
          className="min-h-11 min-w-0 flex-1 cursor-pointer rounded-full border-2 border-black/80 bg-white py-2 pl-3 pr-8 text-sm font-medium text-[#1a1512] shadow-sm touch-manipulation lg:min-h-10 lg:min-w-[10.5rem] lg:flex-initial"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
