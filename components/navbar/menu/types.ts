export type MenuKey = "sarees" | "apparel" | "handicrafts";

export type MenuSection = {
    title: string;
    items: string[];
};

export type MenuData = {
    label: string;
    sections: MenuSection[];
    showcase: "sarees" | "apparel" | "handicrafts";
};
