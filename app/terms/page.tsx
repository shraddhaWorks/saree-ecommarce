import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import TermsAndConditions from "@/components/terms/TermsAndConditions";
import BackButton from "@/components/common/BackButton";

export default function TermsPage() {
    return (

        <>
          <BackButton />
        <StorefrontNavbar />
        <TermsAndConditions/>
        <Footer />
        </>

        );
}
