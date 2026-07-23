import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 * Quick diagnostics for PostgreSQL reachability through Prisma.
 * Does not expose secrets. Open GET /api/health while the dev server runs.
 */
export async function GET() {
  let databaseOk = false;
  let databaseError: string | undefined;

  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseOk = true;
  } catch (e) {
    databaseError = e instanceof Error ? e.message : String(e);
  }

  const ok = databaseOk;

  return NextResponse.json(
    {
      ok,
      database: databaseOk ? "up" : "down",
      databaseError: databaseOk ? undefined : databaseError,
    },
    { status: ok ? 200 : 503 },
  );
}
