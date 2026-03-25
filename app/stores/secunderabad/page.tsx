import Link from "next/link";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import Footer from "@/components/footer/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#201815]">
      <StorefrontNavbar />
      <div className="mx-auto max-w-7xl px-6 py-32">
        <nav className="mb-12">
          <Link href="/stores" className="text-sm font-medium text-[#9d2936] hover:underline">
            ← Back to All Stores
          </Link>
        </nav>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-[Georgia,'Times_New_Roman',serif] text-5xl font-bold md:text-6xl">
              Secunderabad
            </h1>
            <div className="mt-8 space-y-6 text-lg text-black/70">
              <p>
                Our Secunderabad store is a testimony to classic elegance, featuring an extensive array of traditional drapes for every occasion.
              </p>
              <div className="space-y-4 rounded-3xl bg-white p-8 shadow-sm">
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-black">Address:</span> M.G. Road, Secunderabad
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-black">Phone:</span> +91 40 8765 4321
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-black">Hours:</span> 10:30 AM - 8:30 PM
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] bg-[#f3ebe0]">
            <img 
              src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1201" 
              alt="Secunderabad Store"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
