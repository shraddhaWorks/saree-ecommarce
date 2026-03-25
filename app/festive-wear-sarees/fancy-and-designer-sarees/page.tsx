import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function FancyAndDesignerSareesPage() {
  const initialProducts = products.filter(p => 
    p.title?.toLowerCase().includes("designer") ||
    p.description?.toLowerCase().includes("fancy") ||
    p.category?.toLowerCase() === "designer & party wear" ||
    p.occasion?.toLowerCase() === "party"
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="fancy-and-designer-sarees" 
        title="Fancy & Designer Sarees"
        description="Elevate your style with our contemporary fancy and designer sarees. With trendy silhouettes and glamourous detailing, these are perfect for those who want to blend modern fashion with heritage."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
