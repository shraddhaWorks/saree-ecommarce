import Image from "next/image";

import type { PromoItem } from "@/components/home/HomePromoGrid";
import { OutOrInLink } from "@/lib/external-link";

type Props = {
  title: string;
  items: PromoItem[];
};

/**
 * Large occasion tiles: two per row (2×2), single column on small screens.
 * Styling matches the former `HomePromoGrid` tall variant — centered label, editorial height.
 */
export function ShopByOccasionSection({ title, items }: Props) {
  if (items.length === 0) return null;

  return (
    <section
      className="w-full bg-white py-10 md:py-12 lg:py-14"
      aria-labelledby="shop-by-occasion-heading"
    >
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <h2
          id="shop-by-occasion-heading"
          className="mb-8 text-center font-serif-royal text-2xl font-semibold tracking-[0.02em] text-[#1a1512] md:mb-10 md:text-3xl lg:text-[2.15rem]"
        >
          {title}
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:gap-8">
          {items.map((item) => (
            <li key={item.id} className="min-w-0">
              {item.linkUrl ? (
                <OutOrInLink
                  href={item.linkUrl}
                  className="group block touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-[#8f2333] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label={`${item.title} — shop collection`}
                >
                  <OccasionTile item={item} />
                </OutOrInLink>
              ) : (
                <OccasionTile item={item} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OccasionTile({ item }: { item: PromoItem }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#e8e4dc] shadow-sm ring-1 ring-black/[0.06] md:rounded-2xl">
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] md:aspect-auto md:h-[520px] lg:h-[580px]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 50vw"
          quality={90}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition duration-300 group-hover:from-black/60"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-10 pt-24 md:pb-14 md:pt-32">
          <h3 className="text-center font-sans text-4xl font-semibold tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-[3.25rem]">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
