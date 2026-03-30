import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 * Quick diagnostics: database reachability (Prisma) and whether Supabase URL is configured.
 * Does not expose secrets. Open GET /api/health while the dev server runs.
 */
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  let databaseOk = false;
  let databaseError: string | undefined;

  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseOk = true;
  } catch (e) {
    databaseError = e instanceof Error ? e.message : String(e);
  }

  let supabaseNetworkOk: boolean | null = null;
  let supabaseHttpStatus: number | undefined;
  let supabaseError: string | undefined;
  if (supabaseUrl) {
    try {
      const healthUrl = `${supabaseUrl.replace(/\/$/, "")}/auth/v1/health`;
      const res = await fetch(healthUrl, {
        signal: AbortSignal.timeout(8000),
      });
      supabaseNetworkOk = true;
      supabaseHttpStatus = res.status;
    } catch (e) {
      supabaseNetworkOk = false;
      supabaseError = e instanceof Error ? e.message : String(e);
    }
  }

  const supabaseOk = !supabaseUrl || supabaseNetworkOk === true;
  const ok = databaseOk && supabaseOk;

  return NextResponse.json(
    {
      ok,
      database: databaseOk ? "up" : "down",
      databaseError: databaseOk ? undefined : databaseError,
      supabaseUrlConfigured: Boolean(supabaseUrl),
      supabaseNetworkOk,
      supabaseHttpStatus,
      supabaseError: supabaseNetworkOk ? undefined : supabaseError,
    },
    { status: ok ? 200 : 503 },
  );
}
