import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdmin as isAdminRole, isCustomer as isCustomerRole } from "@/lib/auth/roles";

export type AuthUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  role?: "ADMIN" | "CUSTOMER";
};

export function isAdmin(user: AuthUser | null | undefined): boolean {
  return isAdminRole(user?.role);
}

export function isCustomer(user: AuthUser | null | undefined): boolean {
  return isCustomerRole(user?.role);
}

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (!isAdmin(session.user)) {
    redirect("/dashboard");
  }

  return session;
}

export async function requireCustomer() {
  const session = await requireAuth();

  if (!isCustomer(session.user)) {
    redirect("/admin");
  }

  return session;
}