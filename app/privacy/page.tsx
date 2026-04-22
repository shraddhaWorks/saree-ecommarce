import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";

export default function PrivacyPage() {
    return (
        <>
        <StorefrontNavbar />
        <PrivacyPolicy />
        <Footer />
        </>
    );
}