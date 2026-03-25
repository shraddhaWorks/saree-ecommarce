import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function KhadiJuteBhagalpurPrintedSareesPage() {
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("khadi") ||
    p.fabric?.toLowerCase().includes("jute") ||
    p.fabric?.toLowerCase().includes("bhagalpur") ||
    p.title?.toLowerCase().includes("printed") ||
    p.description?.toLowerCase().includes("printed")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="khadi-jute-bhagalpur-and-printed-sarees" 
        title="Khadi, Jute, Bhagalpur & Printed Sarees"
        description="Celebrate earthy textures and artisan prints. From the rugged charm of jute and khadi to the artistic appeal of Bhagalpur silk, these sarees offer a grounded yet sophisticated professional look."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
