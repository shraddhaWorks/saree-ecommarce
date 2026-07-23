import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export const PASSWORD_MIN_LENGTH = 8;

export function normalizeEmail(value: unknown): string | null {
  const email = typeof value === "string" ? value.trim().toLowerCase() : "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export async function createLocalUser(input: {
  email: string;
  password: string;
  name?: string;
  role: "ADMIN" | "CUSTOMER";
}) {
  if (input.password.length < PASSWORD_MIN_LENGTH) throw new Error("Password must be at least 8 characters");
  const password = await bcrypt.hash(input.password, 12);
  return prisma.user.create({
    data: { email: input.email, name: input.name || null, password, role: input.role },
    select: { id: true, email: true, name: true, role: true },
  });
}