export type MenuKey = "sarees" | "apparel" | "handicrafts";

export type MenuItem = {
    label: string;
    href?: string;
};

export type ShowcaseItem = {
    title: string;
    subtitle: string;
    imageSrc?: string;
    href?: string;
    ctaLabel?: string;
};

export type MenuSection = {
    title?: string;
    items: readonly MenuItem[];
};

export type MenuData = {
    label: string;
    sections: readonly MenuSection[];
    showcase: "sarees" | "apparel" | "handicrafts";
    showcaseItems?: readonly ShowcaseItem[];
};
