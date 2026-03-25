import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function MangalagiriPattuSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("mangalagiri") ||
    p.title?.toLowerCase().includes("mangalagiri") ||
    p.description?.toLowerCase().includes("mangalagiri")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="mangalagiri-pattu-sarees" 
        title="Mangalagiri Pattu Sarees"
        description="Experience the delicate softness and signature zari borders of Mangalagiri Pattu, capturing an effortless blend of comfort and time-honored weave traditions."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

