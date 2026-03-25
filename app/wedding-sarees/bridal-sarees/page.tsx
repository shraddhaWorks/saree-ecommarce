import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function BridalSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "wedding" ||
    p.occasion?.toLowerCase() === "wedding" ||
    p.title?.toLowerCase().includes("bridal") ||
    p.description?.toLowerCase().includes("bridal")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="bridal-sarees" 
        title="Bridal Sarees"
        description="Step into your new beginning with our magnificent collection of Bridal sarees. Featuring rich silks and elaborate zari work, crafted to make you shine on your most special day."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

