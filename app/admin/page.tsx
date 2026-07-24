import Link from "next/link";
import { requireAdmin } from "@/lib/auth/permissions";
import prisma from "@/lib/db";
import BackButton from "@/components/common/BackButton";

export default async function AdminIndexPage() {
  const session = await requireAdmin();
  const [products, orders, users] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (

    <main className="min-h-screen bg-zinc-50 p-6 text-zinc-900 md:p-10">
      <BackButton />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full rounded-2xl border border-zinc-200 bg-white p-5 lg:w-60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Admin</p>
            <nav className="mt-5 grid gap-2 text-sm">
              <Link className="rounded-lg bg-zinc-900 px-3 py-2 text-white" href="/admin">Overview</Link>
              <Link className="rounded-lg px-3 py-2 hover:bg-zinc-100" href="/admin/products">Products</Link>
              <Link className="rounded-lg px-3 py-2 hover:bg-zinc-100" href="/admin/categories">Categories</Link>
              <Link className="rounded-lg px-3 py-2 hover:bg-zinc-100" href="/admin/orders">Orders</Link>
             
              <Link className="rounded-lg px-3 py-2 hover:bg-zinc-100" href="/admin/storefront">Homepage content</Link>
            </nav>
          </aside>
          <section className="min-w-0 flex-1">
            <p className="text-sm text-zinc-500">Signed in as {session.user.email}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Welcome, {session.user.name ?? "Admin"}</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Metric label="Total products" value={products} />
              <Metric label="Total orders" value={orders} />
              <Metric label="Total users" value={users} />
            </div>
          </section>
        </div>
      </div>
    </main>

    );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">{label}</p><p className="mt-3 text-3xl font-semibold">{value}</p></div>;
}
