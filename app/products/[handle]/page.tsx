import Link from "next/link";
import Carousel from "@/components/common/Carousel";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ProductDetails from "@/components/product/ProductDetails";
import { Product } from "@/components/product/product";
import { ChevronLeft } from "lucide-react";

// Mock products data - replace with actual API call
const allProducts: Product[] = [
  {
    id: 1,
    name: "Chanderi Silk Cotton Purple Saree",
    price: 1999,
    discount: 20,
    stock: 1,
    description: "Elegant purple saree with zari stripes.",
    images: ["https://kalanjali.com/cdn/shop/files/1212588868-HY_1.jpg?v=1773820906&width=540"],
  },
  {
    id: 2,
    name: "Chanderi Silk Cotton Teal Green",
    price: 2199,
    discount: 20,
    stock: 3,
    description: "Stylish green saree.",
    images: ["https://kalanjali.com/cdn/shop/files/1212588861-HY_1.jpg?v=1773820899&width=540"],
  },
  {
    id: 3,
    name: "Chanderi Silk Cotton Maroon",
    price: 1899,
    discount: 20,
    stock: 2,
    description: "Traditional maroon saree.",
    images: ["https://kalanjali.com/cdn/shop/files/1212588858-HY_1.jpg?v=1773820900&width=540"],
  },
  {
    id: 4,
    name: "Chanderi Silk Cotton Black",
    price: 2099,
    discount: 20,
    stock: 5,
    description: "Elegant black saree.",
    images: ["https://kalanjali.com/cdn/shop/files/1212588856-HY_1.jpg?v=1773820901&width=540"],
  },
];

export default async function ProductPage({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params;

  // Find product by handle (id converted to string)
  const product = allProducts.find((p) => p.id.toString() === handle);

  // Get related products
  const relatedProducts = allProducts.filter((p) => p.id !== product?.id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7f0e7]">
        <StorefrontNavbar />
        <div className="pt-38.5 px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#9d2936] text-white rounded-lg hover:bg-[#7c1f29]"
          >
            <ChevronLeft size={18} />
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f0e7]">
      <StorefrontNavbar />

      {/* Back Button */}
      <div className="pt-38.5 px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#9d2936] hover:text-[#7c1f29] font-semibold"
        >
          <ChevronLeft size={20} />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
      />

      <Footer />
    </main>
  );
}
