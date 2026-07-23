import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
export async function getUserFromRequest(_req?: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return { user: null, profile: null };
  const profile = await prisma.user.findUnique({ where: { id: session.user.id } });
  return { user: session.user, profile };
}

