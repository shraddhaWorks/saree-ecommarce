"use client";

import { useEffect, useState } from "react";
import { authHeaders } from "@/lib/auth-client";

type OrderRow = {
  id: string;
  status: string;
  totalPaise: number;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  shippingCity: string;
  createdAt: string;
  items: { quantity: number; productName: string; priceInPaise: number }[];
};

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/orders", { headers: authHeaders() });
        const data = (await res.json()) as { orders?: OrderRow[]; error?: string };
        if (cancelled) return;
        if (!res.ok) {
          setError(data.error ?? "Failed to load orders");
          return;
        }
        setError(null);
        setOrders(data.orders ?? []);
      } catch {
        if (!cancelled) setError("Network error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Update failed");
        return;
      }
      setError(null);
      const listRes = await fetch("/api/orders", { headers: authHeaders() });
      const listData = (await listRes.json()) as { orders?: OrderRow[] };
      if (listRes.ok) setOrders(listData.orders ?? []);
    } catch {
      setError("Network error");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      {error ? <p className="text-red-600 text-sm mb-4">{error}</p> : null}

      <div className="space-y-6">
        {orders.map((o) => (
          <div
            key={o.id}
            className="rounded-xl border border-zinc-200 bg-white p-5 text-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-zinc-900">
                  {o.guestName ?? "Customer"} · {o.guestEmail}
                </p>
                <p className="text-zinc-500 mt-1">
                  {o.guestPhone} · {o.shippingCity} ·{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </p>
                <p className="mt-2 font-medium">
                  Total ₹{Math.round(o.totalPaise / 100)}
                </p>
              </div>
              <label className="flex items-center gap-2 text-zinc-700">
                Status
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="rounded-lg border border-zinc-200 px-2 py-1"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <ul className="mt-4 border-t border-zinc-100 pt-4 space-y-2">
              {o.items.map((li, i) => (
                <li key={i} className="flex justify-between text-zinc-700">
                  <span>
                    {li.productName} × {li.quantity}
                  </span>
                  <span>₹{Math.round((li.priceInPaise * li.quantity) / 100)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {orders.length === 0 && !error ? (
        <p className="text-zinc-500 text-sm">No orders yet.</p>
      ) : null}
    </div>
  );
}
