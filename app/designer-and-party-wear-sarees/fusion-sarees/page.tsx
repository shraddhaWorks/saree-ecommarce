import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function FusionSareesPage() {
  // Filter products relevant to Fusion Sarees
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "fusion" ||
    p.title?.toLowerCase().includes("fusion") ||
    p.description?.toLowerCase().includes("fusion") ||
    p.occasion?.toLowerCase() === "party"
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="fusion-sarees" 
        title="Fusion Sarees"
        description="Experience the best of both worlds with our Fusion Saree collection. A perfect blend of traditional craftsmanship and modern designs, perfect for the contemporary woman."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

