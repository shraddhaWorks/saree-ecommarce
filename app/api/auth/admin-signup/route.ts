import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { describeSupabaseConnectionFailure } from "@/lib/supabaseErrors";
import { supabaseAdmin } from "@/lib/supabaseServer";

type Body = {
  email?: string;
  password?: string;
  name?: string;
  adminSecret?: string;
};

function safeEqualString(a: string, b: string): boolean {
  const key = "admin-signup";
  const ha = createHmac("sha256", key).update(a, "utf8").digest();
  const hb = createHmac("sha256", key).update(b, "utf8").digest();
  return ha.length === hb.length && timingSafeEqual(ha, hb);
}

export async function POST(req: NextRequest) {
  try {
    const expected = process.env.ADMIN_SIGNUP_SECRET?.trim();
    if (!expected || expected.length < 8) {
      return NextResponse.json(
        {
          error:
            "Admin signup is disabled. Set ADMIN_SIGNUP_SECRET in .env (at least 8 characters).",
        },
        { status: 503 },
      );
    }

    const body = (await req.json()) as Body;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const name = body.name?.trim();
    const adminSecret = body.adminSecret?.trim() ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    if (!safeEqualString(adminSecret, expected)) {
      return NextResponse.json(
        { error: "Invalid admin invite code" },
        { status: 403 },
      );
    }

    let data: Awaited<
      ReturnType<typeof supabaseAdmin.auth.admin.createUser>
    >["data"];
    let error: Awaited<
      ReturnType<typeof supabaseAdmin.auth.admin.createUser>
    >["error"];

    try {
      const res = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      data = res.data;
      error = res.error;
    } catch (e) {
      const hint = describeSupabaseConnectionFailure(e);
      if (hint) {
        return NextResponse.json({ error: hint }, { status: 503 });
      }
      throw e;
    }

    if (error || !data.user) {
      const hint = describeSupabaseConnectionFailure(error);
      if (hint) {
        return NextResponse.json({ error: hint }, { status: 503 });
      }
      return NextResponse.json(
        { error: error?.message ?? "Failed to create user" },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email,
        name,
        role: "ADMIN",
      },
      create: {
        id: userId,
        email,
        name,
        role: "ADMIN",
      },
    });

    return NextResponse.json(
      {
        user: {
          id: userId,
          email,
          name,
          role: "ADMIN",
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Admin signup error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
