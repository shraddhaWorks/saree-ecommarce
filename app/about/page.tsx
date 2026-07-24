import { AboutRangamArticle } from "@/components/about/AboutRangamArticle";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import BackButton from "@/components/common/BackButton";

export default function AboutPage() {
  return (

    <main className="min-h-screen bg-white text-[#201815]">
      <BackButton />
      <StorefrontNavbar />
      <AboutRangamArticle />
      <Footer />
    </main>

    );
}
