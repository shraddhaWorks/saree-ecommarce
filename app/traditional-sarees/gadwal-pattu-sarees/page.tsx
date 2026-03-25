import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function GadwalPattuSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("gadwal") ||
    p.title?.toLowerCase().includes("gadwal") ||
    p.description?.toLowerCase().includes("gadwal")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="gadwal-pattu-sarees" 
        title="Gadwal Pattu Sarees"
        description="Embrace the unique charm of Gadwal Pattu, known for its contrasting silk borders perfectly woven alongside lightweight, comfortable draped bodies."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

