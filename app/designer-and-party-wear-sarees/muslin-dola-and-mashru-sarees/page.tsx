import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function MuslinDolaAndMashruSareesPage() {
  // Filter products relevant to Muslin, Dola & Mashru
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("muslin") ||
    p.fabric?.toLowerCase().includes("dola") ||
    p.fabric?.toLowerCase().includes("mashru") ||
    p.title?.toLowerCase().includes("muslin") ||
    p.description?.toLowerCase().includes("muslin")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="muslin-dola-and-mashru-sarees" 
        title="Muslin, Dola & Mashru Sarees"
        description="Indulge in the luxury of pure fabrics with our exquisite Muslin, Dola & Mashru saree collection. These fabrics are known for their soft texture, light weight, and elegant drapes."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

