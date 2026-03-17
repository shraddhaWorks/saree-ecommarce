import Link from "next/link";

import { AnalysisCard } from "@/components/planning/analysis-card";
import { FolderTree } from "@/components/planning/folder-tree";
import {
  componentStructure,
  homepageAnalysis,
  pageTemplates,
  projectStructure,
} from "@/features/storefront/blueprint-data";

export function FrontendBlueprintPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-border-soft bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(243,235,224,0.95))] p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Kalanjali Frontend Analysis
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Clean frontend structure for a Kalanjali-inspired clone with room
            for your custom modifications.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-black/70 md:text-lg">
            This blueprint is based on the current public storefront patterns on
            kalanjali.com: premium retail shell, editorial homepage sections,
            collection filters, rich product pages, store information, and dense
            footer content.
          </p>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <AnalysisCard title="Site Shell" items={homepageAnalysis.shell} />
          <AnalysisCard title="Homepage Blocks" items={homepageAnalysis.homepage} />
          <AnalysisCard title="Commerce Templates" items={homepageAnalysis.commerce} />
        </section>

        <section className="mt-8 grid gap-5 xl:grid-cols-2">
          <FolderTree title="Recommended Project Structure" lines={projectStructure} />
          <FolderTree title="Recommended Component Structure" lines={componentStructure} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-border-soft bg-surface p-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Main templates
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Start building from repeatable storefront page types
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-black/65">
              These routes are scaffolded so we can build the UI template by
              template instead of mixing all sections into one file.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {pageTemplates.map((template) => (
              <article
                key={template.href}
                className="rounded-3xl border border-border-soft bg-white/85 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">
                  {template.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{template.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/70">
                  {template.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-black/70">
                  {template.sections.map((section) => (
                    <li key={section} className="border-l-2 border-accent/30 pl-3">
                      {section}
                    </li>
                  ))}
                </ul>
                <Link
                  href={template.href}
                  className="mt-6 inline-flex rounded-full border border-border-soft px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                >
                  Open template
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
