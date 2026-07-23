import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint is disabled. Use Auth.js credentials sign-in." },
    { status: 410 },
  );
}