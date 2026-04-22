import Blog from "@/components/blog/Blog";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";


export default function BlogPage() {
    return (
        <>
        <StorefrontNavbar />
        <Blog />
        <Footer />
        </>
    );
}