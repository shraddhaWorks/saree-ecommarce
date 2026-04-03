import Image from "next/image";
import Link from "next/link";

import { DEFAULT_ABOUT_IMAGE_PATH } from "@/lib/about-home-defaults";
import { RANGAM_HOME_PARAGRAPHS } from "@/lib/about-rangam-content";

type Props = {
  title: string;
};

function HomeAboutTeaser() {
  return (
    <div className="space-y-4 text-[0.95rem] leading-[1.75] text-[#3d3835] sm:text-base">
      {RANGAM_HOME_PARAGRAPHS.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

export function AboutBlock({ title }: Props) {
  /** Bundled banner; full Rangam story on /about via Know More. */
  const src = DEFAULT_ABOUT_IMAGE_PATH;

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-16" aria-labelledby="about-block-heading">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-stretch lg:gap-12 lg:px-8 xl:gap-16">
        {/* Landscape banner: fixed aspect on small screens; tall editorial column on lg+ */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/[0.06] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[min(80vh,680px)] lg:rounded-3xl">
          <Image
            src={src}
            alt="Rangam Silk Sarees — festive silk sarees and traditional celebration"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority={false}
          />
        </div>

        <div className="flex flex-col justify-center py-2 sm:py-6 lg:max-w-xl lg:self-center lg:py-10 xl:max-w-[28rem]">
          <h2
            id="about-block-heading"
            className="mb-6 font-serif-royal text-3xl font-semibold tracking-[0.02em] text-[#1a1512] sm:mb-8 sm:text-4xl lg:text-[2.35rem]"
          >
            {title}
          </h2>

          <div className="mb-10">
            <HomeAboutTeaser />
          </div>

          <div>
            <Link
              href="/about"
              className="inline-block border border-[#1a1512] bg-white px-8 py-3 text-sm font-medium tracking-wide text-[#1a1512] transition hover:bg-[#1a1512]/[0.04]"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
