import { NextResponse, type NextRequest } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { profile } = await getUserFromRequest(req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Image uploads require an external storage provider configuration." },
      { status: 501 },
    );
  } catch (err) {
    console.error("POST /api/upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
