import Footer from "@/components/footer/Footer";
<<<<<<< HEAD
import ShopByOccausion from "@/components/home/shopByOccausion";
import ShopByPrice from "@/components/home/shopByPrice";
import Crafts from "@/components/home/crafts";
import WeddingEdit from "@/components/home/weddingEdit";
=======
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomePromoGrid } from "@/components/home/HomePromoGrid";
import { AboutBlock } from "@/components/home/AboutBlock";
import { SpecialProductsSection } from "@/components/home/SpecialProductsSection";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
>>>>>>> cb8727c (backend)
import ProductList from "@/components/product/ProductList";
import { getStorefrontPayload } from "@/lib/storefront-server";
import type { HomeGridItem } from "@/lib/generated/prisma/client";

<<<<<<< HEAD
export default function Home() {
  const slides = [
    <div className="relative h-[85vh] w-full overflow-hidden bg-[#8f171f] lg:h-[800px]" key="1">
      <img
        src="https://vaarahisilks.com/cdn/shop/files/Home_Banner_A_1920_x_960_FHD.webp?v=1751616713&width=1920"
        alt="Heritage Saree Collection"
        className="h-full w-full object-cover object-center brightness-75 transition-transform duration-1000 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6 text-center pointer-events-none">
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white px-2">
          We Brought <span className="text-[#f15a24]">Heritage</span> to <span className="text-[#f15a24]">India</span> For You
        </h1>
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center border-t border-white/30 pt-8">
          <p className="max-w-2xl text-lg font-medium text-white/95 md:text-2xl">
            Exquisite Handcrafted Silks | Royal Bridal Weaves | Authentic Traditions
          </p>
          <button className="mt-10 flex items-center gap-3 rounded-full bg-[#f15a24] px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#d94e1f] pointer-events-auto">
            Shop Modern Traditions
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>,
    <div className="relative h-[85vh] w-full overflow-hidden bg-[#8f171f] lg:h-[800px]" key="1">
      <img
        src="https://mangaldeep.co.in/cdn/shop/files/15_1522af92-3394-4853-81b8-68a82ca26374.jpg?v=1758882241"
        alt="Heritage Saree Collection"
        className="h-full w-full object-cover object-center brightness-75 transition-transform duration-1000 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6 text-center pointer-events-none">
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white px-2">
          We Brought <span className="text-[#f15a24]">Heritage</span> to <span className="text-[#f15a24]">India</span> For You
        </h1>
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center border-t border-white/30 pt-8">
          <p className="max-w-2xl text-lg font-medium text-white/95 md:text-2xl">
            Exquisite Handcrafted Silks | Royal Bridal Weaves | Authentic Traditions
          </p>
          <button className="mt-10 flex items-center gap-3 rounded-full bg-[#f15a24] px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#d94e1f] pointer-events-auto">
            Shop Modern Traditions
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>,
    <div className="relative h-[85vh] w-full overflow-hidden bg-[#8f171f] lg:h-[800px]" key="2">
      <img
        src="https://vaarahisilks.com/cdn/shop/files/1_0000_DSC07696.jpg?v=1764064129"
        alt="Bridal Silk Collection"
        className="h-full w-full object-cover object-center brightness-75 transition-transform duration-1000 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-6 text-center">
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white px-2">
          The <span className="text-[#f15a24]">Wedding</span> Edit For <span className="text-[#f15a24]">India</span> For You
        </h1>
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center border-t border-white/30 pt-8">
          <p className="max-w-2xl text-lg font-medium text-white/95 md:text-2xl">
            Kanchipuram Pattu | Banaras Brocades | Pure Silk Masterpieces
          </p>
          <button className="mt-10 flex items-center gap-3 rounded-full bg-[#f15a24] px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#d94e1f] pointer-events-auto">
            Discover Bridal Edit
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>,
    <div className="relative h-[85vh] w-full overflow-hidden bg-[#8f171f] lg:h-[800px]" key="2">
      <img
        src="http://vaarahisilks.com/cdn/shop/files/Home_Banner_C_1920_x_960_FHD.webp?v=1751617039&width=1920"
        alt="Bridal Silk Collection"
        className="h-full w-full object-cover object-center brightness-75 transition-transform duration-1000 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-6 text-center">
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white px-2">
          The <span className="text-[#f15a24]">Wedding</span> Edit For <span className="text-[#f15a24]">India</span> For You
        </h1>
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center border-t border-white/30 pt-8">
          <p className="max-w-2xl text-lg font-medium text-white/95 md:text-2xl">
            Kanchipuram Pattu | Banaras Brocades | Pure Silk Masterpieces
          </p>
          <button className="mt-10 flex items-center gap-3 rounded-full bg-[#f15a24] px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#d94e1f] pointer-events-auto">
            Discover Bridal Edit
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>,
    <div className="relative h-[85vh] w-full overflow-hidden bg-[#8f171f] lg:h-[800px]" key="2">
      <img
        src="https://vaarahisilks.com/cdn/shop/files/Home_Banner_B_1920_x_960_FHD_b53ad3e8-985f-42c3-977a-bb9646d8ce91.webp?v=1751616942&width=1512
"
        alt="Bridal Silk Collection"
        className="h-full w-full object-cover object-center brightness-75 transition-transform duration-1000 hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-6 text-center">
        <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white px-2">
          The <span className="text-[#f15a24]">Wedding</span> Edit For <span className="text-[#f15a24]">India</span> For You
        </h1>
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center border-t border-white/30 pt-8">
          <p className="max-w-2xl text-lg font-medium text-white/95 md:text-2xl">
            Kanchipuram Pattu | Banaras Brocades | Pure Silk Masterpieces
          </p>
          <button className="mt-10 flex items-center gap-3 rounded-full bg-[#f15a24] px-10 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-[#d94e1f] pointer-events-auto">
            Discover Bridal Edit
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>,
  ];
  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <section className="w-full">
        <Carousel slides={slides} className="w-full" />
      </section>
      <WeddingEdit />
      <ProductList />
      <ShopByPrice />
      <Crafts />
      <ShopByOccausion />
      <AboutUs />
=======
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
      <section className="w-full pt-[138px] sm:pt-[146px] lg:pt-[154px]">
        <HeroCarousel slides={heroSlides} />
      </section>

      <HomePromoGrid
        title={siteConfig.weddingEditTitle}
        items={wedding}
        columnsClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      />

      <ProductList />

      <SpecialProductsSection
        title={siteConfig.specialsTitle}
        products={specialProducts}
      />

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

>>>>>>> cb8727c (backend)
      <Footer />
    </main>
  );
}
