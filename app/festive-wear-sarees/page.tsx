import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function FestiveWearSareesPage() {
  // Filter products relevant to Festive Wear
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "festive" ||
    p.occasion?.toLowerCase() === "festive" ||
    p.title?.toLowerCase().includes("festive") ||
    p.description?.toLowerCase().includes("festive")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="festive-wear-sarees" 
        title="Festive Wear Sarees"
        description="Celebrate the vibrant essence of our culture with our festive wear collection. From intricate Zari work to bold traditional prints, these sarees are meticulously crafted to make your special moments unforgettable."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

