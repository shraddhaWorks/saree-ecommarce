"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useEffect, useState, useMemo } from "react";
=======
import { notFound } from "next/navigation";
>>>>>>> cb8727c (backend)
import Footer from "@/components/footer/Footer";
import ProductDetails from "@/components/product/ProductDetails";
<<<<<<< HEAD
import type { Product } from "@/components/product/product";
=======
import { toStorefrontProduct } from "@/lib/storefront-map";
import prisma from "@/lib/db";
>>>>>>> cb8727c (backend)
import { ChevronLeft } from "lucide-react";
import { products as dummyProducts } from "@/lib/dummyData";
import { use } from "react";

<<<<<<< HEAD
export default function ProductPage({
  params: paramsPromise
=======
export default async function ProductPage({
  params,
>>>>>>> cb8727c (backend)
}: {
  params: Promise<{ handle: string }>;
}) {
<<<<<<< HEAD
  const params = use(paramsPromise);
  const { handle } = params;
  
  const [customProducts, setCustomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("customProducts");
    if (stored) {
      try {
        setCustomProducts(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse custom products", e);
      }
    }
  }, []);

  const allAvailableProducts = useMemo(() => {
    // Merge dummy products and custom products
    // We cast dummy products to Product[] to be safe with types
    return [...(dummyProducts as unknown as Product[]), ...customProducts];
  }, [customProducts]);

  const product = useMemo(() => {
    return allAvailableProducts.find(
      (p) => {
        const idStr = p.id.toString();
        if (idStr === handle) return true;
        
        const slug = (p.title || p.name || "").toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, '');
        if (slug === handle) return true;
        
        return false;
      }
    );
  }, [allAvailableProducts, handle]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allAvailableProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [allAvailableProducts, product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7f0e7]">
        <div className="px-6 py-20 text-center">
          <h1 className="text-4xl font-[Georgia] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">We couldn't find the saree you're looking for. It might have been moved or is no longer available.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#9d2936] text-white rounded-full hover:bg-[#7c1f29] transition shadow-lg"
          >
            <ChevronLeft size={18} />
            Back to Collections
          </Link>
        </div>
        <Footer />
      </main>
    );
=======
  const { handle } = await params;
  const slug = decodeURIComponent(handle).toLowerCase();

  const row = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
    },
  });

  if (!row) {
    notFound();
>>>>>>> cb8727c (backend)
  }

  const product = toStorefrontProduct(row);

  const relatedRows = await prisma.product.findMany({
    where: {
      id: { not: row.id },
      categoryId: row.categoryId,
      inStock: true,
      stockQuantity: { gt: 0 },
    },
    include: {
      category: true,
      images: { orderBy: { position: "asc" } },
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const relatedProducts = relatedRows.map(toStorefrontProduct);

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-[#fdfbf7]">
      <div className="max-w-[1440px] mx-auto px-6 py-6">
=======
    <main className="min-h-screen bg-[#f7f0e7]">
      <StorefrontNavbar />

      <div className="pt-38.5 px-6 py-4">
>>>>>>> cb8727c (backend)
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#9d2936] hover:text-[#7c1f29] font-medium transition"
        >
          <ChevronLeft size={20} />
          Back to Shop
        </Link>
      </div>

<<<<<<< HEAD
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
      />
=======
      <ProductDetails product={product} relatedProducts={relatedProducts} />
>>>>>>> cb8727c (backend)

      <Footer />
    </main>
  );
}
