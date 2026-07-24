import Careers from "@/components/career/Careers";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import BackButton from "@/components/common/BackButton";

export default function CareersPage() {
  return (

    <>
      <BackButton />
      <StorefrontNavbar />
      <Careers />
      <Footer />
    </>

    );
}