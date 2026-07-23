import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/lib/generated/prisma/client";
import { createLocalUser, normalizeEmail } from "@/lib/auth/registration";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody;

    const email = normalizeEmail(body.email);
    const password = body.password;
    const name = body.name?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await createLocalUser({ email, password, name, role: "CUSTOMER" });

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
    console.error("Signup error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

