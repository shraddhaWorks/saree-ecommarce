import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function KanchiPattuSareesPage() {
  // Filter products relevant to Kanchi Pattu
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("kanchi") ||
    p.title?.toLowerCase().includes("kanchi") ||
    p.description?.toLowerCase().includes("kanchi") ||
    p.occasion?.toLowerCase() === "wedding"
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="kanchi-pattu-sarees" 
        title="Kanchi Pattu Sarees"
        description="Experience the timeless elegance and grandeur of authentic Kanchi Pattu sarees. Handwoven with pure silk threads and traditional zari motifs, these masterpieces perfectly capture the essence of South Indian heritage."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

