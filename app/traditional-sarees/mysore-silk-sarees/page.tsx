import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function MysoreSilkSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("mysore") ||
    p.title?.toLowerCase().includes("mysore") ||
    p.description?.toLowerCase().includes("mysore")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="mysore-silk-sarees" 
        title="Mysore Silk Sarees"
        description="Celebrate timeless finesse with Mysore Silk sarees. Minimalist, fluid, and brilliantly textured, they bring a polished elegance to your wardrobe."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
