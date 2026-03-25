import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function IkkatSareesPage() {
  const initialProducts = products.filter(p => 
    p.title?.toLowerCase().includes("ikkat") ||
    p.description?.toLowerCase().includes("ikkat") ||
    p.fabric?.toLowerCase().includes("ikkat")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="ikkat-sarees" 
        title="Ikkat Sarees"
        description="Celebrate the bold geometric patterns of Ikkat. Our collection features meticulously dyed silk and cotton yarns that create the signature fuzzy-edge designs of this legendary craft."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

