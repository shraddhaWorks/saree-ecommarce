import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { describeSupabaseConnectionFailure } from "@/lib/supabaseErrors";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set in environment");
}

if (!SUPABASE_ANON_KEY) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in environment");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

type SigninBody = {
  email?: string;
  password?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SigninBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    let data: Awaited<
      ReturnType<typeof supabase.auth.signInWithPassword>
    >["data"];
    let error: Awaited<
      ReturnType<typeof supabase.auth.signInWithPassword>
    >["error"];

    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
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

    if (error || !data.session) {
      const hint = describeSupabaseConnectionFailure(error);
      if (hint) {
        return NextResponse.json({ error: hint }, { status: 503 });
      }
      return NextResponse.json(
        { error: error?.message ?? "Invalid email or password" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: data.user?.id,
          email: data.user?.email,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Signin error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

