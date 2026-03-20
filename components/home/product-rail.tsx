"use client";

import Link from "next/link";
import { useCart, useWishlist } from "@/components/cart";

type Product = {
  id: string;
  name: string;
  priceValue: number;
  price: string;
  originalPrice: string;
  image: string;
  alt: string;
  href: string;
  accent: string;
};

const products: Product[] = [
  {
    id: "purple",
    name: "Chanderi Silk Cotton Purple Saree",
    priceValue: 12640,
    price: "Rs. 12,640.00",
    originalPrice: "Rs. 15,800.00",
    image:
      "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-purple-saree-p-18930348.jpg?v=1749200704&width=1200",
    alt: "Purple chanderi silk cotton saree",
    href: "/products/chanderi-silk-cotton-purple-saree",
    accent: "#8460ab",
  },
  {
    id: "teal",
    name: "Chanderi Silk Cotton Teal Green Saree",
    priceValue: 11980,
    price: "Rs. 11,980.00",
    originalPrice: "Rs. 14,975.00",
    image:
      "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-teal-green-saree-p-18930350.jpg?v=1749200705&width=1200",
    alt: "Teal green chanderi silk cotton saree",
    href: "/products/chanderi-silk-cotton-teal-green-saree",
    accent: "#0f4d4d",
  },
  {
    id: "maroon",
    name: "Chanderi Silk Cotton Maroon Saree",
    priceValue: 12360,
    price: "Rs. 12,360.00",
    originalPrice: "Rs. 15,450.00",
    image:
      "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-maroon-saree-p-18930346.jpg?v=1749200703&width=1200",
    alt: "Maroon chanderi silk cotton saree",
    href: "/products/chanderi-silk-cotton-maroon-saree",
    accent: "#861d2a",
  },
  {
    id: "black",
    name: "Chanderi Silk Cotton Black Saree",
    priceValue: 11840,
    price: "Rs. 11,840.00",
    originalPrice: "Rs. 14,800.00",
    image:
      "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-black-saree-p-18930344.jpg?v=1749200702&width=1200",
    alt: "Black chanderi silk cotton saree",
    href: "/products/chanderi-silk-cotton-black-saree",
    accent: "#3a2d28",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${direction === "left" ? "" : "rotate-180"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ProductRail() {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.priceValue,
      image: product.image,
      quantity: 1,
    });

    window.dispatchEvent(new Event("cart:open"));
  };

  const handleToggleWishlist = (product: Product) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.priceValue,
      image: product.image,
      href: product.href,
    });

    window.dispatchEvent(new Event("wishlist:open"));
  };

  return (
    <section className="mx-auto w-full max-w-[1680px] px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-[#8f2333]/70">
            Signature Picks
          </p>
          <h2 className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-4xl tracking-[-0.04em] text-[#100b08] sm:text-5xl">
            Best of Sale
          </h2>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/collections/sale"
            className="text-sm font-medium text-[#201815] transition hover:text-[#8f2333]"
          >
            View All
          </Link>
          <button
            type="button"
            aria-label="Previous products"
            className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d9ccbc] bg-white/70 text-[#201815]/45 backdrop-blur transition hover:border-[#201815]/20 hover:text-[#201815]"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next products"
            className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d9ccbc] bg-white text-[#201815] shadow-[0_12px_30px_rgba(24,15,10,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(24,15,10,0.12)]"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-[30px] border border-[#dccfbe] bg-[#fffaf4] shadow-[0_18px_40px_rgba(42,24,15,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(42,24,15,0.14)]"
          >
            <Link href={product.href} className="block">
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-x-0 top-0 z-10 h-28 opacity-80"
                  style={{
                    background: `linear-gradient(180deg, ${product.accent} 0%, rgba(0,0,0,0) 100%)`,
                  }}
                />

                <img
                  src={product.image}
                  alt={product.alt}
                  className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.04] sm:h-[430px] xl:h-[520px]"
                  loading="lazy"
                />

                <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
                  <span className="w-fit rounded-md bg-[#e74635] px-3 py-1 text-sm font-semibold text-white shadow-sm">
                    SALE
                  </span>
                  <span className="w-fit rounded-md bg-[#e74635] px-3 py-1 text-sm font-semibold text-white shadow-sm">
                    20% OFF
                  </span>
                </div>

                <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={isWishlisted(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleToggleWishlist(product);
                    }}
                    className={`grid h-12 w-12 place-items-center rounded-full shadow-lg transition duration-300 group-hover:scale-105 ${isWishlisted(product.id)
                      ? "bg-[#9d2936] text-white"
                      : "bg-white/92 text-[#201815]"
                      }`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill={isWishlisted(product.id) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20.5 4.8 13.7a4.9 4.9 0 0 1 6.9-6.9L12 7.1l.3-.3a4.9 4.9 0 0 1 6.9 6.9L12 20.5Z" />
                    </svg>
                  </button>
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-full bg-black text-white shadow-lg transition duration-300 group-hover:scale-105"
                  >
                    <EyeIcon />
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#120d0a]/18 via-[#120d0a]/0 to-transparent" />
              </div>
            </Link>

            <div className="space-y-3 px-5 pb-6 pt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-[#d8c7b3] bg-[#f7efe5] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#7a5a48]">
                  Chanderi Edit
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#8f2333]">
                  Ready to Ship
                </span>
              </div>

              <div>
                <Link href={product.href} className="block">
                  <h3 className="line-clamp-2 text-[1.35rem] leading-tight font-medium text-[#1d1512]">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-2 text-sm leading-6 text-[#5a4740]">
                  Handwoven silk-cotton drape with a metallic border and festive sheen.
                </p>
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-[#eadfce] pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-[#111]">
                    {product.price}
                  </span>
                  <span className="text-sm text-[#8c7a70] line-through">
                    {product.originalPrice}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="rounded-full bg-[#201815] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#8f2333]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 sm:hidden">
        <Link
          href="/collections/sale"
          className="text-sm font-medium text-[#201815] underline decoration-[#8f2333]/40 underline-offset-4"
        >
          View All
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous products"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[#d9ccbc] bg-white/70 text-[#201815]/45"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next products"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-[#d9ccbc] bg-white text-[#201815] shadow-[0_12px_30px_rgba(24,15,10,0.08)]"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
