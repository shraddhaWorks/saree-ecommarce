import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function SoftPattuPage() {
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("soft pattu") ||
    p.title?.toLowerCase().includes("soft pattu") ||
    p.description?.toLowerCase().includes("soft pattu")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="soft-pattu" 
        title="Soft Pattu Sarees"
        description="Discover the comfort of high-quality silk with a feather-light feel. Our Soft Pattu collection offers all the richness of pure silk without the heavy drape, making it perfect for day-long festivities."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
