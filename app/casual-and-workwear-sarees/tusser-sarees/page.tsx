import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function TusserSareesPage() {
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("tusser") ||
    p.fabric?.toLowerCase().includes("tussar") ||
    p.title?.toLowerCase().includes("tussar") ||
    p.description?.toLowerCase().includes("tussar")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="tusser-sarees" 
        title="Tussar Sarees"
        description="Known as wild silk, our Tussar collection highlights the beauty of natural golden sheen and earthy textures. A sophisticated choice for power dressing or low-key festive gatherings."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
