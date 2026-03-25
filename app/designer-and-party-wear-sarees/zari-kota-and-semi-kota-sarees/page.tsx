import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default function ZariKotaAndSemiKotaSareesPage() {
  // Filter products relevant to Zari Kota & Semi Kota
  const initialProducts = products.filter(p => 
    p.fabric?.toLowerCase().includes("kota") ||
    p.title?.toLowerCase().includes("kota") ||
    p.description?.toLowerCase().includes("kota")
  );

  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <CollectionPageClient 
        handle="zari-kota-and-semi-kota-sarees" 
        title="Zari Kota & Semi Kota Sarees"
        description="Lightweight and breathable, our Zari Kota and Semi Kota sarees are perfect for all-day comfort without compromising on style. The zari detailing adds a subtle sheen that's perfect for celebrations."
        initialProducts={initialProducts} 
      />
      <Footer />
    </main>
  );
}

