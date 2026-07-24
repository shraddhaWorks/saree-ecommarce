import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import { WishlistView } from "@/components/wishlist/WishlistView";
import BackButton from "@/components/common/BackButton";

export default function WishlistPage() {
  return (
   <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
  <StorefrontNavbar />

  <div className="mx-auto max-w-3xl px-6 pt-24">
    <BackButton />
  </div>

  <div className="mx-auto max-w-3xl px-6 py-8 text-center">
    <h1 className="text-2xl font-semibold">Wishlist</h1>
    <p className="mt-2 text-sm text-black/60">
      Pieces you like are saved here.
    </p>

    <WishlistView />
  </div>

  <Footer />
</main>
  );
}