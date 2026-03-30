"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { setAccessToken } from "@/lib/auth-client";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const signRes = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const signData = (await signRes.json()) as {
        error?: string;
        accessToken?: string;
      };
      if (!signRes.ok || !signData.accessToken) {
        setError(signData.error ?? "Invalid credentials");
        setLoading(false);
        return;
      }

      const meRes = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${signData.accessToken}` },
      });
      const me = (await meRes.json()) as { profile?: { role?: string } };
      if (me.profile?.role !== "ADMIN") {
        setError(
          "This account is not an admin. Use admin sign up or set role in the database.",
        );
        setLoading(false);
        return;
      }

      setAccessToken(signData.accessToken);
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-zinc-900">Admin sign in</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Sign in with an admin account, or{" "}
        <Link href="/admin/sign-up" className="text-[#9d2936] font-medium hover:underline">
          create one
        </Link>{" "}
        with your invite code.
      </p>
      {registered ? (
        <p className="mt-3 text-sm text-green-700">
          Account created. Sign in below.
        </p>
      ) : null}
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <label className="block text-sm">
          <span className="text-zinc-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-600">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
            autoComplete="current-password"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <Link href="/" className="mt-6 block text-center text-sm text-zinc-500 hover:text-zinc-800">
        Back to store
      </Link>
    </div>
  );
}
