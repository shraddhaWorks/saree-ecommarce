import { User } from "lucide-react";
import { requireCustomer } from "@/lib/auth/permissions";
import prisma from "@/lib/db";
import BackButton from "@/components/common/BackButton";

export default async function ProfilePage() {
  const session = await requireCustomer();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return (

      <main className="min-h-screen bg-[#fbf8f3] p-8">
        <BackButton />
        <h1 className="text-2xl font-bold">User not found</h1>
      </main>

      );
  }

  return (
     <main className="min-h-screen bg-[#fbf8f3] px-5 py-10">
    <div className="mx-auto max-w-4xl">
      <BackButton />

      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">

          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-full bg-[#9d2936]/10 p-3">
              <User className="h-7 w-7 text-[#9d2936]" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                My Profile
              </h1>

              <p className="text-zinc-500">
                Manage your account information.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium text-zinc-500">
                Full Name
              </label>

              <div className="mt-2 rounded-lg border bg-zinc-50 px-4 py-3">
                {user.name || "-"}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-500">
                Email Address
              </label>

              <div className="mt-2 rounded-lg border bg-zinc-50 px-4 py-3">
                {user.email}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-500">
                Account Type
              </label>

              <div className="mt-2 rounded-lg border bg-zinc-50 px-4 py-3">
                {user.role}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-500">
                Member Since
              </label>

              <div className="mt-2 rounded-lg border bg-zinc-50 px-4 py-3">
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

          </div>

          <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-700">
              Profile editing will be available soon.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}