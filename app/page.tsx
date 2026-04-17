import Footer from "@/components/footer/Footer";
import type { PromoItem } from "@/components/home/HomePromoGrid";
import { AboutBlock } from "@/components/home/AboutBlock";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ShopByOccasionSection } from "@/components/home/ShopByOccasionSection";
import { ShopByPriceSection } from "@/components/home/ShopByPriceSection";
import { SpecialProductsSection } from "@/components/home/SpecialProductsSection";
import { WeddingEditSection } from "@/components/home/WeddingEditSection";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ProductList from "@/components/product/ProductList";
import type { HomeGridItem } from "@/lib/generated/prisma/client";
import { getFilteredSpecialProducts, getStorefrontPayload } from "@/lib/storefront-server";
import { WEDDING_EDIT_HOME_TILES } from "@/lib/wedding-edit-defaults";
import { HOME_BEST_OF_SALE_LIMIT } from "@/lib/storefront-constants";
import { SHOP_BY_OCCASION_HOME_TILES } from "@/lib/shop-by-occasion-defaults";
import { TIMELESS_CRAFTS_HOME_TILES } from "@/lib/timeless-crafts-defaults";

function mapGridSection(
  gridItems: HomeGridItem[],
  section: HomeGridItem["section"],
): PromoItem[] {
  return gridItems
    .filter((item) => item.section === section)
    .map((item) => ({
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      linkUrl: item.linkUrl,
    }));
}

type SearchParams = Record<string, string | string[] | undefined>;

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const raw = searchParams ? await searchParams : {};
  const [data, specialProducts] = await Promise.all([
    getStorefrontPayload(),
    getFilteredSpecialProducts(raw),
  ]);
  const { siteConfig, heroSlides, gridItems } = data;

  const weddingEditItems = mapGridSection(gridItems, "WEDDING_EDIT");
  const shopByPriceItems = mapGridSection(gridItems, "SHOP_BY_PRICE");
  const craftsItems = mapGridSection(gridItems, "CRAFTS");
  const shopByOccasionItems = mapGridSection(gridItems, "SHOP_BY_OCCASION");

  return (
    <main className="min-h-screen bg-[#f7f0e7] pt-0 text-[#201815]">
      <StorefrontNavbar />
      <section className="relative z-0 m-0 w-full overflow-hidden bg-[#8f171f] py-0 leading-none">
        <HeroCarousel
          slides={[
            {
              id: "rangam-silk-hero-laptop",
              imageUrl: "/newhome/1.png",
              altText: "Rangam Silk Sarees — luxury silk sarees",
              linkUrl: "/collections/sarees",
            },
            {
              id: "hero-wedding-edit-laptop",
              imageUrl: "/newhome/2.png",
              altText: "Wedding edit — bridesmaid grace and wedding weaves",
              linkUrl: "/collections/wedding-sarees",
            },
            {
              id: "hero-ethnics-elegance-laptop",
              imageUrl:"/newhome/3.png",
              altText: "Find elegance in ethnics — shop ethnic wear",
              linkUrl: "/collections/sarees",
            },
            {
              id: "hero-celebration-palace-laptop",
              imageUrl: "/newhome/4.png",
              altText: "Celebration sarees and festive elegance",
              linkUrl: "/collections/festive-wear",
            },
          ]}
        />
      </section>

      <WeddingEditSection title={siteConfig.weddingEditTitle} items={WEDDING_EDIT_HOME_TILES} />

      <ProductList maxProducts={HOME_BEST_OF_SALE_LIMIT} />

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
