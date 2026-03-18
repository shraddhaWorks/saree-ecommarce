import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";

export function FrontendBlueprintPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e7] text-[#201815]">
      <StorefrontNavbar />
      <div className="mx-auto max-w-[1880px] px-4 pb-20 pt-[180px] lg:px-10 lg:pt-[196px]">
        <section className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
          <article className="overflow-hidden rounded-[34px] border border-[#ddcfbd] bg-[linear-gradient(135deg,#5f1f2b,#a24a43_40%,#e2bf8d)] p-8 text-white shadow-[0_18px_50px_rgba(44,25,17,0.12)] sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">
              New Season Edit
            </p>
            <h1 className="mt-5 max-w-2xl font-[Georgia,'Times New Roman',serif] text-4xl leading-tight sm:text-6xl">
              Premium ethnic fashion with a cleaner luxury storefront feel.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              The header now stays fixed, the collection menus open on click, and
              the right-side search and bag panels follow the same polished visual
              language as your references.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#8f2333]">
                Shop Sarees
              </button>
              <button className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Explore Apparel
              </button>
            </div>
          </article>

          <article className="rounded-[34px] border border-[#ddcfbd] bg-[linear-gradient(160deg,#fffdfa,#f4e9da)] p-8 shadow-[0_18px_50px_rgba(44,25,17,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#8f2333]">
              Storefront Notes
            </p>
            <div className="mt-6 space-y-5 text-[17px] leading-7 text-black/75">
              <p>Click `Sarees`, `Apparel`, or `Handicrafts` to open the full-width mega menu.</p>
              <p>Click the search icon or bag icon to open the panel from the right side.</p>
              <p>Click the profile icon to open the customer login view styled like your sample.</p>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
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
    </main>
  );
}
