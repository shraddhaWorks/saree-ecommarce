import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function PradanamAndTalambraluSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "wedding" ||
    p.occasion?.toLowerCase() === "wedding" ||
    p.title?.toLowerCase().includes("pradanam") ||
    p.title?.toLowerCase().includes("talambralu") ||
    p.description?.toLowerCase().includes("pradanam") ||
    p.description?.toLowerCase().includes("talambralu")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="pradanam-and-talambralu-sarees" 
        title="Pradanam & Talambralu Sarees"
        description="Honor your sacred vows with our exquisite Pradanam and Talambralu sarees. Distinctive weaves specially selected to carry the spiritual grace of your most important ceremonial moments."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
