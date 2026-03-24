import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function PaithaniSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "traditional" ||
    p.fabric?.toLowerCase().includes("paithani") ||
    p.title?.toLowerCase().includes("paithani") ||
    p.description?.toLowerCase().includes("paithani")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="paithani-sarees" 
        title="Paithani Sarees"
        description="Famous for their spectacular peacock motifs and lustrous silk, Paithani sarees are royal drapes that redefine grand festival and bridal wear."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
