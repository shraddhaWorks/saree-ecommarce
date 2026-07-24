import Faq from "@/components/faq/Faq";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import BackButton from "@/components/common/BackButton";

export default function FaqPage() {
  return (

    <>
      <BackButton />
      <StorefrontNavbar />
      <Faq />
      <Footer />
    </>

    );
}