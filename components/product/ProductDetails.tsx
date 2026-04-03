"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { addToCart } from "@/lib/cart";
import { clothTypeDisplayLabel } from "@/lib/fabric-facets";
import type { StorefrontProduct } from "@/types/storefront";
import RelatedProducts from "./RelatedProducts";

type Props = {
  product: StorefrontProduct;
  relatedProducts: StorefrontProduct[];
};

export default function ProductDetails({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? "");
  const [qty, setQty] = useState(1);

  const maxQty = product.inStock ? Math.max(1, product.stock) : 0;
  const safeQty = Math.max(1, Math.min(qty, maxQty || 1));
  const isOutOfStock = !product.inStock || product.stock <= 0;

  const priceText = useMemo(() => `₹${product.price}`, [product.price]);

  const addProductToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage || product.images[0],
      qty: safeQty,
    });
    window.dispatchEvent(new Event("cart:updated"));
  };

  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-6 lg:px-10">
        <div className="mb-5">
          <Link href="/" className="text-sm text-black/60 hover:text-accent">
            ← Back to home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-5">
            <div className="flex flex-row gap-3 overflow-x-auto pb-2 md:w-[25%] md:flex-col md:overflow-visible md:pb-0">
              {product.images.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`h-24 min-w-[80px] overflow-hidden rounded-lg border transition-all md:h-[150px] md:min-w-0 md:w-full ${
                    selectedImage === img
                      ? "border-black shadow-md"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={product.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="w-full md:w-[75%]">
              <img
                src={selectedImage}
                alt={product.name}
                className="aspect-[3/4] w-full rounded-xl object-cover object-top shadow-sm md:h-[650px]"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm lg:p-8">
            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-3 text-2xl font-semibold text-accent">{priceText}</p>

            {isOutOfStock ? (
              <p className="mt-3 text-sm font-semibold text-red-700">Out of stock</p>
            ) : (
              <p className="mt-3 text-sm text-black/60">In stock: {product.stock}</p>
            )}

            {product.description ? (
              <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-black/70">
                {product.description}
              </p>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              <label className="text-sm font-semibold text-black/70">Qty</label>
              <div className="flex items-center overflow-hidden rounded-full border border-black/15">
                <button
                  type="button"
                  className="px-4 py-2 text-sm"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={isOutOfStock}
                >
                  -
                </button>
                <span className="min-w-10 text-center text-sm font-semibold">{safeQty}</span>
                <button
                  type="button"
                  className="px-4 py-2 text-sm"
                  onClick={() => setQty((q) => Math.min(maxQty || 1, q + 1))}
                  disabled={isOutOfStock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  if (isOutOfStock) return;
                  addProductToCart();
                  window.dispatchEvent(new Event("cart:open"));
                }}
                disabled={isOutOfStock}
                className="rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                Add to cart
              </button>

              <Link
                href="/checkout"
                onClick={() => {
                  if (isOutOfStock) return;
                  addProductToCart();
                }}
                className={`rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90 ${
                  isOutOfStock ? "pointer-events-none opacity-60" : ""
                }`}
              >
                Buy now
              </Link>
            </div>

            <div className="mt-10 rounded-2xl border border-black/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
                Specifications
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-black/50">Cloth</dt>
                  <dd className="font-semibold">{clothTypeDisplayLabel(product.clothType)}</dd>
                </div>
                <div>
                  <dt className="text-black/50">Occasion</dt>
                  <dd className="font-semibold">{product.occasion ?? "—"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <RelatedProducts products={relatedProducts} />
      </section>
    </main>
  );
}

