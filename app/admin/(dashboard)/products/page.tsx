"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
        const data = (await res.json()) as { items?: Row[]; error?: string };
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

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          New product
        </Link>
      </div>

      {error ? <p className="text-red-600 text-sm mb-4">{error}</p> : null}

      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Saree</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-zinc-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.mainImageUrl ? (
                      <img
                        src={p.mainImageUrl}
                        alt=""
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : null}
                    <span className="font-medium text-zinc-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">₹{Math.round(p.priceInPaise / 100)}</td>
                <td className="px-4 py-3">
                  {p.stockQuantity} {p.inStock ? "" : "(flagged out)"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-[#9d2936] font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && !error ? (
          <p className="p-8 text-center text-zinc-500 text-sm">No products yet.</p>
        ) : null}
      </div>
    </div>
  );
}
