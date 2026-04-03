import Footer from "@/components/footer/Footer";
import { AboutBlock } from "@/components/home/AboutBlock";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ShopByOccasionSection } from "@/components/home/ShopByOccasionSection";
import { ShopByPriceSection } from "@/components/home/ShopByPriceSection";
import { WeddingEditSection } from "@/components/home/WeddingEditSection";
import { SpecialProductsSection } from "@/components/home/SpecialProductsSection";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ProductList from "@/components/product/ProductList";
import { TIMELESS_CRAFTS_HOME_TILES } from "@/lib/timeless-crafts-defaults";
import { WEDDING_EDIT_HOME_TILES } from "@/lib/wedding-edit-defaults";
import { SHOP_BY_OCCASION_HOME_TILES } from "@/lib/shop-by-occasion-defaults";
import { getStorefrontPayload } from "@/lib/storefront-server";

export default async function Home() {
  const data = await getStorefrontPayload();
  const { siteConfig, specialProducts } = data;

  return (
    <main className="min-h-screen bg-[#f7f0e7] pt-0 text-[#201815]">
      <StorefrontNavbar />
      <section className="relative z-0 m-0 w-full bg-transparent p-0 leading-none max-lg:-mt-[14px] max-lg:bg-[#8f171f]">
        <HeroCarousel
          slides={[
            {
              id: "rangam-silk-hero-laptop",
              imageUrl: "/hero/rangam-silk-hero.png",
              altText: "Rangam Silk Sarees — luxury silk sarees",
              linkUrl: "/collections/sarees",
            },
            {
              id: "hero-wedding-edit-laptop",
              imageUrl: "/hero/hero-wedding-edit.png",
              altText: "Wedding edit — bridesmaid grace and wedding weaves",
              linkUrl: "/collections/wedding-sarees",
            },
            {
              id: "hero-ethnics-elegance-laptop",
              imageUrl: "/hero/hero-ethnics-elegance.png",
              altText: "Find elegance in ethnics — shop ethnic wear",
              linkUrl: "/collections/sarees",
            },
            {
              id: "hero-celebration-palace-laptop",
              imageUrl: "/hero/hero-celebration-palace.png",
              altText: "Celebration sarees and festive elegance",
              linkUrl: "/collections/festive-wear",
            },
            {
              id: "hero-garden-pastels-laptop",
              imageUrl: "/hero/hero-garden-pastels.png",
              altText: "Pastel silk sarees — new collection",
              linkUrl: "/collections/traditional-sarees",
            },
          ]}
        />
      </section>

      <WeddingEditSection title={siteConfig.weddingEditTitle} items={WEDDING_EDIT_HOME_TILES} />

      <ProductList />

      <SpecialProductsSection title={siteConfig.specialsTitle} products={specialProducts} />

      <ShopByPriceSection title={siteConfig.shopByPriceTitle} />

      <WeddingEditSection
        title={siteConfig.craftsTitle}
        items={TIMELESS_CRAFTS_HOME_TILES}
        layout="four"
      />

      <ShopByOccasionSection
        title={siteConfig.shopByOccasionTitle}
        items={SHOP_BY_OCCASION_HOME_TILES}
      />

      <AboutBlock title={siteConfig.aboutTitle} />
      <Footer />
    </main>
  );
}
