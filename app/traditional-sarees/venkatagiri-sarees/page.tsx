import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function VenkatagiriSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("venkatagiri") ||
    p.title?.toLowerCase().includes("venkatagiri") ||
    p.description?.toLowerCase().includes("venkatagiri")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="venkatagiri-sarees" 
        title="Venkatagiri Sarees"
        description="Known for their regal, sheer texture and rich silver or gold zari borders, Venkatagiri sarees are the perfect sophisticated choice for traditional gatherings."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

