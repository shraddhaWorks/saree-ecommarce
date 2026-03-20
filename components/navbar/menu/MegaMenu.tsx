import Link from "next/link";
import { ShowcaseArt } from "./ShowcaseArt";
import type { MenuData } from "./types";

export function MegaMenu({ menu, onItemClick }: { menu: MenuData; onItemClick: () => void }) {
    const columnsClass =
        menu.showcase === "handicrafts"
            ? "grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr_1.8fr]"
            : "grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_1.3fr]";

    return (
        <section className="border-t border-black/8 bg-[#fdfbf7] px-4 pb-8 pt-6 lg:px-10">
            <div className={`mx-auto grid max-w-[1880px] gap-10 ${columnsClass}`}>
                {menu.sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="font-[Georgia,'Times New Roman',serif] text-[22px] uppercase text-black">
                            {section.title}
                        </h3>
                        <ul className="mt-7 space-y-4">
                            {section.items.map((item) => (
                                <li key={item} className="text-[18px] leading-none text-black/90">
                                    <Link href="#" onClick={onItemClick} className="transition hover:text-[#9d2936]">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <ShowcaseArt variant={menu.showcase} />
            </div>
        </section>
    );
}
