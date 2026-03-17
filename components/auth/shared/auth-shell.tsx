import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  alternateLabel: string;
  alternateHref: string;
  alternateText: string;
  children: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  alternateLabel,
  alternateHref,
  alternateText,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-border-soft bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(243,235,224,0.96))] p-8 shadow-sm md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/70">{description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Premium ethnic fashion",
              "Wishlist and order tracking",
              "Faster repeat checkout",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-border-soft bg-white/80 p-4 text-sm text-black/70">
                {item}
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[2rem] border border-border-soft bg-surface p-8 shadow-sm md:p-10">
          {children}
          <p className="mt-6 text-sm text-black/60">
            {alternateLabel}{" "}
            <Link href={alternateHref} className="font-semibold text-accent transition hover:opacity-80">
              {alternateText}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
