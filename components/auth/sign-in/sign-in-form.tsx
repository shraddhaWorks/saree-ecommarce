"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthField } from "@/components/auth/shared/auth-field";
import { SocialAuthButtons } from "@/components/auth/shared/social-auth-buttons";
import { setAccessToken } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        accessToken?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Sign in failed");
        setLoading(false);
        return;
      }
      if (data.accessToken) setAccessToken(data.accessToken);
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">Sign In</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Access your account</h2>
      </div>
      <SocialAuthButtons />
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/35">
        <span className="h-px flex-1 bg-border-soft" />
        or
        <span className="h-px flex-1 bg-border-soft" />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <AuthField label="Email address" type="email" name="email" placeholder="you@example.com" />
      <AuthField label="Password" type="password" name="password" placeholder="Enter your password" />
      <div className="flex items-center justify-between gap-3 text-sm text-black/60">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-border-soft" />
          Remember me
        </label>
        <span className="font-medium text-accent">Forgot password?</span>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
