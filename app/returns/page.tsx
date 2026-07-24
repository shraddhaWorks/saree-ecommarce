import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ReturnPolicy from "@/components/return/ReturnPolicy";
import BackButton from "@/components/common/BackButton";

export default function ReturnPage() {
    return (

        <>
          <BackButton />
        <StorefrontNavbar />
        <ReturnPolicy />
        <Footer />
        </>

        );
}