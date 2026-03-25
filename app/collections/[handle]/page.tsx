import Footer from "@/components/footer/Footer";
import { CollectionPageClient } from "@/components/product/CollectionPageClient";
import { products } from "@/lib/dummyData";

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const handle = resolvedParams?.handle?.toLowerCase() || "";
  
  // Categorize dynamically based on collection handle
  let initialProducts = products;
  
  if (handle.includes("haldi") || handle.includes("wedding") || handle.includes("reception")) {
      initialProducts = products.filter(p => ["Wedding", "Festive", "Party"].includes(p.occasion || ""));
  } else if (handle.includes("bridesmaid") || handle.includes("sangeet")) {
      initialProducts = products.filter(p => ["Festive", "Party"].includes(p.occasion || ""));
  } else if (handle.includes("silk") || handle.includes("zari") || handle.includes("heritage")) {
      initialProducts = products.filter(p => ["Silk", "Banarasi Silk", "Paithani Silk", "Pure Silk"].includes(p.fabric || "") || p.category === "Silk");
  } else {
      const match = products.filter(p => 
          p.occasion?.toLowerCase() === handle || 
          p.brand?.toLowerCase() === handle || 
          p.fabric?.toLowerCase() === handle ||
          p.category?.toLowerCase() === handle
      );
      if (match.length > 0) initialProducts = match;
  }
  
  // Fallback to all just in case
  if (initialProducts.length === 0) initialProducts = products;

  return (
    <main className="min-h-screen bg-white">
      <CollectionPageClient handle={resolvedParams.handle} initialProducts={initialProducts} />
      <Footer />
    </main>
  );
}
