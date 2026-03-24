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
    <div className="relative h-[420px] w-full overflow-hidden bg-[#8f171f] sm:h-[520px] lg:h-[700px]" key="1">
      <img
        src="https://kalanjali.com/cdn/shop/files/5_1.png?v=1772695660&width=2000"
        alt="Saree shopping 1"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25" />
    </div>,
    <div className="relative h-[420px] w-full overflow-hidden bg-[#8f171f] sm:h-[520px] lg:h-[700px]" key="2">
      <img
        src="https://kalanjali.com/cdn/shop/files/5_1.png?v=1772695660&width=2000"
        alt="Saree shopping 2"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25" />
    </div>,
    <div className="relative h-[420px] w-full overflow-hidden bg-[#8f171f] sm:h-[520px] lg:h-[700px]" key="3">
      <img
        src="https://kalanjali.com/cdn/shop/files/5_1.png?v=1772695660&width=2000"
        alt="Saree shopping 3"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/25" />
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
