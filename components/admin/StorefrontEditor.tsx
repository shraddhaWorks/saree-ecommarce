"use client";

import { useEffect, useState } from "react";
import { SupabaseImageField } from "@/components/admin/SupabaseImageField";
import { authHeaders } from "@/lib/auth-client";

type Slide = { imageUrl: string; altText: string; linkUrl: string };
type GridRow = { title: string; imageUrl: string; linkUrl: string };

const SECTION_KEYS = [
  {
    id: "WEDDING_EDIT",
    label: "Your Wedding Edit (unused on home — 5 Pattu tiles are fixed in app + public/wedding-edit/)",
  },
  {
    id: "SHOP_BY_PRICE",
    label:
      "Shop by Price (home tiles are fixed: public/shop-by-price/*.png — only the section title below is used)",
  },
  {
    id: "CRAFTS",
    label:
      "Discover timeless crafts (home tiles are fixed: public/timeless-crafts/*.png — only the section title below is used)",
  },
  {
    id: "SHOP_BY_OCCASION",
    label:
      "Shop by Occasion (home is fixed 2×2: public/shop-by-occasion/*.png — only the section title below is used)",
  },
] as const;

export default function StorefrontEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [weddingEditTitle, setWeddingEditTitle] = useState("");
  const [shopByPriceTitle, setShopByPriceTitle] = useState("");
  const [craftsTitle, setCraftsTitle] = useState("");
  const [shopByOccasionTitle, setShopByOccasionTitle] = useState("");
  const [specialsTitle, setSpecialsTitle] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutBody, setAboutBody] = useState("");
  const [aboutImageUrl, setAboutImageUrl] = useState("");

  const [heroSlides, setHeroSlides] = useState<Slide[]>([]);
  const [grids, setGrids] = useState<Record<string, GridRow[]>>({
    WEDDING_EDIT: [],
    SHOP_BY_PRICE: [],
    CRAFTS: [],
    SHOP_BY_OCCASION: [],
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/storefront");
        const data = (await res.json()) as {
          siteConfig?: {
            weddingEditTitle: string;
            shopByPriceTitle: string;
            craftsTitle: string;
            shopByOccasionTitle: string;
            specialsTitle: string;
            aboutTitle: string;
            aboutBody: string;
            aboutImageUrl: string | null;
          };
          heroSlides: { imageUrl: string; altText: string | null; linkUrl: string | null }[];
          gridItems: {
            section: string;
            title: string;
            imageUrl: string;
            linkUrl: string | null;
          }[];
        };
        if (cancelled || !res.ok) return;
        const sc = data.siteConfig;
        if (sc) {
          setWeddingEditTitle(sc.weddingEditTitle);
          setShopByPriceTitle(sc.shopByPriceTitle);
          setCraftsTitle(sc.craftsTitle);
          setShopByOccasionTitle(sc.shopByOccasionTitle);
          setSpecialsTitle(sc.specialsTitle);
          setAboutTitle(sc.aboutTitle);
          setAboutBody(sc.aboutBody);
          setAboutImageUrl(sc.aboutImageUrl ?? "");
        }
        setHeroSlides(
          (data.heroSlides ?? []).map((s) => ({
            imageUrl: s.imageUrl,
            altText: s.altText ?? "",
            linkUrl: s.linkUrl ?? "",
          })),
        );
        const next: Record<string, GridRow[]> = {
          WEDDING_EDIT: [],
          SHOP_BY_PRICE: [],
          CRAFTS: [],
          SHOP_BY_OCCASION: [],
        };
        for (const g of data.gridItems ?? []) {
          if (!next[g.section]) continue;
          next[g.section].push({
            title: g.title,
            imageUrl: g.imageUrl,
            linkUrl: g.linkUrl ?? "",
          });
        }
        setGrids(next);
      } catch {
        if (!cancelled) setError("Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function save() {
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const gridItems = SECTION_KEYS.flatMap((sk) =>
        (grids[sk.id] ?? []).map((g) => ({
          section: sk.id,
          title: g.title,
          imageUrl: g.imageUrl,
          linkUrl: g.linkUrl || null,
        })),
      );

      const res = await fetch("/api/storefront", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({
          siteConfig: {
            weddingEditTitle,
            shopByPriceTitle,
            craftsTitle,
            shopByOccasionTitle,
            specialsTitle,
            aboutTitle,
            aboutBody,
            aboutImageUrl: aboutImageUrl || null,
          },
          heroSlides: heroSlides
            .filter((s) => s.imageUrl.trim())
            .map((s) => ({
              imageUrl: s.imageUrl.trim(),
              altText: s.altText || null,
              linkUrl: s.linkUrl || null,
            })),
          gridItems: gridItems.filter((g) => g.imageUrl.trim() && g.title.trim()),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        setSaving(false);
        return;
      }
      setMessage("Saved.");
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  function addHero() {
    setHeroSlides((prev) => [...prev, { imageUrl: "", altText: "", linkUrl: "" }]);
  }

  function removeHero(i: number) {
    setHeroSlides((prev) => prev.filter((_, j) => j !== i));
  }

  function addGrid(section: string) {
    setGrids((prev) => ({
      ...prev,
      [section]: [...(prev[section] ?? []), { title: "", imageUrl: "", linkUrl: "" }],
    }));
  }

  function removeGrid(section: string, i: number) {
    setGrids((prev) => ({
      ...prev,
      [section]: (prev[section] ?? []).filter((_, j) => j !== i),
    }));
  }

  if (loading) {
    return <p className="text-sm text-zinc-500">Loading storefront…</p>;
  }

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Storefront</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Cover photos, section titles, promo tiles, and About copy. Special products use the
          “Featured / special” flag on each product.
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}

      <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="font-semibold text-zinc-900">Section headings</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="text-zinc-600">Wedding edit</span>
            <input
              value={weddingEditTitle}
              onChange={(e) => setWeddingEditTitle(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5"
            />
          </label>
          <label className="text-sm">
            <span className="text-zinc-600">Shop by price</span>
            <input
              value={shopByPriceTitle}
              onChange={(e) => setShopByPriceTitle(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5"
            />
          </label>
          <label className="text-sm">
            <span className="text-zinc-600">Crafts</span>
            <input
              value={craftsTitle}
              onChange={(e) => setCraftsTitle(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5"
            />
          </label>
          <label className="text-sm">
            <span className="text-zinc-600">Shop by occasion</span>
            <input
              value={shopByOccasionTitle}
              onChange={(e) => setShopByOccasionTitle(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="text-zinc-600">Special picks (product row title)</span>
            <input
              value={specialsTitle}
              onChange={(e) => setSpecialsTitle(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5"
            />
          </label>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-zinc-900">Hero / cover carousel</h2>
          <button
            type="button"
            onClick={addHero}
            className="text-sm text-[#9d2936] font-medium hover:underline"
          >
            Add slide
          </button>
        </div>
        {heroSlides.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No slides — click Add slide, then upload images to your Supabase bucket.
          </p>
        ) : null}
        <ul className="space-y-3">
          {heroSlides.map((s, i) => (
            <li
              key={i}
              className="grid gap-4 rounded-lg border border-zinc-100 p-3 sm:grid-cols-3"
            >
              <div className="sm:col-span-3">
                <SupabaseImageField
                  label="Cover image"
                  folder="storefront/hero"
                  value={s.imageUrl}
                  onChange={(url) => {
                    setHeroSlides((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, imageUrl: url } : x)),
                    );
                  }}
                />
              </div>
              <label className="text-sm">
                Alt text
                <input
                  value={s.altText}
                  onChange={(e) => {
                    const v = e.target.value;
                    setHeroSlides((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, altText: v } : x)),
                    );
                  }}
                  className="mt-1 w-full rounded border border-zinc-200 px-2 py-1 text-sm"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                Link (optional)
                <input
                  value={s.linkUrl}
                  onChange={(e) => {
                    const v = e.target.value;
                    setHeroSlides((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, linkUrl: v } : x)),
                    );
                  }}
                  className="mt-1 w-full rounded border border-zinc-200 px-2 py-1 font-mono text-xs"
                  placeholder="/products/… or https://…"
                />
              </label>
              <button
                type="button"
                onClick={() => removeHero(i)}
                className="text-sm text-red-600 sm:col-span-3"
              >
                Remove slide
              </button>
            </li>
          ))}
        </ul>
      </section>

      {SECTION_KEYS.map((sk) => (
        <section
          key={sk.id}
          className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-zinc-900">{sk.label}</h2>
            <button
              type="button"
              onClick={() => addGrid(sk.id)}
              className="text-sm text-[#9d2936] font-medium hover:underline"
            >
              Add tile
            </button>
          </div>
          <ul className="space-y-3">
            {(grids[sk.id] ?? []).map((g, i) => (
              <li
                key={i}
                className="grid gap-2 rounded-lg border border-zinc-100 p-3 sm:grid-cols-2"
              >
                <label className="text-sm">
                  Title
                  <input
                    value={g.title}
                    onChange={(e) => {
                      const v = e.target.value;
                      setGrids((prev) => ({
                        ...prev,
                        [sk.id]: (prev[sk.id] ?? []).map((row, j) =>
                          j === i ? { ...row, title: v } : row,
                        ),
                      }));
                    }}
                    className="mt-1 w-full rounded border border-zinc-200 px-2 py-1"
                  />
                </label>
                <div className="sm:col-span-2">
                  <SupabaseImageField
                    label="Tile image"
                    folder="storefront/grid"
                    value={g.imageUrl}
                    onChange={(url) => {
                      setGrids((prev) => ({
                        ...prev,
                        [sk.id]: (prev[sk.id] ?? []).map((row, j) =>
                          j === i ? { ...row, imageUrl: url } : row,
                        ),
                      }));
                    }}
                  />
                </div>
                <label className="text-sm sm:col-span-2">
                  Link (optional)
                  <input
                    value={g.linkUrl}
                    onChange={(e) => {
                      const v = e.target.value;
                      setGrids((prev) => ({
                        ...prev,
                        [sk.id]: (prev[sk.id] ?? []).map((row, j) =>
                          j === i ? { ...row, linkUrl: v } : row,
                        ),
                      }));
                    }}
                    className="mt-1 w-full rounded border border-zinc-200 px-2 py-1 font-mono text-xs"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeGrid(sk.id, i)}
                  className="text-sm text-red-600 sm:col-span-2"
                >
                  Remove tile
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="font-semibold text-zinc-900">About</h2>
        <p className="text-xs text-zinc-500">
          Home About banner is fixed in the repo:{" "}
          <code className="rounded bg-zinc-100 px-1">public/about/kalanjali-about-hero.png</code>.
          The image field below is optional and is not shown on the home page. Intro copy is fixed
          (two paragraphs + Know More); the full story lives on{" "}
          <code className="rounded bg-zinc-100 px-1">/about</code>.
        </p>
        <label className="text-sm block">
          Title
          <input
            value={aboutTitle}
            onChange={(e) => setAboutTitle(e.target.value)}
            className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5"
          />
        </label>
        <SupabaseImageField
          label="About banner image (home uses fixed file public/about/kalanjali-about-hero.png — this field is for future use / other pages)"
          folder="storefront/about"
          value={aboutImageUrl}
          onChange={setAboutImageUrl}
        />
        <label className="text-sm block">
          Text (not shown on site — reserved for future use)
          <textarea
            value={aboutBody}
            onChange={(e) => setAboutBody(e.target.value)}
            rows={8}
            className="mt-1 w-full rounded border border-zinc-200 px-2 py-2 text-sm"
          />
        </label>
      </section>

      <button
        type="button"
        disabled={saving}
        onClick={() => void save()}
        className="rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save storefront"}
      </button>
    </div>
  );
}
