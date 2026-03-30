"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "@/lib/auth-client";

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await res.json()) as { profile?: { role?: string } };
        if (cancelled) return;
        if (!res.ok || data.profile?.role !== "ADMIN") {
          setAccessToken(null);
          router.replace("/admin/login");
          return;
        }
        setReady(true);
      } catch {
        if (!cancelled) router.replace("/admin/login");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-zinc-500 text-sm">
        Verifying admin session…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 flex flex-wrap items-center gap-4">
        <Link href="/admin/products" className="font-semibold text-zinc-900">
          Admin
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/admin/storefront" className="text-zinc-600 hover:text-zinc-900">
            Storefront
          </Link>
          <Link href="/admin/products" className="text-zinc-600 hover:text-zinc-900">
            Products
          </Link>
          <Link href="/admin/orders" className="text-zinc-600 hover:text-zinc-900">
            Orders
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
            View storefront
          </Link>
          <button
            type="button"
            onClick={() => {
              setAccessToken(null);
              router.push("/admin/login");
            }}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Log out
          </button>
        </div>
      </header>
      <div className="p-6 max-w-6xl mx-auto">{children}</div>
    </div>
  );
}
