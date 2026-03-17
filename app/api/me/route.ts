import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { user, profile } = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
        },
        profile,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET /api/me error", err);
    return NextResponse.json(
      { error: "Failed to load current user" },
      { status: 500 },
    );
  }
}

