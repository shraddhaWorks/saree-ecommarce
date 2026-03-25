import AboutUs from "@/components/AboutUS/AboutUs";
import Carousel from "@/components/common/Carousel";
import Footer from "@/components/footer/Footer";
import ShopByOccausion from "@/components/home/shopByOccausion";
import ShopByPrice from "@/components/home/shopByPrice";
import Crafts from "@/components/home/crafts";
import WeddingEdit from "@/components/home/weddingEdit";
import ProductList from "@/components/product/ProductList";

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
      <Footer />
    </main>
  );
}
