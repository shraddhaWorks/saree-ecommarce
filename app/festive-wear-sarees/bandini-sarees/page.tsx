import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function BandiniSareesPage() {
  const initialProducts = products.filter(p => 
    p.title?.toLowerCase().includes("bandhani") ||
    p.description?.toLowerCase().includes("bandhani") ||
    p.fabric?.toLowerCase().includes("bandhani")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="bandini-sarees" 
        title="Bandhani Sarees"
        description="Embrace the timeless tie-and-dye tradition with our vibrant Bandhani silk sarees. Each piece reflects centuries-old techniques, bringing an authentic cultural charm to your festive ensemble."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
