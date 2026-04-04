import { resolveMenuShowcaseHref } from "./resolve-menu-href";
import { ShowcaseCard } from "./ShowcaseCard";
import type { MenuData } from "./types";

export function ShowcaseArt({
    menu,
    onItemClick,
}: {
    menu: MenuData;
    onItemClick?: () => void;
}) {
    const { showcase, showcaseItems } = menu;

    if (showcase === "sarees" && showcaseItems?.length) {
        return (
            <div className="grid gap-7 self-start lg:grid-cols-2">
                {showcaseItems.map((item) => (
                    <ShowcaseCard
                        key={item.title}
                        title={item.title}
                        subtitle={item.subtitle}
                        href={resolveMenuShowcaseHref(menu, item)}
                        ctaLabel={item.ctaLabel}
                        imageSrc={item.imageSrc}
                        onNavigate={onItemClick}
                        className="min-h-[420px] lg:min-h-[560px]"
                    />
                ))}
            </div>
        );
    }

    if (showcase === "apparel") {
        return (
            <ShowcaseCard
                title="Prints"
                subtitle="Modern silhouettes in heritage patterns"
                className="min-h-[300px] bg-[linear-gradient(135deg,#b7803c,#efd39b_45%,#8a5a31)]"
            />
        );
    }

    return (
        <div className="rounded-[30px] border border-[#dccfbe] bg-white px-6 py-7">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
                {["Frame", "Krishna", "Ganesha", "Nataraja", "Lakshmi"].map((item, index) => (
                    <div
                        key={item}
                        className={`flex min-h-[168px] items-end justify-center rounded-[22px] p-4 text-center font-[Georgia,'Times New Roman',serif] text-sm text-[#704d21] ${index % 2 === 0
                                ? "bg-[linear-gradient(180deg,#fbf4e7,#dcc39a)]"
                                : "bg-[linear-gradient(180deg,#f7ecd6,#cdb078)]"
                            }`}
                    >
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
