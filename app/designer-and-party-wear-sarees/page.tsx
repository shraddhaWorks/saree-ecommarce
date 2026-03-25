import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function DesignerAndPartyWearSareesPage() {
  // Filter products relevant to Designer & Party Wear
  const initialProducts = products.filter(p => 
    p.category?.toLowerCase() === "designer & party wear" ||
    p.occasion?.toLowerCase() === "party" ||
    p.title?.toLowerCase().includes("designer") ||
    p.description?.toLowerCase().includes("party")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <StorefrontNavbar />
      <CollectionPageClient 
        handle="designer-and-party-wear-sarees" 
        title="Designer & Party Wear Sarees"
        description="Step into the spotlight with our exquisite collection of designer and party wear sarees. From contemporary silhouettes to glamours embellishments, find the perfect drape for every celebration."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}
