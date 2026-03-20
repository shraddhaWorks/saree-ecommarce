import Footer from "@/components/footer/Footer";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";

type FrontendBlueprintPageProps = {
  showNavbar?: boolean;
};

export function FrontendBlueprintPage({
  showNavbar = true,
}: FrontendBlueprintPageProps) {
  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      {showNavbar ? <StorefrontNavbar /> : null}
      <div className={`mx-auto max-w-[1680px] px-4 pb-16 ${showNavbar ? "pt-[138px] sm:pt-[146px] lg:pt-[154px]" : "pt-8"} lg:px-8`}>
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Sarees",
              copy: "Fabric-first navigation with bridal, woven, printed, and natural dye groupings.",
            },
            {
              title: "Apparel",
              copy: "Clothing, add-ons, craft-based edits, and curated collections in one panel.",
            },
            {
              title: "Handicrafts",
              copy: "A broader gifting and home decor menu with a visual product collage area.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-[#ddcfbd] bg-white/90 p-6 shadow-[0_12px_30px_rgba(44,25,17,0.06)]"
            >
              <h2 className="font-[Georgia,'Times New Roman',serif] text-3xl text-black">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-black/70">{item.copy}</p>
            </article>
          ))}
        </section>
      </div>
      <Footer/>
    </main>
  );
}
