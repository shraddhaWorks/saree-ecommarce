import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function TissuSareesPage() {
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("tissue") ||
    p.title?.toLowerCase().includes("tissue") ||
    p.description?.toLowerCase().includes("tissue")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="tissu-sarees" 
        title="Tissue Sarees"
        description="Step into ethereal lightness with our pure Tissue sarees. Combining metallic threads with fine weaves, these offer a signature crispness and shimmer that's both modern and understated."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

