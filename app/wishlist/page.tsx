import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Wishlist</h1>
        <p className="mt-2 text-sm text-black/60">Your saved pieces will appear here.</p>
      </div>
      <Footer />
    </main>
  );
}
