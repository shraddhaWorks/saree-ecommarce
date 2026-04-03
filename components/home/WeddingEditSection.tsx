import { OutOrInLink } from "@/lib/external-link";

import type { PromoItem } from "./HomePromoGrid";

type Props = {
  title: string;
  items: PromoItem[];
  /** Wedding edit: 5 tiles on xl. Crafts: 4 tiles across on lg+. */
  layout?: "five" | "four";
};

function ArrowCircle() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white text-white shadow-sm transition duration-300 group-hover/card:border-white group-hover/card:bg-white/10 md:h-11 md:w-11"
      aria-hidden
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="md:h-5 md:w-5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M14 6l6 6-6 6" />
      </svg>
    </span>
  );
}

const GRID_FIVE =
  "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3 xl:grid-cols-5 xl:gap-3";
const GRID_FOUR =
  "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-3";

export function WeddingEditSection({ title, items, layout = "five" }: Props) {
  if (items.length === 0) return null;

  const gridClass = layout === "four" ? GRID_FOUR : GRID_FIVE;

  return (
    <section className="w-full bg-[#f0ede6] py-10 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1680px] px-3 sm:px-4 md:px-5 lg:px-6">
        <h2 className="mb-8 text-center font-serif-royal text-2xl font-semibold tracking-[0.02em] text-[#1a1512] md:mb-10 md:text-3xl lg:text-[2.15rem]">
          {title}
        </h2>

        <div className={gridClass}>
          {items.map((item) => {
            const card = (
              <article className="group/card overflow-hidden rounded-[10px] bg-[#1a1512] shadow-sm ring-1 ring-black/[0.06]">
                <div className="relative aspect-[9/16] w-full overflow-hidden xl:aspect-auto xl:h-[480px] 2xl:h-[520px]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover/card:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    aria-hidden
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                    <h3 className="max-w-[72%] font-sans text-[0.9375rem] font-medium leading-snug tracking-wide text-white md:text-base lg:text-[1.05rem]">
                      {item.title}
                    </h3>
                    <ArrowCircle />
                  </div>
                </div>
              </article>
            );

            return (
              <div key={item.id} className="min-w-0">
                {item.linkUrl ? (
                  <OutOrInLink
                    href={item.linkUrl}
                    className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#8f2333]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0ede6]"
                    aria-label={`${item.title} — view collection`}
                  >
                    {card}
                  </OutOrInLink>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
