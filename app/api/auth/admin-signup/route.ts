import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/lib/generated/prisma/client";
import { createLocalUser, normalizeEmail } from "@/lib/auth/registration";

type Body = {
  email?: string;
  password?: string;
  name?: string;
  adminSecret?: string;
};

const MIN_PASSWORD_LENGTH = 8;
const MAX_NAME_LENGTH = 100;

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

    let body: Body;
    try {
      body = (await req.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 });
    }

    const email = normalizeEmail(body.email);
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const adminSecret = typeof body.adminSecret === "string" ? body.adminSecret.trim() : "";

    if (!email) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 400 },
      );
    }

    if (name && name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Name is too long" }, { status: 400 });
    }

    if (!safeEqualString(adminSecret, expected)) {
      return NextResponse.json(
        { error: "Invalid admin invite code" },
        { status: 403 },
      );
    }

    const user = await createLocalUser({ email, password, name, role: "ADMIN" });

    return NextResponse.json(
      {
        user: {
          ...user,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Password must")) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    console.error("Admin signup error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
