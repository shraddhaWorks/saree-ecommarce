import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import ShippingInfo from "@/components/shippings/ShippingInfo";
import BackButton from "@/components/common/BackButton";

export default function ShippingPage() {
    return (

        <>
          <BackButton />
        <StorefrontNavbar />
        <ShippingInfo />
        <Footer />
        </>

        );
}