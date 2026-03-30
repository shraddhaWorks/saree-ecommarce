import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getUserFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseServer";

const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ||
  process.env.SUPABASE_STORAGE_BUCKET ||
  "saree-images";

/** Allowed storage prefixes (Supabase bucket folders). */
const ALLOWED_FOLDERS = new Set([
  "products",
  "products/main",
  "products/thumb",
  "products/gallery",
  "storefront/hero",
  "storefront/grid",
  "storefront/about",
]);

function sanitizeFolder(raw: unknown): string {
  if (typeof raw !== "string" || !raw.trim()) return "products";
  const s = raw.trim().replace(/^\/+|\/+$/g, "");
  if (ALLOWED_FOLDERS.has(s)) return s;
  return "products";
}

export async function POST(req: NextRequest) {
  try {
    const { profile } = await getUserFromRequest(req);
    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    const folder = sanitizeFolder(form.get("folder"));

    const buf = Buffer.from(await file.arrayBuffer());
    const ext =
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : file.type === "image/jpeg" || file.type === "image/jpg"
            ? "jpg"
            : "bin";

    if (ext === "bin") {
      return NextResponse.json(
        { error: "Use PNG, JPG, or WebP images only" },
        { status: 400 },
      );
    }

    const path = `${folder}/${randomUUID()}.${ext}`;

    const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, buf, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (error) {
      console.error("Supabase upload error", error);
      return NextResponse.json(
        {
          error:
            error.message ||
            "Upload failed. Create the bucket in Supabase and set NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET.",
        },
        { status: 500 },
      );
    }

    const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const publicUrl = `${base}/storage/v1/object/public/${BUCKET}/${path}`;

    return NextResponse.json({ url: publicUrl, path }, { status: 201 });
  } catch (err) {
    console.error("POST /api/upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
