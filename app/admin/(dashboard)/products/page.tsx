"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BackButton from "@/components/common/BackButton";
import { authHeaders } from "@/lib/auth-client";

type Row = {
  id: string;
  name: string;
  slug: string;
  priceInPaise: number;
  inStock: boolean;
  stockQuantity: number;
  mainImageUrl?: string | null;
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/products?limit=200");
        const data = (await res.json()) as {
          items?: Row[];
          error?: string;
        };

        if (!res.ok) {
          setError(data.error ?? "Failed to load");
          return;
        }

        setItems(data.items ?? []);
      } catch {
        setError("Network error");
      }
    })();
  }, []);

  async function handleDeactivate(id: string) {
    const confirmDeactivate = confirm(
      "Make this product inactive?"
    );

    if (!confirmDeactivate) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
        credentials: "include",
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        console.error("Deactivate failed:", data);
        setError(data.error ?? "Failed to make product inactive");
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, inStock: false, stockQuantity: 0 } : item,
        ),
      );
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Network error");
    }
  }

  async function handleActivate(id: string) {
    const confirmActivate = confirm(
      "Make this product active again?"
    );

    if (!confirmActivate) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          inStock: true,
          stockQuantity: 1,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        console.error("Activate failed:", data);
        setError(data.error ?? "Failed to make product active");
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, inStock: true, stockQuantity: 1 } : item,
        ),
      );
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Network error");
    }
  }

  return (
    <div>
      <BackButton />

      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          New product
        </Link>
      </div>

      {error ? (
        <p className="mb-4 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">
                Saree
              </th>

              <th className="px-4 py-3 font-medium">
                Price
              </th>

              <th className="px-4 py-3 font-medium">
                Stock
              </th>

              <th className="px-4 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((p) => (
              <tr
                key={p.id}
                className="border-t border-zinc-100"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.mainImageUrl ? (
                      <img
                        src={p.mainImageUrl}
                        alt=""
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : null}

                    <span className="font-medium text-zinc-900">
                      {p.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  ₹{Math.round(p.priceInPaise / 100)}
                </td>

                <td className="px-4 py-3">
                  {p.stockQuantity}

                  {!p.inStock && (
                    <span className="ml-1 text-red-500">
                      (out)
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="font-medium text-[#9d2936] hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => (p.inStock ? handleDeactivate(p.id) : handleActivate(p.id))}
                      className={`font-medium ${p.inStock ? "text-red-600 hover:underline" : "text-green-600 hover:underline"}`}
                    >
                      {p.inStock ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && !error ? (
          <p className="p-8 text-center text-sm text-zinc-500">
            No products yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}