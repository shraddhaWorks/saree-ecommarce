import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function AraniPattuSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("arani") ||
    p.title?.toLowerCase().includes("arani") ||
    p.description?.toLowerCase().includes("arani")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="arani-pattu-sarees" 
        title="Arani Pattu Sarees"
        description="Explore the rich heritage of Arani Pattu sarees, featuring intricate motifs and a brilliant sheen that embody true traditional elegance."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
