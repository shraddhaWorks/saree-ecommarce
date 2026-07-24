import Blog from "@/components/blog/Blog";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import BackButton from "@/components/common/BackButton";


export default function BlogPage() {
    return (

        <>
          <BackButton />
        <StorefrontNavbar />
        <Blog />
        <Footer />
        </>

        );
}