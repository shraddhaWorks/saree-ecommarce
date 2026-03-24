import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function BanarasSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("banaras") ||
    p.title?.toLowerCase().includes("banaras") ||
    p.description?.toLowerCase().includes("banaras")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="banaras-sarees" 
        title="Banaras Sarees"
        description="Discover the opulence of Banarasi silk. Woven meticulously with fine gold and silver zari, these sarees promise a majestic appearance for your most special ceremonies."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
