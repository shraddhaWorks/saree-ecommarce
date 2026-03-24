import Link from "next/link";
import { ShowcaseArt } from "./ShowcaseArt";
import type { MenuData } from "./types";

export function MegaMenu({ menu, onItemClick }: { menu: MenuData; onItemClick: () => void }) {
    const columnsClass =
        menu.showcase === "sarees"
            ? "grid-cols-1 lg:grid-cols-[0.7fr_2.3fr]"
            : menu.showcase === "handicrafts"
            ? "grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr_1.8fr]"
            : "grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.3fr]";
    const isSarees = menu.showcase === "sarees";

    return (
        <section
            className={`border-t px-4 pb-8 pt-6 lg:px-10 ${isSarees
                ? "scrollbar-invisible fixed inset-x-0 top-[96px] z-[55] max-h-[72vh] overflow-y-auto border-[#9f6f77] bg-[linear-gradient(135deg,#4c1320,#6e2030_35%,#5b1826)] px-8 pb-10 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-11"
                : "border-black/8 bg-[#fdfbf7]"
                }`}
        >
            <div className={`grid w-full gap-10 ${columnsClass} ${isSarees ? "content-start lg:gap-14" : ""}`}>
                {menu.sections.map((section) => (
                    <div key={section.title ?? menu.label} className={isSarees ? "pt-2" : ""}>
                        {section.title ? (
                            <h3 className={`font-[Georgia,'Times New Roman',serif] text-[22px] uppercase ${isSarees ? "text-[#f4dfb0]" : "text-black"}`}>
                                {section.title}
                            </h3>
                        ) : null}
                        <ul className={`mt-7 ${isSarees ? "space-y-6" : "space-y-4"}`}>
                            {section.items.map((item) => (
                                <li
                                    key={item.label}
                                    className={`leading-none ${isSarees ? "text-[20px] text-[#e4b95d]" : "text-[18px] text-black/90"}`}
                                >
                                    <Link
                                        href={item.href ?? "#"}
                                        onClick={onItemClick}
                                        className={`transition ${isSarees ? "hover:text-white" : "hover:text-[#9d2936]"}`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <ShowcaseArt menu={menu} />
            </div>
        </section>
    );
}
