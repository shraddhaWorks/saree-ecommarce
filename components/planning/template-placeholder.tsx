import Link from "next/link";

import type { PageTemplate } from "@/types/storefront";

type TemplatePlaceholderProps = {
  template: PageTemplate;
};

export function TemplatePlaceholder({ template }: TemplatePlaceholderProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-border-soft px-4 py-2 text-sm text-black/70 transition hover:border-accent hover:text-accent"
        >
          Back to blueprint
        </Link>
        <section className="mt-6 rounded-[2rem] border border-border-soft bg-surface p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {template.label}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {template.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
            {template.description}
          </p>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {template.sections.map((section) => (
            <article
              key={section}
              className="rounded-3xl border border-border-soft bg-white/80 p-5"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-black/45">
                Planned section
              </h2>
              <p className="mt-3 text-lg font-medium">{section}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
