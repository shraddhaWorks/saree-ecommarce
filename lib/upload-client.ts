import { authHeaders } from "@/lib/auth-client";

/** Must match allowed prefixes in POST /api/upload */
export type UploadFolder =
  | "products"
  | "products/main"
  | "products/thumb"
  | "products/gallery"
  | "storefront/hero"
  | "storefront/grid"
  | "storefront/about";

export async function uploadImageToSupabase(
  file: File,
  folder: UploadFolder,
): Promise<{ url: string } | { error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: authHeaders(),
    body: fd,
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) {
    return { error: data.error ?? "Upload failed" };
  }
  if (!data.url) {
    return { error: "No URL returned" };
  }
  return { url: data.url };
}
