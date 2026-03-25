import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function UppadaPattuSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("uppada") ||
    p.title?.toLowerCase().includes("uppada") ||
    p.description?.toLowerCase().includes("uppada")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="uppada-pattu-sarees" 
        title="Uppada Pattu Sarees"
        description="Woven using the intricate Jamdani technique, Uppada Pattu sarees deliver feather-light luxury combined with magnificent zari craftsmanship."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

