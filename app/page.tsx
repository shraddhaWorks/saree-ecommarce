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
      <section className="relative z-0 m-0 w-full bg-transparent p-0 leading-none max-lg:-mt-[14px] max-lg:bg-[#8f171f]">
        <HeroCarousel
          slides={heroSlides.map((slide) => ({
            id: slide.id,
            imageUrl: slide.imageUrl,
            altText: slide.altText,
            linkUrl: slide.linkUrl,
          }))}
        />
      </section>

      <WeddingEditSection title={siteConfig.weddingEditTitle} items={weddingEditItems} />

      <ProductList rawSearchParams={raw} />

      <SpecialProductsSection title={siteConfig.specialsTitle} products={specialProducts} />

      <ShopByPriceSection title={siteConfig.shopByPriceTitle} items={shopByPriceItems} />

      <WeddingEditSection title={siteConfig.craftsTitle} items={craftsItems} layout="four" />

      <ShopByOccasionSection title={siteConfig.shopByOccasionTitle} items={shopByOccasionItems} />

      <AboutBlock title={siteConfig.aboutTitle} />
      <Footer />
    </main>
  );
}
