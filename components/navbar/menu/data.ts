import type { MenuKey, MenuData } from "./types";

export const menuData: Record<MenuKey, MenuData> = {
    sarees: {
        label: "Sarees",
        sections: [
            {
                title: "Fabric",
                items: [
                    "Chiffon Sarees",
                    "Cotton Sarees",
                    "Crepe Sarees",
                    "Georgette Sarees",
                    "Linen Sarees",
                    "Sico Sarees",
                    "Silk Sarees",
                    "Tussar Sarees",
                ],
            },
            {
                title: "Party And Bridal",
                items: [
                    "Banarasi Sarees",
                    "Bandhani Sarees",
                    "Baluchari Sarees",
                    "Chanderi Sarees",
                    "Fancy Sarees",
                    "Gadwal Sarees",
                    "Kanchipattu Sarees",
                    "Kota Sarees",
                    "Kuppadam Sarees",
                    "Mangalagiri Sarees",
                    "Narayanpet Sarees",
                    "Paithani Sarees",
                    "Pochampally Sarees",
                    "Rajkot Patola Sarees",
                ],
            },
            {
                title: "Type",
                items: [
                    "Embroidery",
                    "Hand Crafted Sarees",
                    "Printed",
                    "Painted",
                    "Woven",
                ],
            },
            {
                title: "Natural Dyes",
                items: ["Ajrakh Sarees", "Kalamkari Sarees", "Bagru Sarees"],
            },
        ],
        showcase: "sarees",
    },
    apparel: {
        label: "Apparel",
        sections: [
            {
                title: "Clothing",
                items: [
                    "Kurtas",
                    "Kurta Sets",
                    "Co-ord Sets",
                    "Dresses",
                    "Menswear",
                    "Kidswear",
                    "View All",
                ],
            },
            {
                title: "Women Add-ons",
                items: ["Dress Material", "Dupattas", "Stoles-Shawls", "Pavada"],
            },
            {
                title: "Shop By Craft",
                items: [
                    "Ajrakh Prints",
                    "Bagh Prints",
                    "Bagru Prints",
                    "Ikat weaves",
                    "Heritage Weaves",
                    "Kalamkari Prints",
                    "Sanganeri Block Prints",
                ],
            },
            {
                title: "Shop By Collection",
                items: [
                    "English Tweeds Ikats",
                    "Vihaga Kalamkaris",
                    "Travelogue Sanganeris",
                    "Nandankanan Kalamkaris",
                    "Mansarovar Ajrakhs",
                    "Himalayan Trove Bagrus",
                    "Shikhara Ikats",
                    "Padmaja Baghs",
                    "Butta Bomma Bagrus",
                ],
            },
        ],
        showcase: "apparel",
    },
    handicrafts: {
        label: "Handicrafts",
        sections: [
            {
                title: "All Handicrafts",
                items: [
                    "Brass Items",
                    "Culture Marble",
                    "Mandirs",
                    "Marble",
                    "Marble Artefacts",
                    "Rose Wood",
                    "Rose Quartz Stone",
                    "Sandalwood",
                    "Sandstones",
                    "Silver Range",
                    "White Metal",
                    "White Wood",
                    "Wooden Art Work",
                ],
            },
            {
                title: "Gifts",
                items: [
                    "Corporate Gifts",
                    "Gift Items",
                    "Ganesha Collection",
                    "Painted Gifts",
                ],
            },
            {
                title: "Home Decor",
                items: ["Dining Tables", "Sofa Sets", "Wall Panel", "Wall Hangings"],
            },
        ],
        showcase: "handicrafts",
    },
};

export const suggestedSearches = [
    "Kanjivaram Sarees",
    "Bridal Banarasi",
    "Handcrafted Dupattas",
    "Brass Home Decor",
];

export const primaryLinks = [
    { label: "Bridal", href: "#", accent: true },
    { label: "Sarees", href: "#", menu: "sarees" as const },
    { label: "Apparel", href: "#", menu: "apparel" as const },
    { label: "Handicrafts", href: "#", menu: "handicrafts" as const },
    { label: "Kalanjali Ethnics", href: "#", accent: true },
    { label: "Custom Stitching", href: "#", accent: true },
    { label: "Blog", href: "#", accent: true },
    { label: "Ugadi Sale", href: "#", accent: true },
];
