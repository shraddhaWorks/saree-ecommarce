import Link from "next/link";
import prisma from "@/lib/db";
import { requireCustomer } from "@/lib/auth/permissions";

export default async function OrdersPage() {
  const session = await requireCustomer();

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log("orders", orders);

  return (
    <main className="min-h-screen bg-[#fbf8f3] px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-zinc-900">
          My Orders
        </h1>

        <p className="mt-2 text-zinc-600">
          View your orders and track their status.
        </p>

        {orders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Orders Yet
            </h2>

            <p className="mt-3 text-zinc-500">
              You haven't placed any orders yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white transition hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </h2>

                    <p className="text-sm text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold
                      ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div className="mt-6 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.product.mainImageUrl ??
                            "/images/product-placeholder.png"
                          }
                          alt={item.productName}
                          className="h-20 w-20 rounded-lg border object-cover"
                        />

                        <div>
                          <h3 className="font-medium">
                            {item.productName}
                          </h3>

                          <p className="text-sm text-zinc-500">
                            Quantity: {item.quantity}
                          </p>

                          <p className="text-sm text-zinc-500">
                            ₹
                            {(item.priceInPaise / 100).toLocaleString("en-IN")}
                            {" "}each
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold text-[#9d2936]">
                        ₹
                        {(
                          (item.priceInPaise * item.quantity) /
                          100
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#9d2936]">
                    ₹
                    {(order.totalPaise / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}