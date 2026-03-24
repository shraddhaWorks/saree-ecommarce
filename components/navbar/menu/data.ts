import { staticNavCategories } from "@/lib/static-nav-data";
import type { MenuData } from "./types";

export const menuData = {
    traditionalSarees: {
        label: staticNavCategories.traditionalSarees.title,
        sections: [
            {
                items: staticNavCategories.traditionalSarees.items,
            },
        ],
        showcase: "sarees" as const,
        showcaseItems: [
            {
                title: "Kanchi Pattu Sarees",
                subtitle: "Timeless traditional drapes for festive and bridal moments.",
                ctaLabel: "Shop Now",
                imageSrc: "https://vaarahisilks.com/cdn/shop/files/1_0000_DSC07696.jpg?v=1764064129",
            },
            {
                title: "Banaras Silk Sarees",
                subtitle: "Rich woven textures with a graceful ceremonial finish.",
                ctaLabel: "Shop Now",
                imageSrc: "https://sudathi.com/cdn/shop/files/4469S132_1.jpg?v=1765000744",
            },
        ],
    } satisfies MenuData,
    weddingSarees: {
        label: staticNavCategories.weddingSarees.title,
        sections: [
            {
                items: staticNavCategories.weddingSarees.items,
            },
        ],
        showcase: "sarees" as const,
        showcaseItems: [
            {
                title: "Bridal Sarees",
                subtitle: "Statement wedding drapes with rich zari and regal color stories.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-maroon-saree-p-18930346.jpg?v=1749200703&width=1200",
            },
            {
                title: "Mehendi & Haldi Sarees",
                subtitle: "Bright celebratory weaves for pre-wedding rituals and joyful moments.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-purple-saree-p-18930348.jpg?v=1749200704&width=1200",
            },
        ],
    } satisfies MenuData,
    designerPartyWearSarees: {
        label: staticNavCategories.designerPartyWearSarees.title,
        sections: [
            {
                items: staticNavCategories.designerPartyWearSarees.items,
            },
        ],
        showcase: "sarees" as const,
        showcaseItems: [
            {
                title: "Zari Kota Sarees",
                subtitle: "Airy drapes finished with luminous borders and party-ready shine.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/1212588868-HY_1.jpg?v=1773820906&width=1200",
            },
            {
                title: "Raw Mango Sarees",
                subtitle: "Modern statement sarees with rich textures and elevated occasion styling.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/1212588856-HY_1.jpg?v=1773820901&width=1200",
            },
        ],
    } satisfies MenuData,
    festiveWearSarees: {
        label: staticNavCategories.festiveWearSarees.title,
        sections: [
            {
                items: staticNavCategories.festiveWearSarees.items,
            },
        ],
        showcase: "sarees" as const,
        showcaseItems: [
            {
                title: "Ikkat Sarees",
                subtitle: "Celebration-ready silhouettes with handcrafted pattern play and color depth.",
                ctaLabel: "Shop Now",
                imageSrc: "https://sudathi.com/cdn/shop/files/4469S132_1.jpg?v=1765000744",
            },
            {
                title: "Bandini Sarees",
                subtitle: "Festive drapes with vibrant detailing for family functions and puja days.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/1212588861-HY_1.jpg?v=1773820899&width=1200",
            },
        ],
    } satisfies MenuData,
    casualWorkwearSarees: {
        label: staticNavCategories.casualWorkwearSarees.title,
        sections: [
            {
                items: staticNavCategories.casualWorkwearSarees.items,
            },
        ],
        showcase: "sarees" as const,
        showcaseItems: [
            {
                title: "Linen Sarees",
                subtitle: "Easy drape essentials with soft structure for polished everyday wear.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/chanderi-silk-cotton-teal-green-saree-p-18930350.jpg?v=1749200705&width=1200",
            },
            {
                title: "Tissu Sarees",
                subtitle: "Lightweight work-to-evening sarees with graceful sheen and fluid movement.",
                ctaLabel: "Shop Now",
                imageSrc: "https://kalanjali.com/cdn/shop/files/1212588858-HY_1.jpg?v=1773820900&width=1200",
            },
        ],
    } satisfies MenuData,
} as const;

export type MenuEntryKey = keyof typeof menuData;

export const suggestedSearches = [
    "Kanjivaram Sarees",
    "Bridal Banarasi",
    "Handcrafted Dupattas",
    "Brass Home Decor",
];

export const primaryLinks = [
    { label: staticNavCategories.traditionalSarees.title, href: staticNavCategories.traditionalSarees.href, menuKey: "traditionalSarees" as const },
    { label: staticNavCategories.weddingSarees.title, href: staticNavCategories.weddingSarees.href, menuKey: "weddingSarees" as const },
    { label: staticNavCategories.designerPartyWearSarees.title, href: staticNavCategories.designerPartyWearSarees.href, menuKey: "designerPartyWearSarees" as const },
    { label: staticNavCategories.festiveWearSarees.title, href: staticNavCategories.festiveWearSarees.href, menuKey: "festiveWearSarees" as const },
    { label: staticNavCategories.casualWorkwearSarees.title, href: staticNavCategories.casualWorkwearSarees.href, menuKey: "casualWorkwearSarees" as const },
    { label: staticNavCategories.dhotiAndKanduva.title, href: staticNavCategories.dhotiAndKanduva.href },
    { label: staticNavCategories.stores.title, href: staticNavCategories.stores.href },
];
