/**
 * Maps Supabase client failures (DNS, TLS, offline) to a stable API response.
 * ENOTFOUND on *.supabase.co usually means NEXT_PUBLIC_SUPABASE_URL is wrong or the project was removed.
 */
export function describeSupabaseConnectionFailure(err: unknown): string | null {
  const text = flattenErrorMessage(err);
  if (
    /fetch failed|ENOTFOUND|getaddrinfo|ECONNREFUSED|ECONNRESET|ETIMEDOUT|ENETUNREACH|EAI_AGAIN/i.test(
      text,
    )
  ) {
    const dnsHint = /ENOTFOUND|getaddrinfo/i.test(text)
      ? " Run: nslookup your-ref.supabase.co — if you see NXDOMAIN, the URL in .env is wrong or the project was deleted: open Supabase Dashboard → your project → Settings → API → copy Project URL and matching anon + service_role keys again. "
      : " ";
    return (
      "Cannot reach Supabase. Set NEXT_PUBLIC_SUPABASE_URL to the Project URL from Dashboard → Settings → API (same project as your database and API keys)." +
      dnsHint +
      "Restart npm run dev after saving .env."
    );
  }
  return null;
}

function flattenErrorMessage(err: unknown): string {
  if (err == null) return "";
  const parts: string[] = [];
  let cur: unknown = err;
  let depth = 0;
  while (cur != null && depth < 6) {
    if (cur instanceof Error) {
      parts.push(cur.message);
      cur = cur.cause;
    } else if (typeof cur === "object" && "message" in cur) {
      parts.push(String((cur as { message: unknown }).message));
      cur =
        typeof cur === "object" && cur !== null && "cause" in cur
          ? (cur as { cause: unknown }).cause
          : null;
    } else {
      parts.push(String(cur));
      break;
    }
    depth++;
  }
  return parts.join(" ");
}
