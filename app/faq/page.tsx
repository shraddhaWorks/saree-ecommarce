import Faq from "@/components/faq/Faq";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";

export default function FaqPage() {
  return (
    <>
      <StorefrontNavbar />
      <Faq />
      <Footer />
    </>

  );
}