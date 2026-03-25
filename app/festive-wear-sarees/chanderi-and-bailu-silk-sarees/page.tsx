import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function ChanderiAndBailuSilkSareesPage() {
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("chanderi") ||
    p.fabric?.toLowerCase().includes("bailu") ||
    p.title?.toLowerCase().includes("chanderi") ||
    p.description?.toLowerCase().includes("chanderi")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="chanderi-and-bailu-silk-sarees" 
        title="Chanderi & Bailu Silk Sarees"
        description="Experience the delicate weave of Chanderi and the soft grace of Bailu silk. These lightweight masterpieces feature shimmery textures and traditional motifs, ideal for elegant celebrations."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
