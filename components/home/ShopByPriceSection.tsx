import Image from "next/image";
import Link from "next/link";

import type { PromoItem } from "@/components/home/HomePromoGrid";
import { SHOP_BY_PRICE_COLLECTION_SLUG } from "@/lib/shop-by-price-home";

type Props = {
  title?: string;
  /** Override target collection (defaults to sarees / site-wide fallback). */
  collectionSlug?: string;
  items?: PromoItem[];
};

export function ShopByPriceSection({
  title = "Shop by Price",
  collectionSlug = SHOP_BY_PRICE_COLLECTION_SLUG,
  items,
}: Props) {
  const slug = collectionSlug.trim() || SHOP_BY_PRICE_COLLECTION_SLUG;
  const tiles = (items ?? []).map((item) => ({
    id: item.id,
    href: item.linkUrl ?? `/collections/${encodeURIComponent(slug)}`,
    imageSrc: item.imageUrl,
    alt: item.title,
  }));

  if (tiles.length === 0) return null;

  return (
    <section className="w-full bg-white py-10 md:py-12" aria-labelledby="shop-by-price-heading">
      <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <h2
          id="shop-by-price-heading"
          className="mb-8 text-center font-serif-royal text-2xl font-semibold tracking-[0.02em] text-[#1a1512] md:mb-10 md:text-3xl lg:text-[2.15rem]"
        >
          {title}
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {tiles.map((tile) => (
            <li key={tile.id} className="min-w-0">
              <Link
                href={tile.href}
                className="group block touch-manipulation outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#8f2333]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl border border-black/[0.06] bg-[#f5f0ea] shadow-sm transition duration-300 group-hover:shadow-md md:rounded-2xl">
                  <Image
                    src={tile.imageSrc}
                    alt={tile.alt}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
                    quality={90}
                  />
                  <span className="sr-only">Shop now</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
