import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function GeorgetteCrepeSatinChiffonSareesPage() {
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("georgette") ||
    p.fabric?.toLowerCase().includes("crepe") ||
    p.fabric?.toLowerCase().includes("satin") ||
    p.fabric?.toLowerCase().includes("chiffon") ||
    p.category?.toLowerCase() === "georgette" ||
    p.category?.toLowerCase() === "chiffon" ||
    p.category?.toLowerCase() === "crepe"
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="georgette-crepe-satin-and-chiffon-silk-sarees" 
        title="Georgette, Crepe, Satin & Chiffon Sarees"
        description="Embrace fluid movement with our collection of fine synthetic and silk drapes. Perfectly balanced between comfort and glamour, these sarees are ideal for evening functions and office parties."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
