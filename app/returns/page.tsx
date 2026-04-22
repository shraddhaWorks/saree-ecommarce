import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ReturnPolicy from "@/components/return/ReturnPolicy";

export default function ReturnPage() {
    return (
        <>
        <StorefrontNavbar />
        <ReturnPolicy />
        <Footer />
        </>
    );
}