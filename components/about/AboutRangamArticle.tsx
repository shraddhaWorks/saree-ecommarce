import Link from "next/link";

import {
  RANGAM_ABOUT_PAGE_TITLE,
  RANGAM_CLOSING_PARAGRAPH,
  RANGAM_COMMITMENTS,
  RANGAM_COMMITMENTS_INTRO,
  RANGAM_HOME_PARAGRAPHS,
  RANGAM_MISSION_PARAGRAPH,
} from "@/lib/about-rangam-content";

const proseClass =
  "space-y-5 text-[0.95rem] leading-[1.75] text-[#3d3835] sm:text-base md:space-y-6";

export function AboutRangamArticle() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:py-20">
      <Link
        href="/"
        className="inline-block text-sm font-medium text-[#8f2333] underline-offset-4 hover:underline"
      >
        ← Back to home
      </Link>

      <header className="mt-8 border-b border-black/[0.08] pb-8">
        <h1 className="font-serif-royal text-3xl font-semibold tracking-[0.02em] text-[#1a1512] sm:text-4xl md:text-[2.35rem]">
          <span className="mr-1.5" aria-hidden>
            🌸
          </span>
          {RANGAM_ABOUT_PAGE_TITLE}
        </h1>
      </header>

      <div className={`${proseClass} mt-10`}>
        {RANGAM_HOME_PARAGRAPHS.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
        <p>{RANGAM_MISSION_PARAGRAPH}</p>
        <p className="font-medium text-[#1a1512]">{RANGAM_COMMITMENTS_INTRO}</p>
        <ul className="list-disc space-y-2 pl-5 text-[#3d3835]">
          {RANGAM_COMMITMENTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{RANGAM_CLOSING_PARAGRAPH}</p>
      </div>
    </article>
  );
}
