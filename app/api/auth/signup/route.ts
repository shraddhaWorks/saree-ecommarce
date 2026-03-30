import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { describeSupabaseConnectionFailure } from "@/lib/supabaseErrors";
import { supabaseAdmin } from "@/lib/supabaseServer";

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const name = body.name?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
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
      },
      create: {
        id: userId,
        email,
        name,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: userId,
          email,
          name,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Signup error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

