import Footer from "@/components/footer/Footer";
import { AboutBlock } from "@/components/home/AboutBlock";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomePromoGrid } from "@/components/home/HomePromoGrid";
import { SpecialProductsSection } from "@/components/home/SpecialProductsSection";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ProductList from "@/components/product/ProductList";
import type { HomeGridItem } from "@/lib/generated/prisma/client";
import { getStorefrontPayload } from "@/lib/storefront-server";

function mapPromo(items: HomeGridItem[]) {
  return items.map((i) => ({
    id: i.id,
    title: i.title,
    imageUrl: i.imageUrl,
    linkUrl: i.linkUrl,
  }));
}

export default async function Home() {
  const data = await getStorefrontPayload();
  const { siteConfig, heroSlides, gridItems, specialProducts } = data;

  const wedding = mapPromo(gridItems.filter((i) => i.section === "WEDDING_EDIT"));
  const byPrice = mapPromo(gridItems.filter((i) => i.section === "SHOP_BY_PRICE"));
  const crafts = mapPromo(gridItems.filter((i) => i.section === "CRAFTS"));
  const occasions = mapPromo(gridItems.filter((i) => i.section === "SHOP_BY_OCCASION"));

  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />

      <section className="w-full">
        <HeroCarousel
          slides={heroSlides.map((s) => ({
            id: s.id,
            imageUrl: s.imageUrl,
            altText: s.altText ?? null,
            linkUrl: s.linkUrl ?? null,
          }))}
        />
      </section>

      <HomePromoGrid
        title={siteConfig.weddingEditTitle}
        items={wedding}
        columnsClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      />

      <ProductList />

      <SpecialProductsSection title={siteConfig.specialsTitle} products={specialProducts} />

      <HomePromoGrid
        title={siteConfig.shopByPriceTitle}
        items={byPrice}
        columnsClass="grid-cols-2 md:grid-cols-4"
      />

      <HomePromoGrid
        title={siteConfig.craftsTitle}
        items={crafts}
        columnsClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      />

      <HomePromoGrid
        title={siteConfig.shopByOccasionTitle}
        items={occasions}
        columnsClass="grid-cols-1 md:grid-cols-2"
        tall
      />

      <AboutBlock
        title={siteConfig.aboutTitle}
        body={siteConfig.aboutBody}
        imageUrl={siteConfig.aboutImageUrl}
      />
      <Footer />
    </main>
  );
}
