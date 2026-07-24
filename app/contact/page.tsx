// import { TemplatePlaceholder } from "@/components/planning/template-placeholder";
// import { contactPageTemplate } from "@/features/storefront/blueprint-data";

// export default function ContactPage() {
// return <TemplatePlaceholder template={contactPageTemplate} />;
// }
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
import BackButton from "@/components/common/BackButton";

export default function ContactPage() {
  return (

    <>
      <BackButton />
      <StorefrontNavbar />
      <Contact />
      <Footer />
    </>

    );
}