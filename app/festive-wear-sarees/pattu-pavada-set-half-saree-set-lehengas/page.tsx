import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function PattuPavadaPage() {
  // Filtering for sets and lehengas from the dummy data
  const initialProducts = products.filter(p => 
    p.title?.toLowerCase().includes("lehenga") ||
    p.title?.toLowerCase().includes("pattu pavada") ||
    p.description?.toLowerCase().includes("half saree")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="pattu-pavada-set-half-saree-set-lehengas" 
        title="Pattu Pavada & Half Saree Sets"
        description="Experience the traditional grandeur of our Half Sarees and Pattu Pavadas. Perfect for younger generations, these ethnic sets bring pure silk patterns into modern festive drapes."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

