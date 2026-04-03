import { staticNavCategories } from "@/lib/static-nav-data";

import { primaryNavItems } from "./nav-items";

export type MegaPreview = { title: string; subtitle: string; imageUrl: string };

const previewByLabel: Record<string, [MegaPreview, MegaPreview]> = {
  "Traditional Sarees": [
    {
      title: "Kanchi Pattu Sarees",
      subtitle: "Handpicked heritage weaves",
      imageUrl: "/mega-menu/kanchi-pattu.svg",
    },
    {
      title: "Banaras Silk Sarees",
      subtitle: "Timeless zari craftsmanship",
      imageUrl: "/mega-menu/banaras-silk.svg",
    },
  ],
  "Wedding Sarees": [
    {
      title: "Bridal Sarees",
      subtitle: "Grand silhouettes for the big day",
      imageUrl:
        "https://images.unsplash.com/photo-1619378607490-6f2f7ef5a8b5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Reception Sarees",
      subtitle: "Evening elegance in silk",
      imageUrl:
        "https://images.unsplash.com/photo-1620037086169-dcbd4f3f9474?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Designer & Party Wear Sarees": [
    {
      title: "Designer Sarees",
      subtitle: "Statement looks for celebrations",
      imageUrl:
        "https://images.unsplash.com/photo-1595459894258-3f3f0f2f1d36?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Party Wear Sarees",
      subtitle: "Modern drapes with rich detailing",
      imageUrl:
        "https://images.unsplash.com/photo-1610030469668-3c4f6a7d2b09?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Festive Wear Sarees": [
    {
      title: "Festive Collection",
      subtitle: "Bright tones and festive zari",
      imageUrl:
        "https://images.unsplash.com/photo-1619378607490-6f2f7ef5a8b5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Traditional Festive Looks",
      subtitle: "Elegant silk for every function",
      imageUrl:
        "https://images.unsplash.com/photo-1610189000046-7fcb6e9f8f63?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Casual & Workwear Sarees": [
    {
      title: "Casual Sarees",
      subtitle: "Lightweight everyday styles",
      imageUrl:
        "https://images.unsplash.com/photo-1625591340245-4f4a2f2b575f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Workwear Sarees",
      subtitle: "Minimal, graceful office picks",
      imageUrl:
        "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Dhoti & Kanduva": [
    {
      title: "Silk Dhotis",
      subtitle: "Ceremonial classics in silk",
      imageUrl:
        "https://images.unsplash.com/photo-1583391733981-76f0e35fa592?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Kanduva Sets",
      subtitle: "Traditional sets for occasions",
      imageUrl:
        "https://images.unsplash.com/photo-1602211844066-d3bb556e983b?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Our Stores": [
    {
      title: "Visit Our Stores",
      subtitle: "Experience collections in person",
      imageUrl:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Find Nearby Showrooms",
      subtitle: "Hyderabad, Vijayawada, Vizag",
      imageUrl:
        "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};

const defaultPreviews = (label: string): [MegaPreview, MegaPreview] => [
  {
    title: label,
    subtitle: "Curated collection",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469668-3c4f6a7d2b09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Shop now",
    subtitle: "Explore premium picks",
    imageUrl:
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=80",
  },
];

export type NavMegaItem = {
  label: string;
  href: string;
  children: readonly { label: string; href: string }[];
  previews: [MegaPreview, MegaPreview];
};

export function getNavMegaItems(): NavMegaItem[] {
  const categories = Object.values(staticNavCategories);
  return primaryNavItems.map((item) => {
    const match = categories.find((category) => category.title === item.label);
    return {
      label: item.label,
      href: item.href,
      children: match?.items ?? [],
      previews: previewByLabel[item.label] ?? defaultPreviews(item.label),
    };
  });
}
