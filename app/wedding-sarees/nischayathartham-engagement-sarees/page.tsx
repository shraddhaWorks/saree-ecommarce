import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function EngagementSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "wedding" ||
    p.occasion?.toLowerCase() === "wedding" ||
    p.title?.toLowerCase().includes("engagement") ||
    p.title?.toLowerCase().includes("nischayathartham") ||
    p.description?.toLowerCase().includes("engagement") ||
    p.description?.toLowerCase().includes("nischayathartham")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="nischayathartham-engagement-sarees" 
        title="Engagement Sarees"
        description="Commemorate the promise of a lifetime with our elegant Nischayathartham/Engagement sarees. Intelligently woven to offer the perfect balance of tradition and celebratory charm."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
