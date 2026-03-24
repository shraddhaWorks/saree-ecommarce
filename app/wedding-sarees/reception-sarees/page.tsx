import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function ReceptionSareesPage() {
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "wedding" ||
    p.occasion?.toLowerCase() === "party" ||
    p.title?.toLowerCase().includes("reception") ||
    p.description?.toLowerCase().includes("reception")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="reception-sarees" 
        title="Reception Sarees"
        description="Make a dazzling impression at your post-wedding celebrations with our Reception sarees. Designed with contemporary silhouettes, glamorous glitter, and captivating colors."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
