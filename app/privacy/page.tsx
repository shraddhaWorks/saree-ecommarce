import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";
import BackButton from "@/components/common/BackButton";

export default function PrivacyPage() {
    return (

        <>
          <BackButton />
        <StorefrontNavbar />
        <PrivacyPolicy />
        <Footer />
        </>

        );
}