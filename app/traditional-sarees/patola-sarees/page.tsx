import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function PatolaSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("patola") ||
    p.title?.toLowerCase().includes("patola") ||
    p.description?.toLowerCase().includes("patola")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="patola-sarees" 
        title="Patola Sarees"
        description="Cherish the incredibly intricate double-ikat weaving of Patola sarees. A symbol of heritage and artistry bound within exceptionally beautiful geometric designs."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
