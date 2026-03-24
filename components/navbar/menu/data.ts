import type { MenuData } from "./types";

const toCollectionHref = (label: string) =>
    `/collections/${label
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;

const createItems = (labels: string[]) =>
    labels.map((label) => ({
        label,
        href: toCollectionHref(label),
    }));

export const menuData = {
    traditionalSarees: {
        label: "Traditional Sarees",
        sections: [
            {
                items: createItems([
                    "Kanchi Pattu Sarees",
                    "Banaras Sarees",
                    "Paithani Sarees",
                    "Patola Sarees",
                    "Gadwal Pattu Sarees",
                    "Arani Pattu Sarees",
                    "Venkatagiri Sarees",
                    "Uppada Pattu Sarees",
                    "Mangalagiri Pattu Sarees",
                    "Mysore Silk Sarees",
                ]),
            },
        ],
        showcase: "sarees" as const,
        showcaseItems: [
            {
                title: "Kanchi Pattu Sarees",
                subtitle: "Timeless traditional drapes for festive and bridal moments.",
                href: "/collections/kanchi-pattu-sarees",
                ctaLabel: "Shop Now",
                imageSrc: "https://vaarahisilks.com/cdn/shop/files/1_0000_DSC07696.jpg?v=1764064129",
            },
            {
                title: "Banaras Silk Sarees",
                subtitle: "Rich woven textures with a graceful ceremonial finish.",
                href: "/collections/banaras-sarees",
                ctaLabel: "Shop Now",
                imageSrc: "https://sudathi.com/cdn/shop/files/4469S132_1.jpg?v=1765000744",
            },
        ],
    } satisfies MenuData,
    weddingSarees: {
        label: "Wedding Sarees",
        sections: [
            {
                items: createItems([
                    "Bridal Sarees",
                    "Reception Sarees",
                    "Pradanam & Talambralu Sarees",
                    "Nischayathartham/Engagement Sarees",
                    "Mehendi & Haldi Sarees",
                ]),
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
        label: "Designer & Party Wear Sarees",
        sections: [
            {
                items: createItems([
                    "Organza Sarees",
                    "Zari Kota & Semi Kota Sarees",
                    "Muslin, Dola & Mashru Sarees",
                    "Fusion Sarees",
                ]),
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
        label: "Festive Wear Sarees",
        sections: [
            {
                items: createItems([
                    "Pattu Pavada Set / Half Saree Set / Lehengas",
                    "Chanderi & Bailu Silk Sarees",
                    "Ikkat Sarees",
                    "Bandini Sarees",
                    "Fancy & Designer Sarees",
                    "Soft Pattu",
                ]),
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
        label: "Casual & Workwear Sarees",
        sections: [
            {
                items: createItems([
                    "Georgette, Crepe, Satin & Chiffon Silk Sarees",
                    "Khadi, Jute, Bhagalpur & Printed Sarees",
                    "Tissu Sarees",
                    "Tusser Sarees",
                ]),
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
    { label: "Traditional Sarees", href: toCollectionHref("Traditional Sarees"), menuKey: "traditionalSarees" as const },
    { label: "Wedding Sarees", href: toCollectionHref("Wedding Sarees"), menuKey: "weddingSarees" as const },
    { label: "Designer & Party Wear Sarees", href: toCollectionHref("Designer & Party Wear Sarees"), menuKey: "designerPartyWearSarees" as const },
    { label: "Festive Wear Sarees", href: toCollectionHref("Festive Wear Sarees"), menuKey: "festiveWearSarees" as const },
    { label: "Casual & Workwear Sarees", href: toCollectionHref("Casual & Workwear Sarees"), menuKey: "casualWorkwearSarees" as const },
    { label: "Dhoti & Kanduva", href: toCollectionHref("Dhoti & Kanduva") },
    { label: "Our Stores", href: "/stores" },
];
