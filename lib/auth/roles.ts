import type { UserRole } from "@/lib/generated/prisma/client";

export function isAdmin(role: UserRole | string | null | undefined): boolean {
  return role === "ADMIN";
}

export function isCustomer(role: UserRole | string | null | undefined): boolean {
  return role === "CUSTOMER";
}