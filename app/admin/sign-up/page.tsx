"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { setAccessToken } from "@/lib/auth-client";

export default function AdminSignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/admin-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim().toLowerCase(),
          password,
          adminSecret,
        }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Signup failed");
        setLoading(false);
        return;
      }

      const signRes = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });
      const signData = (await signRes.json()) as {
        error?: string;
        accessToken?: string;
      };

      if (!signRes.ok || !signData.accessToken) {
        setLoading(false);
        router.push("/admin/login?registered=1");
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
      <h1 className="text-2xl font-semibold text-zinc-900">Admin sign up</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Create an admin account. You need the invite code from{" "}
        <code className="text-xs">ADMIN_SIGNUP_SECRET</code> in your server{" "}
        <code className="text-xs">.env</code>.
      </p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <label className="block text-sm">
          <span className="text-zinc-600">Name (optional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2"
            autoComplete="name"
          />
        </label>
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
            autoComplete="new-password"
            required
            minLength={8}
          />
        </label>
        <label className="block text-sm">
          <span className="text-zinc-600">Admin invite code</span>
          <input
            type="password"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-sm"
            autoComplete="off"
            required
            placeholder="From ADMIN_SIGNUP_SECRET"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create admin account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/admin/login" className="text-[#9d2936] font-medium hover:underline">
          Admin sign in
        </Link>
      </p>
      <Link href="/" className="mt-3 block text-center text-sm text-zinc-400 hover:text-zinc-700">
        Back to store
      </Link>
    </div>
  );
}
