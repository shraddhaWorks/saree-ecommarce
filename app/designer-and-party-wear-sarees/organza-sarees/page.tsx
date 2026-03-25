import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function OrganzaSareesPage() {
  // Filter products relevant to Organza Sarees
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("organza") ||
    p.category?.toLowerCase() === "organza" ||
    p.title?.toLowerCase().includes("organza") ||
    p.description?.toLowerCase().includes("organza")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="organza-sarees" 
        title="Organza Sarees"
        description="Embrace the elegant sheer of our Organza collection. Known for its sophisticated texture and modern prints, these sarees are the epitome of graceful party wear."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
