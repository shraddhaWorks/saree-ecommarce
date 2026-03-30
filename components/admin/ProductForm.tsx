"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SupabaseImageField } from "@/components/admin/SupabaseImageField";
import { authHeaders } from "@/lib/auth-client";
import { uploadImageToSupabase } from "@/lib/upload-client";

const CLOTH_TYPES = [
  "SILK",
  "COTTON",
  "LINEN",
  "GEORGETTE",
  "CHIFFON",
  "KANJIVARAM",
  "BANARASI",
  "TUSSAR",
  "ORGANZA",
  "OTHER",
] as const;

const OCCASIONS = [
  "WEDDING",
  "FESTIVE",
  "CASUAL",
  "OFFICE",
  "BRIDAL",
  "PARTY",
  "GIFTING",
  "OTHER",
] as const;

type Category = { id: string; name: string; slug: string };

type ProductPayload = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceInPaise: number;
  inStock: boolean;
  stockQuantity: number;
  clothType: string;
  occasion: string | null;
  isSpecial: boolean;
  mainImageUrl: string | null;
  thumbnailUrl: string | null;
  categoryId: string;
  images: { url: string; altText?: string; position: number }[];
};

type Props = {
  mode: "create" | "edit";
  initial?: ProductPayload | null;
};

function normalizeSlug(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, "-");
}

export default function ProductForm({ mode, initial }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priceRupees, setPriceRupees] = useState(
    initial ? String(Math.round(initial.priceInPaise / 100)) : "",
  );
  const [inStock, setInStock] = useState(initial?.inStock ?? true);
  const [stockQuantity, setStockQuantity] = useState(
    String(initial?.stockQuantity ?? 1),
  );
  const [clothType, setClothType] = useState(initial?.clothType ?? "SILK");
  const [occasion, setOccasion] = useState(initial?.occasion ?? "");
  const [isSpecial, setIsSpecial] = useState(initial?.isSpecial ?? false);
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? "");
  const [mainImageUrl, setMainImageUrl] = useState(initial?.mainImageUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    () => initial?.images?.map((i) => i.url) ?? [],
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/categories");
        const data = (await res.json()) as { categories?: Category[] };
        const list = data.categories ?? [];
        setCategories(list);
        setCategoryId((prev) => prev || list[0]?.id || "");
      } catch {
        setError("Could not load categories");
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const price = Number(priceRupees);
    if (!name.trim() || !slug.trim() || !Number.isFinite(price) || price < 0) {
      setError("Name, slug and valid price are required");
      return;
    }
    if (!categoryId) {
      setError("Select a category (create one via API or DB if empty)");
      return;
    }
    const sq = Math.max(0, Math.floor(Number(stockQuantity) || 0));
    const images = galleryUrls
      .filter((u) => u.trim())
      .map((url, position) => ({ url: url.trim(), position }));

    const body = {
      name: name.trim(),
      slug: normalizeSlug(slug),
      description: description.trim() || undefined,
      priceInPaise: Math.round(price * 100),
      inStock,
      stockQuantity: sq,
      clothType,
      occasion: occasion || undefined,
      isSpecial,
      mainImageUrl: mainImageUrl.trim() || undefined,
      thumbnailUrl: thumbnailUrl.trim() || undefined,
      categoryId,
      images: images.length ? images : undefined,
    };

    setLoading(true);
    try {
      if (mode === "create") {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(body),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setError(data.error ?? "Create failed");
          setLoading(false);
          return;
        }
      } else if (initial) {
        const res = await fetch(`/api/products/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(body),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setError(data.error ?? "Update failed");
          setLoading(false);
          return;
        }
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    if (!initial || !confirm("Delete this product permanently?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${initial.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Delete failed");
        setLoading(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="max-w-2xl space-y-4" onSubmit={onSubmit}>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <label className="block text-sm">
        <span className="text-zinc-600">Name</span>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (mode === "create" && !slug) setSlug(normalizeSlug(e.target.value));
          }}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-zinc-600">URL slug</span>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-sm"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="text-zinc-600">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="text-zinc-600">Price (₹)</span>
          <input
            type="number"
            min={0}
            step={1}
            value={priceRupees}
            onChange={(e) => setPriceRupees(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-600">Stock quantity</span>
          <input
            type="number"
            min={0}
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        Mark as in stock (visible when quantity &gt; 0)
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isSpecial}
          onChange={(e) => setIsSpecial(e.target.checked)}
        />
        Featured / special
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="text-zinc-600">Fabric</span>
          <select
            value={clothType}
            onChange={(e) => setClothType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          >
            {CLOTH_TYPES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-zinc-600">Occasion</span>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          >
            <option value="">—</option>
            {OCCASIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-zinc-600">Category</span>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <SupabaseImageField
          label="Main image"
          folder="products/main"
          value={mainImageUrl}
          onChange={setMainImageUrl}
        />
        <SupabaseImageField
          label="Thumbnail (optional)"
          folder="products/thumb"
          value={thumbnailUrl}
          onChange={setThumbnailUrl}
        />
      </div>

      <div className="space-y-3 rounded-lg border border-zinc-200 p-4">
        <span className="text-sm font-medium text-zinc-800">Gallery</span>
        <p className="text-xs text-zinc-500">
          Extra photos for the product page. Files go to the Supabase bucket under{" "}
          <code className="text-xs">products/gallery/</code>.
        </p>
        <ul className="space-y-3">
          {galleryUrls.map((url, idx) => (
            <li
              key={`${url}-${idx}`}
              className="flex flex-wrap items-center gap-3 rounded border border-zinc-100 p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-16 w-16 rounded object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setGalleryUrls((g) => g.filter((_, i) => i !== idx))
                }
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            disabled={uploading}
            className="block text-sm file:mr-3 file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              setUploading(true);
              setError(null);
              const result = await uploadImageToSupabase(f, "products/gallery");
              setUploading(false);
              if ("error" in result) {
                setError(result.error);
                return;
              }
              setGalleryUrls((prev) => [...prev, result.url]);
              if (!mainImageUrl) setMainImageUrl(result.url);
            }}
          />
          {uploading ? (
            <span className="ml-2 text-xs text-zinc-500">Uploading…</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
        </button>
        {mode === "edit" ? (
          <button
            type="button"
            onClick={() => void onDelete()}
            disabled={loading}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-700 disabled:opacity-50"
          >
            Delete
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
