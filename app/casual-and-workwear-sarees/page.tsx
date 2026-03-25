import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function CasualAndWorkwearSareesPage() {
  // Filter products relevant to Casual & Workwear
  const initialProducts = products.filter(p => 
    p.occasion?.toLowerCase() === "office wear" ||
    p.occasion?.toLowerCase() === "daily wear" ||
    p.occasion?.toLowerCase() === "casual" ||
    p.category?.toLowerCase() === "casual"
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="casual-and-workwear-sarees" 
        title="Casual & Workwear Sarees"
        description="Effortless elegance for every day. Our collection of casual and workwear sarees features lightweight fabrics like linen, soft cotton, and crepe, perfect for the modern professional."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
