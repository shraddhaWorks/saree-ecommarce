import Link from "next/link";
import Footer from "@/components/footer/Footer";

const stores = [
  {
    name: "Hyderabad Banjara Hills",
    address: "Road No. 10, Banjara Hills, Hyderabad, Telangana",
    phone: "+91 40 1234 5678",
    slug: "hyderabad-banjara-hills",
    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800&h=600"
  },
  {
    name: "Secunderabad",
    address: "M.G. Road, Secunderabad, Telangana",
    phone: "+91 40 8765 4321",
    slug: "secunderabad",
    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=801&h=601"
  },
  {
    name: "Vijayawada",
    address: "M.G. Road, Vijayawada, Andhra Pradesh",
    phone: "+91 866 123 4567",
    slug: "vijayawada",
    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=802&h=602"
  },
  {
    name: "Visakhapatnam",
    address: "Dwaraka Nagar, Visakhapatnam, Andhra Pradesh",
    phone: "+91 891 123 4567",
    slug: "visakhapatnam",
    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=803&h=603"
  }
];

export default function StoresPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#201815]">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-[#822733] pt-24 lg:h-[500px]">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-5xl font-bold text-white md:text-7xl">
            Our Stores
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-white/90 md:text-2xl">
            Experience the heritage and elegance of our collections in person at our boutiques across India.
          </p>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2">
          {stores.map((store) => (
            <div
              id={store.slug}
              key={store.slug}
              className="group scroll-mt-28 overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(44,25,17,0.05)] transition-all hover:shadow-[0_30px_80px_rgba(44,25,17,0.1)]"
            >
              <div className="relative h-72 overflow-hidden bg-[#f3ebe0]">
                <img 
                  src={store.image} 
                  alt={store.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="font-[Georgia,'Times_New_Roman',serif] text-3xl font-semibold">
                    {store.name}
                  </h2>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4 text-black/70">
                  <p className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 shrink-0 text-[#9d2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {store.address}
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#9d2936]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    {store.phone}
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <Link 
                    href={`/stores/${store.slug}`}
                    className="flex-1 rounded-full bg-[#822733] px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#9d2936]"
                  >
                    View Details
                  </Link>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 transition-all hover:border-[#9d2936] hover:text-[#9d2936]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

