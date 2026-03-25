import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function MehendiAndHaldiSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "wedding" ||
    p.occasion?.toLowerCase() === "wedding" ||
    p.title?.toLowerCase().includes("mehendi") ||
    p.title?.toLowerCase().includes("haldi") ||
    p.description?.toLowerCase().includes("mehendi") ||
    p.description?.toLowerCase().includes("haldi")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="mehendi-and-haldi-sarees" 
        title="Mehendi & Haldi Sarees"
        description="Celebrate the joy and colors of your pre-wedding rituals with our vibrant Mehendi & Haldi sarees. Designed for graceful movement and radiant celebration photography."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

