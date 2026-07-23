import Link from "next/link";
import { requireCustomer } from "@/lib/auth/permissions";
import prisma from "@/lib/db";

export default async function CustomerDashboardPage() {
  const session = await requireCustomer();
  const [profile, orderCount, wishlistCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id }, select: { name: true, email: true } }),
    prisma.order.count({ where: { userId: session.user.id } }),
    prisma.wishlistItem.count({ where: { userId: session.user.id } }),
  ]);

  return (
    <main className="min-h-screen bg-[#fbf8f3] px-5 py-12 text-zinc-900 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">My account</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Welcome, {profile?.name ?? "there"}</h1>
        <p className="mt-2 text-zinc-600">Manage your profile, orders, wishlist, and saved addresses.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <DashboardCard href="/orders" title="My orders" value={String(orderCount)} description="Track your purchases" />
          <DashboardCard href="/wishlist" title="Wishlist" value={String(wishlistCount)} description="Saved pieces" />
          <DashboardCard href="/profile" title="Profile" value={profile?.email ?? ""} description="Account information" />
        </div>
       
      </div>
    </main>
  );
}

function DashboardCard({ href, title, value, description }: { href: string; title: string; value: string; description: string }) {
  return <Link href={href} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><p className="text-sm text-zinc-500">{title}</p><p className="mt-3 truncate text-xl font-semibold">{value}</p><p className="mt-2 text-sm text-zinc-600">{description}</p></Link>;
}